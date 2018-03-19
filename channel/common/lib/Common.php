<?php

namespace common\lib;

use Yii;
use yii\linslin\Curl;
use common\models\Accounting;
use common\models\Balance;
use common\models\Settlement;
class Common{
    
    /**
     * 检查是否可以结算申请
     * @param $accountId 魔页账户id
     * @param $amount 提现金额
     * @return array
     */
    public function checkIsSettlement($accountId, $amount = ''){
        //判断当前用户是否有未完成的申请
            $lastSettlementInfo = \common\models\Settlement::find()->where(['account_id' => $accountId])->orderby('id desc')->asArray()->one();
            if( $lastSettlementInfo['ask_status'] == \common\models\Settlement::ASK_STATUS_WAIT){
                //有等待审核申请，无法继续进行再一次申请
                $returnData['flag'] = false;
                $returnData['msg'] = '您有未处理完的结算申请，无法再次申请';
                return $returnData;
            }elseif( $lastSettlementInfo['ask_status'] == \common\models\Settlement::ASK_STATUS_PASS && $lastSettlementInfo['pay_status'] == \common\models\Settlement::ASK_STATUS_WAIT ){
                //有审核通过，等待打款的申请
                $returnData['flag'] = false;
                $returnData['msg'] = '您有未处理完的结算申请，无法再次申请';
                return $returnData;
            }
//           if( Yii::$app->params['lanye_account_id'] == $accountId ){
            //如果是蓝页账户提现不做限制
//            }else{
            $api = new \common\lib\Api;
            $userInfo = $api->getUserInfoById($accountId);
            //系统参数
            $sysParamInfo = \common\models\ParamsSet::find()->where(['id'=>1])->asArray()->one();
            if( $userInfo['approver_type'] == 2 ){
                //企业认证
                if($amount){
                    //结算金额是否满足最低金额
                    if( $amount < $sysParamInfo['company_min_price'] ){
                        $returnData['flag'] = false;
                        $returnData['msg'] = '最低提现金额'. $sysParamInfo['company_min_price'].'起';
                        return $returnData;
                    }
                }
                //每月提现上限验证
                $settlementObj = \common\models\Settlement::find();
                $where = [
                    'account_id' => $accountId,
                    'FROM_UNIXTIME(create_time,"%Y-%m")' => date("Y-m"),
                   'ask_status' => [\common\models\Settlement::ASK_STATUS_WAIT,\common\models\Settlement::ASK_STATUS_PASS]
                ];
                $monthCount = $settlementObj->where($where)->count();
                //debug($settlementObj->createCommand()->sql);
                if( $monthCount >= $sysParamInfo['company_month_num'] ){
                    $returnData['flag'] = false;
                    $returnData['msg'] = '每月最多提现'. $sysParamInfo['company_month_num'].'次';
                    return $returnData;
                }

            }elseif($userInfo['approver_type'] == 1){
                //个人认证
                if($amount){
                    //结算金额是否满足最低金额
                    if( $amount < $sysParamInfo['person_min_price'] ){
                        $returnData['flag'] = false;
                        $returnData['msg'] = '最低提现金额'. $sysParamInfo['person_min_price'].'起';
                        return $returnData;
                    }
                }
                //每月提现上限验证
                $settlementObj = \common\models\Settlement::find();
                $where = [
                    'account_id' => $accountId,
                    'FROM_UNIXTIME(create_time,"%Y-%m")' => date("Y-m"),
                   'ask_status' => [\common\models\Settlement::ASK_STATUS_WAIT,\common\models\Settlement::ASK_STATUS_PASS]
                ];
                $monthCount = $settlementObj->where($where)->count();
                //debug($settlementObj->createCommand()->sql);
                if( $monthCount >= $sysParamInfo['person_month_num'] ){
                    $returnData['flag'] = false;
                    $returnData['msg'] = '每月最多提现'. $sysParamInfo['person_month_num'].'次';
                    return $returnData;
                }
            }else{
                $returnData['flag'] = false;
                $returnData['msg'] = '必须实名认证';
                return $returnData;
            }
//            }
        $returnData['flag'] = true;
        $returnData['msg'] = '';
        return $returnData;
    }

    /**
     * 更新账户金额
     * @param $accountId
     */
    public static function updateBalance($accountId){
        if( empty($accountId) ){
            return false;
        }
        //统计账户余额(未包含申请结算中的钱)
        $where = [
            'and',
            ['account_id' => $accountId],
            ['status' => \common\models\Accounting::STATUS_ACTUAL],
            ['<=', 'account_date', strtotime(date("Y-m-d 23:59:59"))]
        ];
        $balanceAmount = \common\models\Accounting::find()->select('sum(amount)')->where($where)->asArray()->scalar();

        //统计待入账金额
        $where = [
            'and',
            ['account_id' => $accountId],
            ['status' => \common\models\Accounting::STATUS_ACTUAL],
            ['>', 'account_date', strtotime(date("Y-m-d 23:59:59"))]
        ];
        $freezeAmount = \common\models\Accounting::find()->select('sum(amount)')->where($where)->asArray()->scalar();
        //统计申请结算金额
        /*原有申请提现审核后添加流水明显
        $where = [
            'account_id' => $accountId,
            'status' => \common\models\Accounting::STATUS_RESERVE,
        ];
        //debug(\common\models\Accounting::find()->select('sum(amount)')->where($where)->createCommand()->getRawSql());
        $settlementAmount = \common\models\Accounting::find()->select('sum(amount)')->where($where)->asArray()->scalar();
        //计算可结算的余额  因为申请结算金额是负数 所以用+操作
        $balanceAmount = $balanceAmount + $settlementAmount;
        //账户金融信息
        $accountBalanceInfo = \common\models\Balance::find()->where(['account_id' => $accountId])->one();
        if( $accountBalanceInfo ){
            //更新账户余额信息
            $accountBalanceInfo->balance_amount = $balanceAmount ?:0;
            $accountBalanceInfo->freeze_amount = $freezeAmount?:0;
            $accountBalanceInfo->settlement_amount = $settlementAmount? ($settlementAmount * -1):0;
            $accountBalanceInfo->update_time = time();
            $accountBalanceInfo->save();
            return true;
        }else{
            $balanceModel = new \common\models\Balance();
            $balanceModel->account_id = $accountId;
            $balanceModel->balance_amount = $balanceAmount ?:0;
            $balanceModel->freeze_amount = $freezeAmount?:0;
            $balanceModel->settlement_amount = $settlementAmount? ($settlementAmount * -1):0;
            $balanceModel->create_time = time();
            //$balanceModel->update_time = time();
            $balanceModel->save();
            return true;
        }*/
        $where = [
            'account_id' => $accountId,
        ];
        $settlementInfo = Settlement::find()->where($where)->orderby('id desc')->asArray()->one();
        //如果存在判断申请是否处理完成，
        if( $settlementInfo ){
            if( $settlementInfo['ask_status'] == Settlement::ASK_STATUS_REJECT || ($settlementInfo['ask_status'] == Settlement::ASK_STATUS_PASS && $settlementInfo['pay_status'] == Settlement::PAY_STATUS_PASS) ){
                $settlementAmount = 0;
            }else{
                $settlementAmount = $settlementInfo['amount'];
            }
        }else{
            //不存在默认为0
            $settlementAmount = 0;
        }
        
        //账户金融信息
        $accountBalanceInfo = \common\models\Balance::find()->where(['account_id' => $accountId])->one();
        if( $accountBalanceInfo ){
            //更新账户余额信息
            $accountBalanceInfo->balance_amount = $balanceAmount ?:0;
            $accountBalanceInfo->freeze_amount = $freezeAmount?:0;
            $accountBalanceInfo->settlement_amount = $settlementAmount;
            $accountBalanceInfo->update_time = time();
            $accountBalanceInfo->save();
            return true;
        }else{
            $balanceModel = new \common\models\Balance();
            $balanceModel->account_id = $accountId;
            $balanceModel->balance_amount = $balanceAmount ?:0;
            $balanceModel->freeze_amount = $freezeAmount?:0;
            $balanceModel->settlement_amount = $settlementAmount;
            $balanceModel->create_time = time();
            //$balanceModel->update_time = time();
            $balanceModel->save();
            return true;
        }
        return false;
    }

    /**
     * 个人所得税计算
     * @param $isPersonFax
     * @param $money
     * @return array
     */
    public static function personalFax($isPersonFax,$money){
        $returnData['income_tax'] = 0;
        $returnData['pay_amount'] = 0;
        if( $isPersonFax == false ){
            //企业无需交税
            $returnData['pay_amount'] = $money;
        }else{
            //个人税
            //先算应纳税所得额
            $money = floatval($money); 
            $needFaxMoney = 0;
            if( $money <= 800 ){
                $needFaxMoney = 0;
            }elseif( $money > 800 && $money <= 4000 ){
                $needFaxMoney = $money - 800;
            }else{
               //四舍五入保留小数点后2位
                $needFaxMoney = round($money * 0.8, 2);
            }
            //计算税额
            if( $needFaxMoney == 0){
                //无需交税
                $returnData['pay_amount'] = $money;
            }else{
                //应纳税所得额 也分三档分别结算
                if( $needFaxMoney > 0 && $needFaxMoney <= 20000 ){
                    //应纳税所得额 0-2w
                    $faxMoney = $needFaxMoney * 0.2;
                }elseif( $needFaxMoney > 20000 && $needFaxMoney <= 50000){
                    //应纳税所得额 2w-5w
                    $faxMoney = $needFaxMoney * 0.3 - 2000;
                }else{
                    //应纳税所得额大于5w
                    $faxMoney = $needFaxMoney * 0.4 - 7000;
                }
                //四舍五入保留小数点后2位
                $faxMoney = round($faxMoney, 2);
                $returnData['income_tax'] = $faxMoney;
                $returnData['pay_amount'] = $money - $faxMoney;
            }

        }
        return $returnData;
    }
}