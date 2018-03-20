var bar = function (i, o) {

    var b, id, options = {}, _id;
    var bars, xscale, wrapper = $("<div></div>"), barsWrapper, xscaleWrapper;
    var barMargin = 30, startBarMargin = 30, barWidth = 3;

    function initOption() {
        options.x = [];
        options.y = [];
        options.showAll = true;
//                    options.xs = [];//which x to show
//                    options.xm = options.x.length;//how many x to show

    }

    (function (i, os) {
        id = i;
        _id = "#" + id;
        b = $(_id);
        initOption();
        for (var o in os) {
            options[o] = os[o];
        }
        options.ymax = 0;
        if (options.y) {
            for (var i = 0; i < options.y.length; i++) {
                if (options.y[i] > options.ymax)
                    options.ymax = options.y[i];
            }
        }
        console.debug(options);

        var tmp = $("<a>" + options.x[0] + "</a>").appendTo($("body"));
        tmp.css("visibility", "hidden");
        barMargin = tmp.width();
        tmp.remove();
        //init();
        initBarMargin();
        initTitle();
        initYscale();
        initBar();
        initXscale();
        initWrapper();
    })(i, o);

    function init() {
    	// #chart-common style
    }

    function initBar() {
        bars = $("<div class='main-contentX'></div>");
        bars.css("min-width", b.width());
        bars.css("height", b.height());
        bars.width(barMargin * (options.x.length - 1) + startBarMargin * 2);
        //alert(startBarMargin);
        for (var i = 0; i < options.x.length; i++) {
            var l = i * barMargin + startBarMargin;
            if (i === 0) {
                l = startBarMargin;
            }
            l = l + "px";
            var d = $("<li class='pillar'></li>");
            if (options.t && options.t[i])
                d.html(options.t[i]);
            else
                d.html(options.y[i]);
            d.width(barWidth);
            d.height(options.y[i] / options.yScaleMax * (b.height()));
            d.css("left", l);
            bars.append(d);
        }
    }

    function initXscale() {
        xscale = $("<div class='main-scaleX'></div>");
        xscale.width(bars.width());
        for (var i = 0; i < options.x.length; i++) {
            var l = i * barMargin + startBarMargin;
            if (i === 0) {
                l = startBarMargin;
            }
            var tmp = $("<a>" + options.x[i] + "</a>").appendTo($("body"));
            tmp.css("visibility", "hidden");
            console.debug(tmp.width());
            //l = (l + tmp.width()/2 )+ "px";
            l = (l + barWidth / 2 - tmp.width() / 2 + 3) + "px";
            var s = $("<span></span>");
            s.html(options.x[i]);
            s.css("position", "absolute");
            s.css("left", l);
            xscale.append(s);
            tmp.remove();
        }
    }

    function initYscale() {
//      if (options.unit) {
//          var u = $("<span class='chart-unit'></span>");
//          u.html(options.unit);
//          u.appendTo(b);
//      }
        var c = Math.ceil(options.ymax / 5);
        var base = [1, 2, 5];
        var loops = 0;
        var step = 0;
        var maysteps = [];

        while (step === 0) {
            for (var i = 0; i < base.length; i++) {
                var s = base[i] * Math.pow(10, loops);
                if ((c - s) < 0) {
                    var pre = maysteps.pop();
                    step = Math.abs(c - s) > Math.abs(c - pre) ? pre : s;
                    break;
                }
                maysteps.push(s);
            }
            loops++;
        }

        var scales = [step];
        while (scales[scales.length - 1] < options.ymax) {
            var scale = step + scales[scales.length - 1];
            scales.push(scale);
        }
        options.yScaleMax = scales[scales.length - 1];
        /*for (var i = 0; i < scales.length; i++) {
            var t = b.height() - scales[i] / scales[scales.length - 1] * b.height();
            // Y axle scale mark
            var l = $("<div class='scaleMarkY'></div>");
            l.appendTo(b);
            l.height(1);
            l.width(5);
            l.css("position", "absolute");
            l.css("border-top", "1px solid #000");
            l.css("top", t);
            l.css("left", (-l.width()) + "px");
            
            // Y axle scale range
            var p = $('<p class="scaleRangeY"></p>');
            p.appendTo(b);
            p.height(1);
            p.css("position", "absolute");
            p.css("border-top", "1px solid #cdcdcd");
            p.css('margin','0');
            p.css('padding','0');
            p.css("top", t);
            p.css("left","0px");
            p.css("width",b.width());
            
            // Y axle scale value
            var s = $('<div class="scaleValueY"></div>');
            s.html(scales[i]);
            s.appendTo(b);
            s.css("position", "absolute");
            s.css("font-size", "12px");
            s.css("top", t - s.height()/3);
            s.css("left", (-s.width() - 10) + "px");
        }*/
        console.debug(scales);
    }

    function initBarMargin() {

        if (options.showAll) {
            barMargin = Math.round(b.width() / (options.x.length));
            startBarMargin = barMargin / 2;

        } else {
            if (barMargin * (options.x.length - 1) + startBarMargin * 2 > b.width()) {
                startBarMargin = barMargin / 2;
            } else {
                barMargin = Math.round(b.width() / (options.x.length));
                startBarMargin = barMargin / 2;
            }
        }

        barWidth = barMargin * 0.6;
        console.debug(barWidth);
        //startBarMargin = barWidth
    }

    function initWrapper() {
    	// #chart-common > scroll box
        var f = $("<div class='chart-main'></div>");
        f.append(bars);
        f.append(xscale);
        f.width(b.width());
        f.css("overflow-x", "scroll");
        f.appendTo(b);
        f.scrollLeft(bars.width() - f.width());
    }

    function initTitle() {
    	// #chart-common > title 
        if (options.title) {
            var title = $("<h3 class='chart-title'></h3>");
            title.html(options.title);
            title.appendTo(b);
            title.css("left", (b.width() - title.width()) / 2 + "px");
        }
    }
};