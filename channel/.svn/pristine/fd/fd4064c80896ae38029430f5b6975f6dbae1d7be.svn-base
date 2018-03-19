<?php
namespace common\models;
use common\core\BaseActiveRecord;

class Accounting extends BaseActiveRecord {
    //订单收入
    const DOC_TYPE_INCOME = 1;
    //订单结算
    const DOC_TYPE_OUTCOME = 2;
    //状态 预定
    const STATUS_RESERVE = 1;
    //状态 实际
    const STATUS_ACTUAL = 2;

    /**
     * 获取账务类型
     */
    public static function getDocTypeMap(){
        return [
            self::DOC_TYPE_INCOME => '收入',
            self::DOC_TYPE_OUTCOME => '结算',
        ];
    }

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%accounting}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [];
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