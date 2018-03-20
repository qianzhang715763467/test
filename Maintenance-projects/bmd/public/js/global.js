var g = {};
g.dayPass = false;
g.hourPass = false;

g.init = function () {
    g.dayPass = false;
    g.hourPass = false;
}
g.init();

g.base = "/";
g.maxWidth;

g.w = $(window).width();
g.h = $(window).height();
g.timeout = 10000;
g.pageBottomPadding = 0;

var p = {};

function formatDate(d) {
    d.date = new Date();
    d.month = d.date.format("yyyy年MM月");
    d.month2 = d.date.format("yyyyMM");
    d.fdate = d.date.format("yyyy-MM-dd");
//    d.yestoday = d.date.add('d', -1).format("yyyy-MM-dd");
//    d.date.add('d', 1);
//    d.seven = d.date.add('d', -7).format("yyyy-MM-dd");
//    d.date.add('d', 7);
    d.time = d.date.format("yyyy-MM-dd hh:mm:ss");
    d.hour = d.date.getHours();
    d.mins = d.date.getMinutes();
    d.day = new Date(d.fdate).getDate();
    d.dayPass = false;
    d.hourPass = false;

    return d;
}

formatDate(g);

function dateInterval() {
    var tmp = {};
    formatDate(tmp);
    if (tmp.fdate !== g.fdate) {
        for(var key in tmp){
            g[key] = tmp[key];
        }
        g.dayPass = true;
    }
    if (tmp.hour !== g.hour) {
        for(var key in tmp){
            g[key] = tmp[key];
        }
        g.hourPass = true;
    }
}

window.setInterval(dateInterval, 5000);

g.loadPage = function (url, pageId, noAnimation, params, force, leftToRight) {// 加载页面

    $.showIndicator();// loading 指示器
    g.init();		 // 初始化

    var currentPage = $(".page-current").first();

    if(currentPage && p[currentPage.attr("id")] && p[currentPage.attr("id")].clearInterval){
        p[currentPage.attr("id")].clearInterval();
    }

    $("#"+pageId).undelegate();

    window.setTimeout(function(){
        g.loadPageAction(url, pageId, noAnimation, params, force, leftToRight);
    },100);
};


g.loadPageAction = function (url, pageId, noAnimation, params, force, leftToRight) {

    if($(".page-group").first().find("#" + pageId).length === 0){
        $(".page-group").first().append("<div class='page' id='"+pageId+"'></div>");
    }

    $.showIndicator();

    if (!noAnimation)
        noAnimation = false;

    var html = $("#" + pageId).html();

    var afterLoad = function(){

        $("#" + pageId + " .top-bar-exit").click(function () {
            $.confirm(g.username + ' 确定退出?',
                function () {
                    $.showIndicator();
                    $.ajax({
                        url: '/login/logout',
                        async: true,
                        type: 'POST',
                        timeout: g.timeout,
                        success: function (text, status) {
                            try {
                                if (text === '0')
                                    window.location.href = "/login";
                                else
                                    $.toast("退出失败");
                            } catch (e) {
                                $.toast("退出失败");
                            }
                        },
                        complete: function (XMLHttpRequest, textStatus, errorThrown) {
                            $.hideIndicator();
                        }
                    });
                },
                function () {}
            );
        });

        var menu = $('#' + pageId + ' .dl-menu:first').dlmenu({
            animationClasses: {classin: 'dl-animate-in-3', classout: 'dl-animate-out-3'}
        });

        $("#" + pageId + " .top-bar-add").click(function (e) {
            g.loadPage("/pages/addbmd", "addbmd", true, null, true, true);
        });

        $("#" + pageId + " .top-bar-query").click(function (e) {
            g.loadPage("/pages/querybmd", "querybmd", true, null, true, true);
        });

        $("#" + pageId + " .top-bar-list").click(function (e) {
            g.loadPage("/saler/submitedHistory", "submitedHistory", true, null, true, true);
        });

        $("#" + pageId + " .top-bar-verify").click(function (e) {
            g.loadPage("/leader/submitedHistory", "submitedHistory", true, null, true, true);
        });

        $("#" + pageId + " .top-bar-setting").click(function (e) {
            g.loadPage("/pages/updatePass", "updatePass", true, null, true, true);
        });

        $("#" + pageId + " .report-date:first").calendar();

        $("#" + pageId + " .report-date").change(function () {

            try {
                p[pageId].params.date = $(this).val();

                if(typeof p[pageId].dateChange === "function"){
                    $("#" + pageId + " .span-date").html(p[pageId].params.date);
                    p[pageId].dateChange();
                }

                //$.cookie(pageId, p[pageId].params.date);


            } catch (e) {
                console.debug(e);
                $.hideIndicator();
            }
        });


        try {
            if (p[pageId] && p[pageId].initPage) {
                if($.cookie(pageId) !== "null" && $.cookie(pageId)){
                    p[pageId].params.date = $.cookie(pageId);
                }else {
                    p[pageId].params.date = g.fdate;
                }

                $("#" + pageId + " .span-date").html(p[pageId].params.date);


                if(params){
                    for(var key in params){
                        p[pageId].params[key] = params[key];
                    }
                }

                p[pageId].initPage();

                if(p[pageId].setInterval){
                    p[pageId].setInterval();
                }

                $.cookie(pageId, null);

                $("#" + pageId + " .content").width(g.maxWidth > g.w ? g.w : g.maxWidth);
            }
        } catch (e) {
            console.error(e);
        } finally {
            // window.setTimeout(function(){
            //     closer();
            // }, 1000*10);
        }
    };


    var load = function () {

        $.router.loadPage({
            url: "#" + pageId,
            noAnimation: false,
            replace: false
        });

        if(noAnimation){
            afterLoad();
        }else {
            $(document).one("pageAnimationEnd", "#"+pageId, function (e, pageId, $page) {
                afterLoad();
            });
        }

    };

    if (force || !html || html.length === 0) {//force to load page

        $("#" + pageId).children().remove();
        $.ajax({
            url: url,
            async: false,
            type: 'get',
            headers:{rtype:"page"},
            success: function (text, status) {
                if(text === ""){
                    $.hideIndicator();
                    console.debug("no page get");
                    window.location.href = "/";
                }else{
                    $("#" + pageId).html(text);
                    load();
                }
            },
            error: function (XMLHttpRequest, status, errorThrown) {
                $.hideIndicator();
                console.debug("get page error")
            }
        });
    }else{
        load();
    }
    //$('.page').trigger("click");
};



g.queryData = function (url, data, callback, timeout, err_message) {

    $.showIndicator();
    if(!timeout){
        timeout = g.timeout;
    }
    console.debug(timeout)
    $.ajax({
        url: url,
        async: true,
        type: 'POST',
        timeout: timeout,
        data: data,
        headers:{rtype:"query"},
        success: function (text, status) {

            try {
                var o = JSON.parse(text);
                try{
                    if(typeof o.message === "string")
                        o.message = JSON.parse(o.message);
                }catch (e){
                    console.debug("o.message to json faild");
                }
                callback(o);

            } catch (e) {
                console.debug(text);
                console.debug(e);
            }
        },
        error: function (XMLHttpRequest, status, errorThrown) {
            $.toast("获取数据超时");
        },
        complete:function (XMLHttpRequest, status) {
           $.hideIndicator();
        }
    });
};

g.parseFloat = function (record, value, x) {
    return parseFloat(value).toFixed(2);
};

var termType = String(navigator.platform).toLocaleLowerCase();
if (termType === "iphone" || termType.indexOf("linux") >= 0) {//phone
    g.terminal = "phone";
    g.maxWidth = g.w;
} else if (termType.indexOf("mac") >= 0 || termType.indexOf("win") >= 0) {
    g.terminal = "pc";
    g.maxWidth = 1000;
    g.pageBottomPadding = 20;
}

g.alert = function (message) {
    alert(message);
};

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});



