var timer;
var Animation;
var chartimer = {};//chart
var goalData = [{"总人数":0,"总金额":0,"定期交易人数":0,"定期交易金额":0,"活期交易人数":0,"活期交易金额":0,"活包定交易人数":0,"活包定交易金额":0,"二级市场交易人数":0,"二级市场交易金额":0,"总交易人数":0,"总交易金额":0,"提现人数":0,"提现金额":0}];
// svg 模块
var contentText = '<ul class="currentPosition">'
				+'<li></li>'
				+'</ul>'
				+'<div class="content-leftBox content-boxItem">'
				+'<svg xmlns="http://www.w3.org/2000/svg"'
				    +'xmlns:xlink="http://www.w3.org/1999/xlink"'
				    +'version="1.1" width="100%" height="100%" id="svg" style="position: absolute; background-color: transparent;">'
					+'<defs>'
			   			+'<marker id="arrow"'
			   				+'markerUnits="strokeWidth"'
			   				+'markerWidth="8"'
			   				+'markerHeight="8"'
			   				+'viewBox="0 0 12 12"'
			   				+'refX="6"'
			   				+'refY="6"'
			   				+'orient="auto">'
			   				+'<path d="M2,2 L10,6 L2,10 L6,6 L2,2" sytle="fill:#000;"></path>'
			   			+'</marker>'
				   	+'</defs>'
				+'</svg>'
				+'<svg class="icon totalTip" aria-hidden="true">'
                    +'<use xlink:href="#icon-rili1"></use>'
                +'</svg>'
				+'<section id="content">'
				+'</section>'
			+'</div>'
			+'<div class="content-rightBox content-boxItem">'
				+'<section id="amount"  class="echart"></section>'
				+'<section id="peoples" class="echart"></section>'
			+'</div>';
// svg 内数据展示用dom
var divItmes = '<div class="site-items">'
				+'<div class="item"></div>'
				+'<div class="item"></div>'
				+'<div class="item"></div>'
				+'<div class="item"></div>'
				+'<div class="item"></div>'
				+'<div class="item"></div>'
				+'<div class="Withdraw">'
					+'<h5 style="margin-bottom:5px;">转化总金额：<i id="totalAmount"></i></h5>'
					+'<h6>转化总人数：<i id ="totalPeople"></i></h6>'
				+'</div>'
			+'</div>';
// 右侧 第一个南丁格尔图
var P1 = {
		title:{
			tH:'转化人数（万）',
			tY:0,
			tX:140,
			tP:15,
		},
		xAxisName:'人数',
		colorList:'rgb(147,205,221)'
	}
// 右侧 第二个南丁格尔图
var A1 = {
		title:{
			tH:'转化金额（万）',
			tY:0,
			tX:140,
			tP:15,
		},
		xAxisName:'金额',
		colorList:'rgb(195,214,155)'
	};
// 南丁格尔图Y轴刻度
var fieldName = ['目标金额','活期交易','活包定交易','二级市场交易','提现','定期交易'];
// 对象集
var base = {
			li   : '.navItems li',
			queryBox: '#date-query',
			checked : 'checked',
			_Date   : '#laydate_box',
			sub     : '.submit',
			content : '#content'
		};
// 接收返回数据；
var getData = {};
// chart ID
var chartName = ['recentlyExpired','recentlySixMonths'];
// 加载首页内容
base.initFn = function(){
	// loading
	echarts.init(document.getElementById('chartLoading1')).showLoading({text: '正在努力的读取数据中...'});
	echarts.init(document.getElementById('chartLoading2')).showLoading({text: '正在努力的读取数据中...'});
	// 首页按钮高亮
	$(base.li+':first').addClass('checked');
	// 当前时间
	var d = new Date();
	var start1 = d.format("yyyy-MM-dd") + " 00:00:00";//yyyy-MM-dd hh:mm:ss
	var end1 = d.add('d', +31).format("yyyy-MM-dd") + " 00:00:00";
	var initArr = {};// 初始数据；
	// 对比大小后数据；
	var size1,	
		size2,
		size5;
	/* chart loading animation*/
	function getAjax(param, cb){
		$.ajax({
			type:"get",
			url:"http://ds.idc.xiwanglife.com/dataservice/getconfig.do?",
			async:true,
			data:param,
			success:function(data){
				var frist = JSON.stringify(data);
					frist = frist.replace(/null/g,"0");
				var last = JSON.parse(frist);
				if(cb) cb(last);
			},
			error:function(){
				alert('最近30天资产到期情况   请求超时！');
			}
		})
	};
	// callback
	function AjaxCb (data,count){
		// 返回对象自己的属性的名称。
		var list  = data.details[Object.getOwnPropertyNames(data.details)].values;
		if(list == "") {
			getData[count] = {state : '当前页面暂时没有数据。。。'};
			// 绑定chart
			return addChart(count);
		};
		var amount = [];
		var dates = [];
		for(var i = 0;i < list.length;i++){
			amount.push(Number(list[i].amount).toFixed(0));
			dates.push(list[i].due_date);
		};
		// 大小对比
		size1 = new sizeFn(amount);
		// 图表数据
		if(count < 1){
			getData[count] = {
				title		:data.configName,
				subtext		:'单位：万元',
				seriesName	:['定期到期'],
				xAxisData	:dates,
				seriesData	:amount,
				markPointData:[
	                {name : '最低', value : size1.min, xAxis: size1.indexMin, yAxis: size1.min},
	                {name : '最高', value : size1.max, xAxis: size1.indexMax, yAxis: size1.max}
	     	 	],
	     	 	values      : list
			};
		}else{
			getData[count] = {
				title		:data.configName,
				subtext		:'单位：亿元',
				seriesName	:['到期金额'],
				xAxisData	:dates,
				seriesData	:amount,
	     	 	values      : list
			};
		}
		// 绑定chart
		addChart(count)
	};
	// max & min
	function sizeFn(a){
		this.arr = a;					 // 对比数组
		this.max = parseInt(this.arr[0]);// 最大值
		this.min = parseInt(this.arr[0]);// 最小值
		this.indexMax = 0;				 // 最大值下标
		this.indexMin = 0;				 // 最小值下标
		var len  = this.arr.length;
		for(var i = 1;i < len;i++){
			if(parseInt(this.arr[i]) > this.max){
				this.max = this.arr[i];
				this.indexMax = i;
			};
			if(parseInt(this.arr[i]) < this.min){
				this.min = this.arr[i];
				this.indexMin = i;
			}
		}
	}
	getAjax({id:132,date1start: start1,date1end: end1},function(data){ AjaxCb(data,0) });
	getAjax({id:140,date1start: start1},function(data){ AjaxCb(data,1) });
};
		
base.navClick = function(){
	// 条件选择模块显示||隐藏
	$(base.li).click(function(event){
		event.stopPropagation();
		$(base.li).removeClass('checked');
		$(base.queryBox).hide();
		if($(this).index() == 0){
			$(this).addClass('checked');
			$('.m-chart').addClass('atPresent-main').siblings().removeClass('atPresent-main');
		}else{
			if( !$(this).hasClass('checked')){
				$(this).addClass('checked');
		    	$(base.queryBox).css({'top':$(this).offset().top}).slideDown()
		    					.attr('data-id',$(this).attr('id')).attr('data-name',$(this).children('span').html());
			}
		}
	})
	// 时间插件
	$(base.queryBox).click(function(event){
		event.stopPropagation();
	})
	// 时间提交
	$(base.sub).click(function(event){submit ($(this).parents(base.queryBox))});
}
base.drawSVG = function(){
	// atP.. 当前显示模块
	$('.main').removeClass('atPresent-main');
	$('.m-svg').addClass('atPresent-main').empty().append(contentText);
	// 加载SVG所需模块
	$('#content').append(divItmes);
	// 转化总金额 & 转化总人数
	if(goalData[0]['总交易金额'] == undefined || !(goalData[0]['总交易金额']) || goalData[0]['总交易金额'] == NaN){
		var totalAmount = 0;
	}else{
		var totalAmount = Math.round(goalData[0]['总交易金额']/10000);
	}
	$('#totalAmount').html(totalAmount+'（万）');
	$('#totalPeople').html(goalData[0]['总交易人数']);
	// add chart
	var AxisData = [];
	var seriesData1 = [];
	var seriesData2 = [];
	var Amount= [];
	var People = [];
	// 此处循环用于柱状图排序
	for(var key = 1; key < fieldName.length; key++){
		// 柱状图Y轴key值
		var Key = fieldName[key];
		var nubA = Math.round(goalData[0][fieldName[key]+'金额']/10000).toFixed(1);
		var nubP = (goalData[0][fieldName[key]+'人数']/10000);
		// 金额 = {y:key,x:value}
		Amount.push({'value':nubA,'name':Key});
		// 人数= {y:key,x:value},
		People.push({'value':nubP,'name':Key});
	}
	// 大小排序
	Amount = Amount.sort(sort);
	People = People.sort(sort);
	
	A1.seriesData = Amount;
	P1.seriesData = People;
	// creation chart
	var myAmountChart = echarts.init(document.getElementById('amount'));
	var myPeopleChart = echarts.init(document.getElementById('peoples'));
	var chart1 = new creationChart(A1);
	var chart2 = new creationChart(P1);
	myAmountChart.setOption(chart1);
	myPeopleChart.setOption(chart2);
	// content text
	var Attributes = {
		doms : $('#content .item'),
		Color :['255,255,0','231, 244, 8','3, 254, 165','241, 142, 15','44, 255, 10','251, 81, 49'],
		Size  :['50','26','32','42','35','38'],
		Position:[
			{'top':50,'left':47},
			{'top':80 ,'left':28},
			{'top':35,'left':20},
			{'top':13,'left':47},
			{'top':40,'left':75},
			{'top':83,'left':60}
		],
		shadow:['30','10','13','18','25','30']
	};
	var coordinateArr = [];
	for(var i = 0; i < $(Attributes.doms).length; i ++){
		var maxW = $(Attributes.doms).parent().width(), //父级width
			maxH = $(Attributes.doms).parent().height(),//父级width
			minW = $(Attributes.doms[i]).outerWidth(),	  //当前对象width
			minH = $(Attributes.doms[i]).outerHeight(),   //当前对象width
			ratioL = '0.'+Attributes.Position[i].left,
			ratioT = '0.'+Attributes.Position[i].top;
		// itme 初始位置
		coordinateArr.push({'x':maxW * ratioL - minW/2,'y':maxH * ratioT - minH/2});
		// 波纹动画
		var Animation = new timer(i,Attributes,coordinateArr);
		Animation.addSpan();
		Animation.animates();
		setInterval(Animation.animates,2100);
	}
	// 创建SVG线段
	var svg = d3.select('#svg');
	var creationSvg = new creationSVG(svg,coordinateArr);
	creationSvg();
	setInterval(creationSvg,4000);
}


base.initFn();
base.navClick();
// resize
$(window).resize(function(){
	//clearInterval(chartimer);
	$('.chart').each(function(){
		if($(this).children('.pageTip') < 1)$(this).empty();
	});
	// 窗口大小发生变化，清空chart box。
	if( $('.atPresent-main').hasClass('m-chart')){
		addChart(0);
	}else{
		base.drawSVG();
	}
})

/* ===========================================   creation fn    ============================================*/

function timer(i,Attributes,arr){
	var count = i;
	// 创建另一组固定的圆
	if(typeof this.addSpan != 'function'){
		this.addSpan = function(){
			var Nub = ['12344','567657777','345','435353','2552567','314235467']; 
			$(Attributes.doms[count]).parent().append((function(){
				var field = fieldName[count];
				if(field == '目标金额'){
					var span = $('<span class="addSpan " onclick="open_win()"><span>'+field+'</span><i data-value="'+goalData[0]['总人数']+'">'+Math.round(goalData[0]['总金额']/10000)+'</i></span>');
				}else{
					var span = $('<span class="addSpan"><span>'+field+'</span><i data-value="'+goalData[0][field+'人数']+'">'+Math.round(goalData[0][field+'金额']/10000)+'</i></span>');
				}
				
				span.css({
					'position':'absolute',
					'width':Attributes.Size[count]*2,
					'height':Attributes.Size[count]*2,
					'top':arr[count].y - Attributes.Size[count] +'px',
					'left':arr[count].x - Attributes.Size[count] +'px',
					'color':'rgb('+Attributes.Color[count]+')',
					'text-align':'center',
					'border-width':'2px',
					'border-style':'solid',
					'border-radius':'50%',
					'border-color':'rgba('+Attributes.Color[count]+',1)',
					'box-shadow':'0 0 '+ Attributes.shadow[count] +'px rgba('+Attributes.Color[count]+',.8) inset'
				})
				// 字段名&值 位置
				var Span = $(span).children('span');
				var marX = -$(Span).text().length/2*14;
				if(arr[count].y < arr[0].y/2){ // 顶部的圆
					$(Span).css({'margin-top':-23,'margin-left':marX});
				}else if(count == 0){ // 中心点圆
					$(Span).css({'margin-top':Attributes.Size[count]-15,'margin-left':marX});
				}else{
					$(Span).css({'margin-top':Attributes.Size[count]*2,'margin-left':marX});
				}
				return span;
			})());
		};
	}
	
    this.animates =  function (){
    	var random = Math.floor(Math.random()*100+1)*i + 1300;
    	// itme 初始style start
		$(Attributes.doms[count]).css({
			'top':arr[count].y -1 +'px',
			'left':arr[count].x -1 +'px',
			'border-color':'rgb('+Attributes.Color[count]+')',
			'box-shadow':'0 0 '+ Attributes.shadow[count] +'px rgb('+Attributes.Color[count]+') inset',
			'opacity':1
		});
		$(Attributes.doms[count]).stop().animate({
			'opacity':'0',
			'border-color':'rgb('+Attributes.Color[count]+')',
			'padding':Attributes.Size[count],
			'top':arr[count].y - Attributes.Size[count]-1 +'px',
			'left':arr[count].x - Attributes.Size[count]-1+'px'
		},random,function(){
			$(Attributes.doms[count]).stop().animate({
				'opacity':'0',
				'padding':'0px',
				'top':arr[count].y -1+'px',
				'left':arr[count].x -1+'px'
			},50);
		});
	};
}

function creationSVG(svg,Arr){
	var arr = [];
	var arr = Arr;
	//Secondary beisaier curve control points
	var controlPoins = function(){
		var coordinateZ = [];
		for(var i = 1;i < arr.length; i++){
			var qx,
				qy;
			if(arr[0].x - arr[i].x > 0){
				qx = (arr[0].x - arr[i].x)/2 + arr[i].x;
			}else{
				qx = (arr[i].x - arr[0].x)/2 + arr[0].x;
			}
			if(arr[0].y - arr[i].y > 0){
				qy = (arr[0].y - arr[i].y)/2 + arr[i].y;
			}else{
				qy = (arr[i].y - arr[0].y)/2 + arr[0].y;
			}
			coordinateZ.push({'qx':qx,'qy':qy});
		}
		return coordinateZ;
	};
	// creation svg
	return function(){
		svg.selectAll("*").remove();
		var obj = new controlPoins(arr);
		for(var i = 0;i < arr.length-1;i++){
			// 创建svg线条
			var path = d3.path();
			// 重新定义初始点，防止变量修改后污染；
			var baseX = arr[0].x,
				baseY = arr[0].y;
			path.moveTo(baseX, baseY);//start xy
            path.quadraticCurveTo(obj[i].qx + i*10, obj[i].qy, arr[i+1].x, arr[i+1].y);// end
            //底线
            svg.append("path")
                .attr("stroke-width", 1)
                .style("fill", "none")
                .style("stroke", "#03fedf")
                .style('opacity','.1')
                .style('box-shadow','0px 0px 50px 10px red')
                .attr("d", path)
                .transition()
                .duration(10);
            // 静止虚线
        	svg.append("path")
                .attr("stroke-width", 1)
                .style("fill", "none")
                .style("stroke", "#03fedf")
                .style('opacity','.3')
                // ("stroke-dasharray", "线段长度, 线段间距")
                .style("stroke-dasharray", "3, 10")
                .attr("d", path)
                .transition()
                // 动画持续时间
                .duration(10)
                .styleTween("stroke-dashoffset", function () {
                    return d3.interpolateNumber(1000, 0);
                });
            // 移动光点
            svg.append("path")
                .attr("stroke-width", 3)
                .style("fill", "none")
                .style("stroke", "#ff9800")
                .style("stroke-dasharray", "3, 1000")
                .attr("d", path)
                .transition()
                .duration(8000)
                .styleTween("stroke-dashoffset", function () {
                    return d3.interpolateNumber(1000, 100);
                })
            .transition().delay(0).remove();
            path.closePath();
		}
	}
}
// 显示圆圈所有值
$('.m-svg').delegate('.addSpan','mousemove',function(){
	$(this).css('cursor','pointer');
	overStyle($(this));
}).delegate('.addSpan','mouseout',function(){
	$(this).css('cursor','default');
	$('#overText').stop().fadeOut(150);
})

function overStyle(e){
	var offsetX = $(e).offset().left + $(e).outerHeight()/2-15;
	var offsetY = $(e).offset().top + $(e).outerWidth();
	if($(e).children('span').html() == '目标金额'){
		var tex = $(e).children('span').html()+'：'+$(e).children('i').html()+'（万）<br/>'
				+ '目标人数：'+$(e).children('i').attr('data-value');
	}else{
		var tex = $(e).children('span').html()+'金额：'+$(e).children('i').html()+'（万）<br/>'
				+ $(e).children('span').html()+'人数：'+$(e).children('i').attr('data-value');
	}
	
	$('#overText').stop().fadeIn(150).css({
		'top':offsetY +'px',
		'left':offsetX +'px'
	}).html(tex);
}
/*------------------------------------------      eCharts       ------------------------------------*/
function creationChart(arr){/*http://gallery.echartsjs.com/editor.html?c=xHJ3HrIgZx*/
	// echarts
	var option;
	return option = {
		title : {
	        text:arr.title.tH,
	        x:'center',
	        y:'10px'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    toolbox: {
	        show : false
	    },
	    calculable : true,
	    series : [
	        {
	            name:arr.title.tH,
	            type:'pie',
	            radius : [20, 60],
	            center : ['50%', '50%'],
	            roseType : 'area',
	            data:arr.seriesData
	        }
	    ]
	}
}

/* 排序
  -----*/
 function sort(a,b){
 	return b.value - a.value;
 }

function open_win(){
	if(!$('.currentPosition').attr('start-date'))return alert('请先查询一次数据！');
	if(!$('.currentPosition').attr('end-date'))return alert('请先查询一次数据！');
	var w = window.open("/pages/pageScroll");
}
/*----------------------------------------  chart fun---------------------------------------*/
// 加载chart
function addChart(size){
	// init timer
	chartimer[size] = size;
	chartimer[size] = setInterval(function(){
		if(getData[size]){
			clearInterval(chartimer[size]);
			if(getData[size].state){
				$('#'+chartName[size]).children('.loading').remove();
				var  div = $('<div class="pageTip"></div>').html(getData[size].state);
				$('#'+chartName[size]).stop().show().html(div);
			}else{
				$('#'+chartName[size]).children('.loading').remove();
				var createChart = drawChart(chartName);
				createChart[size]();
			}
		}
	},1000);
}



function drawChart(dom){
	var chartArr = {
		0:function(){
			// 30天到期
			var option = {
			    title : {
			    	text:getData[0].title,
			        subtext: getData[0].subtext
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data: getData[0].seriesName
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : getData[0].xAxisData
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel : {
			                formatter: '{value} '
			            }
			        }
			    ],
			    series : [
			        {
			        	name: getData[0].seriesName,
			            type:'line',
			            label: {
			                normal: {
			                    show: true,
			                    position: 'top'
			                }
			            },
			            data: getData[0].seriesData,
			            symbolSize: 15
			        }
			    ]
			};
			//$('#loading').removeClass('loading');
			myChart(dom[0],option);
		},
		1:function(){
			// 30天到期
			var option = {
			    title : {
			    	text:getData[1].title,
			        subtext: getData[1].subtext
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:getData[1].seriesName
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            data : getData[1].xAxisData
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:getData[1].seriesName,
			            type:'bar',
			            label: {
			                normal: {
			                    show: true,
			                    position: 'top'
			                }
			            },
			            itemStyle: {
			                normal: {
			                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			                        offset: 0,
			                        color: 'rgba(17, 168,171, 1)'
			                    }, {
			                        offset: 1,
			                        color: 'rgba(17, 168,171, 0.1)'
			                    }]),
			                    shadowColor: 'rgba(0, 0, 0, 0.1)',
			                    shadowBlur: 10
			                }
			            },
			            data:getData[1].seriesData
			        }
			    ]
			};
			//$('#loading').removeClass('loading');
			myChart(dom[1],option);
		}
	};
	return chartArr;
};

function myChart(dom,opt){
	$('#'+dom).show();
	var myChart = echarts.init(document.getElementById(dom));
	myChart.hideLoading(); 
	return myChart.setOption(opt);
}
// 排序
function sortFn(a,b){
	var first=a.tag.toLowerCase();
    	first = first.replace(/[\u4e00-\u9fa5]/g,"");// 去除中文
    	first = first.replace(/[\(]/g,'').replace(/[\k]/g,'');		   // 去除%
    	if(first == "")first = 1000;				   // 值为空
    	if(first.indexOf(',') > -1)first = first.substring(first.indexOf(',')+1,first.length-1); // 截取~前面的值
	var last=b.tag.toLowerCase();
    	last = last.replace(/[\u4e00-\u9fa5]/g,"");
    	last = last.replace(/[\(]/g,'').replace(/[\k]/g,'');
    	if(last.indexOf(',') > -1)last = last.substring(last.indexOf(',')+1,last.length-1);
    	if(last == "")last = 1000;
	
	return eval(first) - eval(last);
}
