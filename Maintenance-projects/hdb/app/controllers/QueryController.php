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

class QueryController extends Controller {
    
    public $baseUrl = "http://10.127.3.101:8080/dataservice/getconfig.do?id=";
    //public $baseUrl = "http://ds.idc.xiwanglife.com/dataservice/getconfig.do?id=";
    
    
    public function coorsAction() {
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $start = $this->request->get('start');
			$end = $this->request->get('end');
            $conn = MySqlDB::getConnection();
            $sql = "select * from t_map_trans where time_key>=? and time_key <=? order by time_key asc";
            $flows = $conn->fetchAll($sql, Db::FETCH_ASSOC, [$start,$end]);

            $rm->setMessage($flows);
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }
    
    public function kvAction(){
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $conn = MySqlDB::getConnection();
            $sql = "select * from t_key_value";
            $r 	= $conn->fetchAll($sql, Db::FETCH_ASSOC);

            $rm->setMessage($r);
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }

	public function mvAction(){
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $conn = MySqlDB::getConnection();
            $sql = "select * from t_month_value";
            $r 	= $conn->fetchAll($sql, Db::FETCH_ASSOC);

            $rm->setMessage($r);
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }
	public function kpAction(){
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $conn = MySqlDB::getConnection();
            $sql = "select * from t_key_performance";
            $r 	= $conn->fetchAll($sql, Db::FETCH_ASSOC);

            $rm->setMessage($r);
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }

    public function accessLogAction(){
        $conn = null;
        try {
            $conn = MySqlDB::getConnection();
            $sql = "select * from access_log order by access_time desc limit 60";
            $r 	= $conn->fetchAll($sql, Db::FETCH_ASSOC);
            $table = "<table style='border-collapse: collapse'>";
            for($i=0;$i<count($r);$i++){
                $table .= "<tr>";
                $table .= "<td style='border:1px solid #000'>" . $r[$i]["user_name"] . "</td>";
                $table .= "<td style='border:1px solid #000;padding:8px'>" . $r[$i]["access_time"] . "</td>";
                $table .= "<td style='border:1px solid #000'>" . $r[$i]["ip"] . "</td>";
                $table .= "</tr>";
                //echo json_encode($r[$i]);
            }
            $table .= "</table>";
            echo $table;
        } catch (Exception $e) {

        }
        $conn = null;
    }

    public function minTransTimeAction(){
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $conn = MySqlDB::getConnection();
            $sql = "select min(time_key) as min_time_key from t_map_trans";
            $r 	= $conn->fetchOne($sql, Db::FETCH_ASSOC);

            $rm->setMessage($r);
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }

}
