<?php
namespace backend\models\validate;
use Yii;
use yii\base\DynamicModel;

class AgentValidate extends DynamicModel
{
    public function attributeLabels()
    {
        return [
            'id' => '编号',
            'agent_name' => '代理商名称',
            'contacts' => '联系人',
            'telephone' => '联系电话',
            'address' => '联系地址',
            'tax_number' => '税号',
            'bank_name' => '开户银行',
            'bank_card' => '银行卡号',
            'level' => '代理商类别',
            'status' => '状态',
            'account_id' => '魔页账户id',
            'level0_id' => '总代',
            'level1_id' => '一级代理',
            'level2_id' => '二级代理',
            'person_status' => '状态',
            'person_id_card' => '身份证号',
            'reason' => '申请理由',
            'create_time' => '创建时间',
            'update_time' => '更新时间',
            
        ];
    }
}
