var page = require('webpage').create();
page.open('http://javascript.ruanyifeng.com', function() {
   var ti = page.evaluate(function() {
      
      return document.title;
   });
   console.log(ti);
  // ����js�ļ���
  // * �������첽���أ�����phantom.exit()���Ҫ����page.includeJs()�����Ļص�����֮�У�����ҳ�������˳���
  page.includeJs("http://libs.baidu.com/jquery/2.0.0/jquery.min.js", function() {
    var title = page.evaluate(function() {
     return $("#grammar").html();
    });
    console.log(title);
    phantom.exit()
  });
});