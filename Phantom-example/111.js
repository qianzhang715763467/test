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
 
var steps = [
    function() {
      page.open("http://www.greenlandfs.com/product.html",function(status){
      	if(status != "success"){
    		console.log('FAIL to load the address');
    	}else{
    		
    	}
      });
    },
    function() {
		page.includeJs('http://www.greenlandfs.com/proxy/greenlandfs_front/front/mainactivity.json');
        var aa = page.evaluate(function(obj) {
        	var arr = [];
        	var myDiv = $('#product .product-item');
            for(var i = 0; i < myDiv.length; i++){
            	arr.push($(myDiv[i]).find('.clearfix').find('span:eq(0)').html());
            }
            return myDiv.length;
        });
        console.log(aa)
        loadInProgress = true;
    }
];
setInterval(function() {
 
    if (!loadInProgress && typeof steps[testindex] == "function") {
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        phantom.exit();
    }
}, 10);