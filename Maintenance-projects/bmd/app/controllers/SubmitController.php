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

class SubmitController extends Controller {


    public function bmdAction(){
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $conn = MySqlDB::getConnection();

            $values = [];
            $fields = [];

            foreach ($_POST as $key => $value) {
                array_push($values, $value);
                array_push($fields, $key);
            }

            $submitter = trim($this->cookies->get('c1')->getValue());
            array_push($values, $submitter);
            array_push($fields, "submitter");

            array_push($values, "待审核");
            array_push($fields, "status");

            $role = trim($this->cookies->get('c2')->getValue());
            if($role == "servicer"){
                array_push($values, "客服");
            } else if($role == "saler"){
                array_push($values, "销售");
            }else if($role == "leader"){
                array_push($values, "管理员");
            }
            array_push($fields, "role");

            if($role == "servicer"){
                array_push($values, "李敏超");
                array_push($fields, "assign_to");
            }

            $res = $conn->insert("bmd_submit_history", $values, $fields);
            $rm->setMessage("添加成功");
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }

    public function editbmdAction(){
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $conn = MySqlDB::getConnection();

            $id = $this->request->get("id");

            $values = [];
            $fields = [];

            foreach ($_POST as $key => $value) {
                array_push($values, $value);
                array_push($fields, $key);
            }

            $submitter = trim($this->cookies->get('c1')->getValue());
            array_push($values, $submitter);
            array_push($fields, "submitter");

            $res = $conn->update("bmd_submit_history", $fields, $values, "id=".$id);
            if($res){
                $rm->setMessage("修改成功");
            }else{
                $rm->setCode(0);
                $rm->setMessage("修改失败");
            }
        } catch (\Exception $e) {
            $rm->setCode(0);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }

    public function editStatusAction(){
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $conn = MySqlDB::getConnection();

            $id = $this->request->get("id");
            $nv = $this->request->get("nv");
            $desc = $this->request->get("desc");

            $sql = "select role,assign_to,status from bmd_submit_history where id=?";
            $res = $conn->fetchOne($sql, Db::FETCH_ASSOC, [$id]);

            if($res["role"] == "客服" && !isset($res["assign_to"])){
                throw new Exception("先分配给销售人员完善资料");
            }

            if($res["status"] == "审核通过"){
                throw new Exception("已经审核通过，不能再次修改");
            }

            $date = date("Y-m-d H:i:s");

            $res = $conn->update("bmd_submit_history", ["status","check_desc","check_date"], [$nv, $desc, $date], "id=".$id);
            if($res){
                $rm->setMessage("修改成功");
            }else{
                $rm->setCode(0);
                $rm->setMessage("修改失败");
            }
        } catch (\Exception $e) {
            $rm->setCode(0);
            $rm->setMessage($e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }

    public function editAssignToAction(){
        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $conn = MySqlDB::getConnection();

            $id = $this->request->get("id");
            $assgin_to = $this->request->get("assgin_to");

            $sql = "select status from bmd_submit_history where id=?";
            $res = $conn->fetchOne($sql, Db::FETCH_ASSOC, [$id]);

            if($res["status"] == "审核通过" || $res["status"] === "审核拒绝"){
                throw new Exception("已经审核通过不能修改");
            }

            $res = $conn->update("bmd_submit_history", ["assign_to"], [$assgin_to], "id=".$id);
            if($res){
                $rm->setMessage("修改成功");
            }else{
                $rm->setCode(0);
                $rm->setMessage("修改失败");
            }
        } catch (\Exception $e) {
            $rm->setCode(0);
            $rm->setMessage($e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();
    }

    public function updatePassAction(){

        $rm = $this->di->get("rm");
        $name = trim($this->cookies->get('c1')->getValue());

        $old_pass  = $this->request->get("old_pass");
        $new_pass1 = $this->request->get("new_pass1");
        $new_pass2 = $this->request->get("new_pass2");

        $conn = null;
//        $old_pass = "tes";
        try{

            if($new_pass1 != $new_pass2){
                throw new Exception("新密码两次输入不一致");
            }

            if($new_pass1 == $old_pass){
                throw new Exception("新旧密码不能相同");
            }

            if(strlen($new_pass1) > 15){
                throw new Exception("新密码长度不能大于15位");
            }

            if(strlen($new_pass1) < 6){
                throw new Exception("新密码长度不能小于6位");
            }

            $rchar = '/[A-Za-z]/';
            $rnumb = '/[0-9]/';

            if(preg_match_all($rchar,$new_pass1, $arr)<1) {
                throw new Exception("新密码必须包含至少一个字母");
            }
            if(preg_match_all($rnumb,$new_pass1, $arr)<1) {
                throw new Exception("新密码必须包含至少一个数字");
            }

            $conn1 = MySqlDB::getConnection();

            $sql  = "select * from users_pass_history where name=? and pass=?";
            $res  = $conn1->fetchOne($sql, Db::FETCH_ASSOC, [$name, $new_pass1]);
            if($res){
                throw new Exception("该密码曾经使用过");
            }


            $sql  = "select * from users where name=? and pass=?";
            $res  = $conn1->fetchOne($sql, Db::FETCH_ASSOC, [$name, $old_pass]);
            if(!$res){
                throw new Exception("原密码不正确");
            }

            $id = $res["id"];


            $conn = null;
            $conn = MySqlDB::getConnection();
            $conn->begin();
            $res  = $conn->update("users", ["pass"], [$new_pass1], "id=".$id);
            $res1 = $conn->insert("users_pass_history", [$name, $old_pass], ["name", "pass"]);
            $conn->commit();

            if($res){
                $rm->setMessage("修改密码成功");
            }else{
                throw new Exception("修改密码失败");
            }

            $sql  = "select * from users where name=? and pass=?";
            $res  = $conn->fetchOne($sql, Db::FETCH_ASSOC, [$name, $new_pass1]);
            $update_time = $res["last_update_pass_time"];

            $expire = time() + 3600 * 24 * 90;//90day
            $this->cookies->set('c5', $update_time, $expire);
            $this->getDI()->get("session")->remove("passExpire");

        }catch (Exception $e){
            if($conn)
                $conn->rollback();
            $rm->setCode(0);
            $rm->setMessage($e->getMessage());
        }finally{
            echo $rm->toJson();
        }
    }

}
