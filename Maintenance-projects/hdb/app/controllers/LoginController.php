<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Hdb\Controllers;

use Phalcon\Mvc\Controller,
    Phalcon\Db,
    Phalcon\Crypt;
use Hdb\Utils\MySqlDB;

class LoginController extends Controller {

    public function indexAction() {
        
    }
    
    public function aAction() {
    }

    public function doLoginAction() {

        try {
            $res = array();

            $params = array();
            foreach ($_GET as $key => $value) {
                if($key == "_url")
                    continue;
                array_push($params, $key."=".$value);
            }

            foreach ($_POST as $key => $value) {
                array_push($params, $key."=".$value);
            }

            $params = join("&",$params);

            $ch = curl_init();
            $url = "http://10.127.133.94/login/check?".$params;

            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

            curl_exec($ch);
            $result = curl_multi_getcontent($ch);

            if (curl_errno($ch)) {
                //echo curl_error($ch);
                $res['t'] = "error";
            } else {
                curl_close($ch);
            }
            $result = json_decode($result);

            if (!$result || $result->c != 0) {
                $res['c'] = -1;
                $res['t'] = $res['t'].'密码错误';
            } else {
                $expire = time() + 3600*24*365;
                $this->cookies->set('pp', $result->rank_name, $expire);
                $this->cookies->set('pu', $result->name, $expire);

                $res['c'] = 0;
                $res['t'] = '/';
            }
            echo json_encode($res);
            
        } catch (Exception $e) {
            echo $e;
        }
    }

    public function slideAction() {
        $this->cookies->set('s', 'ok');
        echo 0;
    }

    public function logoutAction(){
        $this->cookies->set('pp', 'exit', 3600 * 24);
        echo 0;
    }

//    public function testAction(){
//
//        $request = $this->request;
//        $url_role = $request->get("p");
//        $url_user = $request->get("u");
//
//        if($url_role && $url_user){
//            $crypt = new Crypt();
//            $crypt->setKey('zhaopeng');
//
//            $role = $crypt->decryptBase64($url_role);
//            $user = $crypt->decryptBase64($url_user);
//        }
//
//        echo $role;
//        echo $user;
//    }


}
