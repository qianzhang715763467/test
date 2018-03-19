<?php


use \common\models\Settlement;
/* ===========================以下为本页配置信息================================= */
/* 页面基本属性 */
$this->title = '结算进度';
$this->params['title_sub'] = '';

/* 渲染其他文件 */
//echo $this->renderFile('@app/views/public/login.php');

/* 加载页面级别JS */
//$this->registerJsFile('@web/static/common/js/app.js');
use \yii\helpers\Url;
$this->params['backUrl'] = Url::toRoute('clearing/index');
?>
<script type="text/javascript">
    $(function(){
        stepBar.init("stepBar", {
            step :step,
            change : true,
            animation : true
        });
        setTimeout(function(){
            $("#stepLayout").css({"width": $('.ui-stepInfo-wrap').width(),"margin":"1px","background-color":"red"});
            console.log($("#stepLayout"));
        },3000)

    });


</script>
<div>
    <p>结算单号：
        <b style="color: #00a0e9"><?=$settlement?></b>
        <b id="passInfo">&nbsp;&nbsp;结算申请审核通过后，将于自审核通过日起15个工作日内打款。</b>
        <b id="rejectInfo" style="display: none">&nbsp;&nbsp;结算申请被驳回，请重新提交结算申请。</b>
    </p>
</div>
<div id="stepBar" class="ui-stepBar-wrap">
    <div class="ui-stepBar">
        <div class="ui-stepProcess"></div>
    </div>
    <div class="ui-stepInfo-wrap">
        <table class="ui-stepLayout" id="stepLayout" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td class="ui-stepInfo">
                    <a class="ui-stepSequence">1</a>
                    <p class="ui-stepName">提交申请</p>
                </td>
                <td class="ui-stepInfo">
                    <a class="ui-stepSequence">2</a>
                    <p class="ui-stepName" id="pass">审核</p>
                    <p class="ui-stepName" style="color:red;display:none;" id="reject">申请被驳回</p>
                </td>
                <td class="ui-stepInfo">
                    <a class="ui-stepSequence">3</a>
                    <p class="ui-stepName">付款</p>
                </td>

            </tr>
        </table>
    </div>
</div>
<script type="text/javascript">
    <?php if($status == Settlement::ASK_STATUS_WAIT){?>
        var step=2;
    <?php }elseif($status == Settlement::ASK_STATUS_PASS){?>
        var step=3;
    <?php }elseif($status == Settlement::ASK_STATUS_REJECT){?>
        var step=2;
        $("#pass").hide();
        $("#reject").show();
        $("#passInfo").hide();
        $("#rejectInfo").show();
    <?php }else{?>
        var step=0;
    <?php }?>

    $(function(){
        stepBar.init("stepBar", {
            step :step,
            change : true,
            animation : true
        });
    });
</script>
<!-- 定义数据块 -->
<?php $this->beginBlock('test'); ?>
jQuery(document).ready(function() {
highlight_subnav('clearing/result'); //子导航高亮
});
<?php $this->endBlock() ?>
<!-- 将数据块 注入到视图中的某个位置 -->
<?php $this->registerJs($this->blocks['test'], \yii\web\View::POS_END); ?>
