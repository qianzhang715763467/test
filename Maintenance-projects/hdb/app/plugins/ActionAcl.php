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
namespace Hdb\Plugins;

use Phalcon\Events\Event,
    Phalcon\Mvc\User\Plugin,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Acl,
    Phalcon\Http\Request;
use Phalcon\Acl\Adapter\Memory as AclList;
use Phalcon\Acl\Role;
use Phalcon\Acl\Resource,
    Phalcon\Crypt;

class ActionAcl extends Plugin {

    public function __construct($dependencyInjector) {
        $this->_dependencyInjector = $dependencyInjector;

        $protect_pages = ["zp", "lq", "zhangxiao",
            "lyz", "hualei", "lirongzhi", "sunliang", "chenlu", "taosha",
            "dengjing", "heyuanchuan", "yangyuhao", "zhangliang", "justin",
            "amy", "suolin", "zhujinhua","xujinjin","caiwenmei","yulu", "shilei"];


        $this->protection = [
            "index_index"  => $protect_pages,
            "pages_chart1" => $protect_pages
        ];

        $this->domIfShows = [];

        $this->expire = ["liuqiang","sungang","chenyin"];
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
            $pagesResource = new Resource("pages");
            $testResource  = new Resource("test");
            $indexResource  = new Resource("index");
            
            
            //$acl->addResource($loginResource, array('doLogin'));
            $acl->addResource($loginResource, "*");
            $acl->addResource($pagesResource, "*");
            $acl->addResource($usersResource, "*");
            $acl->addResource($indexResource, "*");
            
            $acl->addResource($testResource, "*");

            $acl->deny("guest", "*", "*");
            $acl->allow("guest", "login", "*");
            
            $acl->allow("staff", "*", "*");
            $acl->deny("staff", "users", "*");
            
            $acl->allow("admin", "*", "*");


            $this->persistent->acl = $acl;
        }
        return $this->persistent->acl;
    }

    public function beforeExecuteRoute(Event $event, Dispatcher $dispatcher) {

        $controller = $dispatcher->getControllerName();
        $action = $dispatcher->getActionName();

        $role = trim($dispatcher->getDI()->get("cookies")->get('pp')->getValue());
        $user = trim($dispatcher->getDI()->get("cookies")->get('pu')->getValue());


        $request = ($dispatcher->getDI()->get("request"));
        $url_role = $request->get("p");
        $url_user = $request->get("u");

        if(isset($url_role) && isset($url_user)){

            $role = trim($dispatcher->getDI()->get("crypt")->decryptBase64($url_role));
            $user = trim($dispatcher->getDI()->get("crypt")->decryptBase64($url_user));

            $expire = time() + 3600*24;

            $dispatcher->getDI()->get("cookies")->set('pp', $role, $expire);
            $dispatcher->getDI()->get("cookies")->set('pu', $user, $expire);
            $dispatcher->getDI()->get("response")->redirect($controller.'/'.$action);
        }

        if (!$role) {
            $role = 'guest';
            $dispatcher->getDI()->get("cookies")->set('pp','guest');
        }else if($role != 'guest' && $role != 'staff' && $role != 'admin'){
            $role = 'guest';
            $dispatcher->getDI()->get("cookies")->set('pp','guest');
        }

        $acl = $this->getAcl();

        $allowed = $acl->isAllowed($role, $controller, $action);

        if ($allowed != Acl::ALLOW) {
            $dispatcher->forward(array(
                'controller' => 'login',
                'action' => 'index'
            ));
            return false;
        }else if(in_array($user, $this->expire)){
            $dispatcher->getDI()->get("cookies")->set('pp', 'guest');
            $dispatcher->getDI()->get("cookies")->set('pu', '');
            $dispatcher->getDI()->get("response")->redirect('/login');
            return false;
        }

        $pa = $this->protectAccess($user, $controller, $action);

        if(!$pa){
            $dispatcher->getDI()->get("response")->redirect('index/show404');
            return false;
        }
    }

    public function protectAccess($user, $controller, $action) {

        $resource = $controller . "_" . $action;

        if (isset($this->protection[$resource])) {//if resource was protected
            if (in_array($user, $this->protection[$resource])) {//if user has permission
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

}
