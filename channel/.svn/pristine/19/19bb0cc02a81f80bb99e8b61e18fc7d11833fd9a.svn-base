<?php

namespace backend\models;

use Yii;

/**
 * 实现User组件中的身份识别类 参见 yii\web\user
 * This is the model class for table "{{%admin}}".
 *
 * @property string $uid
 * @property string $username
 * @property string $password
 * @property string $email
 * @property string $mobile
 * @property string $reg_time
 * @property string $reg_ip
 * @property string $last_login_time
 * @property string $last_login_ip
 * @property string $update_time
 * @property integer $status
 */
class SalePrice extends \common\models\SalePrice 
{
   //魔页版本 0=>体验
   const VER_TYPE_EXPERIENCE = '0';
   //魔页版本 1=>个人版
   const VER_TYPE_PERSON = '1';
   //魔页版本 2=>企业版
   const VER_TYPE_COMPANY = '2';
   //魔页版本 3=>集团
   const VER_TYPE_GROUP = '3';

   /**
    * 魔页版本映射
    */
   public static function getVerTypeMap(){
        return [
            self::VER_TYPE_PERSON => '个人版',
            self::VER_TYPE_COMPANY => '企业版',
            
        ];
   }
}
