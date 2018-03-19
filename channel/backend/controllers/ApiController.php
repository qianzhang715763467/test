<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/22
 * Time: 15:01
 *
 * 渠道申请
 */
namespace backend\controllers;
use yii;
use yii\web\Controller;
use yii\linslin\Curl;

class ApiController extends Controller  {

	public $enableCsrfValidation = false;
	/**
	 * 账户关键字模糊匹配
	 * @return [type] [description]
	 */
    public function actionSearchwords(){
    	$keywords = Yii::$app->request->post('keywords');
    	if(  !empty($keywords) ){
			$url = Yii::$app->params['magic_api_domain'] . 'user/searchwords/';
			$curl = new Curl;
			$params = [
    			'keywords' => $keywords,
			];
			$response = $curl->setRequestBody(json_encode($params))
			     ->setHeaders([
			        'Content-Type' => 'application/json',
			        'Content-Length' => strlen(json_encode($params))
			     ])
			     ->post($url);
			echo $response;die;
		}else{
			$response['code'] = 200;
			$response['data'] = [];
			echo json_encode($response);die;
		}
    }

}