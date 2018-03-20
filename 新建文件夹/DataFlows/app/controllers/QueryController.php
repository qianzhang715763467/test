<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace DataFlows\Controllers;

use Phalcon\Mvc\Controller;
use DataFlows\Utils\MySqlDB;
use Phalcon\Db;

class QueryController extends Controller {
    
    //public $baseUrl = "http://10.127.133.91:8080/data/dataservice/getconfig.do?id=";
    public $baseUrl = "http://ds.idc.xiwanglife.com/dataservice/getconfig.do?id=";
    
    public function listAction(){
        $id = $this->request->get('id');
        $start = urlencode($this->request->get('start'));
        $end = urlencode($this->request->get('end'));
//        $start = urlencode("2017-04-12 16:30:14");
//        $end = urlencode("2017-04-12 16:42:24");
        
        $ch = curl_init();
        
        $url = $this->baseUrl . $id . "&start=" . $start . "&end=" . $end;
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        
        curl_exec($ch);
        $r = curl_multi_getcontent($ch);

        if (curl_errno($ch)) {
            echo curl_error($ch);
        } else {
            curl_close($ch);
        }
        echo $r;
    }

    public function allFlowsAction() {
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $name = $this->request->get('flow-name');
            $desc = $this->request->get('flow-desc');

            $conn = MySqlDB::getConnection();
            $sql = "select * from flows;";
            $flows = $conn->fetchAll($sql, Db::FETCH_ASSOC);

            $rm->setMessage($flows);
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
        $this->view->disable();
    }

    public function flowAction() {
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $flowId = $this->request->get('id');

            $conn = MySqlDB::getConnection();
            $sql = "select * from flows where id=?";
            $flows = $conn->fetchAll($sql, Db::FETCH_ASSOC, [$flowId]);

            $rm->setMessage($flows);
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }
    
    public function edgesAction() {
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $flowId = $this->request->get('id');

            $conn = MySqlDB::getConnection();
            $sql = "select * from edges where fid=?";
            $edges = $conn->fetchAll($sql, Db::FETCH_ASSOC, [$flowId]);

            $rm->setMessage($edges);
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }
    
    public function metricAction() {
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $flowId = $this->request->get('fid');
            $node = $this->request->get('node');

            $conn = MySqlDB::getConnection();
            $sql = "select * from nodes_metric where fid=? and node=? order by orderby asc";
            $flows = $conn->fetchAll($sql, Db::FETCH_ASSOC, [$flowId, $node]);

            $rm->setMessage($flows);
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }

    public function scheduleAction() {

        $conn = null;
        try {
            $conn = MySqlDB::getConnection();
            $table_name = $this->request->get('table_name');
            $sql = "select `sql` from edges where table_name=?";

            $sqlArr = $conn->fetchOne($sql, Db::FETCH_ASSOC, [$table_name]);
            $sql = $sqlArr['sql'];

            $start = date("Y-m-d H:i:s");
            $step = 10;
            for ($i < 0; $i < 60 / $step; $i++) {
                sleep($step);
                $end = date("Y-m-d H:i:s");

                eval("\$sql = \"$sql\";");
                //echo $sql;
                $success = $conn->execute($sql);
                $start = $end;
                $sql = $sqlArr['sql'];
                echo "$end" . "<br/>";
            }
        } catch (Exception $e) {
            
        }
        $conn = null;
        //echo $rm->toJson();
    }
    
    

}
