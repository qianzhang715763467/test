<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Bmd\Controllers;

use Phalcon\Mvc\Controller;
use Bmd\Utils\MySqlDB;

class GetpageController extends Controller {
    
    public function indexAction() {

        $reportName = $this->dispatcher->getParam("report");

        $conn = MySqlDB::getConnection();
        //$sql = "select * from report where report_name=?";
        $sql = "select r.*,b.menu_html as menu_html from report as r join business as b where r.report_name=? and r.business_id=b.id";

        $report_meta = $conn->fetchOne($sql, \Phalcon\Db::FETCH_ASSOC, [$reportName]);

        $report_id = $report_meta["id"];

        $sql = "select * from report_field where report_id=?";
        $report_field = $conn->fetchAll($sql, \Phalcon\Db::FETCH_ASSOC, [$report_id]);

        $this->view->setVar("report_id", $report_id);
        $this->view->setVar("report_name", $report_meta["report_name"]);
        $this->view->setVar("report_title", $report_meta["report_title"]);
        $this->view->setVar("report_field", $report_field);
        $this->view->setVar("ds_id", $report_meta["ds_id"]);
        $this->view->setVar("hour_limit", $report_meta["hour_limit"]);
        $this->view->setVar("auto_update", $report_meta["auto_update"]);

        $this->view->setVar("menu_html", $report_meta["menu_html"]);

        //$this->view->disable();
    }

}
