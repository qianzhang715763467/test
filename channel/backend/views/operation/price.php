<?php
/* ===========================以下为本页配置信息================================= */
/* 页面基本属性 */
$this->title = '销售价格设置';
$this->params['title_sub'] = '';

/* 渲染其他文件 */
//echo $this->renderFile('@app/views/public/login.php');

/* 加载页面级别JS */
//$this->registerJsFile('@web/static/common/js/app.js');
use yii\helpers\Html;
?>
<style>
.w100px{
	width:100px;
	display:inline-block;
}
	.text-center>td>input{
		text-align: right;
	}

</style>
<div class="table-container">
    <form class="ids">
        <table class="table table-striped table-bordered table-hover text-center">
		
		<tr class="text-center">
			<td>编号</td>
			<td>版本</td>
			<td>售价</td>
			<td>折扣价</td>
			<td>蓝页分成(百分比)</td>
			<td>总代理分成(百分比)</td>
			<td>一级代理分成(百分比)</td>
			<td>二级代理分成(百分比)</td>
			<td>C-1分成(百分比)</td>
		</tr>
		
		
		<?php foreach($list as $v):?>
		<tr class="text-center">
		<td><?=$v['id']?><input type="hidden" value="<?=$v['id']?>" name="si<?=$v['id']?>_id"/></td>
		<td><?=$magicTypeMap[$v['ver_type']]?></td>
		<td><input type="text" class="form-control w100px" placeholder="请输入售价" value="<?=Html::encode($v['sale_price'])?>" name="si<?=$v['id']?>_sale_price"></td>
		<td><input type="text" class="form-control w100px" placeholder="请输入折扣价" value="<?=Html::encode($v['discount_price'])?>" name="si<?=$v['id']?>_discount_price"></td>
		<td><input type="text" class="form-control w100px" placeholder="自动计算" value="<?=Html::encode($v['lanye_price'])?>" name="si<?=$v['id']?>_lanye_price" readonly>&nbsp;%</td>
		<td><input type="text" class="form-control w100px priceInput" placeholder="请输入分成价" value="<?=Html::encode($v['level0_price'])?>" name="si<?=$v['id']?>_level0_price">&nbsp;%</td>
		<td><input type="text" class="form-control w100px priceInput" placeholder="请输入分成价" value="<?=Html::encode($v['level1_price'])?>" name="si<?=$v['id']?>_level1_price">&nbsp;%</td>
		<td><input type="text" class="form-control w100px priceInput" placeholder="请输入分成价" value="<?=Html::encode($v['level2_price'])?>" name="si<?=$v['id']?>_level2_price">&nbsp;%</td>
		<td><input type="text" class="form-control w100px priceInput" placeholder="请输入分成价" value="<?=Html::encode($v['levelc1_price'])?>" name="si<?=$v['id']?>_levelc1_price">&nbsp;%</td>
		</tr>
		<?php endforeach;?>
		</table>
		<input type='hidden' name='_csrf' value="<?=Yii::$app->request->getCsrfToken()?>"/>
		<button type="button" class="btn btn-default" id="submitBtn">保存</button>
    </form>
</div>

 


<!-- 定义数据块 -->
<?php $this->beginBlock('test'); ?>
jQuery(document).ready(function() {
    highlight_subnav('operation/price'); //子导航高亮
});
<?php $this->endBlock() ?>
<!-- 将数据块 注入到视图中的某个位置 -->
<?php $this->registerJs($this->blocks['test'], \yii\web\View::POS_END); ?>


<script type= "text/javascript">
$(function(){
	//自动计算总代分成百分比
	$("input[name^=si1_level]").blur(function(){
		var level0 = parseFloat($("input[name=si1_level0_price]").val());
		var level1 = parseFloat($("input[name=si1_level1_price]").val());
		var level2 = parseFloat($("input[name=si1_level2_price]").val());
		var levelc1 = parseFloat($("input[name=si1_levelc1_price]").val());
		var otherSum = level0 * 10000 + level1 * 10000 + level2 * 10000 + levelc1 * 10000;
		$("input[name=si1_lanye_price]").val( parseFloat(100*10000 - otherSum)/10000 );
	}); 
	$("input[name^=si2_level]").blur(function(){
		var level0 = parseFloat($("input[name=si2_level0_price]").val());
		var level1 = parseFloat($("input[name=si2_level1_price]").val());
		var level2 = parseFloat($("input[name=si2_level2_price]").val());
		var levelc1 = parseFloat($("input[name=si2_levelc1_price]").val());
		var otherSum = level0 * 10000 + level1 * 10000 + level2 * 10000 + levelc1 * 10000;
		$("input[name=si2_lanye_price]").val( parseFloat(100*10000 - otherSum)/10000 );
	}); 

	$(".priceInput").change(function(){
		var priceInput = $(".priceInput").val();
		if( priceInput>100.0000 ){
			alert("百分比不能大于100%");
			$(this).val('0.0000');
			return false;
		}
	});

	$('#submitBtn').click(function(){
		var submitFlag = true;
		$('input[name^=si]').each(function(){
			if( isNaN($(this).val()) ){
				alert("请输入数字 ");
				$(this).focus();
				submitFlag =  false;
				return false;
			}
			var tmp = $(this).val().split('.');
			if( tmp.length >= 2){
				if( tmp[1].length > 4){
					alert("小数点后最多四位");
					$(this).focus();
					submitFlag =  false;
					return false;
				}
			}
			
		});


		var level1_0 = parseFloat($("input[name=si1_level0_price]").val());
		var level1_1 = parseFloat($("input[name=si1_level1_price]").val());
		var level1_2 = parseFloat($("input[name=si1_level2_price]").val());
		var level1_c1 = parseFloat($("input[name=si1_levelc1_price]").val());
		var level1_lanye = parseFloat($("input[name=si1_lanye_price]").val());
		var level1_sum = ( level1_0 * 10000 + level1_1 * 10000 + level1_2 * 10000 + level1_c1 * 10000 )/10000;

		var level2_0 = parseFloat($("input[name=si2_level0_price]").val());
		var level2_1 = parseFloat($("input[name=si2_level1_price]").val());
		var level2_2 = parseFloat($("input[name=si2_level2_price]").val());
		var level2_c1 = parseFloat($("input[name=si2_levelc1_price]").val());
		var level2_lanye = parseFloat($("input[name=si2_lanye_price]").val());
		var level2_sum = ( level2_0 * 10000 + level2_1 * 10000 + level2_2 * 10000 + level2_c1 * 10000 )/10000;

		if( level1_sum > 100 || level2_sum > 100 ){
			alert("分成总比不能超过100%");
			submitFlag =  false;
			return false;
		}


		if( !submitFlag ){
			return ;
		}
		//验证通过提交表单
		var data = $("form.ids").serializeArray()
		$.post('/admin/operation/price',data,function(json){
			if( json.code = 200){
				alert(json.msg);
			}
		},'json');
	});

});
</script>