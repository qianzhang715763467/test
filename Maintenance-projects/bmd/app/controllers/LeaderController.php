<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Bmd\Controllers;

use Phalcon\Mvc\Controller;
use Bmd\Utils\MySqlDB;
use Phalcon\Db;

class LeaderController extends Controller {


    public function submitedHistoryAction(){

    }

    public function viewAction(){

    }

    public function querySubmitedHistoryAction(){

        $rm = $this->di->get("rm");

        try{
            $conn = MySqlDB::getConnection();

            $sql = "select * from bmd_submit_history where status='待审核' or status='待完善' order by apply_date desc";
            $result = $conn->fetchAll($sql, Db::FETCH_ASSOC);

            $rm->setMessage(json_encode($result));
        }catch (\Exception $e){
            $rm->setCode(0);
            $rm->setMessage($e->getMessage());
        }

        echo $rm->toJson();
    }

    public function submitedHistoryByDateAction(){

        $rm = $this->di->get("rm");

        try{
            $date = $this->request->get("date");
            $conn = MySqlDB::getConnection();

            $sql = "select * from bmd_submit_history where date_format(apply_date,'%Y-%m-%d')='".$date."' order by status,apply_date desc";
            $result = $conn->fetchAll($sql, Db::FETCH_ASSOC);

            $rm->setMessage(json_encode($result));
        }catch (\Exception $e){
            $rm->setCode(0);
            $rm->setMessage($e->getMessage());
        }

        echo $rm->toJson();
    }

}
