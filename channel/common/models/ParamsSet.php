<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/22
 * Time: 11:06
 */
namespace common\models;


use common\core\BaseActiveRecord;

class ParamsSet extends BaseActiveRecord {

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%params_set}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['freeze_day','cancel_order_day', 'person_month_num', 'person_min_price', 'company_month_num', 'company_min_price'], 'required'],
            [['freeze_day','cancel_order_day', 'person_month_num', 'person_min_price', 'company_month_num', 'company_min_price'], 'integer'],
            
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id',
            'freeze_day' => '酬金冻结天数',
            'cancel_order_day' => '可取消订单天数',
            'person_month_num' => '个人每月体现次数',
            'person_min_price' => '个人最低体现金额',
            'company_month_num' => '企业每月体现次数',
            'company_min_price' => '企业最低体现金额',
        ];
    }
}