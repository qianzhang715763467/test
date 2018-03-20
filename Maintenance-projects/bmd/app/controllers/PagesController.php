<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Bmd\Controllers;

use Phalcon\Mvc\Controller;
use Bmd\Utils\MySqlDB;

class PagesController extends Controller {
    
//    public function indexAction() {
//        $page = $this->dispatcher->getParam("page");
//        $this->view->pick("pages/$page");
//    }

    public function addbmdAction() {
        $this->view->setVar("role", trim($this->cookies->get("c2")));
    }

    public function querybmdAction() {


        $this->view->setVar("page_id", "2");
        $this->view->setVar("page_name", "querybmd");

        //echo $this->cookies->get("c2");
        //$this->view->disable();
    }

    public function previewimgsAction() {

    }

    public function updatePassAction() {
        $pass_expire = $this->getDI()->get("session")->get("passExpire");
        if(isset($pass_expire) && $pass_expire == "expire"){
            $this->view->setVar("message", "密码过期，请修改密码。");
        }else{
            $this->view->setVar("message", "");
        }
    }

    public function toolbarAction(){

    }

}
