// table
var htable = {
    create: function (id, hack) {

        if (!id) {
            console.error("id is empty");
            return;
        }
        var t = {};
        t.id = id;
        t.data = [];
        t.fixColumns = [];
        t.scrollColumns = [];
        t.floatScrollTableTitlePanel;
        t.floatTitle;
        t.scrolleft = 0;
        t.scrollingLeft = false;
        t.floatScrollingLeft = false;
        t.additionHeight = 0;
        t.orderBy = undefined;//desc asc undefined
        t.maxHeight = 0;
        t.maxWidth = 0;
        t.afterRender = [];
        t.limit = 0;
        t.step = 35;
        t.tbodyHeight = 0;
        t.adding = false;
        t.searchFields = [];

        t.reset = function () {
            t.limit = 0;
            t.tbodyHeight = 0;
            t.adding = false;
        };

        t.setMaxHeight = function (max) {
            t.maxHeight = max;
            if(g.terminal == "pc"){
                t.maxHeight = t.maxHeight - 25;
            }
        };

        t.setMaxWidth = function (max) {
            t.maxWidth = max;
        };

        var root = $("#" + id);//render to
        t.root = root;

        if (root.css("position") === "static")
            root.css("position", "relative");

        t.setAdditionHeight = function (height) {
            t.additionHeight = height;
        };

        if(g.terminal === "pc"){
            t.scrollbarWidth = (function () {
                var oP = document.createElement('p'),
                    styles = {
                        width: '100px',
                        height: '100px',
                        overflowY: 'scroll'
                    }, i, scrollbarWidth;
                for (i in styles)
                    oP.style[i] = styles[i];
                document.body.appendChild(oP);
                scrollbarWidth = oP.offsetWidth - oP.clientWidth;
                $(oP).remove();
                return scrollbarWidth;
            })();
        }else {
            t.scrollbarWidth = 0;
        }


        t.loadData = function (data) {
            t.data = data;
            t.render();
            return t;
        };

        t.bornFrame = function () {

            t.grandfather = $("<div></div>").appendTo(root);//table grandfather
            t.father = $("<div></div>").appendTo(t.grandfather);//table father
            t.grandfather.addClass("jout");

            t.fixTable = $("<table style='table-layout:auto'></table>");
            t.scrollTable = $("<table></table>");

            t.father.css({
                position: 'relative',
                margin: 0,
                overflowY: 'hidden',
            });

            $("<div class='tab'></div>").append(t.fixTable).appendTo(t.father);
            $("<div class='tab' style='overflow-x:scroll;-webkit-overflow-scrolling:touch'></div>").append(t.scrollTable).appendTo(t.father);

        };

        t.reLoadData = function (data) {

            t.data = data;
            t.refreshTable();
        };

        t.render = function () {

            t.reset();
            t.root.children().remove();

            t.bornFrame();
            if (t.fcolumns) {
                t.setFixcolumnsHtml(t.fcolumns);
            }
            t.setScrollColumnsHtml(t.scolumns);


            t.refreshTable();

            var fixPanel = t.fixTable.parent();
            var scrollPanel = t.scrollTable.parent();

            if (Object.getOwnPropertyNames(t.fixColumns).length === 0)
                fixPanel = null;


            var fixPanelHeight;
            var fixPanelWidth;
            var scrollPanelHeight = (t.data.length) * 35;

            if (!fixPanel) {
                fixPanelWidth = 0;
                fixPanelHeight = 0;
                t.fixTable.parent().remove();
            } else {
                fixPanelWidth = t.fixTable.width();
                fixPanel.css({
                    top: 0,
                    left: 0
                });
                //t.maxHeight = t.scrollTable.height();
                root.height(t.maxHeight);
            }


            var tableWidth = root.width() > g.maxWidth ? g.maxWidth:root.width(); //> t.maxWidth ? t.maxWidth : root.width();


            scrollPanel.css({
                top: 0,
                left: fixPanelWidth,
                width: tableWidth - fixPanelWidth,
                padding: 0,
                margin: 0,
            });

            t.repairHeight();

            if (t.maxHeight === 0){
                t.maxHeight = t.scrollTable.height();
            }

            root.height(t.maxHeight > t.scrollTable.height() ? t.scrollTable.height() : t.maxHeight);


            if (scrollPanel.width() >= t.scrollTable.width()) {
                t.scrollTable.width(scrollPanel.width());
                scrollPanel.css("overflow", "hidden");
            }

            t.father.width(tableWidth);
            t.father.height(t.scrollTable.height());

            t.grandfather.css("max-height", (t.maxHeight - t.additionHeight) + "px");

            t.grandfather.width(tableWidth + t.scrollbarWidth);

            scrollPanel.scroll(function () {

                var target = $(this);
                var sl = target.scrollLeft();
                t.scrolleft = sl;

                t.floatScrollTableTitlePanel.scrollLeft(sl);
                if (t.footTable)
                    t.footTable.scrollTable.parent().scrollLeft(sl);
            });

            // t.grandfather.scroll(function () {
            //
            //     var st = $(this).scrollTop();
            //     if (t.grandfather.beforeScroll < st)
            //         t.grandfather.up = false;
            //     else
            //         t.grandfather.up = true;
            //     t.grandfather.beforeScroll = st;
            //
            //     if (t.grandfather.up)
            //         t.grandfather.scrollAnimate = false;
            //
            //     if ((t.tbodyHeight - st) <= $(this).height() && !t.adding) {
            //         //$.showIndicator();
            //         try {
            //             t.adding = true;
            //             t.refreshTable();
            //             t.repairHeight();
            //             //console.debug("+" + t.tbodyHeight);
            //             t.adding = false;
            //             t.father.height(t.scrollTable.height());
            //         } catch (e) {
            //             console.error(e);
            //         }
            //     }
            // });

            // scrollPanel.bind("touchstart", function () {
            //     t.floatTitle.css("z-index", -1);
            // });

            t.floatScrollTableTitlePanel = scrollPanel.clone();
            t.floatScrollTableTitlePanel.find("tbody:first").hide();
            t.floatScrollTableTitlePanel.css("-webkit-overflow-scrolling","touch");

            // t.floatScrollTableTitlePanel.bind("touchstart", function () {
            //     event.preventDefault();
            // });

            if (t.floatTitle)
                t.floatTitle.remove();
            t.floatTitle = $("<div class='float-title'></div>");

            if (fixPanel) {
                t.floatFixTableTitlePanel = fixPanel.clone();
                t.floatFixTableTitlePanel.find("tbody:first").hide();
                t.floatTitle.append(t.floatFixTableTitlePanel);
            }
            t.floatTitle.append(t.floatScrollTableTitlePanel);
            t.floatTitle.css({
                width: tableWidth,
                height: scrollPanel.find("thead:first").height()
            });
            t.floatTitle.width(tableWidth).height(scrollPanel.find("thead:first").height());

            root.append(t.floatTitle);

            if (t.data.length === 1) {
                t.scrollTable.find("tr:last-child td").each(function () {
                    $(this).css("border-bottom", "2px solid #ccddff");
                });
                if (fixPanel) {
                    t.fixTable.find("tr:last-child td").each(function () {
                        $(this).css("border-bottom", "2px solid #ccddff");
                    });
                }
            }

            $(".sort-triangle-th").click(function () {
                $.showIndicator();
                var tt = $(this);
                window.setTimeout(function () {
                    t.sort(tt.attr("data-field"));
                    $.hideIndicator();

                }, 200);

            });
            //t.floatTitle.find("thead:first").css("visibility", "visible");
            t.scrollTable.find("thead").css("visibility", "hidden");
            t.fixTable.find("thead").css("visibility", "hidden");

            t.floatScrollTableTitlePanel.bind("touchstart", function () {
                event.preventDefault();
            });

            t.floatScrollTableTitlePanel.css("overflow-x", "hidden");


            // if(g.terminal === "pc"){
            //     t.scrollTable.parent().css("overflow-x", "scroll");
            //
            //     t.scrollTable.parent().scroll(function () {
            //         var target = $(this);
            //         var sl = target.scrollLeft();
            //         t.floatScrollTableTitlePanel.scrollLeft(sl);
            //     });
            // }

            t.setScroll = function () {
                if(!t.footTable){
                    if(t.scrollTable.width() > t.root.width()){
                        t.root.height(t.root.height() + t.scrollbarWidth);
                        t.father.height(t.father.height() + t.scrollbarWidth);
                    }
                }
            }
        };

        t.createSearchePanel = function () {
            console.debug(t.searchFields)
            //alert(Object.getOwnPropertyNames(t.searchFields).length);
            if(t.searchFields.length > 0){
                var w = 200;
                t.searchPanel = $("<div class='table-searchePanel'><div class='table-condition'><button style='button'>确定</button></div><div class='table-condition-title'>选择一个<span></span></div><div class='table-show-condition'></div></div>");
                var footHeight = (!t.footTable || !t.footTable.scrollTable) ? 0 : t.footTable.scrollTable.height();
                t.searchPanel.width(w).height(t.root.height() + footHeight);
                t.searchPanel.css("left", -(w+20)).css("z-index", 101).css("min-height", (t.maxHeight - 80)+"px");
                t.root.append(t.searchPanel);
                //
                var id = t.root.attr("data-pageid");
                $("#" + id).find(".top-bar-search").first().css("display", "block");

                $("#" + id).find(".top-bar-search").first().click(function (e) {
                    var p = t.searchPanel;
                    if(p.css("left") === "0px"){
                        p.animate({left:-(p.width() + 20)+ "px"});
                    }else{
                        p.animate({left:"0px"});
                        window.setTimeout(function () {
                            if(t.searchPanel.find(".table-condition").first().find("span").length == 0){
                                t.querySCondition(0);
                            }
                        },400);
                    }
                });

                t.searchPanel.find(".table-show-condition").first().delegate("div","click",function(e){

                    if(!($(e.target)[0].tagName === "SPAN"))
                        return;
                    var c = t.searchPanel.find(".table-condition").first();
                    var order = parseInt($(e.target).attr("data-order"));

                    var th = this;
                    var add = true;
                    c.find("span").each(function () {
                        if($(this).text() === $(th).text())
                            add = false;
                        if(order === parseInt($(this).attr("data-order")))
                            add = false;
                    });

                    if(add){
                        c.append("<div><div>+</div>" + $(this).html() + "</div>");
                        t.searchFields[order].value = $(this).text();
                        t.querySCondition(++order);
                    }
                });

                t.searchPanel.find(".table-condition").first().delegate("span","click",function(e){
                    var order = parseInt($(this).attr("data-order"));
                    t.searchPanel.find(".table-condition").first().find("span").each(function () {
                        var o = parseInt($(this).attr("data-order"));
                        if(o >= order) {
                            delete t.searchFields[o].value;
                            $(this).parent().remove();
                        }
                    });

                    t.querySCondition(order);
                });

                t.searchPanel.find(".table-condition").first().find("button").click(function () {

                    t.searchPanel.find(".table-condition").first().find("span").each(function () {
                        var order = parseInt($(this).attr("data-order"));
                        t.searchFields[order].value = $(this).text();
                    });

                    var pm = {};
                    for(var i in t.searchFields){
                        if(!t.searchFields[i].value){
                            $.toast("请选择到物业中心");
                            return;
                        }
                        pm[t.searchFields[i].field] = t.searchFields[i].value;
                    }

                    var id = t.root.attr("data-pageid");
                    pm.id = p[id].params.ds_id;
                    pm.date = p[id].params.date;

                    console.debug(pm)

                    p[id].initPage(pm);
                });
            }
        }

        t.querySCondition = function (index) {

            if(index >= t.searchFields.length)
                return;

            t.searchPanel.find(".table-condition-title").first().find("span").text(t.searchFields[index].title);

            var pm = {id:t.searchFields[index].ds_id};
            console.debug(pm)
            for(var i=0;i<index;i++){
                pm[t.searchFields[i].field] = t.searchFields[i].value;
            }
            g.queryData("/query/ds", pm, function (data) {

                var p = t.searchPanel;
                console.debug(data);
                data = (eval(data)).details.list.values;

                var s = p.find(".table-show-condition").first();
                s.children().remove();
                for(var i in data){
                    s.append("<div><span data-order="+index+">" + data[i][t.searchFields[index].field] + "</span></div>");
                }
            });
        }


        t.removeSearchePanel = function () {
            if(t.searchPanel)
                t.searchPanel.remove();
        }

        t.setFullVeil = function () {
            var veilFloat = $("<div class='veil-float'></div>");
            veilFloat.appendTo(root);
            veilFloat.width(root.width()).height(root.height());
        };

        t.setFootTable = function (foot) {

            // var w1 = $("<div style='position: absolute;overflow: scroll;top:0;left:0;z-index:999999;'>2342134134</div>");
            // var w2 = $("<div style='overflow: hidden;'>23423423</div>");
            // w1.width(t.root.width()).height(t.root.height());
            // w2.width(t.scrollTable.width()).height(t.scrollTable.height());
            //
            // w1.append(w2).appendTo(t.grandfather);


            t.footTable = foot;
            foot.root.find("tr").css("background-color", "#59d8ef");
            t.grandfather.height(t.root.height());
            t.fixTable.children("tbody:first").children("tr:last").find("td").css("border-bottom", "none");
            t.scrollTable.children("tbody:first").children("tr:last").find("td").css("border-bottom", "none");

            foot.hideThead()
            foot.root.bind("touchstart", function () {
                event.preventDefault();
            });
            if(g.terminal === "pc"){
                t.scrollTable.parent().unbind("scroll");
                t.scrollTable.parent().css("overflow-x", "hidden");
                t.footTable.scrollTable.parent().css("overflow-x", "scroll");
                t.footTable.scrollTable.parent().scroll(function () {
                    var target = $(this);
                    var sl = target.scrollLeft();
                    t.scrolleft = sl;
                    t.scrollTable.parent().scrollLeft(sl);
                    t.floatScrollTableTitlePanel.scrollLeft(sl);
                });
            }
            return t;
        };

        t.hideThead = function () {
            root.find("thead").hide();
            root.find(".float-title").hide();
            return t;
        };

        t.setScroll = function () {
            if(!t.footTable){
                if(t.scrollTable.width() > t.root.width()){
                    //alert(t.root.height());
                    t.root.height(t.root.height() + t.scrollbarWidth);
                    //alert(t.root.height());
                    t.father.height(t.father.height() + t.scrollbarWidth);
                }
                console.debug(t.scrollTable.width());
                console.debug(t.root.width());
            }
        }

        // t.initBottomTable = function (data) {
        //
        //     var tds1 = t.fixTable.children("thead:first").children("tr:first").html();
        //     var tds2 = t.scrollTable.children("thead:first").children("tr:first").html();
        //     var bt = $("<table class='bottom-table'><thead><tr>" + tds1 + tds2 + "</tr></thead></table>").appendTo(root);
        //     //console.debug(data.length);
        //     for (var i = 0; i < data.length; i++) {
        //         var tr = $("<tr></tr>");
        //         for (var column in data[i]) {
        //             if (!(column in t.fixColumns) && !(column in t.scrollColumns)) {
        //                 continue;
        //             }
        //             var fieldOption = t.scrollColumns[column] ? t.scrollColumns[column] : t.fixColumns[column];
        //
        //             if ("width" in fieldOption)
        //                 tr.append("<td width=" + fieldOption["width"] + ">" + data[i][column] + "</td>");
        //             else
        //                 tr.append("<td>" + data[i][column] + "</td>");
        //         }
        //         tr.appendTo(bt);
        //     }
        //     t.footTable = bt;
        // };

        t.repairHeight = function () {

            if (Object.getOwnPropertyNames(t.fixColumns).length === 0)
                return;

            var fixThead = t.fixTable.find("thead:first");
            var scrollThead = t.scrollTable.find("thead:first");

            var realHeight = fixThead.height() < scrollThead.height() ? scrollThead.height() : fixThead.height();
            var heighter = fixThead.height() < scrollThead.height() ? scrollThead : fixThead;
            var lower = fixThead.height() > scrollThead.height() ? scrollThead : fixThead;

            var lowerTRHeight = realHeight / lower.find("tr").length;
            lower.find("tr").each(function () {
                $(this).height(lowerTRHeight);
            });

            var fixTrs = t.fixTable.find("tbody:first").children();
            var scrollTrs = t.scrollTable.find("tbody:first").children();
            for (var i = (t.limit - t.step); i < fixTrs.length; i++) {
                var h1 = $(fixTrs[i]).height();
                var h2 = $(scrollTrs[i]).height();
                if (h1 > h2) {
                    $(scrollTrs[i]).height(h1)
                } else if (h1 < h2) {
                    $(fixTrs[i]).height(h2)
                }
            }
            t.tbodyHeight = t.scrollTable.find("tbody:first").height();
            //console.debug("#" + t.scrollTable.height());

            window.setTimeout(function () {

            }, 1000);

        };

        t.setFixcolumns = function (columns) {
            t.fcolumns = columns;
            return t;
        };

        t.setFixcolumnsHtml = function (columns) {
            var fix_tr_thead = $("<thead class='thead'></thead>").appendTo(t.fixTable);

            for (var i = 0; i < columns.length; i++) {
                var fix_tr = $("<tr></tr>");
                for (var j = 0; j < columns[i].length; j++) {
                    var fieldOption = columns[i][j];
                    var title = fieldOption.title;
                    var field = fieldOption.field;

                    var th = $("<th></th>");
                    if ("width" in fieldOption || "min-width" in fieldOption) {
                        th.css("min-width", fieldOption.width);
                    }

                    if (!title) {
                        title = field;
                    }
                    th.html(title);

                    if (field) {
                        t.fixColumns[field] = fieldOption;
                    }

                    if (fieldOption.searchable && fieldOption.searchable === "1") {
                        t.searchFields.push({
                            field:fieldOption.field,
                            ds_id:fieldOption.ds_id,
                            title:fieldOption.title
                        });
                    }

                    if (fieldOption.rowspan) {
                        th.attr("rowspan", fieldOption.rowspan);
                    }

                    if (fieldOption.rowspan) {
                        th.attr("rowspan", fieldOption.rowspan);
                    }

                    if (fieldOption.colspan) {
                        th.attr("colspan", fieldOption.colspan);
                    }
                    fix_tr.append(th);
                }
                fix_tr.appendTo(fix_tr_thead);
            }
            return t;
        };

        t.editRow = function (_id, record) {
            var old = $("#scroll" + _id);
            if (old.length === 0) {
                console.debug("editRow do not exist...");
                return;
            }
            var scrollTr = $("<tr></tr>").appendTo(t.scrollTable);
            scrollTr.attr("id", "scroll" + record["_id"]);
            for (var column in record) {
                var value = record[column];
                var fieldOption = t.scrollColumns[column] ? t.scrollColumns[column] : t.fixColumns[column];
                if (!fieldOption)//no match field
                    continue;
                if ("formatter" in fieldOption)
                    value = fieldOption.formatter(record, value, 0);
                if (column in t.fixColumns) {

                } else {
                    scrollTr.append("<td>" + value + "</td>");
                }
            }
            old.after(scrollTr);
            old.remove();
        };

        t.getRow = function (_id) {
            return $("#scroll" + _id);
        };

        t.setColumns = function (columns) {
            t.scolumns = columns;
            return t;
        };

        t.setScrollColumnsHtml = function (columns) {

            var scroll_tr_thead = $("<thead class='thead'></thead>").appendTo(t.scrollTable);
            for (var i = 0; i < columns.length; i++) {
                var tr = $("<tr></tr>");
                for (var j = 0; j < columns[i].length; j++) {
                    var fieldOption = columns[i][j];

                    if ("hidden" in fieldOption && fieldOption["hidden"])
                        continue;

                    var title = fieldOption.title;
                    var field = fieldOption.field;
                    var origTitle = title;

                    var th;
                    if ("width" in fieldOption) {
                        th = $("<th width=" + fieldOption.width + "></th>")
                    } else {
                        th = $("<th></th>");
                    }

                    if ("min-width" in fieldOption) {
                        th.css("min-width", fieldOption["min-width"]);
                    }

                    if ("searchable" in fieldOption && fieldOption.searchable === "1") {
                        t.searchFields.push({
                            field:fieldOption.field,
                            ds_id:fieldOption.ds_id,
                            title:fieldOption.title
                        });
                    }

                    if ("click" in fieldOption) {
                        t.scrollTable.click({
                            clickFun: fieldOption["click"],
                            field: field,
                            fieldIndex: j
                        }, function (e) {
                            if (e.data.fieldIndex === $(e.target).index()) {
                                e.data.clickFun(e);
                            }
                        });
                    }

                    if ("max-width" in fieldOption) {
                        th.css("max-width", fieldOption["max-width"]);
                    }

                    th.attr("data-field", field);
                    if (!title) {
                        title = field;
                    }
                    //titleFormattor
                    if (fieldOption.titleFormattor) {
                        title = fieldOption.titleFormattor(title)
                    }

                    if (fieldOption.sortable && fieldOption.sortable === true) {
                        title = (title + "<div class='sort-triangle'><div class='sort-triangle-up'></div><div class='sort-triangle-down'></div></div>");
                        th.addClass("sort-triangle-th");
                    }


                    th.html(title);

                    if (field) {
                        t.scrollColumns[field] = fieldOption;
                    }

                    if (fieldOption.rowspan) {
                        th.attr("rowspan", fieldOption.rowspan);
                    }

                    if (fieldOption.colspan) {
                        th.attr("colspan", fieldOption.colspan);
                    }
                    tr.append(th);
                }
                tr.appendTo(scroll_tr_thead);
            }

            return t;
        };

        t.sort = function (field) {
            var option = t.scrollColumns[field];
            var data1 = t.data;
            //console.debug(t.data);
            if (t.orderBy === undefined) {
                data1.sort(function (a, b) {
                    if (option["sortby"]) {
                        var a1 = parseInt("1" + String(a[option["sortby"]]).replace(".", ""));
                        var b1 = parseInt("1" + String(b[option["sortby"]]).replace(".", ""));
                        return a1 >= b1 ? -1 : 1;
                    } else {
                        var a1 = parseInt("1" + String(a[field]).replace(".", ""));
                        var b1 = parseInt("1" + String(b[field]).replace(".", ""));
                        return a1 >= b1 ? -1 : 1;
                    }
                });
                t.orderBy = "desc";
            } else if (t.orderBy === "asc") {
                data1.sort(function (a, b) {
                    if (option["sortby"]) {
                        var a1 = parseInt("1" + String(a[option["sortby"]]).replace(".", ""));
                        var b1 = parseInt("1" + String(b[option["sortby"]]).replace(".", ""));
                        return a1 > b1 ? -1 : 1;
                    } else {
                        var a1 = parseInt("1" + String(a[field]).replace(".", ""));
                        var b1 = parseInt("1" + String(b[field]).replace(".", ""));
                        return a1 > b1 ? -1 : 1;
                    }
                });
                t.orderBy = "desc";
            } else if (t.orderBy === "desc") {
                data1.sort(function (a, b) {
                    if (option["sortby"]) {
                        var a1 = parseInt("1" + String(a[option["sortby"]]).replace(".", ""));
                        var b1 = parseInt("1" + String(b[option["sortby"]]).replace(".", ""));
                        return a1 <= b1 ? -1 : 1;
                    } else {
                        var a1 = parseInt("1" + String(a[field]).replace(".", ""));
                        var b1 = parseInt("1" + String(b[field]).replace(".", ""));
                        return a1 <= b1 ? -1 : 1;
                    }
                });
                t.orderBy = "asc";
            }
            t.render();
        };

        t.refreshTable = function () {
            //t.fixTable.find("tbody:first").children().remove();
            //t.scrollTable.find("tbody:first").children().remove();
            var limit = 0;

            for (var d = t.limit; d < t.data.length; d++) {
                limit++;
                if (limit === t.step) {
                    t.limit = d;
                    break;
                } else if (d === (t.data.length - 1)) {//all data loaded
                    t.limit = d + 1;
                    if (t.data.length > t.step)
                        $.toast("数据已全部加载", 2000);
                }

                var record = t.data[d];
                var fixTr = $("<tr></tr>").appendTo(t.fixTable);
                var scrollTr = $("<tr></tr>").appendTo(t.scrollTable);

                if (record["_id"] || (record["_id"] === 0)) {
                    fixTr.attr("id", "fix" + record["_id"]);
                    scrollTr.attr("id", "scroll" + record["_id"]);
                }

                for (var column in t.scrollColumns) {
                    var td = $("<td></td>");
                    var fieldOption = t.scrollColumns[column];
                    if ("hidden" in fieldOption && fieldOption["hidden"])
                        continue;
                    var value = record[column];
                    if(value === "null"){
                        value = "";
                    }

                    if ("formatter" in fieldOption) {
                        value = fieldOption.formatter(record, value, column);
                    }

                    if (value === undefined)//no match field
                        continue;

                    for(var option in fieldOption){
                        if(option === "field" || option === "title")
                            continue;
                        td.css(option, fieldOption[option]);
                    }

                    //td.css("word-break", "break-all");
                    td.html(value);
                    scrollTr.append(td);
                }

                for (var column in t.fixColumns) {
                    var td = $("<td></td>");
                    var fieldOption = t.fixColumns[column];
                    if ("hidden" in fieldOption && fieldOption["hidden"])
                        continue;
                    var value = record[column];
                    if (value === undefined)//no match field
                        continue;
                    if ("formatter" in fieldOption)
                        value = fieldOption.formatter(record, value, column);
                    if ("width" in fieldOption) {
                        td.css("max-width", fieldOption["width"]);
                        td.css("min-width", fieldOption["width"]);
                    }
                    if ("align" in fieldOption) {
                        td.css("text-align", fieldOption["align"]);
                    }
                    td.html(value);
                    fixTr.append(td);
                }
            }
        };

        t.sortFunction = function (func) {
            t.sort = func;
        };

        t.mc = function (startRow, endRow, col) {

            var tb = t.scrollTable[0];
            if (col >= tb.rows[0].cells.length) {
                return;
            }
            if (col == 0) {
                endRow = tb.rows.length - 1;
            }
            for (var i = startRow; i < endRow; i++) {
                if (tb.rows[startRow].cells[col].innerHTML == tb.rows[i + 1].cells[0].innerHTML) {
                    tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[0]);
                    tb.rows[startRow].cells[col].rowSpan = (tb.rows[startRow].cells[col].rowSpan | 0) + 1;
                    if (i == endRow - 1 && startRow != endRow) {
                        t.mc(startRow, endRow, col + 1);
                    }
                } else {
                    t.mc(startRow, i + 0, col + 1);
                    startRow = i + 1;
                }
            }
        }

        t.mcWraper = function (startRow, endRow, col) {
            t.mc(startRow, endRow, col);
            var tdc = t.scrollTable.find("thead:first").find("tr:first").children("th").length;
            var arr = [];
            t.scrollTable.children("tbody").children("tr").each(function () {
                var tds = $(this).children("td");
                if (tds.length === tdc) {
                    arr.push(tds);
                }
            });
            for (var i = 0; i < arr.length; i++) {
                if (i % 2 === 0) {
                    $(arr[i][0]).css("background-color", "#fff");
                } else {
                    $(arr[i][0]).css("background-color", "#f6f6f6");
                }
            }
        };


        return t;
    }
};
