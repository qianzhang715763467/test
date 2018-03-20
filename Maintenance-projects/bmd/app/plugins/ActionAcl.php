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
namespace Bmd\Plugins;

use Phalcon\Events\Event,
    Phalcon\Mvc\User\Plugin,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Acl,
    Phalcon\Http\Request;
use Phalcon\Acl\Adapter\Memory as AclList;
use Phalcon\Acl\Role;
use Phalcon\Acl\Resource,
    Phalcon\Crypt;
use Phalcon\Exception;
use Bmd\Utils\MySqlDB;
use Phalcon\Db;

class ActionAcl extends Plugin {

    public function __construct($dependencyInjector) {

        $this->_dependencyInjector = $dependencyInjector;

        $cache = $this->getDI()->get("fileCache");
        if(!$cache->get("verify")){
            $this->setCache();
            $cache = $this->getDI()->get("fileCache");
        }

        $this->protection = [
            //controller_action => [white_list]
            //"protect_index" => $cache->get("verify") ? $cache->get("verify"):[]
        ];
//
        $this->domIfShows = [
            "verify" => $cache->get("verify") ? $cache->get("verify"):[],
        ];

//        $this->expire = [];
    }

    private function getAcl() {
        if (!isset($this->persistent->acl)) {

            $acl = new AclList();
            $acl->setDefaultAction(Acl::DENY);

            $roles = array(
                'guest' => new Role('guest'),
                'servicer' => new Role('servicer'),//kefu
                'saler' => new Role('saler'),//xiaoshou
                'leader' => new Role('leader'),//shenpiren
                'admin' => new Role('admin')
            );
            foreach ($roles as $role) {
                $acl->addRole($role);
            }

            $indexResource = new Resource("index");
            $loginResource = new Resource("login");
            $salerResource = new Resource("saler");
            $leaderResource  = new Resource("leader");
            $pagesResource  = new Resource("pages");
            $toolbarResource  = new Resource("toolbar");
            $submitResource  = new Resource("submit");
            $queryResource  = new Resource("query");
            $protectResource  = new Resource("protect");
            $imgResource  = new Resource("img");

            $acl->addResource($indexResource, "*");
            $acl->addResource($loginResource, "*");
            $acl->addResource($salerResource, "*");
            $acl->addResource($leaderResource, "*");
            $acl->addResource($pagesResource, "*");
            $acl->addResource($toolbarResource, "*");
            $acl->addResource($submitResource, "*");
            $acl->addResource($queryResource, "*");
            $acl->addResource($protectResource, "*");
            $acl->addResource($imgResource, "*");

            $acl->allow("guest", "login", "*");
            $acl->deny("guest", "*", "*");

            $acl->allow("servicer", "*", "*");
            $acl->deny("servicer", $leaderResource, "*");

            $acl->allow("saler", "*", "*");
            $acl->deny("saler", $leaderResource, "*");

            $acl->allow("leader", "*", "*");
            //$acl->deny("leader", $leaderResource, "*");

            $acl->allow("admin", "*", "*");

            $this->persistent->acl = $acl;
        }
        return $this->persistent->acl;
    }

    public function beforeExecuteRoute(Event $event, Dispatcher $dispatcher) {

        $user = trim($dispatcher->getDI()->get("cookies")->get('c1')->getValue());
        $role = trim($dispatcher->getDI()->get("cookies")->get('c2')->getValue());

        if (!$role) {
            $role = 'guest';
            $dispatcher->getDI()->get("cookies")->set('c2', 'guest');
        } else if ($role != 'guest' && $role != 'saler' && $role != 'leader' && $role != 'admin' && $role != 'servicer') {
            $role = 'guest';
            $dispatcher->getDI()->get("cookies")->set('c2', 'guest');
        }

        $controller = $dispatcher->getControllerName();
        $action = $dispatcher->getActionName();

        try{
            $acl = $this->getAcl();

            $allowed = $acl->isAllowed($role, $controller, $action);
            if ($allowed != Acl::ALLOW) {
                $dispatcher->getDI()->get("response")->redirect('/login');
                return false;
            }
        }catch (\Exception $e){
            $dispatcher->getDI()->get("cookies")->set('c1', null, -1);
            $dispatcher->getDI()->get("cookies")->set('c2', 'guest');
            $dispatcher->getDI()->get("response")->redirect('/login');
            return true;
        }

        if($this->checkPassExpire()){
            $dispatcher->getDI()->get("cookies")->delete("c5");
            $dispatcher->getDI()->get("session")->set("passExpire", "expire");
            if($this->checkPassExpire() && $action != "updatePass" && $action != "whoami" && $action != "index" && $controller != "login"){
                $dispatcher->forward(array(
                    "controller" => "index",
                    "action" => "index"
                ));
                return false;
            }
        }else{
            $dispatcher->getDI()->get("session")->remove("passExpire");
        }

//        $pa = $this->protectAccess($user, $controller, $action);
//
//        if(!$pa){
//            $this->flash->error('无权限访问！');
//            $dispatcher->getDI()->get("response")->redirect('index/showNone');
//            return false;
//        }
        //print_r(explode(" ", trim($this->initDomIfShows($user)))) ;
        $dispatcher->getDI()->get("session")->set("showDoms", $this->initDomIfShows($user));
    }

    public function protectAccess($user, $controller, $action) {

        $resource = $controller . "_" . $action;

        if (array_key_exists($resource, $this->protection)) {//if resource was protected
            if (in_array($user, $this->protection[$resource])) {//if user has permission
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    public function initDomIfShows($user) {
        $str = "";
        foreach($this->domIfShows as $key => $value){
            if (in_array($user, $this->domIfShows[$key])){
                $str = $key . " " . $str;
            }
        }

        return trim($str);
    }

    public function beforeCheckAccess($event, $acl) {
        //echo 234;
    }

    private function setCache(){

        try{
            $conn = MySqlDB::getConnection();
            $sql = "select * from protect_acl";
            $result = $conn->fetchAll($sql);

            $caches = [];
            for($i=0;$i<count($result);$i++){
                $protect_source_name = $result[$i]["protect_source_name"];
                if(!isset($caches[$protect_source_name])){
                    $caches[$protect_source_name] = [];
                }
                array_push($caches[$protect_source_name], $result[$i]["accessable_username"]);
            }

            $cache = $this->getDI()->get("fileCache");
            foreach ($caches as $key => $value ){
                $cache->save($key, $caches[$key]);
            }

            //echo "cached protect acl.......";
        }catch (Exception $e){
            echo $e->getMessage();
        }

    }

    private function checkPassExpire(){

        $conn = null;
        try{
            $name = trim($this->cookies->get("c1"));
            $last_update_pass_date = trim($this->cookies->get("c5"));

            if(!$last_update_pass_date || (date("Y-m-d H:i:s", strtotime($last_update_pass_date)) != $last_update_pass_date)){

                $conn = MySqlDB::getConnection();
                $sql  = "select last_update_pass_time,pass from users where name=?";
                $res  = $conn->fetchOne($sql, Db::FETCH_ASSOC, [$name]);

                if(!$res || !$res["last_update_pass_time"]){
                    return true;
                }else if(date("Y-m-d H:i:s", strtotime($res["last_update_pass_time"])) != $res["last_update_pass_time"]){
                    return true;
                }else if($res["pass"] === "111"){
                    return true;
                }

                $last_update_pass_date = strtotime($res["last_update_pass_time"]);
                $now = strtotime (date("y-m-d h:i:s"));
                $days = ceil(($now-$last_update_pass_date)/86400);//60s*60min*24h

                if($days > 30){
                    return true;
                }

                $expire = time() + 3600 * 24 * 90;
                $this->cookies->set('c5', $res["last_update_pass_time"], $expire);

                return false;
            }else{
                $last_update_pass_date = strtotime($last_update_pass_date);
                $now = strtotime (date("y-m-d h:i:s"));
                $days = ceil(($now-$last_update_pass_date)/86400);//60s*60min*24h

                if($days > 30){
                    return true;
                }
                return false;
            }
        }catch (Exception $e){
            echo $e->getMessage();
            return true;
        }finally{
            $conn = null;
        }
    }

}
