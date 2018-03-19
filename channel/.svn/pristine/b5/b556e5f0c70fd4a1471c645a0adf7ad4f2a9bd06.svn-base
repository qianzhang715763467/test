<html>
<head>

</head>
<body>
<div>
    <form id="form">
        魔页账户ID：<input type="text" value="<?=$account_id?>" readonly id="account_id" name="account_id"/><br/>
        提现金额：<input type="text" id="amount" name="amount"><br/>
        代扣劳务所得税：<input type="text" value="" readonly id="income_tax" name="income_tax"/><br/>
        实际到账金额：<input type="text" value="" readonly id="pay_amount" name="pay_amount"/><br/>
        开户人：<input type="text" value="<?=$data==''?'':$data['settlement_name']?>" name="settlement_name"/><br/>
        结算银行：<input type="text" value="<?=$data==''?'':$data['bank_name']?>" name="bank_name"/><br/>
        银行账号：<input type="text" value="<?=$data==''?'':$data['bank_card']?>" name="bank_card"/><br/>
        <input name="_csrf" type="hidden" id="_csrf" value="<?= Yii::$app->request->csrfToken ?>">
        <input type="button" value="提交" id="btn">
    </form>

</div>


</body>

</html>
<script>
    $("#amount").change(function(){
        $.ajax({
            type:'post',
            url:'fax',
            data:{
                'account_id':$("#account_id").val(),
                'money':$("#amount").val(),
                '_csrf':$("#_csrf").val()
            } ,
            dataType:'json',
            success:function (data){
                if(data['code']=='200'){
                    $("#income_tax").val(data['data']['income_tax']);
                    $("#pay_amount").val(data['data']['pay_amount']);
                }else{
                    alert(data['data']);
                }

            },
            error:function (){
                alert(0);
            }
        })
    });

    $("#btn").click(function(){
        $.ajax({
            type:'post',
            url:'submit',
            data:$("#form").serialize() ,
            dataType:'json',
            success:function (data){
               alert(data['data']);
            },
            error:function (){
                alert('提交失败');
            }
        })
    })
</script>