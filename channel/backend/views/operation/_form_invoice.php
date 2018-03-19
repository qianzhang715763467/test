<?php
/**
 * Created by PhpStorm.
 * User: lvwenqian
 * Date: 2017/6/20
 * Time: 18:19
 */

use yii\helpers\Html;
use common\core\ActiveForm;

/* @var $this yii\web\View */
/* @var $model backend\models\Ad */
/* @var $form common\core\ActiveForm */
?>

<?php $form = ActiveForm::begin([
    'action' => ['operation/invoice'], //提交地址(*可省略*)
    'method'=>'post',
    'options'=>[
        'class'=>"form-inv"
    ]
]); ?>

<?= $form->field($model, 'company_name')->iconTextInput([
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit',
    'placeholder' => '请输入'
])->label('企业名称') ?>

<?= $form->field($model, 'tax_num')->iconTextInput([
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit',
    'placeholder' => '请输入'
])->label('税号') ?>

<?= $form->field($model, 'invoice_type')->radioList(['special'=>'增值税专用发票'],[
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit'
])->label('发票类型') ?>

<?= $form->field($model, 'contacts')->iconTextInput([
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit',
    'placeholder' => '请输入'
])->label('联系人') ?>

<?= $form->field($model, 'telephone')->iconTextInput([
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit',
    'placeholder' => '请输入'
])->label('手机号') ?>

<?= $form->field($model, 'address')->iconTextInput([
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit',
    'placeholder' => '请输入'
])->label('寄送地址') ?>

<!--图片上传-->
<?=$form->field($model, 'pic_id')->widget('common\widgets\images\Images',[
    //'type' => \backend\widgets\images\Images::TYPE_IMAGE, // 单图
    'saveDB'=>1, //图片是否保存到picture表，默认不保存
],['class'=>'c-md-12'])->label('发票样式')->hint('单图图片尺寸为：300*300');?>


<div class="form-actions">
    <?= Html::submitButton('保存', ['class' => 'btn blue ajax-post','target-form'=>'form-inv']) ?>
    <?= Html::button('取消', ['class' => 'btn']) ?>
</div>
<?php ActiveForm::end(); ?>

