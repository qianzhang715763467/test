<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model backend\models\search\AdSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<?php $form = ActiveForm::begin([
    'action' => ['index'],
    'method' => 'get',
    'options'=>[
        //'class'=>"form-inline",
        'data-pjax' => true, //开启pjax搜索
    ]
]); ?>
<div class="row">
    
    <div class="col-md-2">
    <?= $form->field($model, 'level')->dropDownList( $levelSelect )->label('渠道类别') ?>
	</div>
	<div class="col-md-2">
    <?= $form->field($model, 'level0_id')->dropDownList( $level0Select )->label('所属总代理') ?>
	</div>
	<div class="col-md-2">
    <?= $form->field($model, 'level1_id')->dropDownList( $level1Select )->label('所属一级代理') ?>
	</div>
	<div class="col-md-2">
    <?= $form->field($model, 'searchKeywords')->label('渠道名称') ?>
	</div>
	

    <div class="col-md-2">
        <div class="form-group" style="margin-top: 24px;">
        <?= Html::submitButton('搜索', ['class' => 'btn btn-primary']) ?>
        
        </div>
    </div>
    
    <?php if( isManager() ):?>
    <div class="col-md-2">
    <div class="btn-group btn-group-devided" style="margin-top: 24px;">
        <?=Html::a('添加 <i class="fa fa-plus"></i>',['add'],['class'=>'btn green'])?>
        <!--<?=Html::a('删除 <i class="fa fa-times"></i>',['delete'],['class'=>'btn green ajax-post confirm','target-form'=>'ids'])?>-->
    </div>
    </div>
    <?php endif;?>
</div>
<?php ActiveForm::end(); ?>

