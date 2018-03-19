<?php
/**
 * Created by PhpStorm.
 * User: lvwenqian
 * Date: 2017/6/21
 * Time: 10:30
 */
namespace common\models;


use common\core\BaseActiveRecord;

class VatSettion extends BaseActiveRecord
{

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%vat_settion}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['company_name', 'tax_num', 'invoice_type', 'contacts', 'telephone', 'address','update_time','pic_id'], 'required'],
            [['telephone'], 'match', 'pattern' => '/^1\d{10}$/'],
            [['company_name','address'], 'string', 'max' => 255],
            [['contacts'], 'string', 'max' => 45],
            [['tax_num'], 'match', 'pattern' => '/^[0-9A-Z]{18}$/'],
            [['update_time'],'safe'],
            [['invoice_type'],'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id',
            'company_name' => '企业名称',
            'tax_num' => '税号',
            'invoice_type' => '发票类型',
            'contacts' => '联系人',
            'telephone' => '手机号',
            'address' => '寄送地址',
            'pic_id' => '发票样式'
        ];
    }
}