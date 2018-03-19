<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ActionAcl
 *
 * @author ZHAOPENG
 */
namespace HCharts\Plugins;

use Phalcon\Events\Event,
    Phalcon\Mvc\User\Plugin,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Acl;
use Phalcon\Acl\Adapter\Memory as AclList;
use Phalcon\Acl\Role;
use Phalcon\Acl\Resource;

class ActionAcl extends Plugin {

    public function __construct($dependencyInjector) {
        $this->_dependencyInjector = $dependencyInjector;
    }

    private function getAcl() {
        if (!isset($this->persistent->acl)) {
            
            $acl = new AclList();
            $acl->setDefaultAction(Acl::DENY);

            $roles = array(
                'guest' => new Role('guest'),
                'staff' => new Role('staff'),
                'admin' => new Role('admin'),
            );
            foreach ($roles as $role) {
                $acl->addRole($role);
            }
            
            $loginResource = new Resource("login");
            $usersResource = new Resource("users");
            $phtmlResource = new Resource("phtml");
            $testResource  = new Resource("test");
            
            
            $acl->addResource($loginResource, array('doLogin'));
            $acl->addResource($phtmlResource, array('index'));
            $acl->addResource($usersResource, "*");
            
            $acl->addResource($testResource, "*");
            
            //$acl->allow("guest", "*", "*");
            $acl->deny("guest", "*", "*");
            $acl->allow("guest", "login", "*");
//            $acl->allow("guest", "test", "*");
            
            $acl->allow("staff", "*", "*");
            $acl->deny("staff", "users", "*");
            
            $acl->allow("admin", "*", "*");
            

            $this->persistent->acl = $acl;
        }
        return $this->persistent->acl;
    }

    public function beforeExecuteRoute(Event $event, Dispatcher $dispatcher) {
        //xdebug_print_function_stack('join beforeDispatch');
        $role = trim($dispatcher->getDI()->get("cookies")->get('pp')->getValue());
        //echo $role;
        if (!$role) {
            $role = 'guest';
            $dispatcher->getDI()->get("cookies")->set('pp','guest');
        }else if($role != 'guest' && $role != 'staff' && $role != 'admin'){
            $role = 'guest';
            $dispatcher->getDI()->get("cookies")->set('pp','guest');
        }
        
        $controller = $dispatcher->getControllerName();
        $action = $dispatcher->getActionName();

        $acl = $this->getAcl();
        
        $allowed = $acl->isAllowed($role, $controller, $action);
        if ($allowed != Acl::ALLOW) {
            //$this->flash->error('无权限访问！');
            //在View中勿用{{ flash.output() }}输出,否则会抛出异常,在转发的对应View中使用{{ content() }}可正常输出
            //echo "a"." ";
            $dispatcher->forward(array(
                'controller' => 'login', 
                'action' => 'index'
            ));
            return false;
        }
    }

}
