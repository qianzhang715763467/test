var page = require('webpage').create();
page.onLoadStarted =function() {
    loadInProgress =true;
    console.log("load started");
};
 
page.onLoadFinished = function() {
    loadInProgress = false;
    console.log("load finished");
};
page.onUrlChanged = function() {
    console.log("onUrlChanged");
};
 page.open('https://passport.jd.com/new/login.aspx', function() {
    page.includeJs("http://libs.baidu.com/jquery/2.0.0/jquery.min.js", function() {
        var rect = page.evaluate(function() {
            $('#loginname').val('username');
            $('#nloginpwd').val('passwd');
            $('#loginsubmit')[0].click();
            return document.title;
        });
        //若引入jQuery 则用这种方法来实现click
        page.sendEvent('click', rect.left + rect.width / 2, rect.top + rect.height / 2);
        console.log(rect);
        var clock =setTimeout(function(){
            page.render('jdlogin.png');
            phantom.exit();
        },2000);
    });
});
