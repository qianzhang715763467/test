// evaluate: webpage������ִ��evaluate����Ļص�������
// * ������ִ��phantom��صĲ������Ա���webҳ���̽phantom��ص�������Ϣ��
var page = require('webpage').create();
page.open('http://www.cnblogs.com/front-Thinking/', function(status) {
     var content = page.evaluate(function(){
	     return document.title; 
         });
     console.log(content);
     phantom.exit();
});