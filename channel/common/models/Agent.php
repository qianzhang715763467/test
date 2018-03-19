<?php
namespace common\models;
use common\core\BaseActiveRecord;

class Agent extends BaseActiveRecord {
    //代理商级别：总代
    const LEVEL_ROOT = 0;
    //代理商级别：一级代理
    const LEVEL_FIRST = 1;
    //代理商级别：二级代理
    const LEVEL_SECOND = 2;
    //代理商状态:停用
    const STATUS_STOP = 0;
    //代理商状态:启用
    const STATUS_USED = 1;
    //二级代理申请状态:等待审核
    const PERSON_STATUS_WAIT = 'wait';
    //二级代理申请状态:通过
    const PERSON_STATUS_PASS = 'pass';
    //二级代理申请状态:拒绝
    const PERSON_STATUS_REJECT = 'reject';
    /**
     * 获取代理商级别映射数据
     */
    public static function getAgentLevelMap(){
        return [
            self::LEVEL_ROOT => '总代理',
            self::LEVEL_FIRST => '一级代理',
            self::LEVEL_SECOND => '二级代理',
        ];
    }

    /**
     * 获取总代、一级代理商级别映射数据
     */
    public static function getRootAndFirstAgentToView(){
        return [
            ''=>'请选择',
            self::LEVEL_ROOT => '总代理',
            self::LEVEL_FIRST => '一级代理',
            //self::LEVEL_SECOND => '二级代理',
        ];
    }

    /**
     * 获取代理商状态映射数据
     */
    public static function getAgentStatusMap(){
        return [
            self::STATUS_STOP => '停用',
            self::STATUS_USED => '启用',
        ];
    }

    /**
     * 获取二级代理商状态映射数据
     */
    public static function getSecondAgentStatusMap(){
        return [
            self::PERSON_STATUS_WAIT => '未审核',
            self::PERSON_STATUS_PASS => '通过',
            self::PERSON_STATUS_REJECT => '驳回',
        ];
    }

    /**
     * 获取所有总代理
     */
    public static function getAllRootAgent(){
        $where = [
            'level' => self::LEVEL_ROOT,
            'status' => self::STATUS_USED,
        ];
        return self::find()->select(['id','agent_name'])->where($where)->asArray()->all();
    }

    /**
     * 获取所有总代 给view成select用
     */
    public static function getAllRootToView(){
        $data = self::getAllRootAgent();
        $returnData = [''=>'请选择'];
        foreach( $data as $v ){
            $returnData[$v['id']] = $v['agent_name'];
        }
        return $returnData;
    }

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%agent}}';
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