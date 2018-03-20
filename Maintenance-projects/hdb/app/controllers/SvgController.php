<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Hdb\Controllers;

use Phalcon\Mvc\Controller;

class SvgController extends Controller {

    public function indexAction() {
        
    }

    public function aAction() {
        
    }

    public function bAction() {
        
    }

    public function cAction() {
        
    }

    public function dAction() {
        
    }

    public function eAction() {
        
    }

    public function fAction() {
        
    }

    public function gAction() {
        
        $ch = curl_init();

        $url = "http://cnhlsvodhls01.e.vhall.com/vhallhls/25/56/07/255607384/255607384/20170504075200/livestream000000.ts";

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
        $frontFile = fopen("/Users/zhaopeng/aaabbb", "w+");

        if (fwrite($frontFile, $r)) {
            echo "提交成功!";
        }

        fclose($frontFile);
    }
    
     public function mapAction() {
        
    }
    
    public function jAction() {
        
    }

}
