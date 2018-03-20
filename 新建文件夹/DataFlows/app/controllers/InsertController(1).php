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

class InsertController extends Controller {

    public function flowAction() {
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $name = $this->request->get('flow-name');
            $desc = $this->request->get('flow-desc');

            $conn = MySqlDB::getConnection();
            $values = array(
                $name,
                $desc
            );
            $colums = array("name", "desc");

            $res = $conn->insert("flows", $values, $colums);
            //echo $res;
            //$conn->commit();
            $rm->setMessage("添加成功");
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
        $this->view->disable();
    }

    public function flowDetailsAction() {
        $fid = $this->request->get('fid');
        $nodes = $this->request->get('cs');
        $edges = json_decode($this->request->get('edges'));
        //$a = $cs[0]->rcx;
        //echo $this->request->get('edges');

        $conn = MySqlDB::getConnection();

        $values = array(
            $nodes
        );
        $colums = array("node_details");

        $conn->update("flows", $colums, $values, "id = " . $fid);

        if ($edges) {
            for ($i = 0; $i < count($edges); $i++) {
                //echo $edges[$i];
                $values = array(
                    $edges[$i]->start,
                    $edges[$i]->end,
                    $edges[$i]->sql,
                    $edges[$i]->tableName,
                    $fid
                );
                $colums = array("start_node", "end_node", "sql", "table_name", "fid");
                $conn->insert("edges", $values, $colums);
            }
        }
        echo "修改成功";
    }

}
