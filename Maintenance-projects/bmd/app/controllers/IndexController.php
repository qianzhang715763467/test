<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Bmd\Controllers;

use Phalcon\Mvc\Controller;
use Bmd\Utils\MySqlDB;

class IndexController extends Controller {

    public function indexAction() {
        //$this->response->redirect( 'leader/index' );
        $role = $this->cookies->get("c2");
        $role = str_replace("\0", "", $role);

        if(!$role || strlen($role) == 0){
            $this->response->redirect( 'index/noRole' );
        }

        $pass_expire = $this->getDI()->get("session")->get("passExpire");
        $rtype = $this->request->getHeader("rtype");

        if(isset($pass_expire) && $pass_expire == "expire"){
            $role = "pass_expire";
            if($rtype){//xhr
                echo "";
                $this->view->disable();
            }
        }

        $bootPage = "";
        $bootUrl  = "";
        switch ($role){
            case "admin":
                $bootPage = "querybmd";
                $bootUrl = "/pages/";
                break;
            case "leader":
                $bootPage = "submitedHistory";
                $bootUrl = "/leader/";
                break;
            case "saler":
                $bootPage = "querybmd";
                $bootUrl = "/pages/";
                break;
            case "servicer":
                $bootPage = "querybmd";
                $bootUrl = "/pages/";
                break;
            case "pass_expire":
                $bootPage = "updatePass";
                $bootUrl = "/pages/";
                break;
        }

        $this->view->setVar("bootUrl", $bootUrl);
        $this->view->setVar("bootPage", $bootPage);

//        $this->view->disable();
    }

    public function updatePassAction(){
        $this->view->setVar("bootUrl", "/pages/");
        $this->view->setVar("bootPage", "updatePass");
        $this->view->pick("index/index");
    }

    public function whoamiAction(){
        $rm = $this->di->get("rm");
        $username = $this->cookies->get("c1");
        $username = str_replace("\0", "", $username);

        if(!$username || strlen($username) == 0){
            $rm->setMessage("nobody");
        }else{
            $rm->setMessage($username);
        }
        echo $rm->toJson();
    }

    public function show404Action(){
        echo "没有内容";
    }

    public function showNoneAction(){
        echo "";
    }

    public function noRoleAction(){
        echo "no role";
    }

    public function setCacheAction(){
        $cache = $this->getDI()->get("fileCache");
        $cacheKey = "protect";
        $arr = [111,222,333, "aaa"];
        $cache->save($cacheKey, $arr);
    }

    public function getCacheAction(){
        $cache = $this->getDI()->get("fileCache");
        $cacheKey = "protect";
        print_r ($cache->get($cacheKey));
    }

}
