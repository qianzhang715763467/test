<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/22
 * Time: 11:06
 */
namespace common\models;


use common\core\BaseActiveRecord;

class SalePrice extends BaseActiveRecord {

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%sale_price}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
           
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            
        ];
    }
}