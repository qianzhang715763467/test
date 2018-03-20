var g = {};
g.dayPass = false;
g.hourPass = false;

g.base = "/";
g.maxWidth = 1100;

g.w = $(window).width();
g.h = $(window).height();

var p = {};

var f0 = {};
p.assetFlow = f0;
var f1 = {};
p.chartCommon = f1;



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
//var ddd = new Date();
//for(;;){
//    var m = ddd.add('m', -1).format("yyyyMM");
//    console.debug(m);
//    if(m === "201603")
//        break;
//}

function dateInterval() {
    var tmp = {};
    formatDate(tmp);
    if (tmp.fdate !== g.fdate) {
        g.dayPass = true;
        g = tmp;
    }
    if (tmp.hour !== g.hour) {
        //alert(tmp.hour + "-" + g.hour);
        g.hour = tmp.hour;
        g.hourPass = true;
    }
}

(function ($) {
    $.getUrlParam = function (name)
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }
})(jQuery);


g.timeout = 10000;

g.loadPage = function (pageId, noAnimation, param, force) {

    if (!noAnimation)
        noAnimation = false;

    p[pageId].param = param;
    var html = $("#" + pageId).html();

    var load = function () {
        $.router.loadPage({
            url: "#" + pageId,
            noAnimation: noAnimation,
            replace: false
        });
        if(noAnimation){
            p[pageId].init();
        }
    };

    if (force || !html || html.length === 0) {
        $.ajax({
            url: "/pages/" + pageId,
            async: false,
            type: 'POST',
            success: function (text, textStatus) {
                $("#" + pageId).children().remove();
                $("#" + pageId).html(text);
                load();
            }
        });
    }else{
        load();
    }


    //$('.page').trigger("click");
}

g.queryData = function (date, url, callback) {
    date = date.replace(/-/g, '');
    $.ajax({
        url: url,
        async: true,
        type: 'POST',
        timeout: g.timeout,
        data: {day: date},
        xhrFields: {
            withCredentials: false
        },
        success: function (text, textStatus) {
            try {
                var o = JSON.parse(text);
                callback(o);
            } catch (e) {
                //console.error(e);
                $.hideIndicator();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.hideIndicator();
            $.toast("获取数据超时");
        }
    });
};

g.parseFloat = function (record, value, x) {
    return parseFloat(value).toFixed(2);
};

var termType = String(navigator.platform).toLocaleLowerCase();
if (termType === "iphone" || termType.indexOf("linux") >= 0) {//phone
    g.terminal = "phone";
} else if (termType.indexOf("mac") >= 0 || termType.indexOf("win") >= 0) {
    g.terminal = "pc";
} else {

}


g.alert = function (message) {
    alert(message);
};


function submit(windowId) {
    var s = true;
    $("#" + windowId + " form input").each(function () {
        if ($(this).val().length === 0) {
            s = false;
        }
    });
    var error = $("#add-flow-form-win .ui.error.message")[0];
    if (s) {
        var but = $("<button class='submit' />").hide();
        $("#add-flow-form-win form").append(but);
        $(error).html("");
        ajaxSubmitter(but);
    } else {
        $(error).html("<p>以下有未填项</p>");
        console.debug(error);
    }
    event.stopPropagation();
    return false;
}

function ajaxSubmitter(submitBut) {

    var form = $(submitBut).parent("form");
    var url = form.attr("action");
    var data = form.serialize();

    $.ajax({
        url: url,
        async: true,
        type: 'POST',
        data: data,
        beforeSend: function (XMLHttpRequest) {
            $(submitBut).attr("disabled", true);
        },
        success: function (text, textStatus) {
            try {
                var o = jQuery.parseJSON(text);
                if (textStatus === 'success') {
                    g.alert(o.message);
                }
            } catch (e) {
                g.alert(text);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            $(submitBut).attr("disabled", false);
        }
    });
}