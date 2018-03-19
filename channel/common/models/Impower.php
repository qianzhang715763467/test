<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/22
 * Time: 11:06
 */
namespace common\models;


use common\core\BaseActiveRecord;

class Impower extends BaseActiveRecord {

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%impower}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['impower_account_id'], 'required'],
            [['impower_account_id', 'impower_version', 'impower_create_at', 'impower_end_at', 'impower_update_at'], 'integer'],
            [['impower_time_long','impower_telephone'], 'string', 'max' => 45],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => '编号',
            'impower_account_id' => '代理商名称',
            'impower_version' => '魔页版本',
            'impower_telephone' => '联系电话',
            'impower_create_at' => '授权日期',
            'impower_time_long' => '授权时长',
            'impower_end_at' => '授权截止日期',
            'impower_update_at' => '更新时间',
        ];
    }
}