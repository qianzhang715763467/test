var page = require('webpage').create(),
    testindex = 0,
    loadInProgress = false,
    fs = require("fs"),
 	system = require('system'),   
	address = system.args[1],//获得命令行第二个参数 接下来会用到   
 	url = address;
var crawlerDate = new Date();
var size = 1;
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
//http://www.greenlandfs.com/product.html
page.open('http://www.greenlandfs.com/product.html',function(status){
  	if(status != "success"){
		console.log('FAIL to load the address');
	}else{
        setTimeout(function(){
			var title = page.evaluate(function(obj) {
				var arr = [];
				var items = $('#product .product-list .showBox .product-item');
				for(var i = 0; i < items.length; i++){
					var obj = {};
						obj.id   		 = i+1;
						obj.name 		 = $(items[i]).find('.prod-name').children('span:eq(0)').html();					// 产品
						obj.expectedRate = $(items[i]).find('.expected-rate .rate-text').children('span:eq(0)').html();		// 利率	
						obj.term 		 = $(items[i]).find('.term .info-top').children('span:eq(0)').html();				// 期限
						obj.minimum 	 = $(items[i]).find('.minimum-investment .info-top').children('span:eq(0)').html();	// 起投金
						obj.schedule   = $(items[i]).find('.product-status .progress-txt').text();       					// 进度
					arr.push(obj)
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
				}
	        	return arr;
	        });
	      	console.log('=========================================================================')
	        file = fs.open("LvDi.txt", 'a');
	            file.write(JSON.stringify(title));
	        file.close();
	        phantom.exit();
		},10000)
	}
});