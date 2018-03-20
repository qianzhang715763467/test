var page = require('webpage').create();
page.open('http://javascript.ruanyifeng.com', function() {
   var ti = page.evaluate(function() {
      
      return document.title;
   });
   console.log(ti);
  // 引入js文件。
  // * 由于是异步加载，所以phantom.exit()语句要放在page.includeJs()方法的回调函数之中，否则页面会过早退出。
  page.includeJs("http://libs.baidu.com/jquery/2.0.0/jquery.min.js", function() {
    var title = page.evaluate(function() {
     return $("#grammar").html();
    });
    console.log(title);
    phantom.exit()
  });
});