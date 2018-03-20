<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Bmd\Controllers;

use Phalcon\Mvc\Controller;
use Bmd\Utils\MySqlDB;

class ToolbarController extends Controller {

    public function menuAction(){
        try{
            $conn = MySqlDB::getConnection();
            $sql = "select * from business";
            $result = $conn->fetchAll($sql);

            $this->view->setVar("business" , $result);
        }catch (Exception $e){
            echo $e->getMessage();
        }
    }

    public function getmenuAction(){

        $business_id = $this->request->get("business_id");

        $conn = MySqlDB::getConnection();
        $sql = "select distinct menu.*,m.text as pre_text from menu left outer join menu as m on menu.pre_id=m.id where menu.business_id=? order by menu.level asc, orderby asc";
        $result = $conn->fetchAll($sql, \Phalcon\Db::FETCH_ASSOC, [$business_id]);

        echo json_encode($result);

    }

    public function submitMenuAction(){


        $rm = $this->di->get("rm");
        $conn = null;
        try {
            $business_id = $this->request->get("business_id");
            $menu_html = $this->request->get("menu_html");

            $conn = MySqlDB::getConnection();
            $values = array(
                $menu_html
            );
            $colums = array("menu_html");

            $res = $conn->update("business", $colums, $values, "id=".$business_id);

            $rm->setMessage("successful");
        } catch (Exception $e) {
            $rm->setCode(-1);
            $rm->setMessage($e->getLine() . "," . $e->getMessage());
        }
        $conn = null;
        echo $rm->toJson();

    }

    public function setCacheAction(){

        try{
            $conn = MySqlDB::getConnection();
            $sql = "select * from protect_acl";
            $result = $conn->fetchAll($sql);

            $caches = [];
            for($i=0;$i<count($result);$i++){
                $protect_source_name = $result[$i]["protect_source_name"];
                if(!isset($caches[$protect_source_name])){
                    $caches[$protect_source_name] = [];
                }
                array_push($caches[$protect_source_name], $result[$i]["accessable_username"]);
            }

            $cache = $this->getDI()->get("fileCache");
            foreach ($caches as $key => $value ){
                //print_r($caches[$key]);
                $cache->save($key, $caches[$key]);
            }

            echo "cached protect acl.......";
        }catch (Exception $e){
            echo $e->getMessage();
        }

    }

//    public function setCacheAction(){
//
//        $cacheKey = "protect";
//        $arr = [111,222,333, "aaa"];
//        $cache->save($cacheKey, $arr);
//    }

    public function getCacheAction(){
        $cache = $this->getDI()->get("fileCache");
        $cacheKey = "protect";
        print_r ($cache->get($cacheKey));
    }

}
