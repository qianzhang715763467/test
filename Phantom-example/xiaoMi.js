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
 
var steps = [
    function() {
      page.open("https://account.xiaomi.com/pass/serviceLogin");
    },
	
    function() {
        var aa = page.evaluate(function(obj) {
            var form = document.getElementById("login-main-form");
            form.elements["username"].value = '15091594967';
            form.elements["pwd"].value = 'mi715763';
            form.elements['login-button'].click();
            return form.nodeName.toLocaleLowerCase();
        });
        console.log(aa)
        loadInProgress = true;
    },
	
    function() {
        page.render('login-succ-xiaomi-1.png');
    }
];
 
/*var interval = */setInterval(function() {
 
    if (!loadInProgress && typeof steps[testindex] == "function") {
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        phantom.exit();
    }
}, 10);