<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Bmd\Controllers;

use Phalcon\Mvc\Controller;
use Bmd\Utils\MySqlDB;

class CacheController extends Controller {

    /**
     *
     */
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
//
    public function getCacheAction(){
        $cache = $this->getDI()->get("fileCache");
        $cacheKey = "verify";
//        if($cache->get($cacheKey)){
//            echo 111;
//        }else{
//            echo 222;
//        }
        //print_r($cache->get($cacheKey));

        $domIfShows = [
            "verify" => $cache->get("verify") ? $cache->get("verify"):[],
        ];
        $str = "";
        $user = trim($this->getDI()->get("cookies")->get('c1')->getValue());
        foreach($domIfShows as $key => $value){
            if (in_array($user, $domIfShows[$key])){
                $str = $key . " " . $str;
            }
        }
        //echo $str;
    }

}
