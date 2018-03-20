var page   = require('webpage').create(),
    system = require('system'),
    t,
    address;

// ���������û�и�����ַ
if(system.args.length === 1){
   console.log('Usage:page.js<some URL>');
   phantom.exit();
}else{
   address = system.args[1];
   // �������̨��ʾ����
   page.onConsoleMessage = function(msg){
       console.log('Page title is'+ msg);
   };
   // Ĭ���û�����
   console.log('The default user agent is ' + page.settings.userAgent);
   page.settings.userAgent = 'SpecialAgent';

   // ��ȡ��ҳ������Ϣ
   page.open(address,function(status){
       if(status !== 'success'){
	   console.log('Unable to access network');
       }else{
	   page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js",function(){
                page.evaluate(function(){
                    $('#u1').childen('a').eq(0).click();
		    
                })
	   })
	  
       }
       phantom.exit();
   })
}