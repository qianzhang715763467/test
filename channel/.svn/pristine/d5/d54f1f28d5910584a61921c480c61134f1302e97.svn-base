<?php
/* ===========================以下为本页配置信息================================= */
/* 页面基本属性 */
$this->title = '销售收入查询';
$this->params['title_sub'] = '';

/* 渲染其他文件 */
//echo $this->renderFile('@app/views/public/login.php');

/* 加载页面级别JS */
//$this->registerJsFile('@web/static/common/js/app.js');
use \common\helpers\Html;
use \yii\grid\GridView;
use \yii\widgets\Pjax;
use \common\models\Agent;
$columns = [
    [
        'header'=>'编号',
        'class' => 'yii\grid\SerialColumn',
        'options' => ['width' => '0%'],
    ],

    [
        'header' => '订单号',
        'attribute' => 'order_no',
        'options' => ['width' => '10%']
    ],
    [
        'header' => '订单时间',
        'attribute' => 'order_time',
        'options' => ['width' => '5%'],
        'format' => ['date', 'php:Y-m-d'],
        'contentOptions' => ['style' => 'white-space:nowrap;'],
        'value' => function($model){
            if($model['order_time']!=''){
                return $model['order_time'];
            }

        }
    ],
    [
        'header' => '客户',
        'attribute' => 'buyer_name',
        'options' => ['width' => '10%']
    ],

    [
        'header' => '授权版本',
        'attribute' => 'ver_type',
        'options' => ['width' => '0%'],
        'value' => function($model){
            if($model['ver_type']== \common\models\Profit::LEVEL_EXPERIENCE){

                return '体验版';
            }
            if ($model['ver_type']== \common\models\Profit::LEVEL_BASICS){

                return '个人版';
            }
            if($model['ver_type']== \common\models\Profit::LEVEL_ENTERPRISE){

                return '企业版';
            }
            if($model['ver_type']== \common\models\Profit::LEVEL_GROUP){

                return '集团版';
            }

        }
    ],
    [
        'header' => '授权类别',
        'attribute' => 'ver_type',
        'options' => ['width' => '0%'],
        'value' => function($model){
            $apiObj = new \common\lib\Api();
            $data = $apiObj->getBuyInfoByOrder($model['order_no']);
            if( $data ){
                return $data['authorization'];
            }

        }
    ],

    [
        'header' => '订单金额',
        'attribute' => 'order_price',
        'options' => ['width' => '5%'],
        'contentOptions' => ['style' => 'text-align:right;'],
    ],
    [
        'header' => '付款方式',
        'attribute' => 'ver_type',
        'options' => ['width' => '5%'],
        'value' => function($model){
            $apiObj = new \common\lib\Api();
            $data = $apiObj->getBuyInfoByOrder($model['order_no']);
            if( $data ){
                return $data['pay_type'];
            }

        }
    ],
    [
        'header' => '付款时间',
        'attribute' => 'pay_time',
        'options' => ['width' => '5%'],
        'format' => ['date', 'php:Y-m-d'],
        'contentOptions' => ['style' => 'white-space:nowrap;'],
        'value' => function($model){
            if($model['pay_time']!=''){
                return $model['pay_time'];
            }

        }
    ],

    [
        'header' => '总代理',
        'attribute' => 'level0_name',
        'options' => ['width' => '5%']
    ],
    [
        'header' => '总代理酬金',
        'attribute' => 'level0_margin',
        'options' => ['width' => '5%'],
        'contentOptions' => ['style' => 'text-align:right;'],
    ],
    [
        'header' => '一级代理',
        'attribute' => 'level1_name',
        'options' => ['width' => '5%']
    ],

    [
        'header' => '一级代理酬金',
        'attribute' => 'level1_margin',
        'options' => ['width' => '5%'],
        'contentOptions' => ['style' => 'text-align:right;'],
    ],
    [
        'header' => '二级代理',
        'attribute' => 'level2_name',
        'options' => ['width' => '5%']
    ],
    [
        'header' => '二级代理酬金',
        'attribute' => 'level2_margin',
        'options' => ['width' => '5%'],
        'contentOptions' => ['style' => 'text-align:right;'],
    ],

    [
        'header' => 'c-1',
        'attribute' => 'levelc1_name',
        'options' => ['width' => '5%'],
    ],
    [
        'header' => 'c-1酬金',
        'attribute' => 'levelc1_margin',
        'options' => ['width' => '5%'],
        'contentOptions' => ['style' => 'text-align:right;'],
    ],

    [
        'header' => '订单状态',
        'options' => ['width' => '5%'],
        'value' => function($model){
            $apiObj = new \common\lib\Api();
            $data = $apiObj->getBuyInfoByOrder($model['order_no']);
            if( $data ){
                return $data['buy_phase'];
            }

        }
    ],

];


?>

<div class="portlet light portlet-fit portlet-datatable bordered">
    <!--    <div class="portlet-title">-->
    <!--        <div class="caption">-->
    <!--            <i class="icon-settings font-dark"></i>-->
    <!--            <span class="caption-subject font-dark sbold uppercase">管理信息</span>-->
    <!--        </div>-->
    <!--        -->
    <!--    </div>-->
    <div class="portlet-body">
        <?php Pjax::begin(['options'=>['id'=>'pjax-container']]); ?>
        <div>
            <?= $this->render('_search_index', ['model' => $searchModel]); ?>
        </div>
        <div class="table-container" style="overflow-x: auto;">
            <form class="ids">
                <?= GridView::widget([
                    'dataProvider' => $dataProvider,
                    'options' => ['class' => 'grid-view','style'=>'width: 200%;
                                    overflow-x: auto;
                                    overflow-y: hidden;
                                    border: 1px solid #e7ecf1;
                                    margin: 10px 0!important;'],
                    /* 表格配置 */
                    'tableOptions' => ['class' => 'table table-striped table-bordered table-hover table-checkable order-column dataTable no-footer'],
                    /* 重新排版 摘要、表格、分页 */
                    'layout' => '{items}<div class=""><div class="col-md-5 col-sm-5">{summary}</div><div class="col-md-7 col-sm-7"><div class="dataTables_paginate paging_bootstrap_full_number" style="text-align:right;">{pager}</div></div></div>',
                    /* 配置摘要 */
                    'summaryOptions' => ['class' => 'pagination'],
                    /* 配置分页样式 */
                    'pager' => [
                        'options' => ['class'=>'pagination','style'=>'visibility: visible;'],
                        'nextPageLabel' => '下一页',
                        'prevPageLabel' => '上一页',
                        'firstPageLabel' => '第一页',
                        'lastPageLabel' => '最后页'
                    ],
                    /* 定义列表格式 */
                    'columns' => $columns,
                ]); ?>
            </form>
        </div>
        <?php \yii\widgets\Pjax::end(); ?>
    </div>
</div>

<!-- 定义数据块 -->
<?php $this->beginBlock('test'); ?>
jQuery(document).ready(function() {
    highlight_subnav('operation/index'); //子导航高亮
});
<?php $this->endBlock() ?>
<!-- 将数据块 注入到视图中的某个位置 -->
<?php $this->registerJs($this->blocks['test'], \yii\web\View::POS_END); ?>
