<?php

namespace api\modules\v1\controllers;

use yii\rest\ActiveController;
use common\models\Admin;
use api\models\search\AccountingSearch;
use yii\base\DynamicModel;
/**
 * @package api\modules\v1\controllers
 */
class WalletController extends ActiveController
{
    public $modelClass = 'common\models\Admin';
   
    /**
     * 收支明细
     **/
    public function actionAccounting(){
        // $requestData['account_id'] = '190';
        // $requestData['start_time'] = '';
        // $requestData['end_time'] = '';
        // $requestData['page'] = '1';
        $phpData = file_get_contents('php://input');
        $requestData = json_decode($phpData, 1);
        if( $requestData ){
            $model = new DynamicModel( $requestData );
            $model->addRule(['account_id','page'], 'required')
            ->addRule('account_id', 'integer')
            ->addRule('page', 'integer')
            ->validate();
            if ($model->hasErrors()) {
                // 验证失败
                $errorInfo = $model->firstErrors;
                $errorInfo = array_values($errorInfo);
                $this->_responseData([],$errorInfo[0],501);
            } else {
                //yii page第一页默认为0,所以要减1
                $requestData['page'] = $requestData['page'] - 1;
                //更新资金
                \common\lib\Common::updateBalance($requestData['account_id']);
                $searchModel = new AccountingSearch();
                $dataProvider = $searchModel->incomeAndOutcome($requestData);
                $dataList = dataProvidertoArray( $dataProvider->getModels() );
                if( $dataList ){
                    //整理返回数据
                    $tmpList = [];
                    foreach($dataList as $v){
                        $docTypeMap = AccountingSearch::getDocTypeMap();
                        $tmp['doc_type'] = $v['doc_type'];
                        $tmp['doc_type_map'] = $docTypeMap[$v['doc_type']];
                        $tmp['date'] = date("Y-m-d", $v['account_date']);
                        $tmp['amount'] = $v['amount'];
                        array_push($tmpList, $tmp);
                    }
                }
                $returnData['list'] = $tmpList;
                $returnData['totalPage'] = $dataProvider->getTotalCount();
                $this->_responseData($returnData,'',200);
            }
        }else{
            $this->_responseData([],'缺少参数',500);
        }
    }

    /**
     * 待入账明细
     **/
    public function actionWait(){
        // $requestData['account_id'] = '190';
        // $requestData['start_time'] = '';
        // $requestData['end_time'] = '';
        // $requestData['page'] = '1';
        $phpData = file_get_contents('php://input');
        $requestData = json_decode($phpData, 1);
        if( $requestData ){
            $model = new DynamicModel( $requestData );
            $model->addRule(['account_id','page'], 'required')
            ->addRule('account_id', 'integer')
            ->addRule('page', 'integer')
            ->validate();
            if ($model->hasErrors()) {
                // 验证失败
                $errorInfo = $model->firstErrors;
                $errorInfo = array_values($errorInfo);
                $this->_responseData([],$errorInfo[0],501);
            } else {
                //yii page第一页默认为0,所以要减1
                $requestData['page'] = $requestData['page'] - 1;
                $searchModel = new AccountingSearch();
                $dataProvider = $searchModel->search($requestData);
                $dataList = dataProvidertoArray( $dataProvider->getModels() );
                if( $dataList ){
                    //整理返回数据
                    $tmpList = [];
                    foreach($dataList as $v){
                        $docTypeMap = AccountingSearch::getDocTypeMap();
                        $tmp['order_no'] = $v['doc_no'];
                        //$tmp['doc_type'] = $v['doc_type'];
                        //$tmp['doc_type_map'] = $docTypeMap[$v['doc_type']];
                        $tmp['date'] = date("Y-m-d", $v['account_date']);
                        $tmp['amount'] = $v['amount'];
                        array_push($tmpList, $tmp);
                    }
                }
                $returnData['list'] = $tmpList;
                $returnData['totalPage'] = $dataProvider->getTotalCount();
                $this->_responseData($returnData,'',200);
            }
        }else{
            $this->_responseData([],'缺少参数',500);
        }
    }
}
