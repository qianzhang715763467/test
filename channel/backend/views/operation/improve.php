<?php
/* ===========================以下为本页配置信息================================= */

use backend\models\Profit;
use \yii\grid\GridView;
use \yii\widgets\Pjax;
/* 页面基本属性 */
$this->title = '客户授权查询';
$this->params['title_sub'] = '';

/* 渲染其他文件 */
//echo $this->renderFile('@app/views/public/login.php');

/* 加载页面级别JS */
//$this->registerJsFile('@web/static/common/js/app.js');

$columns = [
    [
        'header'=>'订单编号',
        'attribute' => 'order_no',
        'options' => ['width' => '20%'],
    ],

    [
        'header' => '客户',
        'attribute' => 'buyer_name',
        'options' => ['width' => '20%']
    ],
    [
        'header' => '授权版本',
        'attribute' => 'ver_type',
        'options' => ['width' => '0%'],
        'value' => function($model){
            if($model['ver_type']==Profit::LEVEL_EXPERIENCE){
                return '体验版';
            }
            if($model['ver_type']==Profit::LEVEL_BASICS){
                return '基础版';
            }
            if($model['ver_type']==Profit::LEVEL_ENTERPRISE){
                return '企业版';
            }
            if($model['ver_type']==Profit::LEVEL_GROUP){
                return '集团版';
            }

        }
    ],
    [
        'header' => '授权日期',
        'format' => ['date', 'php:Y-m-d'],
        'options' => ['width' => '10%'],
        'contentOptions' => ['style' => 'white-space:nowrap;'],
        'value' => function($model){
            $apiObj = new \common\lib\Api();
            $data = $apiObj->getAccountInfoByOrder($model['order_no']);
            if( $data ){
                return $data['open_at'];
            }

        }
    ],

    [
        'header' => '授权截止日期',
        'attribute' => 'end_time',
        'format' => ['date', 'php:Y-m-d'],
        'options' => ['width' => '10%'],
        'contentOptions' => ['style' => 'white-space:nowrap;'],
    ],
    [
        'header' => '联系电话',
        'options' => ['width' => '15%'],
        'value' => function($model){
            $apiObj = new \common\lib\Api();
            $data = $apiObj->getAccountInfoByOrder($model['order_no']);
            if( $data ){
                return $data['telephone'];
            }

        }
    ],

    [
        'header' => '魔页账号信息',
        'options' => ['width' => '20%'],
        'value' => function($model){
            $apiObj = new \common\lib\Api();
            $data = $apiObj->getAccountInfoByOrder($model['order_no']);
            if( $data ){
                return $data['account'];
            }

        }
    ],

];
?>
<div class="portlet light portlet-fit portlet-datatable bordered">
    <div class="portlet-body">
        <?php Pjax::begin(['options'=>['id'=>'pjax-container']]); ?>
        <div>
            <?= $this->render('_search_improve', ['model' => $searchModel]); ?>
        </div>
        <div class="table-container" style="overflow-x: auto;">
            <form class="ids">
                <?= GridView::widget([
                    'dataProvider' => $dataProvider,
                    'options' => ['class' => 'grid-view','style'=>'
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
    highlight_subnav('operation/improve'); //子导航高亮
});
<?php $this->endBlock() ?>
<!-- 将数据块 注入到视图中的某个位置 -->
<?php $this->registerJs($this->blocks['test'], \yii\web\View::POS_END); ?>