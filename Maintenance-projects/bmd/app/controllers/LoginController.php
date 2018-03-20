<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Bmd\Controllers;

use Phalcon\Mvc\Controller,
    Phalcon\Db;
use Bmd\Utils\MySqlDB;

class LoginController extends Controller {

    private $maxPassErrorCount = 5;

    public function indexAction() {
        $passErrorCount = trim($this->cookies->get('c4')->getValue());
        if (strlen($passErrorCount) === 0) {
            $date = date("Ymd");
            $this->cookies->set('c4', $date . '_1', time() + 3600 * 24);
        }
    }

    public function getip() {
        $unknown = 'unknown';
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] && strcasecmp($_SERVER['HTTP_X_FORWARDED_FOR'], $unknown)) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] &&
            strcasecmp($_SERVER['REMOTE_ADDR'], $unknown)) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        /*
          处理多层代理的情况
          或者使用正则方式：$ip = preg_match("/[d.]
          {7,15}/", $ip, $matches) ? $matches[0] : $unknown;
         */
        if (false !== strpos($ip, ','))
            $ip = reset(explode(',', $ip));
        return $ip;
    }

    public function doLoginAction() {

        $res = array();
        $conn = null;
        try {
            $ip = $this->getip();
            $date = date("Ymd");
            $name = $this->request->get('username');
            $pass = $this->request->get('password');

            $passErrorArr = preg_split("/_/", trim($this->cookies->get('c4')->getValue()));

            if (count($passErrorArr) != 2) {
                $res['c'] = -4;
                $res['t'] = '页面过时, 请重新登录.';
                $date = date("Ymd");
                $this->cookies->set('c4', $date . '_1', time() + 3600 * 24);
                return;
            }

            $conn = MySqlDB::getConnection();
            $sql = "select * from user_lock where lock_date=? and lock_status=0 and user_ip=?";
            $result = $conn->fetchAll($sql, Db::FETCH_ASSOC, [$date, $ip]);
            if(count($result) > 2){
                $res['c'] = -5;
                $res['t'] = '该ip已被锁定, 请联系管理员.';
                return;
            }

            $passErrorDate = $passErrorArr[0];
            $passErrorCount = $passErrorArr[1];

            if (strtotime(date('Ymd', strtotime($passErrorDate))) != strtotime($passErrorDate)) {
                //cookie 格式不对,日期格式不正确
                $res['c'] = -3;
                $res['t'] = '请联系管理员';
                return;
            } else if (strlen($passErrorCount) == 0 || !is_numeric($passErrorCount)) {
                //cookie 格式不对,密码错误次数不是整数
                $res['c'] = -3;
                $res['t'] = '请联系管理员';
                return;
            } else if (strtotime($date) != strtotime($passErrorDate)) {
                $passErrorCount = 0;
            } else if ($passErrorCount > $this->maxPassErrorCount) {
                //$conn = MySqlDB::getConnection();
                $sql = "select * from user_lock where user_name=? and lock_date=? and lock_status=0";
                $result = $conn->fetchAll($sql, Db::FETCH_ASSOC, [$name, $passErrorDate]);
                if (count($result)  === 0) {
                    $passErrorCount = 0;
                    $this->cookies->set('c4', $date . '_' . $passErrorCount, time() + 3600 * 24);
                } else {
                    $res['c'] = -3;
                    $res['t'] = '当日密码错误次数超过限制, 请联系管理员.';
                    return;
                }
                //$conn = null;
            }

            $slide = trim($this->cookies->get('s')->getValue());
            if ($slide != 'ok') {
                $res['c'] = -2;
                $res['t'] = '先滑动';
                return;
            }

            $this->cookies->set('s', '', -1);

            $sql = "select u1.name, u2.role, u2.rank from users as u1 join users_rank as u2 where u1.name=? and u1.pass=? and u1.rid=u2.id";

            $result = $conn->fetchAll($sql, Db::FETCH_ASSOC, [$name, $pass]);

            if (count($result) != 1) {
                $res['c'] = -1;
                if (($this->maxPassErrorCount - $passErrorCount) == 0) {
                    $res['t'] = '当日密码错误次数超过限制, 请联系管理员.';
                    $values = array($name, $pass, $ip, 0, $passErrorDate);
                    $colums = array('user_name', 'user_pass', 'user_ip', 'lock_status', 'lock_date');
                    $conn->insert("user_lock", $values, $colums, $passErrorDate);
                } else
                    $res['t'] = '密码错误, 还有' . ($this->maxPassErrorCount - $passErrorCount) . " 次机会.";
                $date = date("Ymd");

                $passErrorCount++;
                $this->cookies->set('c4', $date . '_' . $passErrorCount, time() + 3600 * 24);
            } else {
                $r = $result[0];
                $expire = time() + 3600 * 24 * 7;//a week
                $this->cookies->set('c1', $name, $expire);//用户名username
                $this->cookies->set('c2', $r['role'], $expire);//角色名role
                $this->cookies->set('c3', $r['rank'], $expire);//级别rank
                $this->cookies->set('c4', $date . '_1', time() + 3600 * 24);//密码错误次数
                //$this->response->redirect("/admin");
                $res['c'] = 0;
                $res['t'] = '/';
                if($pass == "111"){
                    $this->cookies->delete("c5");
                }
            }

        } catch (Exception $e) {
            $res['c'] = -6;
            $res['t'] = 'error';
        } finally {
            $conn = null;
            echo json_encode($res);
        }
    }

    public function slideAction() {
        $this->cookies->set('s', 'ok');
        echo 111;
    }

    public function aAction() {
        $aa = 0;
        $conn = null;
        try{
            $name = trim($this->cookies->get("c1"));
            $r = trim($this->cookies->get("c2"));
            echo $r;

        }catch (Exception $e){
            $aa = 5;
        }finally{
            $conn = null;

            $pass_expire = $this->getDI()->get("session")->get("passExpire");
            echo $pass_expire;
            echo 22;
        }
    }

    public function logoutAction(){
        $this->cookies->set('c1', 'null', -1);
        $this->cookies->set('c2', 'null', -1);
        $this->cookies->set('c3', 'null', -1);
        echo 0;
    }



}
