$(function(){
	//调用
	var width  = $("body").outerWidth(),
		height = $("body").outerHeight();
	var late = (height-width)/2+"px";
	if(height > width){
		$('#keyData').css({"transform":"rotate(90deg) translate("+late+","+late+")","width":height,"height":width});
		$('.switchPage').css({"width":"100%","height":"100px"});
	}
	
    KPI();
    registerUserGraph();
    tradeAmountGraph();
    monthlyTradeGraph();
    dataMonitorGraph();

    function KPI(){
        var kpiGraph=echarts.init(document.getElementById("kpiGraph"));
        var option = {
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            textStyle:{
                                fontSize:'16',
                                color:"#7E8790"
                            },
                            formatter: '{d}%'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold',
                                color:"#7E8790"
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {
                            value:25, name:'AAA',
                            label:{
                                normal:{
                                    show:false,
                                    formatter: '{d}%',
                                    position:"center",
                                    textStyle: {
                                        color: '#7E8790',
                                        fontSize: 16
                                    }
                                }
                            }
                        },
                        {
                            value:75, name:'BBB',
                            label:{
                                normal:{
                                    show:true,
                                    formatter: '{d}%',
                                    position:"center",
                                    textStyle: {
                                        color: '#7E8790',
                                        fontSize: 16
                                    }
                                }
                            }
                        }
                    ]
                }
            ],
            color:["#130B9F","#01E6FD"]
        }
        kpiGraph.setOption(option);
    };
    function registerUserGraph(){
        var registerUserGraph=echarts.init(document.getElementById("registerUserGraph"));
        var option = {
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : false,
                feature : {
                    dataView : {show: false, readOnly: false},
                    magicType : {show: false, type: ['line', 'bar']},
                    restore : {show: false},
                    saveAsImage : {show: false}
                }
            },
            calculable : true,
            xAxis : [
                {
                    show:false,
                    type : 'category',
                    data : []
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show:false,
                    splitLine:{
                        show:false
                    }
                }
            ],
            series : [
                {
                    name:'蒸发量',
                    type:'bar',
                    data:[10.0, 4.9, 17.0, 23.2, 25.6, 36.7, 35.6, 52.2, 32.6, 20.0, 16.4, 13.3],
                    itemStyle:{
                        normal:{
                            color:"#1CDFF1"
                        }
                    }
                },
                {
                    name:'降水量',
                    type:'bar',
                    data:[12.6, 25.9, 29.0, 26.4, 28.7, 58.7, 55.6, 60.2, 48.7, 18.8, 14.0, 22.3],
                    itemStyle:{
                        normal:{
                            color:"#0C6577"
                        }
                    }
                }
            ]
        };
        registerUserGraph.setOption(option);
    };
    function tradeAmountGraph(){
        var tradeAmountGraph=echarts.init(document.getElementById("tradeAmountGraph"));
        var label={
                normal:{
                    show:false,
                    formatter: '{d}%',
                    position:"center",
                    textStyle: {
                        color: '#7E8790',
                        fontSize: 16
                    }
                }
            },
            option = {
                legend: {
                    orient: 'vertical',
                    x: '80%',
                    y:"10%",
                    itemGap:20,
                    data:['直接访问','邮件营销','联盟广告','视频广告'],
                    textStyle:{
                        color:'#7E8790',
                        fontSize:12
                    }
                },
                series: [
                    {
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                textStyle:{
                                    fontSize: '16',
                                    color:"#7E8790"
                                },
                                formatter:'{d}%'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold',
                                    color:"#7E8790"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {
                                value:85, name:'直接访问',
                                label:label
                            },
                            {
                                value:100, name:'邮件营销',
                                label:label
                            },
                            {
                                value:220, name:'联盟广告',
                                label:{
                                    normal:{
                                        show:true,
                                        formatter: '{d}%',
                                        position:"center",
                                        textStyle: {
                                            color: '#7E8790',
                                            fontSize: 16
                                        }
                                    }
                                }
                            },
                            {
                                value:95, name:'视频广告',
                                label:label
                            }
                        ]
                    }
                ],
                color:["#F80561","#EA2503","#180D98","#11DDFF"]
            };
        tradeAmountGraph.setOption(option);
    };


    function monthlyTradeGraph(){
        var monthlyTradeGraph=echarts.init(document.getElementById("monthlyTradeGraph"));
        var option = {
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    axisLine:{
                        show: false,   //控制坐标轴轴线是否显示
                        lineStyle:{
                            color:"#7E8790"   //改变坐标值的颜色
                        }
                    },
                    axisLabel:{      //调整x轴的lable
                        textStyle:{
                            fontSize:12   //改变坐标值字体大小
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    boundaryGap : true,
                    data : ['111','222','333','444','555','666','777','888']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{
                        show: false,  //控制坐标轴轴线是否显示
                        lineStyle:{
                            color:"#7E8790"    //改变坐标值的颜色
                        }
                    },
                    axisLabel:{ //调整y轴的lable
                        textStyle:{
                            fontSize:12  //改变坐标值字体大小
                        }
                    },
                    axisTick: {    //去除坐标轴上的刻度线
                        show: false
                    },
                    splitLine:{    //控制网格线是否显示
                        show:false
                    }
                }
            ],
            series : [
                {
                    name:'预购',
                    type:'line',
                    smooth:true,
                    itemStyle: {normal: {
                                    areaStyle: {type: 'default'},
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{   //设置渐变色
                                            offset: 0,
                                            color: 'rgb(10,121,233)'
                                        },{
                                            offset: 0.8,
                                            color: '#01083F'
                                        },{
                                            offset: 1,
                                            color: 'rgb(0, 0, 0)'
                                        }
                                    ])
                        }
                    },
                    data:[10, 182, 234, 191, 150, 185, 263,230]
                }
            ]
        };
        monthlyTradeGraph.setOption(option);
    };

    function dataMonitorGraph(){
        var dataMonitorGraph=echarts.init(document.getElementById("dataMonitorGraph"));
        var dataStyle = {
            normal: {
                label: {show:true},
                labelLine: {show:false}
            }
        };
        var placeHolderStyle = {
            normal : {
                color:'rgba(0,0,0,0)',
                label: {show:true},
                labelLine: {show:false}
            },
            emphasis : {
                color: 'rgba(0,0,0,0)'
            }
        };
        var option = {
            title: [{
                text: 'AAAAA',
                left: '15%',
                top: '46%',
                textStyle: {
                    color: '#7E8790',
                    fontSize:12
                }
            }, {
                text: 'BBBBB',
                left: '75%',
                top: '46%',
                textAlign: 'center',
                textStyle: {
                    color: '#7E8790',
                    fontSize:12
                }
            }, {
                text: 'CCCCC',
                left: '23%',
                top: '91%',
                textAlign: 'center',
                textStyle: {
                    color: '#7E8790' ,
                    fontSize:12
                }
            }
            ],
            legend: {
                orient : 'vertical',
                x : '66%',
                y : '65%',
                itemGap:8,
                data:['第一个','第二个','第三个'],
                textStyle:{
                    fontSize:12,
                    color:'#7E8790'
                }
            },
            series : [
                {
                    name:'1',
                    type:'pie',
                    clockWise:true,
                    startAngle:90,
                    hoverAnimation:false,
                    center: ['25%', '30%'],
                    radius : ['28%', '38%'],
                    data:[
                        {
                            value:40,
                            name:'第一个',
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                        [{
                                            offset: 0,
                                            color: '#5EECFF'
                                        }, {
                                            offset: 1,
                                            color: '#437AB0'
                                        }]),
                                }
                            },
                            label:{
                                normal:{
                                    formatter: '{c} bps',
                                    position:"center",
                                    textStyle: {
                                        color: '#7E8790',
                                        fontSize: 12
                                    }
                                }
                            }
                        },
                        {
                            value:200,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]

                },
                {
                    name:'2',
                    type:'pie',
                    clockWise:false,
                    startAngle:180,
                    hoverAnimation:false,
                    center: ['25%', '30%'],
                    radius : ['30%', '36%'],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:100,
                            name:'',
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                        [{
                                            offset: 0,
                                            color: '#fff'
                                        }, {
                                            offset: 0.3,
                                            color: '#404968'
                                        },
                                            {
                                                offset: 1,
                                                color: '#181736'
                                            }]),
                                }
                            }
                        },
                        {
                            value:100,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                },
                {
                    name:'3',
                    type:'pie',
                    clockWise:true,
                    startAngle:90,
                    hoverAnimation:false,
                    center: ['77%', '30%'],
                    radius : ['28%', '38%'],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:50,
                            name:'第二个',
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                        [{
                                            offset: 0,
                                            color: '#E51B67'
                                        }, {
                                            offset: 1,
                                            color: '#9A1435'
                                        }]),
                                }
                            },
                            label:{
                                normal:{
                                    formatter: '{c} bps',
                                    position:"center",
                                    textStyle: {
                                        color: '#7E8790',
                                        fontSize: 12
                                    }
                                }
                            }
                        },
                        {
                            value:200,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]

                },
                {
                    name:'4',
                    type:'pie',
                    clockWise:false,
                    startAngle:180,
                    hoverAnimation:false,
                    center: ['77%', '30%'],
                    radius : ['30%', '36%'],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:100,
                            name:'',
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                        [{
                                            offset: 0,
                                            color: '#fff'
                                        }, {
                                            offset: 0.3,
                                            color: '#502C36'
                                        },
                                            {
                                                offset: 1,
                                                color: '#9A1435'
                                            }]),
                                }
                            }
                        },
                        {
                            value:100,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                },
                {
                    name:'5',
                    type:'pie',
                    clockWise:true,
                    startAngle:90,
                    hoverAnimation:false,
                    center: ['25%', '75%'],
                    radius : ['28%', '38%'],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:50,
                            name:'第三个',
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                        [{
                                            offset: 0,
                                            color: '#F3F685'
                                        }, {
                                            offset: 1,
                                            color: '#D7F928'
                                        }]),
                                }
                            },
                            label:{
                                normal:{
                                    formatter: '{c} bps',
                                    position:"center",
                                    textStyle: {
                                        color: '#7E8790',
                                        fontSize: 12
                                    }
                                }
                            }
                        },
                        {
                            value:200,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]

                },
                {
                    name:'6',
                    type:'pie',
                    clockWise:false,
                    startAngle:180,
                    hoverAnimation:false,
                    center: ['25%', '75%'],
                    radius : ['30%', '36%'],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:100,
                            name:'',
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                        [{
                                            offset: 0,
                                            color: '#fff'
                                        }, {
                                            offset: 0.3,
                                            color: '#7F8C70'
                                        },
                                            {
                                                offset: 1,
                                                color: '#D7F928'
                                            }]),
                                }
                            }
                        },
                        {
                            value:100,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                }
            ]
        };
        dataMonitorGraph.setOption(option);
    }
})

/*=================================*/
var touchXStart,
	touchYStart;

$(document).bind("touchstart", function (e) {
    var touch = e.originalEvent.targetTouches[0];
    touchXStart = touch.pageX;
    touchYStart = touch.pageY;
    event.preventDefault();
});

$(document).bind("touchend", touchEnd);
function touchEnd(e) {
    var touch = e;
    if (e.originalEvent && e.originalEvent.changedTouches) {
        touch = e.originalEvent.changedTouches[0];
    }

    if (touchYStart - touch.pageY > 100) {
    	alert("没有了！")
    } else if (touch.pageY - touchYStart > 100) {
    	$('#prePage').trigger("click");
    }
}