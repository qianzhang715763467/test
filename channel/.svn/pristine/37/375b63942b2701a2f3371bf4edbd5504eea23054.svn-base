<?php

namespace common\lib;

use Yii;
use yii\linslin\Curl;
class Api{
    public static $data = [];
    /**
     * 获取c-1用户名
     */
    public function getUserInfoById($accountId){
       $curl =  new Curl;
       $apiUrl = Yii::$app->params['magic_api_domain'] . 'user/c1username';
       $postData['account_id'] = $accountId;
       $response = $curl->setRequestBody(json_encode($postData))
            ->setHeaders([
            'Content-Type' => 'application/json',
            'Content-Length' => strlen(json_encode($postData))
            ])->post($apiUrl);
       $responseData = json_decode($response,1);
       if( $responseData['code'] == 200){
            return $responseData['data'];
       }else{
            return [];
       }
    }
    //根据订单号查询订单信息
    public function getBuyInfoByOrder($order){
        if( !empty(self::$data[$order]) ){
            return self::$data[$order];
        }
        $curl =  new Curl;
        $apiUrl = Yii::$app->params['magic_api_domain'] . 'order/income';
        $postData['order_no'] = $order;
        $response = $curl->setRequestBody(json_encode($postData))
            ->setHeaders([
                'Content-Type' => 'application/json',
                'Content-Length' => strlen(json_encode($postData))
            ])->post($apiUrl);
        $responseData = json_decode($response,1);
        if( $responseData['code'] == 200){
            self::$data[$order] = $responseData['data'];
            return $responseData['data'];
        }else{
            return [];
        }
    }


    /**
     *
     * 根据订单号获取用户账号信息
     *
     */

    public function getAccountInfoByOrder($order){
        if( !empty(self::$data[$order]) ){
            return self::$data[$order];
        }
        $url = Yii::$app->params['magic_api_domain'] . 'order/profit';
        $curl = new curl;
        $params = [
            'account_id' => Yii::$app->user->identity->account_id,
            'order_no'=>$order,
        ];
        $response = $curl->setRequestBody(json_encode($params))
            ->setHeaders([
                'Content-Type' => 'application/json',
                'Content-Length' => strlen(json_encode($params))
            ])
            ->post($url);
        $responseData=json_decode($response,1);
        if( $responseData['code'] == 200){
            self::$data[$order] = $responseData['data'][0];
            return $responseData['data'][0];
        }else{
            return [];
        }
    }
}
