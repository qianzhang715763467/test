<?php
namespace common\models;
use common\core\BaseActiveRecord;

class Settlement extends BaseActiveRecord {

    //代理商级别：总代
    const LEVEL_ROOT = 0;
    //代理商级别：一级代理
    const LEVEL_FIRST = 1;
    //代理商级别：二级代理
    const LEVEL_SECOND = 2;
    //审核状态:等待审核
    const ASK_STATUS_WAIT = 'wait';
    //审核状态:审核通过
    const ASK_STATUS_PASS = 'pass';
    //审核状态:审核失败
    const ASK_STATUS_REJECT = 'reject';
    //付款状态:等待审核
    const PAY_STATUS_WAIT = 'wait';
    //付款状态:审核通过
    const PAY_STATUS_PASS = 'pay';

    /**
     * 获取审核类别
     */
    public static function getOperationApplyMap(){
        return [
            self::ASK_STATUS_WAIT => '待审核',
            self::ASK_STATUS_PASS => '已通过',
            self::ASK_STATUS_REJECT => '已驳回',
        ];
    }
    /**
     * 获取付款状态
     */
    public static function gePayStatusMap(){
        return [
            self::PAY_STATUS_WAIT => '未打款',
            self::PAY_STATUS_PASS => '已打款',
        ];
    }
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%settlement}}';
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