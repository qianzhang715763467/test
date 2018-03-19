<?php

use yii\helpers\Html;
use common\core\ActiveForm;

/* @var $this yii\web\View */
/* @var $model backend\models\Ad */
/* @var $form common\core\ActiveForm */
?>

<?php $form = ActiveForm::begin([
    'options'=>[
        'class'=>"form-aaa "
    ]
]); ?>

<?= $form->field($model, 'freeze_day')->iconTextInput([
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit',
    'placeholder' => '请输入'
])->label('酬金冻结天数') ?>

<?= $form->field($model, 'cancel_order_day')->iconTextInput([
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit',
    'placeholder' => '请输入'
])->label('可取消订单天数') ?>

<?= $form->field($model, 'person_month_num')->iconTextInput([
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit',
    'placeholder' => '请输入'
])->label('个人每月体现次数') ?>

<?= $form->field($model, 'person_min_price')->iconTextInput([
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit',
    'placeholder' => '请输入'
])->label('个人最低体现金额') ?>

<?= $form->field($model, 'company_month_num')->iconTextInput([
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit',
    'placeholder' => '请输入'
])->label('企业每月提现次数') ?>

<?= $form->field($model, 'company_min_price')->iconTextInput([
    'class'=>'form-control c-md-6',
    'iconPos' => 'left',
    'iconClass' => 'fa fa-edit',
    'placeholder' => '请输入'
])->label('企业最低提现金额') ?>



<div class="form-actions">
    <?= Html::submitButton('确定', ['class' => 'btn blue ajax-post','target-form'=>'form-aaa']) ?>
    <?= Html::button('取消', ['class' => 'btn']) ?>
</div>
<?php ActiveForm::end(); ?>

