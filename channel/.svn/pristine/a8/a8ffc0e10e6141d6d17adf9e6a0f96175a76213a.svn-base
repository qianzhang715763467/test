<?php
/* ===========================以下为本页配置信息================================= */
/* 页面基本属性 */
$this->title = '待入账明细';
$this->params['title_sub'] = '';

/* 渲染其他文件 */
//echo $this->renderFile('@app/views/public/login.php');

/* 加载页面级别JS */
//$this->registerJsFile('@web/static/common/js/app.js');
use \common\helpers\Html;
use \yii\grid\GridView;
use \yii\widgets\Pjax;
use \yii\helpers\Url;
$this->params['backUrl'] = Url::toRoute('clearing/index');
$columns = [
    [
        'header' => '编号',
        'attribute' => 'id',
        'options' => ['width' => '0%']
    ],
    [
        'header' => '订单号',
        'attribute' => 'doc_no',
        'options' => ['width' => '15%']
    ],
    [
        'header' => '订单时间',
        'options' => ['width' => '12%'],
		'contentOptions' => ['style' => 'white-space:nowrap;'],
        'value' => function($model){
        	$api = new \common\lib\Api;
        	$data = $api->getBuyInfoByOrder($model->doc_no);
        	if( $data ){
        		return date("Y-m-d", $data['create_at']);
        	}
        	
        }
    ],
    [
        'header' => '客户名',
        'options' => ['width' => '15%'],
        'value' => function($model){
        	$api = new \common\lib\Api;
        	$data = $api->getBuyInfoByOrder($model->doc_no);
        	if( $data ){
        		if( !empty($data['approve_company']) ){
        			return $data['approve_company']['company_name'];
        		}elseif(!empty($data['approve_person'])){
        			return $data['approve_person']['persion_name'];
        		}else{

        		}
        	}
        	
        }
    ],
    [
        'header' => '授权版本',
        'options' => ['width' => '0%'],
        'value' => function($model){
        	$api = new \common\lib\Api;
        	$data = $api->getBuyInfoByOrder($model->doc_no);
        	if( $data ){
        		return $data['magic_type_show'];
        	}
        }
    ],
    [
        'header' => '订单金额',
        'options' => ['width' => '15%'],
		'contentOptions' => ['style' => 'text-align:right;'],
        'value' => function($model){
        	$api = new \common\lib\Api;
        	$data = $api->getBuyInfoByOrder($model->doc_no);
        	if( $data ){
        		return number_format($data['pay_price'],2,".","");
        	}
        }
    ],
    [
        'header' => '账户开通时间',
        'options' => ['width' => '12%'],
		'contentOptions' => ['style' => 'white-space:nowrap;'],
        'value' => function($model){
        	$api = new \common\lib\Api;
        	$data = $api->getBuyInfoByOrder($model->doc_no);
        	if( $data ){

        		return $data['open_at'] > 0 ? date("Y-m-d",$data['open_at']) : '-';
        	}
        }
    ],
    [
        'header' => '我的收入（元）',
        'attribute' => 'amount',
        'options' => ['width' => '15%'],
		'contentOptions' => ['style' => 'text-align:right;'],
    ],
    [
        'header' => '入账时间',
        'attribute' => 'account_date',
        'options' => ['width' => '15%'],
        'format' => ['date', 'php:Y-m-d'],
		'contentOptions' => ['style' => 'white-space:nowrap;'],
    ],
];
?>

<div class="portlet light portlet-fit portlet-datatable bordered">
    <div class="portlet-body">
        <?php Pjax::begin(['options'=>['id'=>'pjax-container']]); ?>
        <div>
            <?= $this->render('_income', ['model' => $searchModel]); ?>
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
    highlight_subnav('clearing/income'); //子导航高亮
});
<?php $this->endBlock() ?>
<!-- 将数据块 注入到视图中的某个位置 -->
<?php $this->registerJs($this->blocks['test'], \yii\web\View::POS_END); ?>
