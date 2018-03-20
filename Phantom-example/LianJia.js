var page = require('webpage').create(),
    testindex = 0,
    loadInProgress = false,
    fs = require("fs"),
 	system = require('system'),   
	address = system.args[1],//获得命令行第二个参数 接下来会用到   
 	url = address;
var crawlerDate = new Date();
var size = 1;
var count = 73;
page.onLoadStarted = function() {
    loadInProgress = true;
     console.log("load started");
};
 
page.onLoadFinished = function() {
    loadInProgress = false;
      console.log("load finished");
};
 
 page.onResourceRequested = function (req) {
    console.log('requested: ' + JSON.stringify(req, undefined, 4));
}; 
 
page.onResourceReceived = function (res) {
    console.log('received: ' + JSON.stringify(res, undefined, 4));
}; 
//http://www.greenlandfs.com/product.htm
page.open(url,function(status){
  	if(status != "success"){
		console.log('FAIL to load the address');
	}else{
        setTimeout(function(){
			var title = page.evaluate(function(obj) {
				var arr = [];
				var items = $('#product .product-list .showBox .product-item');
//				var items = document.getElementsByClassName('.product-item');
//				for( i in items ){
//					var nodes = items[i].getElementsByTagName('*');
//					for ( x in nodes) {
//						var className = nodes[x].className;
//						switch(className){
//							case 'prod-name showBox':
//								var webName = $(items[i]).find('.prod-name').children('span:eq(0)').html();// 产品名
//								break;
//							case 'rate-text showBox':
//								var expectedRate = $(items[i]).find('.expected-rate .rate-text').children('span:eq(0)').html();  // 利率
//								break;
//							case 'product-info term postion-relative-z':
//								var term = $(items[i]).find('.term .info-top').children('span:eq(0)').html(); // 期限
//								break;
//							case 'product-info minimum-investment postion-relative-z':
//								var minimum      = $(items[i]).find('.minimum-investment .info-top').children('span:eq(0)').html(); // 起投额度
//								break;
//							case 'product-term-schedule-bar':
//								//var schedule     = $(items[i]).find('.product-term-schedule-bar').width() / $(items[i]).find('.product-term-schedule-bar').children().width();// 进度
//								break;
//							default:
//							 continue;
//						}
//					}
//				}
				for(var i = 0; i < items.length; i++){
					/*var obj = {};
					obj.id   = i+1;
					obj.name = $(items[i]).find('.prod-name').children('span:eq(0)').html();
					obj.expectedRate = $(items[i]).find('.expected-rate .rate-text').children('span:eq(0)').html();
					obj.term = $(items[i]).find('.term .info-top').children('span:eq(0)').html();
					obj.minimum = $(items[i]).find('.minimum-investment .info-top').children('span:eq(0)').html();
					arr.push(obj)*/
					
					//===========================
					var webName      = $(items[i]).find('.prod-name').children('span:eq(0)').html();// 产品名
		        	var expectedRate = $(items[i]).find('.expected-rate .rate-text').children('span:eq(0)').html();  // 利率
		        	var term         = $(items[i]).find('.term .info-top').children('span:eq(0)').html();     // 期限
		        	var minimum      = $(items[i]).find('.minimum-investment .info-top').children('span:eq(0)').html(); // 起投额度
		        	var schedule     = $(items[i]).find('.product-term-schedule-bar').innerWidth() / $(items[i]).find('.product-term-schedule-bar').children().width();
		        	//var schedule     = $(items[i]).find('.product-term-schedule-bar').width() / $(items[i]).find('.product-term-schedule-bar').children().width();// 进度
	        	arr.push(schedule)
	        	//-----------------------------------------  mysql ------------------------------------------------------
		        	/*var mysql      = require('mysql');
					var connection = mysql.createConnection({
					  host     : 'localhost',
					  user     : 'root',
					  password : '',
					  database : 'websites',
					  port     :  3306
					});
					connection.connect();
					var  addSql = 'INSERT INTO websites(id,crawlerPage,webName,expectedRate,term,minimum,schedule,crawlerDate) VALUES('+count+',?,?,?,?,?,?,?)';
					var  addSqlParams = [crawlerPage,webName,expectedRate,term,minimum,schedule,crawlerDate];
					//增
					connection.query(addSql,addSqlParams,function (err, result) {
					        if(err){
					         console.log('[INSERT ERROR] - ',err.message);
					         return;
					        }        
					       console.log('--------------------------INSERT----------------------------');
					       console.log('INSERT ID:',result);        
					       console.log('-----------------------------------------------------------------\n\n');  
						});
						connection.end();
						count ++;
			        })*/
					//============
				}
	        	return arr;
	        });
	      	console.log('=========================================================================')
	      	console.log(JSON.stringify(title))
	    	//  console.log(page.content);
	        page.render('LianJia.txt');
	        phantom.exit();
		},5000)
	}
});