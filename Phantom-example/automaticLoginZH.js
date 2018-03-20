var page = require('webpage').create(),
    testindex = 0,
    finalAns = [],
    fs = require("fs");
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
var circle = setInterval(function(){
    testindex++;
    if(testindex === 51){
        clearInterval(circle);
        phantom.exit();
    }
    page.open('http://www.zhihu.com/topic/19559937?page='+testindex, function(status) {
        if(status == 'fail'){
            testindex--;
            return;
        }
        var rect = page.evaluate(function() {
            var titleArr = [];
            window.scrollTo(0,document.body.scrollHeight);
                var title = $('.feed-item .question_link');
                for(var j = 0; j < title.length; j++){
                    titleArr[j] = title[j].text;
                }
            return titleArr;
        });
        if(rect == null){
            testindex--;
            return;
        }
        file = fs.open("liuxue.txt", 'a');
        for(var h = 0; h < rect.length; h++){
            file.write(rect[h]+'\n');
        }
        file.close();
    });
},2000);