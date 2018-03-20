<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Bmd\Controllers;

use Phalcon\Exception;
use Phalcon\Mvc\Controller;
use Bmd\Utils\MySqlDB;
use Phalcon\Db;

class QueryController extends Controller {
    
    //public $dsQueryUrl = "http://10.127.3.101:8080/dataservice/getconfig.do?id=";
    public $dsUrl = "http://ds.idc.xiwanglife.com/dataservice/getconfig.do?";


    public function inbmdAction(){

        $rm = $this->di->get("rm");
        $message = "";

        try{
            $id_no = $this->request->get("id_no");
            $mobile = $this->request->get("mobile");
            $product = $this->request->get("product");

            $sql = "select case when idno=? then 1 else 0 end as is_whitelist from bmd.yzd_cus_info where idno=? or mobile=? and product=?";
            $conn = MySqlDB::getConnection();
            $in_bmd = $conn->fetchOne($sql, Db::FETCH_ASSOC, [$id_no,$id_no,$mobile,$product]);
         
            if(!$in_bmd || $in_bmd["is_whitelist"] == 0){
                $message = "不在白名单";
            }else{
                $message = "在白名单<br/>";
                $sql = "select case when t1.idno=? and t2.verified_mobile=? then 1
                                when t1.idno=? and t2.verified_mobile<>? then 2
                                else 0
                           end as is_jf_realname
                    from (select * from  eif_member.t_client_certification  where idno=? and status=1 )t1 
                    join eif_member.t_member as t2 on t1.member_no=t2.member_no
                    where t2.status=1 or t2.verified_mobile=? ";

                $conn = MySqlDB::getConnection2();
                $verified= $conn->fetchOne($sql, Db::FETCH_ASSOC, [$id_no,$mobile,$id_no,$mobile,$id_no,$mobile]);

                if(!$verified){
                    $message .= "未在金服注册";
                }else if($verified["is_jf_realname"] == 0){
                    $message .= "未实名认证";
                }else if($verified["is_jf_realname"] == 1){
                    $message .= "实名认证，且手机号一致";
                }else if($verified["is_jf_realname"] == 2){
                    $message .= "实名认证，但手机号不一致";
                }else{
                    $message .= "未在金服注册...";
                }
            }

        }catch (\Exception $e){
            $rm->setCode(0);
            $message = $message.$e->getMessage();
        }finally{
            $rm->setMessage($message);
            echo $rm->toJson();
        }
    }

    public function ownerinfoAction(){

        $rm = $this->di->get("rm");

        try{
            $query_field = "";
            $where = [];

            foreach ($_POST as $key => $value) {
                if($key == "query_field"){
                    $query_field = $this->request->get("query_field");
                }else{
                    array_push($where , $key."='".$value."'");
                }
            }

            if(count($where) > 0){
                $where = " where ".join(" and ",$where);
            }else{
                $where = "";
            }

            $sql = "select distinct($query_field) from bmd.yzd_building_info $where";
            $conn = MySqlDB::getConnection();
            $res = $conn->fetchAll($sql);

            $rm->setMessage($res);
            //$rm->setUrl($sql);
        }catch (\Exception $e){
            $rm->setMessage($e);
            $rm->setUrl($sql);
        }finally{
            echo $rm->toJSON();
        }
    }


    public function submitedHistoryAction(){

        $rm = $this->di->get("rm");

        try{
            $submitter = $this->cookies->get("c1")->getValue();
            $submitter = str_replace("\0", "", $submitter);

            $conn = MySqlDB::getConnection();


            $sql = "select * from bmd_submit_history where submitter=? or assign_to=? and status='待审核' or status='待完善' order by status,id desc";
            $result = $conn->fetchAll($sql, Db::FETCH_ASSOC, [$submitter,$submitter]);

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
            $submitter = $this->cookies->get("c1")->getValue();
            $submitter = str_replace("\0", "", $submitter);

//            $role = $this->cookies->get("c2")->getValue();
//            $role = str_replace("\0", "", $role);

            $date = $this->request->get("date");

            $conn = MySqlDB::getConnection();


            $sql = "select * from bmd_submit_history where submitter=? and date_format(apply_date,'%Y-%m-%d')='".$date."' order by id desc";
            $result = $conn->fetchAll($sql, Db::FETCH_ASSOC, [$submitter]);

            $rm->setMessage(json_encode($result));
        }catch (\Exception $e){
            $rm->setCode(0);
            $rm->setMessage($e->getMessage());
        }

        echo $rm->toJson();
    }

    public function allSalerAction(){
        $rm = $this->di->get("rm");

        try{
            $conn = MySqlDB::getConnection();

            $sql = "select name from users where rid=3 ";
            $result = $conn->fetchAll($sql, Db::FETCH_ASSOC);

            $rm->setMessage(json_encode($result));
        }catch (\Exception $e){
            $rm->setCode(0);
            $rm->setMessage($e->getMessage());
        }

        echo $rm->toJson();
    }

    public function dsAction(){
        $rm = $this->di->get("rm");
        //$rm->setMessage('{"status":"200","message":"","id":258,"configName":"业主消费贷_首页","configType":"1","isInterface":1,"isTask":1,"remark":null,"details":{"list":{"id":1659,"values":[{"hours_desc":"23-24时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"22-23时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"21-22时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"20-21时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"19-20时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"18-19时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"17-18时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"16-17时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"15-16时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"14-15时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"13-14时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"12-13时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"11-12时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"10-11时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"9-10时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"8-9时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"7-8时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"6-7时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"5-6时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"4-5时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"3-4时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"2-3时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"1-2时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"0-1时","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"当天累计","apply_cnt":0,"apply_amt":0.000000,"mobile_review_finish_cnt":0,"second_review_finish_cnt":0,"final_review_finish_cnt":0,"review_accept_cnt":0,"sign_finish_cnt":0,"sign_finish_amt":0.000000,"loan_batch_success_cnt":0,"loan_batch_success_amt":0.00,"i_time":1512144541000,"report_time":"2017-12-02"},{"hours_desc":"历史累计","apply_cnt":18,"apply_amt":2082000.000000,"mobile_review_finish_cnt":5,"second_review_finish_cnt":5,"final_review_finish_cnt":0,"review_accept_cnt":4,"sign_finish_cnt":3,"sign_finish_amt":80000.000000,"loan_batch_success_cnt":3,"loan_batch_success_amt":80000.00,"i_time":1512144541000,"report_time":"2017-12-02"}],"errorMessage":""}}}');

        $params = [];

        foreach ($_POST as $key => $value) {
            array_push($params, $key."=".str_replace("\n","",$value));
        }

        $ch = curl_init();
        $url = $this->dsUrl . join("&", $params);
        $rm->setUrl($url);

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        curl_exec($ch);
        $r = curl_multi_getcontent($ch);
        if (curl_errno($ch)) {
            $rm->setMessage(curl_error($ch));
        } else {
            $rm->setMessage($r);
            curl_close($ch);
        }


        echo $rm->toJSON();
    }
    public function ownerinfo1Action(){

        $rm = $this->di->get("rm");

        $query_field = "";
        $where = [];
        $params = [];

        foreach ($_POST as $key => $value) {
            if($key == "query_field"){
                $query_field = $this->request->get("query_field");
            }else{
                array_push($where , $key."='".$value."''");
            }
        }


        array_push($params , "id=283");
        array_push($params , "distinct=distinct(".$query_field.")");

        if(count($where) > 0){
            $where = urlencode("where " . join(" and ",$where));
            array_push($params , "where=".$where);
        }else{
            array_push($params , "where=");
        }


        $ch = curl_init();
        $url = ($this->dsUrl . join("&", $params));
        $rm->setUrl($url);

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        curl_exec($ch);
        $r = curl_multi_getcontent($ch);
        if (curl_errno($ch)) {
            $rm->setMessage(curl_error($ch));
        } else {
            $rm->setMessage($r);
            curl_close($ch);
        }


        echo $rm->toJSON();
    }



}
