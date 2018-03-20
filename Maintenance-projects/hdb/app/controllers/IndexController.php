<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Hdb\Controllers;

use Phalcon\Mvc\Controller;
use Hdb\utils\MySqlDB;

class IndexController extends Controller {

    public function indexAction() {
        
    }

//    public function doLoginAction(){
//
//        $name = $this->request->get('name');
//        $pass = $this->request->get('password');
//        if($name == "111@163.com" && $pass == "111111"){
//            $this->response->redirect( 'index' );
//        }else{
//            echo "faild";
//        }
//
//    }

    public function show404Action(){
        echo "没有内容";
    }

    public function showNoneAction(){
        echo "";
    }

}
