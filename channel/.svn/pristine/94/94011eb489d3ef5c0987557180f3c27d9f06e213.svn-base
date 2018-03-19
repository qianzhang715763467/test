<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%agent_aprove}}".
 *
 * @property string $item_name
 * @property string $user_id
 * @property integer $created_at
 *
 * @property AuthItem $itemName
 */
class AgentAprove extends \common\core\BaseActiveRecord
{
    //代理商级别:总代
    const LEVEL_0 = 0;
    //代理商级别:一级
    const LEVEL_1 = 1;
    //代理商级别:二级
    const LEVEL_2 = 2;
    //审核状态:等待审核
    const PERSON_STATUS_WAIT = 'wait';
    //审核状态:审核通过
    const PERSON_STATUS_PASS = 'pass';
    //审核状态:审核失败
    const PERSON_STATUS_REJECT = 'reject';

    public static function getStatusMap(){
        return [
            self::PERSON_STATUS_WAIT => '等待审核',
            self::PERSON_STATUS_PASS => '审核通过',
            self::PERSON_STATUS_REJECT => '审核失败',
        ];
    }

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%agent_aprove}}';
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
            'id' => '主键',
            'contacts' => '申请人',
            'telephone' => '联系电话',
            'level' => '代理级别',
            'account_id' => '魔页账户id',
            'level0_id' => '总代id',
            'level1_id' => '一级代理id',
            'person_status' => '状态',
            'person_id_card' => 'person_id_card',
            'reason' => '申请理由',
            'bank_name' => '开户银行',
            'bank_card' => '银行卡号',
            'create_time' => '申请时间',
            'update_time' => '更新时间',
        ];
    }

    
}
