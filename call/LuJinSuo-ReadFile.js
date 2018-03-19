var rf=require("fs");  
var crawlerDate = new Date();
var count = 1;
function callBack(err,data){  
  	if(err){  
      	console.log("error");  
  	}else{ 
	    var obj = {};
    		obj = JSON.parse('['+data+']');
		for(var i = 0; i < obj.length; i++){
			console.log('======================'+i+'=======================');
			console.log(obj[i]);
			//-----------------------------------------  mysql ------------------------------------------------------
	    	var mysql      = require('mysql');
			var connection = mysql.createConnection({
			  host     : 'localhost',
			  user     : 'root',
			  password : '',
			  database : 'websites',
			  port     :  3306
			});
			connection.connect();
			var  addSql = 'INSERT INTO websites(crawlerPage,webName,expectedRate,term,minimum,schedule,crawlerDate) VALUES(?,?,?,?,?,?,?)';
			var  addSqlParams = ['陆金所',obj[i].name,obj[i].expectedRate,obj[i].term,obj[i].minimum,"",crawlerDate];
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
		}
    }  
}  
rf.readFile("LuJinSuo.txt","utf-8",callBack);  
console.log("READ FILE ASYNC END");  