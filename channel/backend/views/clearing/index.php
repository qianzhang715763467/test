<?php
/* ===========================以下为本页配置信息================================= */
/* 页面基本属性 */
$this->title = '收入结算查询';
$this->params['title_sub'] = '';
/* 加载页面级别JS */
//$this->registerJsFile('@web/static/common/js/app.js');
use \common\helpers\Html;
use \yii\grid\GridView;
use \yii\widgets\Pjax;
use yii\helpers\Url;

$columns = [
    [
    	'class' => 'yii\grid\SerialColumn',
        'header' => '编号',
        
        'options' => ['width' => '0%'],
    ],
    [
        'header' => '类别',
        'attribute' => 'doc_type',
        'options' => ['width' => '0%'],
        'value' => function($model){
        	$arrMap = \common\models\Accounting::getDocTypeMap();
        	return $arrMap[$model->doc_type];
        }
    ],
    [
        'header' => '日期',
        'attribute' => 'account_date',
        'options' => ['width' => '0%'],
        'format' => ['date', 'php:Y-m-d'],
		'contentOptions' => ['style' => 'white-space:nowrap;'],
    ],
    [
        'header' => '单据号',
        'attribute' => 'doc_no',
        'options' => ['width' => '15%']
    ],
    [
        'header' => '收入金额（元）',
        'options' => ['width' => '15%'],
		'contentOptions' => ['style' => 'text-align:right;'],
        'value' => function($model){
        	if( $model->doc_type == \common\models\Accounting::DOC_TYPE_INCOME){
        		return $model->amount;
        	}else{
        		return '';
        	}
        }
    ],
    [
        'header' => '结算金额（元）',        
        'options' => ['width' => '15%'],
		'contentOptions' => ['style' => 'text-align:right;'],
        'value' => function($model){
        	if( $model->doc_type == \common\models\Accounting::DOC_TYPE_OUTCOME){
        		return $model->amount;
        	}else{
        		return '';
        	}
        }
    ],
   
];
?>
<style>
.t_bg{background-color:#ccc;padding:10px;margin:0 10px;}
.d1{margin:10px;}
.money{color:red;font-size:20px;}
.title{margin:10px 0;font-weight: bold;}
</style>
<div class="row">
	<div class="col-md-12 title">金额信息</div>
	<div class="col-md-12">
		<div class="col-md-3 t_bg" >
			<div class='d1'>可结算金额</div>
			<div class='d1 money'><?=$balanceInfo['balance_amount']?>元</div>
			<div class='d1'>
			<button type="button" id="settlementBtn" class="btn btn-primary btn-lg active">申请结算</button>
			</div>
			<div class='d1'>
				<?php if($settlementInfo):?>
				上次结算时间<?=date("Y-m-d",$settlementInfo['create_time'])?>
				<?php else:?>
					&nbsp;
				<?php endif;?>
			</div>
		</div>
		<div class="col-md-1"></div>
		<div class="col-md-3 t_bg" >
			<div class='d1'>待入账金额</div>
			<div class='d1 money'><?=$balanceInfo['freeze_amount']?>元</div>
			<div class='d1'>
			<a href="<?=Url::toRoute(['clearing/income'])?>" class="btn btn-primary btn-lg active" role="button">查看明细</a>
			</div>
			<div class='d1'>&nbsp;</div>
		</div>
		<div class="col-md-1"></div>
		<div class="col-md-3 t_bg" >
			<div class='d1'>结算中金额</div>
			<div class='d1 money'><?=$balanceInfo['settlement_amount']?>元</div>
			<div class='d1'>
			<a href="<?=Url::toRoute(['clearing/result'])?>" class="btn btn-primary btn-lg active" role="button">查看进度</a>
			</div>
			<div class='d1'>&nbsp;</div>
		</div>
		
	</div>

	<div class="col-md-12">
	
	</div>
</div>

<div class="row">
	<div class="col-md-12 title">收支明细</div>
	<div class="portlet light portlet-fit portlet-datatable bordered">
    <div class="portlet-body">
        <?php Pjax::begin(['options'=>['id'=>'pjax-container']]); ?>
        <div>
            <?= $this->render('_account', ['model' => $searchModel]); ?>
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
</div>
<!--  模态框弹窗 -->
<div class="modal fade" id='pop' tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">提示信息</h4>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
      </div>
    </div>
  </div>
</div>
<!--  /模态框弹窗 -->
<!-- 定义数据块 -->
<?php $this->beginBlock('test'); ?>
jQuery(document).ready(function() {
    highlight_subnav('clearing/index'); //子导航高亮
});
<?php $this->endBlock() ?>
<!-- 将数据块 注入到视图中的某个位置 -->
<?php $this->registerJs($this->blocks['test'], \yii\web\View::POS_END); ?>
<script>
$(function(){
	$('#settlementBtn').click(function(){
		var data = {
			'_csrf' : '<?=Yii::$app->request->getCsrfToken() ?>'
		};
		$.post('<?=Url::toRoute(['clearing/checksettlement'])?>',data,function(response){
			console.log(response);
			if( response.flag ){
				location.href='/admin/clearing/apply';
			}else{
				//alert(response.msg);
				$('.modal-body').html(response.msg);
				$('#pop').modal('show');
			}
		},'json');
	});
});
</script>