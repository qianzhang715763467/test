<?php

namespace api\modules\v1\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\filters\auth\QueryParamAuth;
use common\models\Balance;
use yii\base\DynamicModel;
use common\models\Agent;
/**
 * 这里注意是继承 yii\rest\ActiveController 因为源码中已经帮我们实现了index/update等方法
 * 以及其访问规则verbs()等，
 * 其他可参考：http://www.yiichina.com/doc/guide/2.0/rest-controllers
 *
 * 权限采用最简单的QueryParamAuth方式
 * 用户角色权限比较复杂，这里没有做
 *
 * @package api\modules\v1\controllers
 */
class UserController extends ActiveController
{
    public $modelClass = 'common\models\User';

    public function actionBalance(){
        //$requestData['account_id'] = '190';
        $phpData = file_get_contents('php://input');
        $requestData = json_decode($phpData, 1);
        if( $requestData ){
            $model = new DynamicModel( $requestData );
            $model->addRule(['account_id'], 'required')
            ->addRule('account_id', 'integer')
            ->validate();
            if ($model->hasErrors()) {
                // 验证失败
                $errorInfo = $model->firstErrors;
                $errorInfo = array_values($errorInfo);
                $this->_responseData([],$errorInfo[0],501);
            } else {
                //更新汇总balance
                \common\lib\Common::updateBalance($requestData['account_id']);
                $balanceInfo = Balance::find()->where(['account_id' => $requestData['account_id'] ])->asArray()->one();
                if( $balanceInfo ){
                    $tmp['balance_amount'] = $balanceInfo['balance_amount'];
                    $tmp['freeze_amount'] = $balanceInfo['freeze_amount'];
                    $tmp['settlement_amount'] = $balanceInfo['settlement_amount'];
                    $this->_responseData($tmp, '', 200);
                }else{
                    //不存在
                    $this->_responseData([], '未找到账户钱包', 500);
                }
            }
        }else{
            $this->_responseData([],'缺少参数',500);
        }
    }


    public function actionRelate(){
        $phpData = file_get_contents('php://input');
        $requestData = json_decode($phpData, 1);
        if( $requestData )
        {
            /**
             * 若为空则表示没有推荐码,
             * 返回：上级为190蓝页
             *
             */
            if( empty($requestData['referral_account_id']) ){
                $data = [
                    'c1_account_id'=>'',
                    'up_account_id'=>Yii::$app->params['lanye_account_id']
                ];
                $this->_responseData($data, '操作成功', 200);
            }

            /**
             *
             * 若推荐码不为空，但是上级组织为空（若推荐人上级组织不为空，则这个值提交过来绝对不能为空）
             * 返回：上级组织为190蓝页
             *
             */
            if( empty($requestData['referral_up_account_id']) ){

                $data = [
                    'c1_account_id'=>$requestData['referral_account_id'],
                    'up_account_id'=>Yii::$app->params['lanye_account_id']
                ];
                $this->_responseData($data, '操作成功', 200);
            }

            $count = Agent::find()->where(['account_id'=>$requestData['referral_account_id']])->count();
            if( $count>0 ){
                 $data = [
                     'c1_account_id'=>$requestData['referral_account_id'],
                     'up_account_id'=>$requestData['referral_account_id']
                 ];
                 $this->_responseData($data, '操作成功', 200);
            }else{
                  $data = [
                      'c1_account_id'=>$requestData['referral_account_id'],
                      'up_account_id'=>$requestData['referral_up_account_id']
                  ];
                  $this->_responseData($data, '操作成功', 200);

            }

        }else{

             $this->_responseData([], '非法操作', 500);
        }

    }

}
