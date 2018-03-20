<template>
    <div id="bottomChartsBox">
        <div class="bottomCharts">
            <div class="charts">
                <client-rule></client-rule>
            </div>
            <div class="charts">
                <client-type ref="charts" :chartsSize="chartsSize"></client-type>
            </div>
            <div class="charts">
                <risk-forecast></risk-forecast>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import ClientRule from './BottomCharts/ClientRule.vue'
    import ClientType from './BottomCharts/ClientType.vue'
    import RiskForecast from './BottomCharts/RiskForecast.vue'

    export default{
        name:'bottomCharts',
        data(){
            return{
                chartsSize:{
                    chartsW:0,
                    chartsH:0
                }
            }
        },
        created(){
            this.$nextTick(function(){
                this.chartsSize.chartsW=this.$refs.charts.offsetWidth;
                this.chartsSize.chartsH=this.$refs.charts.offsetHeight;
            })
        },
        components:{
            'client-rule':ClientRule,
            'client-type':ClientType,
            'risk-forecast':RiskForecast
        }
    }
</script>

<style lang="less" type="text/less" scoped>
    @import '../../less/common';

    #bottomChartsBox{
        .w(100%);
        .h(26%);
        padding-bottom:20px;
        box-sizing:border-box;
        .bottomCharts {
            .w(100%);
            .h(100%);
            .b-r(4px);
            .p(10px);
            box-sizing:border-box;
            background:@riskContentBg;
            .charts{
                .w(calc(100% / 3));
                .h(100%);
                float:left;
                overflow:hidden;
            }
        }
    }
</style>