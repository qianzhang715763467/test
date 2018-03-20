<template>
    <div id="risk">
        <risk-header></risk-header>
        <risk-gradeStatistics></risk-gradeStatistics>
        <pass-rate></pass-rate>
        <bottom-charts></bottom-charts>
    </div>
</template>

<script type="text/ecmascript-6">
    import riskHeader from './Risks/Header.vue'
    import gradeStatistics from './Risks/GradeStatistics.vue'
    import passRate from './Risks/PassRate.vue'
    import bottomCharts from './Risks/BottomCharts.vue'

    export default{
        name:'risk',
        components:{
            'risk-header':riskHeader,
            'risk-gradeStatistics':gradeStatistics,
            'pass-rate':passRate,
            'bottom-charts':bottomCharts
        }
    }
</script>

<style lang="less" type="text/less">
    @import '../less/common';
    #risk{
        .w(100%);
        .h(100%);
    }
</style>