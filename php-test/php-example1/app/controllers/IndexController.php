<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Hdb\Controllers;

use Phalcon\Mvc\Controller;
use Hdb\Utils\MySqlDB;
use Phalcon\Db;

class IndexController extends Controller {

    public function indexAction(){
    	try {
            $conn = MySqlDB::getConnection();
            $sql = "select * from product";
            $r 	= $conn->fetchAll($sql, Db::FETCH_ASSOC);
        } catch (Exception $e) {
            echo $e;
        }
        $conn = null;
        echo json_encode($r);
        echo "haha";
    }

}
