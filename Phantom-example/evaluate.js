// evaluate: webpage环境下执行evaluate传入的回调函数，
// * 在这里执行phantom相关的操作可以避免web页面刺探phantom相关的设置信息。
var page = require('webpage').create();
page.open('http://www.cnblogs.com/front-Thinking/', function(status) {
     var content = page.evaluate(function(){
	     return document.title; 
         });
     console.log(content);
     phantom.exit();
});