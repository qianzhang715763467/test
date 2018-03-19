<?php
namespace common\models;
use common\core\BaseActiveRecord;

class Balance extends BaseActiveRecord {
    

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%balance}}';
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
            'id' => '编号',
            'account_id' => '魔页账户id',
            'balance_amount' => '账户余额',
            'freeze_amount' => '冻结金额',
            'settlement_amount' => '结算中金额',
            'create_time' => '创建时间',
            'update_time' => '更新时间',
            
        ];
    }
}