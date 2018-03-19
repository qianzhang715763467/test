<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model backend\models\search\AdSearch */
/* @var $form yii\widgets\ActiveForm */
?>
<?php $form = ActiveForm::begin([
    'action' => ['apply'],
    'method' => 'get',
    'options'=>[
        //'class'=>"form-inline",
        'data-pjax' => true, //开启pjax搜索
    ]
]); ?>
<div class="row">
    <div class="col-md-2">
        <?= $form->field($model, 'ask_status')->dropDownList( array_merge( [''=>'全部'],$model->getOperationApplyMap() ) )->label('审核状态') ?>
    </div>
    <div class="col-md-2">
        <?= $form->field($model, 'settlement_name')->label('申请人') ?>
    </div>
    <div class="col-md-2">
        <?=$form->field($model, 'create_time')->widget(\kartik\widgets\DatePicker::classname(),[
            'language' => 'zh-CN',
            'type' => \kartik\widgets\DatePicker::TYPE_INPUT,
            'value' => '',
            'options' => ['class' => 'form-control','placeholder'=>'起始日期'],
            'pluginOptions' => [
                'autoclose'=>true,
                'format' => 'yyyy-mm-dd',
            ]
        ],['class' => 'c-md-2'])->label('申请日期')?>
    </div>
    <div class="col-md-2">
        <?=$form->field($model, 'update_time')->widget(\kartik\widgets\DatePicker::classname(),[
            'language' => 'zh-CN',
            'type' => \kartik\widgets\DatePicker::TYPE_INPUT,
            'value' => '',
            'options' => ['class' => 'form-control','placeholder'=>'截止日期'],
            'pluginOptions' => [
                'autoclose'=>true,
                'format' => 'yyyy-mm-dd',
            ]
        ],['class' => 'c-md-2'])->label('申请日期')?>
    </div>

    <div class="col-md-2">
        <div class="form-group" style="margin-top: 24px;">
            <?= Html::submitButton('查询', ['class' => 'btn btn-primary']) ?>
        </div>
    </div>
</div>
<?php ActiveForm::end(); ?>

