<?php

use common\core\ActiveForm;

/* @var $this yii\web\View */
/* @var $model backend\models\Menu */
/* @var $form ActiveForm */

/* ===========================以下为本页配置信息================================= */
/* 页面基本属性 */
$this->title = '修改代理商';
$this->params['title_sub'] = '';  // 在\yii\base\View中有$params这个可以在视图模板中共享的参数
use \yii\helpers\Url;
$this->params['backUrl'] = Url::toRoute('channel/index');
/* 渲染其他文件 */
//echo $this->renderFile('@app/views/public/login.php');

?>

<div class="portlet light bordered">
    
    <div class="portlet-body form">
        <!-- BEGIN FORM-->
        <?= $this->render('_form', [
            'model' => $model,
            'mgLoginAccount' => $mgLoginAccount,
            'showRelation' => $showRelation
        ]) ?>
        <!-- END FORM-->
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
