<template>
    <div id="clientRule">
        <div id="ruleChart" :style="{width:'200px',height:'150px'}"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts';
    export default{
        name: 'clientRule',
        methods: {
            clientRuleChart() {
                var myChart = echarts.init(document.getElementById('ruleChart'));

                var itemStyle={    //饼状图各区块之间的分割线
                    normal:{
                        borderWidth:3,
                        borderColor:'#fff'
                    }
                };
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '用户触发规则统计'
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            hoverAnimation:false,
                            selectedMode: 'single',
                            radius: [0, '50%'],
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直达', selected:false},
                                {value:679, name:'营销广告', selected:false},
                                {value:158, name:'搜索引擎', selected:false},
                                {value:1548, name:'邮件营销', selected:false}
                            ],
                            color:['#b7cee8', '#487aa9','#5691cb','#85b0db']
                        }
                    ],
                    itemStyle:itemStyle
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);

            }
        },
        mounted(){
            this.clientRuleChart();
        }
    }
</script>

<style lang="css">

</style>