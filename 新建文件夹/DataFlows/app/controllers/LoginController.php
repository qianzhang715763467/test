<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace DataFlows\Controllers;

use Phalcon\Mvc\Controller,
    Phalcon\Db;
use DataFlows\Utils\MySqlDB;

class LoginController extends Controller {

    public function indexAction() {
        
    }
    
    public function aAction() {
        echo "11";
    }

    public function doLoginAction() {

        try {
            $res = array();
            $name = $this->request->get('name');
            $pass = $this->request->get('pass');

//            $name = "zp";
//            $pass = "111";
            $conn = MySqlDB::getConnection();
            $sql = "select u1.*, u2.name as rank_name,u2.rank from users as u1 join users_rank as u2 where u1.name=? and u1.pass=? and u1.rid=u2.id";
            
            $result = $conn->fetchAll($sql, Db::FETCH_ASSOC, [$name, $pass]);
                      
            $conn = null;
            
//            if($pass != "316"){
//                $res['c'] = -1;
//                $res['t'] = '密码错误';
//            }else{
//                $expire = time() + 3600*24*365;
//                $this->cookies->set('pp', 'staff', $expire);
//                //$this->cookies->setExpiration(120);
//                $res['c'] = 0;
//                $res['t'] = '/';
//            }
            
            if (count($result) != 1) {
                $res['c'] = -1;
                $res['t'] = '密码错误';
            } else {
                $r = $result[0];
                $expire = time() + 3600*24*365;
                $this->cookies->set('pp', $r['rank_name'], $expire);
                
                //$this->response->redirect("/admin");
                $res['c'] = 0;
                $res['t'] = '/';
            }
            echo json_encode($res);
            
        } catch (Exception $e) {
            echo $e;
        }
    }

}
