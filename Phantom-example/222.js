var page = require('webpage').create(),
	testindex = 0,
	loadInProgress = false;
 
page.onLoadStarted = function() {
    loadInProgress = true;
     console.log("load started");
};
 
page.onLoadFinished = function() {
    loadInProgress = false;
      console.log("load finished");
};
	page.open('http://www.todayonhistory.com/', function (status) { //打开页面
		if (status !== 'success') {
			console.log('FAIL to load the address');
		} else {
			console.log(page.evaluate(function () {
					var d= ''
					var c = document.querySelectorAll('.list li a')
					var l = c.length;
					for(var i =0;i<l;i++){
					d=d+c[i].title+'\n'
					}
						return d
				}))

		}
		phantom.exit();
	});
