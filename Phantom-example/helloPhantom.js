//====================== a phantomjs example =========================//

// "webpage" phantom核心模块之一；提供了访问，操作，选择web文档的接口。
var page = require('webpage').create();
// http请求的配置对象，提交方式；
var settings = {
  operation: "POST",
  encoding: "utf8",
  headers: {
    "Content-Type": "application/json"
  },
  data: JSON.stringify({
    some: "data",
    another: ["custom", "data"]
  })
};
// 规定输出的编码格式、避免乱码；
phantom.outputEncoding="gbk";
// open（url,get,参数,callback函数）
page.open("http://www.cnblogs.com/front-Thinking",settings,function(status) {
   // 检查回调状态
   if ( status === "success" ) {
   // 状态正确，打印 url指定文档的title；
      console.log(page.title); 
   } else {
      console.log("Page failed to load."); 
   }
   // 程序运行结束，退出 phantomjs 运行环境；
   phantom.exit(0);
});