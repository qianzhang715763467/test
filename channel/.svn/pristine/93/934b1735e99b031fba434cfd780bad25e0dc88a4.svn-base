<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model backend\models\search\AdSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<?php $form = ActiveForm::begin([
    'action' => ['insure'],
    'method' => 'get',
    'options'=>[
        //'class'=>"form-inline",
        'data-pjax' => true, //开启pjax搜索
    ]
]); 
?>
<div class="row">
    <div class="col-md-2">
    <?=$form->field($model, 'pay_status')->dropDownList(array_merge([''=>'全部'],$payStatus),['class'=>'form-control'])->label('付款状态'); ?>
    </div>
    <div class="col-md-2">
    <?= $form->field($model, 'settlement_name')->textInput()->label('申请人') ?>
    </div>
    <div class="col-md-2">
    <?= $form->field($model, 'settlement_no')->textInput()->label('结算单号') ?>
    </div>
    <div class="col-md-2">
    <?=$form->field($model, 'create_time')->widget(\kartik\widgets\DatePicker::classname(),[
            'language' => 'zh-CN',
            'type' => \kartik\widgets\DatePicker::TYPE_INPUT,
            'value' => '',
            'options' => ['class' => 'form-control'],
            'pluginOptions' => [
                'autoclose'=>true,
                'format' => 'yyyy-mm-dd',
            ]
        ],['class' => 'c-md-2'])->label('申请开始时间')?>
    </div>
    <div class="col-md-2">
        <?=$form->field($model, 'end_time')->widget(\kartik\widgets\DatePicker::classname(),[
            'language' => 'zh-CN',
            'type' => \kartik\widgets\DatePicker::TYPE_INPUT,
            'value' => '',
            'options' => ['class' => 'form-control'],
            'pluginOptions' => [
                'autoclose'=>true,
                'format' => 'yyyy-mm-dd',
            ]
        ],['class' => 'c-md-2'])->label('申请结束时间')?>
    </div>

    <div class="col-md-2">
        <div class="form-group" style="margin-top: 24px;">
        <?= Html::submitButton('查询', ['class' => 'btn btn-primary']) ?>
        </div>
    </div>
</div>
<?php ActiveForm::end(); ?>

