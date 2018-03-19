<?php
/* ===========================以下为本页配置信息================================= */
/* 页面基本属性 */
$this->title = '付款确认';
$this->params['title_sub'] = '';
/* 加载页面级别JS */
//$this->registerJsFile('@web/static/common/js/app.js');
use \common\helpers\Html;
use \yii\grid\GridView;
use \yii\widgets\Pjax;

$columns = [
    [
        'header' => '编号',
        'attribute' => 'id',
        'options' => ['width' => '0%']
    ],
    [
        'header' => '结算单号',
        'attribute' => 'settlement_no',
        'options' => ['width' => '15%']
    ],
    [
        'header' => '申请人',
        'attribute' => 'settlement_name',
        'options' => ['width' => '15%']
    ],
    [
        'header' => '申请日期',
        'attribute' => 'create_time',
        'options' => ['width' => '12%'],
        'format' => ['date', 'php:Y-m-d'],
        'contentOptions' => ['style' => 'white-space:nowrap;'],
    ],
    [
        'header' => '收付款',
        'options' => ['width' => '12%'],
        'contentOptions' => ['style' => 'text-align:right;'],
        'value' => function($model){
        	if( $model->pay_amount ){
        		return $model->pay_amount;
        	}else{
        		return '';
        	}
        }
    ],
    [
        'header' => '收款银行',
        'attribute' => 'bank_name',
        'options' => ['width' => '12%'],
    ],
    [
        'header' => '收款账号',
        'attribute' => 'bank_card',
        'options' => ['width' => '12%'],
    ],
    [
        'header' => '付款状态',
        'options' => ['width' => '10%'],
        'headerOptions' => ['style' => 'text-align:center;'],
        'contentOptions' => ['style' => 'text-align:center;'],
        'value' => function($model){
        	$arr = \common\models\Settlement::gePayStatusMap();
        	return $arr[$model->pay_status];
        }
    ],
];
if( isManager() ){
	$columns[] = [
    	'header' => '操作',
    	'class' => yii\grid\ActionColumn::className(),
        'options' => ['width' => '15%'],
        'headerOptions' => ['style' => 'text-align:center;'],
        'contentOptions' => ['style' => 'text-align:center;'],
    	'template' => '{pay}',
    	'buttons' => [
    		 'pay' => function ($url, $model, $key) {
    		 	if( $model->pay_status == \common\models\Settlement::PAY_STATUS_PASS ){
    		 		return '';
    		 	}else{
    		 		return Html::a('<i class="fa fa-reply"></i> 确认打款', ['operation/insurepay','id'=>$model->id], [
	                    'title' => Yii::t('app', '确认打款'),
	                    'class' => 'btn btn-xs green ajax-get confirm'
	                ]);
    		 	}
                
            },
    	],
    ];
}
?>

<div class="portlet light portlet-fit portlet-datatable bordered">
    <div class="portlet-body">
        <?php Pjax::begin(['options'=>['id'=>'pjax-container']]); ?>
        <div>
            <?= $this->render('_insure', ['model' => $searchModel,'payStatus' => $payStatus]); ?>
        </div>
        <div class="table-container">
            <form class="ids">
                <?= GridView::widget([
                    'dataProvider' => $dataProvider,
                    'options' => ['class' => 'grid-view table-scrollable'],
                    /* 表格配置 */
                    'tableOptions' => ['class' => 'table table-striped table-bordered table-hover'],
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
    highlight_subnav('operation/insure'); //子导航高亮
});
<?php $this->endBlock() ?>
<!-- 将数据块 注入到视图中的某个位置 -->
<?php $this->registerJs($this->blocks['test'], \yii\web\View::POS_END); ?>
