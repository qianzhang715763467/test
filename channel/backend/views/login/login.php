<?php
\backend\assets\AppAsset::register($this);
\backend\assets\LoginAsset::register($this);
$this->beginPage();
use yii\captcha\Captcha;
?>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->

    <head>
        <meta charset="utf-8" />
        <title>登录 | 渠道方后台</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <?php $this->head() ?>
        <link rel="shortcut icon" href="favicon.ico" />
        <script language="JavaScript">
            var BaseUrl = '<?=Yii::getAlias('@web')?>';
        </script>
    </head>
    <!-- END HEAD -->

    <body class=" login">
    <?php $this->beginBody() ?>
        <!-- BEGIN LOGO -->
        <div class="logo">
        </div>
        <!-- END LOGO -->
        <!-- BEGIN LOGIN -->
        <div class="content">
            <!-- BEGIN LOGIN FORM -->
            <form class="login-form" action="<?=\yii\helpers\Url::toRoute('login/login')?>" method="post" id="login-form">
                <h3 class="form-title font-green">登录</h3>
                <div class="alert alert-danger display-hide">
                    <button class="close" data-close="alert"></button>
                    <span> 用户名或密码错误 </span>
                </div>
                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9">用户名</label>
                    <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="用户名" name="info[username]" /> 
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">密码</label>
                    <input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="密码" name="info[password]" />
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">验证码</label>
                    <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="验证码" id='captchaInput' name="info[verifyCode]" style="width: 178px;display: inline-block;"/>
                    <?php echo Captcha::widget(['name'=>'captchaimg','captchaAction'=>'login/captcha','imageOptions'=>['id'=>'captchaimg', 'title'=>'换一个', 'alt'=>'换一个', 'style'=>'cursor:pointer;margin-left:18px;'],'template'=>'{image}']);?>
                </div>
                <div class="form-actions">
                    <label class="rememberme check mt-checkbox mt-checkbox-outline" style="padding-left:25px;display:none;">
                        <input type="checkbox" name="info[rememberMe]" value="0" checked/>记住我
                        <span></span>
                    </label>
                    <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8"><button type="submit" class=" button-block btn green" style="width:100%">登录</button></div>
                    <div class="col-md-2"></div>
                    </div>
                </div>
                
            </form>
            <!-- END LOGIN FORM -->
        </div>
        <div class="copyright"> </div>

    <?php $this->endBody() ?>
    </body>

</html>
<?php $this->endPage() ?>
<script>
$(function(){

    $('#captchaimg').click();
})
</script>