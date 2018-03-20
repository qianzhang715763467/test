function chartsArr(doms){
	chartShow = null;
	var cDom = doms;
	var chartsArr = {
		0:function(){
			var myChart = getId(cDom[0]);
			//取消载入提示
			myChart.hideLoading(); 
			// 到期用户分析
			var option = {
			    title : {
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
			            data: getData[0].seriesData,
			            symbolSize: 15,
			            markPoint : {
			                data : getData[0].markPointData
			            }
			        }
			    ]
			};
			$('#loading').removeClass('loading');
			myChart.setOption(option);
			pieTab(cDom[0],getData[0]);
			// 获取当前正在显示的chart。
			chartShow = '0';
		},
		1:function(){
			var myChart = getId(cDom[1]);
			//取消载入提示
			myChart.hideLoading(); 
			// 到期用户分析
			var option = {
			    title : {
			        subtext: getData[1].subtext
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data: getData[1].seriesName
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : getData[1].xAxisData
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
			        	name: getData[1].seriesName,
			            type:'line',
			            data: getData[1].seriesData,
			            symbolSize: 15,
			            markPoint : {
			                data : getData[1].markPointData
			            }
			        }
			    ]
			};
			$('#loading').removeClass('loading');
			myChart.setOption(option);
			pieTab(cDom[1],getData[1]);
			// 获取当前正在显示的chart。
			chartShow = '1';
		},
		2:function(){
			var myChart = getId(cDom[2]);
			//取消载入提示
			myChart.hideLoading(); 
			// 到期产品分布
			var option = {
			    title : {
			        "text":getData[2].seriesName,
			        x:'center',
			        y:'55%'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			      	y:'center',
		        	data: getData[2].legendData
			    },
			    calculable : true,
			    series : [
			        {
			            name: getData[2].seriesName,
			            type:'pie',
			            radius : ['43%','70%'],
			            center: ['50%', '60%'],
			           itemStyle : {
			                emphasis : {
			                    label : {
			                        show : true,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '30',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			           },
			            data: getData[2].seriesData
			        }
			    ]
			};
			$('#loading').removeClass('loading');
			myChart.setOption(option);
			columnarTab(cDom[2],getData[2]);
			// 获取当前正在显示的chart。
			chartShow = '2';
		},
		3:function(){
			var myChart = getId(cDom[3]);
			//取消载入提示
			myChart.hideLoading(); 
			// 到期用户定期资产AUM期限分布
			var option = {
			    title : {
			        "text":getData[3].seriesName,
			        x:'center',
			        y:'55%'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			      	y:'center',
		        	data: getData[3].legendData
			    },
			    calculable : true,
			    series : [
			        {
			            name: getData[3].seriesName,
			            type:'pie',
			            radius : ['40%','70%'],
			            center: ['50%', '60%'],
			           itemStyle : {
			                emphasis : {
			                    label : {
			                        show : true,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '30',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			           },
			            data: getData[3].seriesData
			        }
			    ]
			};
			$('#loading').removeClass('loading');
			myChart.setOption(option);
			columnarTab(cDom[3],getData[3]);
			// 获取当前正在显示的chart。
			chartShow = '3';
		},
		4:function(){
			var myChart = getId(cDom[4]);
			//取消载入提示
			myChart.hideLoading(); 
			// 无定期资产AUM 用户活期AUM分布
			var option = {
			    title : {
			        subtext: getData[4].subtext
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data: getData[4].seriesName
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : getData[4].xAxisData
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
			        	name: getData[4].seriesName,
			            type:'line',
			            data: getData[4].seriesData,
			            symbolSize: 15,
			            markPoint : {
			                data : getData[4].markPointData
			            }
			        }
			    ]
			};
			$('#loading').removeClass('loading');
			myChart.setOption(option);
			pieTab(cDom[4],getData[4]);
			// 获取当前正在显示的chart。
			chartShow = '4';
		}
	}
	return chartsArr;
};

function getId(dom){
	$('#'+dom).show();
	var myChart = echarts.init(document.getElementById(dom));
	return myChart;
}

// table
function pieTab(dom,data){
	$('#'+dom).next('.foot-tab').children('table').empty().stop().hide();
	var datas = data.values.sort(sortFn);
	var tr1 = null,
		tr2 = null;
		tr3 = null,
		totalAmount = 0,
		totalMem = 0;
	if(dom != 'demand'){
		tr1 = $('<tr><th></th></tr>')
		tr2 = $('<tr><th>到期人数</th></tr>');
		tr3 = $('<tr><th>到期金额</th></tr>')
	}else{
		tr1 = $('<tr><th>活期AUM</th></tr>')
		tr2 = $('<tr><th>人数</th></tr>');
		tr3 = $('<tr><th>活期总金额</th></tr>')
	}
	for(var i = 0;i < datas.length; i++){
		if(datas[i].tag == ""){
			datas[i].tag = 0;
			!datas[i].mem? 				'': datas[i].mem = 0;
			!datas[i].huoqi_balance? 	'': datas[i].huoqi_balance = 0;
			!datas[i].amount? 			'': datas[i].amount = 0;
		}
		
		tr1.append('<th>'+datas[i].tag+'</th>');
		if(dom == 'interestRateDistribution'){
			totalMem  += datas[i].num;
			tr2.append('<td>'+toFixedComplemented(datas[i].num)+'</td>');
			datas[i].amount = datas[i].amount/10000;
			totalAmount += datas[i].amount;
			tr3.append('<td>'+toFixedComplemented(datas[i].amount)+'</td>');
		}else{
			totalMem  += datas[i].mem;
			tr2.append('<td>'+parseFloat(datas[i].mem).toLocaleString()+'</td>');
			if(dom == "demand"){// 到期金额key 不同	
				totalAmount += datas[i].huoqi_balance;
				tr3.append('<td>'+ toFixedComplemented(datas[i].huoqi_balance) +'</td>');
			}else{
				totalAmount += datas[i].amount;
				tr3.append('<td>'+toFixedComplemented(datas[i].amount)+'</td>');
			}
		}
	}
	// 合计
	tr1.append('<th style="color: red;">Total</th>');
	
	
	tr2.append('<td>'+ toFixedComplemented(totalMem) +'</td>');
	tr3.append('<td>'+ toFixedComplemented(totalAmount) +'</td>');
	$('#'+dom).next('.foot-tab').children('table').stop().show().append(tr1,tr2,tr3);
	// title
	if(dom == 'customer'){
		$('.chart-title').find('.endDate').text(subEndDate.substring(0,10));
		$('.chart-title').find('.totalMem').text(parseFloat(totalMem).toLocaleString());
		$('.chart-title').find('.totalAmount').text(parseFloat((totalAmount/10000).toFixed(1)).toLocaleString()+' 亿元');
	}
}

function columnarTab(dom,data){
	//var datas = data.values.sort(sortFn);
	$('#'+dom).next('.foot-tab').children('table').empty().stop().hide();
	var datas = data.values;
	var tr1	= $('<tr><th>到期产品</th><th>到期人数</th><th>到期金额</th></tr>'),
		tr2 = $('<tr><th>定期资产AUM</th><th>人数</th><th>交易金额</th></tr>');
		totalAmount = 0,
		totalMem = 0;
	$('#'+dom).next('.foot-tab').children('table').stop().show().append('<tr style="background-color:transparent;"><td colspan="3" style="border: none;background-color: white; text-align: right;">人群会重复</td></tr>');
	if(dom == 'product'){
		$('#'+dom).next('.foot-tab').children('table').stop().show().append(tr1);
	}else{
		$('#'+dom).next('.foot-tab').children('table').stop().show().append(tr2);
	}
	for(var i = 0;i < datas.length; i++){
		if(datas[i].tag == "")datas[i].tag = 0;
		if(datas[i].tag == "")datas[i].mem = 0;
		if(datas[i].tag == "")datas[i].amount = 0;
		totalAmount += datas[i].amount;
		totalMem  += datas[i].mem;
		var tr3 = '<tr>'
			+'<td>'+datas[i].tag+'</td>'
			+'<td>'+parseFloat(datas[i].mem).toLocaleString()+'</td>'
			+'<td>'+ toFixedComplemented(datas[i].amount) +'</td>'
		+'</tr>';
		$('#'+dom).next('.foot-tab').children('table').append(tr3);
	}
	
	// 合计
	var trTotal = '<tr>'
		+'<td style="color: red;">Total</td>'
		+'<td>'+parseFloat(totalMem).toLocaleString()+'</td>'
		+'<td>'+parseFloat(totalAmount).toLocaleString()+'</td>'
	+'</tr>';
	$('#'+dom).next('.foot-tab').children('table').append(trTotal).stop().show();
}

// 排序
function sortFn(a,b){
	var first=a.tag.toLowerCase(); // 转小写
		if(first.length < 1){
			first = 1000;
		}
		if(first.lastIndexOf('+') == first.length-1){ // 当前字段最后一位为+号。如： 10%+
			first = Number(first.replace(/[^0-9]/g,",").split(',')[0])+1;
		}else{
			first = first.replace(/[^0-9]/g,",");
			first = first.split(',');
			for(var i = first.length-1; i >= 0 ; i--){
				if(first[i].length > 0){
					first = first[i];
					break;
				}
			}
		}
	var last=b.tag.toLowerCase();
		if(last.length < 1){
			last = 1000;
		}
		if(last.lastIndexOf('+') == last.length-1){ // 当前字段最后一位为+号。如： 10%+
			last = Number(last.replace(/[^0-9]/g,",").split(',')[0])+1;
		}else{
			last = last.replace(/[^0-9]/g,",");
			last = last.split(',');
			for(var i = last.length-1; i >= 0; i--){
				if(last[i].length > 0){
					last = last[i];
					break;
				}
			}
		}
	return eval(first) - eval(last);
}

// 千位分隔符之后小数点最后一位 为‘0’会丢失，这里进行补全操作
function toFixedComplemented(val){
	val = parseFloat(val.toFixed(2)).toLocaleString();
	if(val.indexOf('.')>-1 && val.split('.')[1].length < 2){
		val = val+'0';
	}
	return val;
}