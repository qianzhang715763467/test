var page = require('webpage').create(),
	system = require('system');
var spawn = require("child_process").spawn

if(system.args.length === 1) {
	console.log('Usage: netsniff.js <some URL>');
	phantom.exit(1);
} else {
	var urls = [];
	var address = system.args[1],
		url = address;
		
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
	page.onResourceReceived = function(res) {
		if(res.stage === 'start') {
			urls.push(res.url);
		}
	};
	page.open(url, function(status) {
		console.log(status)
		var har;
		if(status != "success"){
			console.log('FAIL to load the address');
			phantom.exit(1);
		} else {
			console.log('down resource ' + urls.length + ' urls.');
			var child = spawn("node", ["--harmony", "downHtml.js", urls.join(',')])
			child.stdout.on("data", function(data) {
				console.log(data);
			})
			child.stderr.on("data", function(data) {
				console.log(data);
			})
			child.on("exit", function(code) {
				phantom.exit();
			})
		}
	});
}