<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace DataFlows\Controllers;

use Phalcon\Mvc\Controller;
use DataFlows\utils\MySqlDB;

class PagesController extends Controller {
    
    public function indexAction() {
        $page = $this->dispatcher->getParam("page");
        $this->view->pick("pages/$page");
    }

}
