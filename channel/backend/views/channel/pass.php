<?php
/**
 * Created by PhpStorm.
 * User: lvwenqian
 * Date: 2017/6/21
 * Time: 15:01
 */
use common\core\ActiveForm;
use yii\helpers\Html;
use \yii\grid\GridView;
use \yii\widgets\Pjax;
/* @var $this yii\web\View */
/* @var $model backend\models\Menu */
/* @var $form ActiveForm */

$this->title = '审核操作';
$this->params['title_sub'] = '';  // 在\yii\base\View中有$params这个可以在视图模板中共享的参数
use \yii\helpers\Url;
$this->params['backUrl'] = Url::toRoute('channel/second');
/* 渲染其他文件 */
//echo $this->renderFile('@app/views/public/login.php');

?>

<div class="portlet light bordered">
    <div class="portlet-title">
        <div class="caption font-red-sunglo">
            <i class="icon-settings font-red-sunglo"></i>
            <span class="caption-subject bold uppercase"> 审核操作</span>
        </div>
    </div>
    <div class="portlet-body form">

        <div class="form-view">
            <div class="form-group">
                <div>
                    <label>申请人：</label>
                </div>
                <input type="text" class="form-control c-md-2" name="param[name]" value="<?=$model->contacts?>" readonly/>
            </div>
            <div class="form-group">
                <div>
                    <label>身份证号：</label>
                </div>
                <input type="text" class="form-control c-md-2" name="param[name]" value="<?=$model->person_id_card?>" readonly/>
            </div>
            <div class="form-group">
                <div>
                    <label>魔页账号：</label>
                </div>
                <input type="text" class="form-control c-md-2" name="param[name]" value="<?=$model->account_id?>" readonly/>
            </div>
            <div class="form-group">
                <div>
                    <label>联系电话：</label>
                </div>
                <input type="text" class="form-control c-md-2" name="param[name]" value="<?=$model->telephone?>" readonly/>
            </div>
            <div class="form-group">
                <div>
                    <label>申请时间：</label>
                </div>
                <input type="text" class="form-control c-md-2" name="param[name]" value="<?=date('Y-m-d',$model->create_time)?>" readonly/>
            </div>
            <div class="form-group">
                <div>
                    <label>申请理由：</label>
                </div>
                <input type="text" class="form-control c-md-2" name="param[name]" value="<?=$model->reason?>" readonly/>
            </div>
            <form action="<?=\yii\helpers\Url::toRoute(['pass','id'=>$model->id])?>" method="post" class="form-aaa ">
                <div class="form-group">
                    <div>
                        <label>审 &nbsp;&nbsp;&nbsp;&nbsp; 核：</label>
                        <span class="help-inline"></span>
                    </div><br/>
                    <input name="_csrf" type="hidden" id="_csrf" value="<?= Yii::$app->request->csrfToken ?>">
                    <input type="radio" value="pass" name="person_status" checked/>通过 &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" value="reject" name="person_status"/> 驳回
                </div>
                <div class="form-actions">
                    <?= Html::submitButton('确定', ['class' => 'btn blue ajax-post','target-form'=>'form-aaa']) ?>
                    <?= Html::button('取消', ['class' => 'btn']) ?>
                </div>
            </form>
        </div>
</div>
</div>

<!-- 定义数据块 -->
<?php $this->beginBlock('test'); ?>
jQuery(document).ready(function() {
highlight_subnav('channel/index'); //子导航高亮
});
<?php $this->endBlock() ?>
<!-- 将数据块 注入到视图中的某个位置 -->
<?php $this->registerJs($this->blocks['test'], \yii\web\View::POS_END); ?>
