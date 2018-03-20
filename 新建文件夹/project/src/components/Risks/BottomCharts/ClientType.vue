<template>
    <div id="clientType">
        <h1>{{chartsSize.chartsW}}</h1>
        <div id="clientTypeChart" :style="{width:'200px',height:'175px'}"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts';

    export default{
        name: 'clientType',
        data(){
            return {
                myChart: {}
            }
        },
        props: {
            chartsSize: {
                type: Object
            }
        },
        methods: {
            clientTypeChart(){
                this.myChart = echarts.init(document.getElementById('clientTypeChart'));

                var data = [
                    [[440009956, 81.8, 2996800, 'Australia', 2015],[2329400000, 67.7, 2593992, 'Canada', 2015], [4218200000, 75.8, 3029420, 'Iceland', 2015], [5990000000, 66.8, 8105020, 'India', 2015], [3616200000, 83.5, 9673180, 'Japan', 2015],  [1822500000, 81.4, 3471500, 'United Kingdom', 2015]]
                ];

                var option = {
                    title: {
                        text: '用户类别分布'
                    },
                    tooltip: {     //鼠标hover出现的tooltip框
                        show: false
                    },
                    legend: {
                        right: 10,
                        data: ['1990']
                    },
                    xAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'solid'
                            }
                        }
                    },
                    yAxis: {
                        axisLine: {     //坐标轴的轴线
                            show: false
                        },
                        axisTick: {    //坐标轴的刻度
                            show: false
                        },
                        axisLabel: {   //坐标轴的刻度值
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'solid'   //图表网格线
                            }
                        },
                        scale: true
                    },
                    series: [{
                        data: data[0],
                        type: 'scatter',
                        hoverAnimation: false,   //避免鼠标悬浮在区块时区块放大
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        label: {
                            emphasis: {
                                show: true,
                                formatter: function (param) {
                                    return param.data[3];
                                },
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: '#7496c7',
                                shadowOffsetY: 5,
                                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                    offset: 0,
                                    color: 'rgb(250, 250, 250)'
                                }, {
                                    offset: 1,
                                    color: '#7496c7'
                                }])
                            }
                        }
                    }]
                };
                this.myChart.setOption(option);


//                window.onresize = myChart.resize;
            }
        },
        mounted(){
            this.clientTypeChart();

        }
    }
</script>

<style lang="css">
</style>