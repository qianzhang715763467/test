<?php 
namespace yii\rhy;
use yii;
/**
* @description 发送验证码的程序a
* @date   2015-03-26
* @author gqa
*/
class Vf
{
    

    //发送邮件
    //return array: [state = 1 ]成功, [state=2] 邮件地址错误 [state=3]发送失败
    public static function sendmail($email,$subject,$body)
    {
    	$pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
        if ( !preg_match( $pattern, $email ) ){
            return 2;
        }
        $mail= Yii::$app->mailer->compose();   
        $mail->setTo($email);  
        $mail->setSubject($subject);  
        //$mail->setTextBody('zheshisha ');   //发布纯文字文本
        $mail->setHtmlBody($body);    //发布可以带html标签的文本

        if($mail->send()){  
            return 1; 
        }else{  
            return 3;
        }
    }

    //发送短信
    public static function sendmsg($mobile,$content)
    {  
        
        //$content = '尊敬的用户：欢迎您注册天利来会员！您注册的验证码为9898，请勿告知他人。';
        $content = iconv( "UTF-8", "gb2312" , $content);
        $content = urlencode($content);
        $url = "http://sdk2.028lk.com:9880/sdk2/BatchSend2.aspx?CorpID=GZJS000074&Pwd=tll@666&Mobile=$mobile&Content=$content&SendTime=&cell=";
        $resut = file_get_contents($url);
        if($resut>0){
            return true;
        }else{
            return false;
        }
        
    }
}
?>