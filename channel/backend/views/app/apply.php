<html>
<head>

</head>
<body>
<div>
    <form id="form">
魔页账户ID：<input type="text" name="account_id" id="account_id"/><br/>
        <input name="_csrf" type="hidden" id="_csrf" value="<?= Yii::$app->request->csrfToken ?>">
    <input type="button" value="提现" onclick="sub();">
    </form>

</div>


</body>
<script type="text/javascript">
    function sub(){
        $.ajax({
            type:'post',
            url:'apply',
            data:$("#form").serialize() ,
            dataType:'json',
            success:function (data){
                if(data['code']=='200'){
//                    console.log(JSON.stringify(data['data']));
                    location.href="/admin/app/submit?data="+JSON.stringify(data['data'])+"&account_id="+data['account_id'];
                }else{
                    alert(data['data']);
                }

            },
            error:function (){
                alert(0);
            }
        })
    }




</script>
<script>



</script>
</html>