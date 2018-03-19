<html>
<head>

</head>
<body>
<div>
    <form id="form">
        总代理：<select name="level0_id">
            <option value="">空</option>
            <?php foreach ($level0 as $val): ?>
                <option value="<?= $val['id'] ?>"><?= $val['agent_name'] ?></option>
            <?php endforeach; ?>
        </select>
        一级代理：<select name="level1_id">
            <option value="">空</option>
            <?php foreach ($level1 as $val): ?>
                <option value="<?= $val['id'] ?>"><?= $val['agent_name'] ?></option>
            <?php endforeach; ?>
        </select><br/>
        申请人：<input type="text" name="contacts"/><br/>
        申请人手机：<input type="text" name="telephone"><br/>
        魔页账号ID：<input type="text" name="account_id"/><br/>
        身份证号：<input type="text" name="person_id_card"/><br/>
        结算银行名称：<input type="text" name="bank_name"/><br/>
        结算银行卡号：<input type="text" name="bank_card"/><br/>
        申请理由：<input type="text" name="reason"/><br/>
        <input name="_csrf" type="hidden" id="_csrf" value="<?= Yii::$app->request->csrfToken ?>">
        <input type="button" value="提交" id="btn">
    </form>

</div>


</body>

</html>
<script>

    $("#btn").click(function(){
        $.ajax({
            type:'post',
            url:'agent',
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