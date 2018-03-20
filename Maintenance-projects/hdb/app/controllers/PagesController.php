<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Hdb\Controllers;

use Phalcon\Mvc\Controller;
use Hdb\Utils\MySqlDB;

class PagesController extends Controller {
    
    public function indexAction() {
        $page = $this->dispatcher->getParam("page");

        if($page == "map"){
            try {

                $user = $this->cookies->get('pu')->getValue();
                $user = str_replace("\0", "", $user);
                $time = date("Y-m-d H:i:s",time());
                $ip = $this->request->getServer("HTTP_X_FORWARDED_FOR");

                $conn = MySqlDB::getConnection();
                $values = array(
                    $user,
                    $time,
                    $ip
                );
                $colums = array("user_name", "access_time", "ip");

                $conn->insert("access_log", $values, $colums);

            } catch (\Exception $e) {

            }
        }

        $this->view->pick("pages/$page");
    }

}
