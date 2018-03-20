//url数据请求路径：
var dataUrl={
    flexTab:{
        outerTable:"http://ds.idc.xiwanglife.com/dataservice/getconfig.do?id=63",  //资产售卖进度外层大表
        innerTable:"http://ds.idc.xiwanglife.com/dataservice/getconfig.do?id=64&assets_id=",   //资产售卖进度内层下表
        queryTable:"http://ds.idc.xiwanglife.com/dataservice/getconfig.do?id=88"     //资产售卖进度售卖开始、结束时间查询表
    },
    basic:"http://ds.idc.xiwanglife.com/dataservice/getconfig.do?id=67",       //资产基础信息表
    makeLoans:"http://ds.idc.xiwanglife.com/dataservice/getconfig.do?id=182",    //放款统计表
    laterPeriodCosts:"http://ds.idc.xiwanglife.com/dataservice/getconfig.do?id=95"   //资产后期费用表
}
var useObj;
var totalAmount = "";// 售卖进度首页数据
var Pages = {};
var random;
var nameGroup = {
    wrap: $('.g-container'), // 外层
    header: $('.g-header'), // 顶部
    main: $('.g-content'), // 主体内容
    particular: 'particular', // 单行数据独立显示模块
    nav: 'u-navList', // 导航条
    navSwitch: 'toggle'            // 导航开关
};
$("#fuser").html($.cookie("fuser"));

// 创建 tab 父辈框架节点
Pages.tabModule = function (count) {
    var html     = "",
        flexbox  = "",
        copyNode = "",
        tbody    = "";
    if(Number(count) > 1){
        copyNode = '<a href="javascript:;" class="pre-copy" id="pre-copy2"onclick="javascript:method1(randomTa)">导出</a>';
        tbody = '<table border="0" cellspacing="0" cellpadding="0" id="randomTa"><tbody></tbody></table>';
    }else{
        copyNode ='<a href="javascript:;" class="pre-copy" id="pre-copy' + count + '"onclick="javascript:method1(ta)">导出</a>';
        tbody = '<table border="0" cellspacing="0" cellpadding="0" id="ta"><tbody></tbody></table>';
    }
    html = '<div class="relative">'
        + '<p class="flexTab-u-nav">'
        + copyNode
        + '</p>'
        + '<a href="javascript:;" class="flexTab-unfold"><i class="Auto unfold">展开</i></a>'
        + '<section class="flexTab-u-tab u-tab"><div>'
        + '<div class="head-tab">'
        + '<table><tbody></tbody></table>'
        + '</div>'
        + '<div class="body-tab">'
        + tbody
        + '</div></div>'
        + '</section>'
        + '</div>';
    if(Number(count) > 1){
        flexbox = '<article class="flexTab-u-flex random" id="' + count + '">'+ html +'</article>';
    }else{
        flexbox = $('<article class="flexTab-u-flex" id="flexTab-u-flex' + count + '">'+ html +'</article>');
    }
    return flexbox;
};

Pages.resize = function () {
    // content 高度
    var hg = nameGroup.wrap.height() - nameGroup.header.height();
    nameGroup.main.css('height', hg);
}
Pages.contentAjax = function (L) {
    $('#data-item').hide();
    var UR = String(document.location).split('#')[0];
    $(".navs li a[data-page="+L+"]").css("background","#336699").parent().siblings().children().css("background","");
    $("#formName").attr("tableName",$(".navs li a[data-page="+L+"]").text());
    $.ajax({
        type: "get",
        url: "pages/" + L,
        async: false,
        success: function (text) {
            nameGroup.main.empty();
            nameGroup.main.html(text);
            document.location = UR + '#' + L;
        }
    });
}

Pages.ready = function () {
    var url = String(document.location).split('#')[1];
    if (!url || url.length < 0 || url == undefined) {
        Pages.contentAjax('flexTab');
    } else {
        Pages.contentAjax(url);
    }

}
// alone itme show
Pages.aloneItmeShow = function () {
    $(document).dblclick(function (event) {

        if ($(event.target).parents('#flex2').length < 1) {   //没有小表的页面
            var th = $(event.target).parents('.body-tab').prev().find('tr').clone();
            $('.' + nameGroup.particular).find('table').append(th);
            if (event.target.nodeName.toLowerCase() != 'td')
                return;
            var size = $(event.target).parents('.body-tab').prev().find('th').length;
            // 解决合并之后 td 列错位
            if ($(event.target).parent().children('td:last').prev().attr('rowspan') == undefined && $(event.target).parent().children().length < size) {
                var $this = undefined;
                var td = $(event.target).parent().children();
                var $thisSize = $(event.target).parent().prev('.rows').children('td').length;
                var tr = $('<tr></tr>');
                var index = $(event.target).parent().index();  //大表tbody里每行tr的index
                for (var n = index; n >= 0; n--) {
                    if ($(event.target).parents('table').find('tr').eq(n).children().length == size && $this == undefined) {
                        $this = $(event.target).parents('table').find('tr').eq(n);
                    }
                }
                // td 是当前点击对象父级TR的所有子级的集合;
                for (var i = 0; i < td.length; i++) {
                    if (i == 0) {// 当前下标对象为 “序号”
                        tr.append($(td).eq(i).clone());
                        tr.append($this.children().eq(i+1).clone()); // 第一个合并列 “项目名称”;
                        tr.append($this.children().eq(i+2).clone());// 第二个合并列 “融资主体”
                        tr.append($this.children().eq(i+3).clone());// 第三个合并列 “资产金额”
                    }else if(i == 2){// 当前下标对象为 “底层资产投资金额”
                        tr.append($(td).eq(i).clone());             // “底层资产投资金额”
                        tr.append($this.children().eq(6).clone());  // 第四个合并列 “投资金额合计”
                    }else if(i == 8){// 当前下标对象为 “底层资产投资收益”
                        tr.append($(td).eq(i).clone());             // “底层资产投资收益”
                        tr.append($this.children().eq(13).clone()); // 第五个合并列 “资产投资收益合计”
                    }else if(i == 22){   // 当前下标对象为 “通道费和委贷行手续费小计”
                        tr.append($(td).eq(i).clone());             // “通道费和委贷行手续费小计”
                        tr.append($this.children().eq(28).clone()); // 第五个合并列 “资产通道费和委贷行手续费合计”
                    }else if (i == 23){ // 当前下标对象为 “财顾费用”
                        tr.append($(td).eq(i).clone());             // “财顾费用”
                        tr.append($this.children().eq(30).clone()); // 第五个合并列 “财顾费小计”
                        tr.append($this.children().eq(31).clone()); // 第五个合并列 “未放款金额”
                    } else {
                        tr.append($(td).eq(i).clone());
                    }
                }
                $('.' + nameGroup.particular).find('table').append(tr);
            } else {
                var td = $(event.target).parent().clone();
                $('.' + nameGroup.particular).find('table').append(td);
            }
        } else {     //有小表的页面
            var th = $(event.target).parents('#flex2').find('.body-tab').prev().find('tr').clone();
            $('.' + nameGroup.particular).find('table').append(th);
            if (event.target.nodeName.toLowerCase() != 'td')
                return;
            var size = $(event.target).parents('#flex2').find('.body-tab').prev().find('th').length;
            // 解决合并之后 td 列错位
            if ($(event.target).parent().children('td:last').prev().attr('rowspan') == undefined && $(event.target).parent().children().length < size) {
                var $this = undefined;
                var td = $(event.target).parent().children();
                var $thisSize = $(event.target).parent().prev('.rows').children('td').length;
                var tr = $('<tr></tr>');
                var index = $(event.target).parent().index();
                for (var n = index; n >= 0; n--) {
                    if ($(event.target).parent().parent('table').find('tr').eq(n).children().length == size && $this == undefined) {
                        $this = $(event.target).parent().parent('table').find('tr').eq(n);
                    }
                }

                // td 是当前点击对象父级TR的所有子级的集合;
                for (var i = 0; i < td.length; i++) {
                    if (i == 0) {// 当前下标对象为 “序号”
                        tr.append($(td).eq(i).clone());
                        tr.append($this.children().eq(i+1).clone()); // 第一个合并列 “项目名称”;
                        tr.append($this.children().eq(i+2).clone());// 第二个合并列 “融资主体”
                        tr.append($this.children().eq(i+3).clone());// 第三个合并列 “资产金额”
                    }else if(i == 2){// 当前下标对象为 “底层资产投资金额”
                        tr.append($(td).eq(i).clone());             // “底层资产投资金额”
                        tr.append($this.children().eq(6).clone());  // 第四个合并列 “投资金额合计”
                    }else if(i == 8){// 当前下标对象为 “底层资产投资收益”
                        tr.append($(td).eq(i).clone());             // “底层资产投资收益”
                        tr.append($this.children().eq(13).clone()); // 第五个合并列 “资产投资收益合计”
                    }else if(i == 22){   // 当前下标对象为 “通道费和委贷行手续费小计”
                        tr.append($(td).eq(i).clone());             // “通道费和委贷行手续费小计”
                        tr.append($this.children().eq(28).clone()); // 第五个合并列 “资产通道费和委贷行手续费合计”
                    }else if (i == 23){ // 当前下标对象为 “财顾费用”
                        tr.append($(td).eq(i).clone());             // “财顾费用”
                        tr.append($this.children().eq(30).clone()); // 第五个合并列 “财顾费小计”
                        tr.append($this.children().eq(31).clone()); // 第五个合并列 “未放款金额”
                    } else {
                        tr.append($(td).eq(i).clone());
                    }
                }
                $('.' + nameGroup.particular).find('table').append(tr);
            } else {
                var td = $(event.target).parent().clone();
                $('.' + nameGroup.particular).find('table').append(td);
            }
        }

        $('.' + nameGroup.particular).show();

        var th=$('.' + nameGroup.particular).find('table').find("th");
        var td=$('.' + nameGroup.particular).find('table').find("td");
        for(var i = 0;i < th.length; i++){
            var tr=$("<tr></tr>").append($(th[i]).attr('rowspan',"0")).append($(td[i]).attr('rowspan',"0"));
            $('.' + nameGroup.particular).find('table').append(tr);
        }
    })
}
// 其他页面数据请求
// 创建 th , 目的是针对多个不同 th。 这里实际 arr 是从后台获取的 。
// colgroup 的创建是为了保证 headTab & bodyTab 里面后代 td 宽度的一致性;
Pages.getFullFetchData = function (details) {
    var $load = '<article id="loading">'
        +'<div class="loader">'
        +'<section>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'</section>'
        +'</div>'
        +'</article>';
    details.main.append($load);
    setTimeout(function(){
        $.when(getData(details)).done(function(data){
            alert(data);
        });
    },500)
}
function getData(obj){
    var $this = obj.main;
    Array = obj.Array,
        sta   = obj.status,
        fileName = obj.fileName,
        laterName = obj.laterName,
        $thead = $this.find('.head-tab').children(),
        $tbody = $this.find('.body-tab').children();
    var defer = $.Deferred();
    $.ajax({
        type: "post",
        url: obj.Url,
        async: true,
        dataType: 'text',
        timeout: 1000 * 60*50,
        success: function getData(data) {
            // formatting data
            data = data.replace(/null/g, '""').replace(/N\/A/g, " ").replace(/NA/g, " ");
            data = JSON.parse(data);
            // Object.getOwnPropertyNames( 返回对象自己的属性的名称。)
            var details = data.details[Object.getOwnPropertyNames(data.details)].values;
            ajaxData(details);
        },
        complete: function () {
            $('#loading').remove();
        }
    });
    return defer.promise();
}

Pages.scrollSize = function (dom) {
    var $this = dom.find('.body-tab').children('table');
    var tabW = $this.outerWidth();
    $this.parent('.body-tab').css('width', tabW + 18)
        .prev('.head-tab').css('width', tabW)
        .parent().css({'width': tabW + 6, 'overflow': 'hidden'})
        .parent().css({'overflow-x': 'scroll'});
    $this.find('tr').eq(1).children('td').each(function () {
        var index = $(this).index(),
            minW  = $(this).outerWidth();
        $this.parent().prev().find('th').eq(index).css('min-width',minW);
        $this.find('th').eq(index).css('min-width',minW);
    })
}
$(window).resize(Pages.resize)
$(window).ready(function () {
    Pages.ready();

//对选择的选项加背景颜色
    $(".navBox>.navs li a").click(function(){
        $(this).css("background","#336699").parent().siblings().children().css("background","");
    })

});
Pages.resize();
Pages.aloneItmeShow();

//   Date 插件   start
function createDate(event) {
    $("<div id='da'></div>").calendar({
        trigger: $(event),
        zIndex: 999,
        format: 'yyyy-mm-dd'
    }).appendTo($("body"));
}

// 回车键
$(document).keypress(function (event) {
    // 回车键事件 
    if (event.which == 13) {
        $('.submit').trigger('click')
    }
});

function exit() {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = 'pp' + "=" + null + "; expires=" + date.toGMTString();
    document.cookie = 'user' + "=" + null + "; expires=" + date.toGMTString();
    document.cookie = 'userName' + "=a; expires=" + date.toGMTString();
    location.href='/login';
}
$(function(){
    $.getScript("js/calendar.js");
    $('.queryDate').on('focus',function(){
        createDate($(this));
    })
})

// 售卖进度 =》 售卖时间页 =》 募集运算
function collect(total,has,name){
    for(x in total){
        if(total[x].assets_no == has){
            return total[x][name];
        }
    }
}


//ajax数据请求：
function ajaxData(details){
    var colgroupHtml = "",
        $theadTr = $('<tr></tr>'),
        amount = 0,
        profit = 0,
        count = 1;
    useObj = "";
    if (details == "" || !details)
        return alert('暂时没有数据！');
    // each data
    $('#data-item').children(':first').html(details.length);
    useObj = details;
    // 储存 售卖进度下首页数据，用于售卖开始查询后的运算。
    if(fileName) totalAmount = details;
    // 遍历加载数据
    for (var i = 0; i < details.length; i++) {
        var $tbodyTr = $('<tr></tr>');
        // each thead,The tbody content and thead consistent sequence
        for (var n = 0; n < Array.length; n++) {

            var field = Array[n].field,
                col = '<col style="width:' + (100 / (Array.length)).toFixed(2) + '%;"></col>',
                th = '<th>' + Array[n].title + '</th>';
            // <col> ready once
            if (i == 0) {
                colgroupHtml += col;
                $theadTr.append(th);
            }
            // 后期费用 -->募集日期转化
            if(field == 'max_trans_time' || field == 'min_trans_time'||field == '放款日期'||field == '委贷起始日'||field == '委贷终止日'||field == '资产放款日'||field == '资产还款日'){
                var newTime= new Date(details[i][field]);
                var time = "" + newTime.getFullYear() + "-";
                time += (newTime.getMonth()+1) > 9? (newTime.getMonth()+1) + "-" : '0'+(newTime.getMonth()+1) + "-";
                time += newTime.getDate() >  9? newTime.getDate() : '0'+newTime.getDate();
                var td = '<td>' + time + '</td>';
            }else
            // 售卖进度=》售卖时间表->总募集金额
            if(field == 'totalAmount' && sta){
                var Money = collect(totalAmount,details[i].assets_no,'fund_amount');
                var t = parseFloat(Money).toFixed(2);
                if (t.indexOf('.00') >= 0) {
                    var td = '<td>' + parseFloat(t).toLocaleString() + '.00</td>';
                } else {
                    var td = '<td>' + parseFloat(t).toLocaleString() + '</td>';
                }
            }else
            // 售卖进度=》售卖时间表->查询期外募集金额
            if(field == 'outQuery_fund_amount' && sta){
                var Money = collect(totalAmount,details[i].assets_no,'fund_amount');
                var queryMoney = (Money - details[i].fund_amount);
                var t = parseFloat(queryMoney).toFixed(2);
                if (t.indexOf('.00') >= 0) {
                    var td = '<td>' + parseFloat(t).toLocaleString() + '.00</td>';
                } else {
                    var td = '<td>' + parseFloat(t).toLocaleString() + '</td>';
                }
            }else
            if(field == 'surplus_amount'){
                var surplus = parseFloat((Number(details[i].total_amount_2) - Number(details[i].fund_amount))).toFixed(2);
                var td = '<td>' + parseFloat(surplus).toLocaleString() + '</td>';
            }else
            if (field == 'loan_id') {
                var td = '<td>' + count + '</td>';

            } else
            // 投资收益合计;
            if (field == '底层资产投资收益') {
                profit += Number(details[i][field]);
            } else
            // 投资金额合计
            if (field == '底层资产投资金额') {
                amount += Number(details[i][field]);
            } else
            // 资产编号特殊设置，用于操作下级tab;
            if (field == 'assets_no' && $('.flexTab-u-flex').parent().attr('id') == 'flexTab-m-flex') {
                if(sta){
                    var td = '<td class="pointer flexTab-create-sell">' + details[i][field]  + '</td>';
                }else{
                    var td = '<td class="pointer flexTab-create">' + details[i][field]  + '</td>';
                }

            } else
            // 保留三位
            if (field == 'marketing_extra_yield_rate' || field == 'real_rate') {
                var nub = parseFloat(details[i][field]).toFixed(3);
                if(sta){
                    var td = '<td class="pointer flexTab-create-sell">' + nub + '</td>';
                }else{
                    var td = '<td class="pointer flexTab-create">' + nub + '</td>';
                }
                // 资产编号特殊设置，用于操作下级tab;
            } else {
                if(details[i][field] == undefined){
                    var td = '<td></td>';
                }else{
                    var td = '<td>' + details[i][field] + '</td>';

                }
            }

            //金额显示特殊处理
            if (!isNaN(Number(details[i][field]))) {
                if ($.trim(details[i][field]).length < 1 || field == 'loan_bank_no' || field == 'repay_bank_no'
                    || field == 'rate_days' || field == 'loan_id' || field == 'month_category'
                    || field == 'product_limit' || field == 'per_year_date' || field == 'product_limit'
                    || field == 'asset_manager_bank_acct' || field == 'prod_issuer_bank_acct'
                    || field == 'marketing_extra_yield_rate' || field == 'real_rate'
                    ||field == 'max_trans_time' || field == 'min_trans_time'||field=='砍头息是否扣除'
                    ||field=='财顾费是否收取'||field=='是否设立共管'||field=='放款日期'||field=='委贷起始日'
                    ||field=='委贷终止日'||field=='month_period'||field=='产品期限'||field=='产品期限'||field=='担息天数'
                    ||field=='期限'||field=='期限'||field=='计息天数'||field=='放款账号'||field=='还款账号'||field=='投资期限'
                    ||field=='委贷行计息方式'||field=='每年期限'||field=='通道每年期限'
                ) {
                    false
                } else {
                    var t = parseFloat(details[i][field]).toFixed(2);
                    if (t.indexOf('.00') >= 0) {
                        var td = '<td>' + parseFloat(t).toLocaleString() + '.00</td>';
                    } else {
                        var td = '<td>' + parseFloat(t).toLocaleString() + '</td>';
                    }
                }
            }

            //通道费率小计:
            if(field=='通道费率小计'){
                var assetRatio=(details[i]['资管费率']?details[i]['资管费率']:0) + (details[i]['交易所费率'] ?details[i]['交易所费率']:0)+(details[i]['托管费率']?details[i]['托管费率']:0);
                var td = '<td>' + (assetRatio*100).toFixed(2) + '%</td>';
            }

            //通道费小计
            if(field=='通道费小计'){
                var asset = (details[i]['资管管理费']?details[i]['资管管理费']:0.00) + (details[i]['交易所费']?details[i]['交易所费']:0.00 )+ (details[i]['托管费']?details[i]['托管费']:0.00);
                var td = '<td>' + parseFloat(asset).toLocaleString() + '</td>';
            }

            // console.log(details[i]);
            //未合并的未放款金额计算：
            // var aa=$(".head-tab").find("th").length;
            //
            // var bb=$(".body-tab").find("td").length;
            //
            if(field=='未放款金额'){
                // if(details[i].parents("tr").children("td").length && !details[i].parents("tr").children("td").attr("rowspan")){
                //     var balanceAmount= (details[i]['资产规模']?details[i]['资产规模']:0.00) + (details[i]['底层资产投资金额']?details[i]['底层资产投资金额']:0.00 )
                // }
                // var td = '<td>' + parseFloat(balanceAmount).toLocaleString() + '</td>';
            }


            // 费率格式处理：
            if(!isNaN(parseInt(details[i][field]))){
                if (field == '资产年化收益率' || field == '资管费率' || field == '交易所费率' || field == '托管费率' || field == '通道费率小计'
                    || field == '委贷行利率') {
                    var tranVal=(parseFloat(details[i][field])*100).toFixed(2)+'%';
                    var td = '<td>' + tranVal + '</td>';
                }
            }

            //放款统计日期转化：
            if(field == '资产放款日'||field == '资产还款日'){
                var newTime= new Date(details[i][field]);
                var time = "" + newTime.getFullYear() + "-";
                time += (newTime.getMonth()+1) > 9? (newTime.getMonth()+1) + "-" : '0'+(newTime.getMonth()+1) + "-";
                time += newTime.getDate() >  9? newTime.getDate() : '0'+newTime.getDate();
                var td = '<td>' + time + '</td>';
            }

            if(field=="砍头息是否扣除"||field=="财顾费是否收取"||field=="是否设立共管"){
                if(details[i][field]){
                    var td='<td>是</td>';
                }else{
                    var td='<td>否</td>';
                }
            }
            $tbodyTr.append(td);

        }
        count++
        $tbody.children('tbody').append($tbodyTr);
    }
    var colgroup = $('<colgroup>' + colgroupHtml + '</colgroup>');
    // 因为对象只有一个，只能加载到一个对象里;
    var colgroup1 = colgroup.clone();
    var th = $theadTr.clone();
    $thead.children('tbody').append($theadTr).before(colgroup);
    $tbody.find('tbody').before(th);
    $tbody.children('tbody').before(colgroup1);

    // if($('.flexTab-u-flex') == undefined) {
    //     $('.flexTab-u-flex') = $('.flexTab-u-flex');
    // }

    if ($('.flexTab-u-flex').parent().attr('id') == 'makeLoans-m-flex') {
        // 投资金额合计
        makeLoans.total.amount = (amount/2);
        // 投资收益合计
        makeLoans.total.profit = (profit/2);
        makeLoans.wrap.append(makeLoans.footer(makeLoans.total));
        makeLoans.merge($tbody);
    }
    $('#data-item').show();
    $('.flexTab-u-flex').parent().attr('id') == 'laterPeriodCosts-m-flex' ? $('#data-item').children(':last').html('最近七天数据').prev().show():$('#data-item').children(':last').html('全量数据').prev().show();
    // 后期费用自定义查询数据
    if(laterName) $('#data-item').children('i').html("").prev().hide();
    // tab style
    Pages.scrollSize($('.flexTab-u-flex'));
}