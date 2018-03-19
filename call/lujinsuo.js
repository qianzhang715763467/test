var page = require('webpage').create(),
    testindex = 0,
    loadInProgress = false,
    fs = require("fs");
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
var crawlerDate = new Date();
var size = 1;
var testindex = 0;
var circle = setInterval(function(){
    testindex++;
    if(testindex === 51){
        clearInterval(circle);
        phantom.exit();
    }
	var Url = 'https://list.lu.com/list/dingqi?minMoney=&maxMoney=&minDays=&maxDays=&minRate=&maxRate=&mode=&tradingMode=&isOverdueTransfer=&isCx=&currentPage='+testindex+'&orderCondition=&isShared=&canRealized=&productCategoryEnum=&riskLevel=';
    page.open(Url, function(status) {
        if(status == 'fail'){
            testindex--;
            return;
        }
        var rect = page.evaluate(function() {
            var titleArr = [];
			var items = $('.main-list .product-list');
			for(var i = 0; i < items.length; i++){
				var obj = {};
					obj.id           = i+1;
					obj.name         = $(items[i]).find('.product-name').children('a').html();		   // 产品
					obj.expectedRate = $(items[i]).find('.interest-rate p').html();					   // 利率
					obj.term         = $(items[i]).find('.invest-period p').text().replace(/\s+/g,""); // 期限
					obj.minimum      = $(items[i]).find('.product-amount p').text().replace(/\s+/g,"");// 起投额度
					obj.schedule     = $(items[i]).find('.product-status .progress-txt').text();       // 进度
				titleArr.push(obj);
			}
            return titleArr;
        });
        if(rect == null){
            testindex--;
            return;
        }
        file = fs.open("LuJinSuo.txt", 'a');
        for(var h = 0; h < rect.length; h++){
        	// 手动删除最后一个 ,
    		file.write(JSON.stringify(rect[h])+',');
        }
        file.close();
    });
},8000);
