<template>
    <div id="riskForecast">
        <div id="riskForecastChart" :style="{width:'200px',height:'150px'}"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts';
    export default{
        name:'riskForecast',
        methods:{
            riskForecastChart(){
                var myChart = echarts.init(document.getElementById('riskForecastChart'));
                var option = {
                    title: {
                        text: '风险水平预测'
                    },
                    barCategoryGap:'30%',
                    tooltip: {
                        show:false,
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        axisLabel:{
                            show:false
                        },
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        type: 'category',
                        data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
                    },
                    yAxis: {
                        axisLabel:{
                            show:false
                        },
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        splitLine:{
                            show:false
                        },
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            data: [120,60,102,99,133 ],
                            // barGap:'25%',
                            itemStyle:{
                                normal:{
                                    color:  new echarts.graphic.LinearGradient(
                                        0, 1, 0, 0,
                                        [
                                            {offset: 1, color: '#477397'},
                                            {offset: 0.2, color: '#9dc1de'},
                                            {offset: 0, color: '#fff'}

                                        ]
                                    )
                                },
                            }
                        },
                        {
                            name: '2012年',
                            type: 'bar',
                            data: [80,123,76,128,96 ],
                            itemStyle:{
                                normal:{
                                    color:  new echarts.graphic.LinearGradient(
                                        0, 1, 0, 0,
                                        [
                                            {offset: 1, color: '#68a0c5'},
                                            {offset: 0.2, color: '#94bce3'},
                                            {offset: 0, color: '#fff'}

                                        ]
                                    )
                                },
                            }
                        },
                        {
                            name: '2013年',
                            type: 'bar',
                            data: [50, 80,117,115,118],
                            itemStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(
                                        0, 1, 0, 0,
                                        [
                                            {offset: 1, color: '#b3c6e0'},
                                            {offset: 0.2, color: '#cadbed'},
                                            {offset: 0, color: '#fff'}

                                        ]
                                    )
                                },
                            }
                        }
                    ]
                };
                myChart.setOption(option);
            }
        },
        mounted(){
            this.riskForecastChart();
        }
    }
</script>

<style lang="css">

</style>