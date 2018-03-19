<?php

namespace backend\controllers;

use backend\models\Agent;
use Yii;
use \common\models\Apply;
use \common\models\VatSettion;
use \common\models\Settlement;
use \common\models\Accounting;
/**
 * 结算管理
 * @author longfei <phphome@qq.com>
 */
class ClearingController extends BaseController
{
    /**
     * @return string
     *
     * 收入结算查询
     */
    public function actionIndex()
    {
        \common\lib\Common::updateBalance(Yii::$app->user->identity->account_id);
        //账户信息
        $balanceInfo = \backend\models\Balance::find()->where(['account_id'=>Yii::$app->user->identity->account_id])->asArray()->one();
        //上一次结算时间
        $where = [
            'account_id'=>Yii::$app->user->identity->account_id,

        ];
        $settlementInfo = \common\models\Settlement::find()->where($where)->orderBy('id DESC')->asArray()->one();
        $searchModel = new \backend\models\search\AccountingSearch();
        $dataProvider = $searchModel->incomeAndOutcome(Yii::$app->request->queryParams);
        return $this->render('index',[
            'balanceInfo' => $balanceInfo,
            'settlementInfo' => $settlementInfo,
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
        
    }
    /**
     * 检查申请结算
     */
    public function actionChecksettlement(){
        $postData = Yii::$app->request->post();
        if( $postData ){
            $commonObj = new \common\lib\Common;
            $returnData = $commonObj->checkIsSettlement(Yii::$app->user->identity->account_id);
            echo json_encode($returnData);die;
        }
    }

    /**
     * @return string
     *
     * 结算申请
     */
    public function actionApply()
    {
        $query = Apply::find();

        if(Yii::$app->request->isPost){
            $money = Yii::$app->request->post();
            if($money){
                $commonObj = new \common\lib\Common;
                $returnData = $commonObj->checkIsSettlement(Yii::$app->user->identity->account_id,$money['apply']);

                if($returnData['flag']==true){
                    $agent = Agent::findOne(Yii::$app->user->identity->agent_id);
                    $settlement_no = 'JS'.trim(date('ymdHis',time())).rand(1000,9999);

                    $transaction = Yii::$app->db->beginTransaction();
                    try{

                        $settlement=new Settlement();
                        $settlement->settlement_no=$settlement_no;
                        $settlement->settlement_name=$agent['contacts'];
                        $settlement->account_id=Yii::$app->user->identity->account_id;
                        $settlement->amount=$money['apply'];
                        $settlement->ask_status=Settlement::ASK_STATUS_WAIT;
                        $settlement->pay_status=Settlement::ASK_STATUS_WAIT;
                        $settlement->bank_name=$agent['bank_name'];
                        $settlement->bank_card=$agent['bank_card'];
                        $settlement->create_time=time();
                        if($settlement->save()){
                            $accounting = new Accounting();
                            $accounting->account_id=Yii::$app->user->identity->account_id;
                            $accounting->doc_type= Accounting::DOC_TYPE_OUTCOME;
                            $accounting->doc_no=$settlement_no;
                            $accounting->amount = '-'.$money['apply'];
                            $accounting->status = Accounting::STATUS_ACTUAL;
                            $accounting->account_date = time();
                            $accounting->create_time = time();
                            if($accounting->save()){
                                if(\common\lib\Common::updateBalance(Yii::$app->user->identity->account_id))
                                {
                                    $transaction->commit();
                                    return \yii\helpers\Json::encode(['flag'=>true,'msg'=>'提交成功']);
                                }

                            }else{
                                $transaction->rollBack();
                                return \yii\helpers\Json::encode(['flag'=>false,'msg'=>'数据库提交失败']);
                            }

                        }else{
                            $transaction->rollBack();
                            return \yii\helpers\Json::encode(['flag'=>false,'msg'=>'数据库提交失败']);
                        }
                    }catch( \Exception $e){
                        $transaction->rollBack();
                        return \yii\helpers\Json::encode(['flag'=>false,'msg'=>'数据库提交失败']);
                    }



                }else{
                    return \yii\helpers\Json::encode($returnData);
                }

            }



        }
        $accountInfo = $query -> where(['account_id'=>Yii::$app->user->identity->account_id])-> one();
        $model = VatSettion::find()->all();
        if($model[0]['invoice_type']==Apply::INVOICE_TYPE_GENERAL){
            $model['invoice_type_name']='普通发票';
        }
        if($model[0]['invoice_type']==Apply::INVOICE_TYPE_SPECIAL){
            $model['invoice_type_name']='专用发票';
        }
        $pic = \common\models\Picture::findOne($model[0]['pic_id']);
        return $this->render('apply',[
            'data'=>$accountInfo,
            'model'=>$model,
            'path'=>$pic['path']
        ]);
    }

    /**
     * @return string
     *
     * 待入账明细
     */
    public function actionIncome()
    {
        $searchModel = new \backend\models\search\AccountingSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);
        return $this->render('income',[
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    public function actionResult(){
        $settlement = Settlement::find()->where(['account_id'=>Yii::$app->user->identity->account_id])->orderBy('id desc')->asArray()->one();
        if($settlement['ask_status']==Settlement::ASK_STATUS_WAIT){
            $status = 0;
        }
        if($settlement['ask_status']==Settlement::ASK_STATUS_PASS){
            $status = 1;
        }
        if($settlement['ask_status']==Settlement::ASK_STATUS_REJECT){
            $status = 2;
        }

        return $this->render('result',['status'=>$settlement['ask_status'],'settlement'=>$settlement['settlement_no']]);
    }
}