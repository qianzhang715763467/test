// table
var Htable = {
    createFootTable: function (id) {
        //alert(this.create());
    },
    create: function (id, hack) {
        if (!id) {
            console.error("id is empty");
            return;
        }
        var t = {};
        t.id = id;
        t.data = [];
        t.fixColumns = {};
        t.scrollColumns = {};
        t.floatScrollTableTitlePanel;
        t.floatTitle;
        t.scrollY = 0;
        t.scrollingLeft = false;
        t.floatScrollingLeft = false;
        t.additionHeight = 0;
        t.orderBy = undefined;//desc asc undefined
        t.maxHeight = 0;
        t.maxWidth = 0;

        t.setMaxHeight = function (max) {
            t.maxHeight = max;
        };
        
        t.setMaxWidth = function (max) {
            t.maxWidth = max;
        };

        var root = $("#" + id);//render to
        t.root = root;

        if (root.css("position") === "static")
            root.css("position", "relative");
        //root.css("border-top", "1px solid #666");
        root.css("border-bottom", "1px solid #ccddff");

        t.setAdditionHeight = function (height) {
            t.additionHeight = height;
        };

        t.scrollbarWidth = function () {
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
            oP.remove();
            return scrollbarWidth;
        }();

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

        }();

        t.reLoadData = function (data) {
            t.data = data;
            t.refreshTable();
        };

        t.render = function () {

            t.father.find("tbody:first").remove();
            t.refreshTable();
            //console.debug(t.scrollTable.html());
            var fixPanel = t.fixTable.parent();
            var scrollPanel = t.scrollTable.parent();

            //console.debug(t.scrollTable.height());
            if (Object.getOwnPropertyNames(t.fixColumns).length === 0)
                fixPanel = null;

            var fixPanelHeight;
            var fixPanelWidth;
            var scrollPanelHeight = scrollPanel.height();
            var scrollPanelWidth = scrollPanel.width();
            
            if (!fixPanel) {
                fixPanelWidth = 0;
                fixPanelHeight = 0;
                t.fixTable.parent().remove();
            } else {
                fixPanelWidth = fixPanel.width();
                fixPanel.css({
                    top: 0,
                    left: 0,
                });
                scrollPanelHeight = fixPanel.height();
            }
           
            root.height(t.maxHeight);
            var tableWidth = root.width(); //> t.maxWidth ? t.maxWidth : root.width();
            var tableHeight;
            if (root.height() > scrollPanelHeight) {
                tableHeight = scrollPanelHeight;
                if (hack === undefined)
                    root.height(scrollPanelHeight);
                
            } else {
                tableHeight = root.height();
            }
             
            scrollPanel.css({
                top: 0,
                left: fixPanelWidth,
                width: tableWidth - fixPanelWidth
            });
            //console.debug(scrollPanel.width());
            //console.debug(t.scrollTable.width());
            if (scrollPanel.width() >= t.scrollTable.width()) {
                t.scrollTable.width(scrollPanel.width());
                scrollPanel.css("overflow", "hidden");
                //scrollPanel.css("border", "1px solid red");
            }

            t.father.width(tableWidth);
            t.father.height(scrollPanelHeight);


            if ((scrollPanelHeight + t.additionHeight) < root.height()) {
                t.grandfather.height(tableHeight);
                //t.grandfather.css("border", "1px solid red");
                //console.debug(tableHeight);
            } else {
                //alert(13);
                // t.grandfather.height((scrollPanelHeight + t.additionHeight) - root.height());
                t.grandfather.height(t.maxHeight - t.additionHeight);
                //alert(t.maxHeight - t.additionHeight);
                //t.grandfather.height(t.maxHeight-t.additionHeight);
            }

            t.grandfather.width(tableWidth + t.scrollbarWidth);

            scrollPanel.scroll(function () {
                var target = $(this);
                var sl = target.scrollLeft();
//                if (t.scrollY > 0) {
//                    t.floatTitle.css("opacity", "1");
//                } else {
//                    t.floatTitle.css("opacity", "0");
//                }

                t.floatScrollTableTitlePanel.scrollLeft(sl);
                if (t.footTable)
                    t.footTable.scrollTable.parent().scrollLeft(sl);
            });

            t.grandfather.scroll(function () {
                var st = $(this).scrollTop();
                if (st > 0) {
                    t.floatTitle.css("opacity", "1");
                    //t.floatTitle.css("backgroundColor","#fff");
                    t.floatTitle.css("border-bottom", "1px solid #44ccff");
                } else {
                    t.floatTitle.css("border-bottom", "none");
                    //t.floatTitle.css("zIndex", "1");
                }
                t.scrollY = st;
            });

            t.repairHeight();

            t.floatScrollTableTitlePanel = scrollPanel.clone();
            t.floatScrollTableTitlePanel.find("tbody:first").css("visibility", "collapse");

            root.find(".float-title").each(function(){
                $(this).remove();
            });
            t.floatTitle = $("<div class='float-title'></div>");

            if (fixPanel) {
                t.floatFixTableTitlePanel = fixPanel.clone();
                t.floatFixTableTitlePanel.find("tbody:first").css("visibility", "collapse");
                t.floatTitle.append(t.floatFixTableTitlePanel);
            }
            t.floatTitle.append(t.floatScrollTableTitlePanel);
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
            
            root.find(".sort-triangle").click(function () {
                t.sort($(this).parent().text());
            });
            //alert(root.html());
//            if (t.footTable) {
//                if ((t.footTable.height() + t.scrollTable.height()) <= root.height()) {
//                    t.footTable.css({
//                        top: t.scrollTable.height(),
//                    });
//                } else {
//                    t.footTable.css({
//                        bottom: 0
//                    });
//                }
//            }
            
            var veilFloat = $("<div class='veil-float'></div>");
            veilFloat.appendTo(root);
            veilFloat.width(t.floatTitle.width()).height(t.floatTitle.height());

        };

        t.setFootTable = function (table) {
            t.footTable = table;
            table.root.find("tr").css("background-color", "#96D4DF");
            table.root.height(table.root.height() - 35);
            return t;
        };

        t.hideThead = function () {
            root.find("thead").hide();
            return t;
        };

        t.initBottomTable = function (data) {

            var tds1 = t.fixTable.children("thead:first").children("tr:first").html();
            var tds2 = t.scrollTable.children("thead:first").children("tr:first").html();
            var bt = $("<table class='bottom-table'><thead><tr>" + tds1 + tds2 + "</tr></thead></table>").appendTo(root);
            //console.debug(data.length);
            for (var i = 0; i < data.length; i++) {
                var tr = $("<tr></tr>");
                for (var column in data[i]) {
                    if (!(column in t.fixColumns) && !(column in t.scrollColumns)) {
                        continue;
                    }
                    var fieldOption = t.scrollColumns[column] ? t.scrollColumns[column] : t.fixColumns[column];

                    if ("width" in fieldOption)
                        tr.append("<td width=" + fieldOption["width"] + ">" + data[i][column] + "</td>");
                    else
                        tr.append("<td>" + data[i][column] + "</td>");

                    //tr.append("<td>" + data[i][column] + "</td>");
                }
                tr.appendTo(bt);
            }

            t.footTable = bt;
            //console.debug(root.html());
            //t.setAdditionHeight(bt.height());
        };

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
            for (var i = 0; i < fixTrs.length; i++) {
                var h1 = $(fixTrs[i]).height();
                var h2 = $(scrollTrs[i]).height();
                if(h1 > h2){
                    $(scrollTrs[i]).children().css({
                        "min-height":h1,
                        "max-height":h1
                    });
                }else if(h1 < h2){
                    //$(fixTrs[i]).height(h2)
                    $(fixTrs[i]).children().css({
                        "min-height":h2,
                        "max-height":h2
                    });
                }
            }

        };

        t.setFixcolumns = function (columns) {
            var fix_tr_thead = $("<thead class='thead'></thead>").appendTo(t.fixTable);

            for (var i = 0; i < columns.length; i++) {
                var fix_tr = $("<tr></tr>");
                for (var j = 0; j < columns[i].length; j++) {
                    var fieldOption = columns[i][j];
                    var title = fieldOption.title;
                    var field = fieldOption.field;

                    var th;
                    if ("width" in fieldOption) {
                        var th = $("<th width=" + fieldOption.width + "></th>")
                    } else {
                        th = $("<th></th>");
                    }

                    if (!title) {
                        title = field;
                    }
                    th.html(title);

                    if (field) {
                        t.fixColumns[field] = fieldOption;
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
            var scroll_tr_thead = $("<thead class='thead'></thead>").appendTo(t.scrollTable);
            for (var i = 0; i < columns.length; i++) {
                var tr = $("<tr></tr>");
                for (var j = 0; j < columns[i].length; j++) {
                    var fieldOption = columns[i][j];

                    if ("hidden" in fieldOption && fieldOption["hidden"])
                        continue;

                    var title = fieldOption.title;
                    var field = fieldOption.field;

                    var th;
                    if ("width" in fieldOption) {
                        var th = $("<th width=" + fieldOption.width + "></th>")
                    } else {
                        th = $("<th></th>");
                    }

                    if (!title) {
                        title = field;
                    }
                    //titleFormattor
                    if (fieldOption.titleFormattor) {
                        title = fieldOption.titleFormattor(title)
                    }

                    if (fieldOption.sortable && fieldOption.sortable === true) {
                        title = (title + "<div class='sort-triangle'><div class='sort-triangle-up'></div><div class='sort-triangle-down'></div></div>");
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

        t.sort = function (fieldText) {
            for (var field in t.scrollColumns) {
                var option = t.scrollColumns[field];
                if (option.title && (fieldText === option.title || fieldText === option.field)) {
                    var data1 = t.data;
//                    for(var key in t.data){
//                        console.debug(t.data.length);
//                        data1[key] = t.data[key];
//                    }

                    if (t.orderBy === undefined) {
                        data1.sort(function (a, b) {
                            if (option["sortby"]) {
                                return a[option["sortby"]] - b[option["sortby"]];
                            } else
                                return a[field] - b[field];
                        });
                        t.orderBy = "asc";
                    } else if (t.orderBy === "asc") {
                        data1.sort(function (a, b) {
                            if (option["sortby"]) {
                                return b[option["sortby"]] - a[option["sortby"]];
                            } else
                                return b[field] - a[field];
                        });
                        t.orderBy = "desc";
                    } else if (t.orderBy === "desc") {
                        data1.sort(function (a, b) {
                            if (option["sortby"]) {
                                return a[option["sortby"]] - b[option["sortby"]];
                            } else
                                return a[field] - b[field];
                        });
                        t.orderBy = "asc";
                    }
                    t.refreshTable(data1);
                    //console.debug(t.data);
                    break;
                }
            }
        };

        t.refreshTable = function () {
            t.fixTable.find("tbody:first").children().remove();
            t.scrollTable.find("tbody:first").children().remove();

            for (var d = 0; d < t.data.length; d++) {
                var record = t.data[d];
                var fixTr = $("<tr></tr>").appendTo(t.fixTable);
                var scrollTr = $("<tr></tr>").appendTo(t.scrollTable);
                if (record["_id"]) {
                    fixTr.attr("id", "fix" + record["_id"]);
                    scrollTr.attr("id", "scroll" + record["_id"]);
                }
                for (var column in record) {
                    var value = record[column];
                    var fieldOption = t.scrollColumns[column] ? t.scrollColumns[column] : t.fixColumns[column];
                    if (!fieldOption)//no match field
                        continue;
                    if ("hidden" in fieldOption && fieldOption["hidden"])
                        continue;

                    if (column in t.fixColumns) {
                        if ("formatter" in fieldOption)
                            value = fieldOption.formatter(record, value, column);
                        var td = $("<td></td>");
                        if ("width" in fieldOption) {
                            td.css("max-width", fieldOption["width"]);//word-break:break-all
                            td.css("min-width", fieldOption["width"]);
                            td.css("word-break", "break-all");
                        }
//                            fixTr.append("<td width=" + fieldOption["width"] + ">" + value + "</td>");
//                        else
//                            fixTr.append("<td>" + value + "</td>");

                        if ("align" in fieldOption) {
                            td.css("text-align", fieldOption["align"]);
                        }
                        td.html(value);
                        fixTr.append(td);
                    } else if (column in t.scrollColumns)  {
                        if ("formatter" in fieldOption)
                            value = fieldOption.formatter(record, value, column);
                        if ("width" in fieldOption)
                            scrollTr.append("<td width=" + fieldOption["width"] + ">" + value + "</td>");
                        else
                            scrollTr.append("<td>" + value + "</td>");
                        if ("align" in fieldOption) {
                            scrollTr.css("text-align", fieldOption["align"]);
                        }
                       //console.debug(root + value); 
                    }
                }
            }
            //console.debug(t.scrollTable.height());
        };

        t.sortFunction = function (func) {
            t.sort = func;
        };
        return t;
    }
};
