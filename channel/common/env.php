<?php

/**
 * ============================================================
 * 全局公共函数
 * ============================================================
 */
if (! function_exists('env')) {
    /**
     * Gets the value of an environment variable. Supports boolean, empty and null.
     *
     * @param  string  $key
     * @param  mixed   $default
     * @return mixed
     */
    function env($key, $default = null)
    {
        $value = getenv($key);

        if ($value === false) {
            return $default;
        }

        switch (strtolower($value)) {
            case 'true':
            case '(true)':
                return true;
            case 'false':
            case '(false)':
                return false;
            case 'empty':
            case '(empty)':
                return '';
            case 'null':
            case '(null)':
                return;
        }

        return $value;
    }
}


/**
 * ---------------------------------------
 * 简单的输出调试函数
 * ---------------------------------------
 */
function dump($var, $depth = 10, $highlight = false){
    \yii\helpers\VarDumper::dump($var, $depth, $highlight);
}


/**
 * ============================================================
 * 常量或环境配置
 * ============================================================
 */

/**
 * 从根目录的 .env 文件中 加载应用环境变量
 * Load application environment from .env file
 */
if (is_file(dirname(__DIR__) . '/.env')) {
    (new \Dotenv\Dotenv(dirname(__DIR__)))->load();
}

/**
 * 初始化全局常量
 * Init application constants
 */
defined('YII_DEBUG') or define('YII_DEBUG', env('YII_DEBUG', 'true'));
defined('YII_ENV')   or define('YII_ENV', env('YII_ENV', 'dev'));


function debug($data,$exit = 1){
    echo "<pre>";
    print_r($data);
    if( $exit ){
        die;
    }
}

function writeLog( $data ){
    //$logPathFile = Yii::getAlias('@app') . '/runtime/logs/apilog'.date('Y-m-d').'.txt';
    $logPathFile = Yii::getAlias('@app') . '/runtime/logs/apilog/'.date('Y').'/'.date('m').'/';
    if( !file_exists($logPathFile) ){
        mkdir($logPathFile, 0755, true);
    }
    $logPathFile .= date('d').'.txt';
    file_put_contents($logPathFile, Yii::$app->request->getUserIP() . ':',FILE_APPEND);
    if( is_array($data) ){
        file_put_contents($logPathFile, print_r($data,1) . PHP_EOL, FILE_APPEND);
    }else{
        file_put_contents($logPathFile, $data . PHP_EOL, FILE_APPEND);
    }
}

/**
 * 账户是否是管理员
 * return boolean
 */
function isManager(){
    return \Yii::$app->session->get('isManager');
}

/**
 * 账户是否是蓝页
 * return boolean
 */
function isLanYe(){
    return \Yii::$app->session->get('isLanYe');
}

/**
 * 账户是否是总代
 * return boolean
 */
function isLevel0(){
    return isset($_SESSION['level']) && \Yii::$app->session->get('level') == \common\models\Agent::LEVEL_ROOT;
}

/**
 * 账户是否是一级代理
 * return boolean
 */
function isLevel1(){
    return \Yii::$app->session->get('level') == \common\models\Agent::LEVEL_FIRST;
}

/**
 * 返回dataProvider数组
 */
function dataProvidertoArray( $dataProviderObj ){
    if( empty($dataProviderObj) ){
        return [];
    }
    $arr = [];
    foreach( $dataProviderObj as $v){
        array_push( $arr, $v->getAttributes() );
    }
    return $arr;
}