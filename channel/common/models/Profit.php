<?php
namespace common\models;
use common\core\BaseActiveRecord;

class Profit extends BaseActiveRecord {
    //版本等级：体验版
    const LEVEL_EXPERIENCE = 0;
    //版本等级：基础版
    const LEVEL_BASICS = 1;
    //版本等级：企业版
    const LEVEL_ENTERPRISE = 2;
    //版本等级：集团版
    const LEVEL_GROUP = 3;
    //授权截止日期：一周内
    const ONE_WEEK = 1;
    //授权截止日期：一个月内
    const ONE_MONTH = 2;
    //授权截止日期：三个月内
    const THREE_MONTH = 3;

    /**
     * 获取授权截止日期阶段映射数据
     */
    public static function getEndTimeMap(){
        return [
            self::ONE_WEEK => '一周内',
            self::ONE_MONTH => '一个月内',
            self::THREE_MONTH => '三个月内',
        ];
    }
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%profit}}';
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