<template>
    <div id="RiskHeader">
        <ul ref="riskHeight">
            <li v-for="item in RiskHeaderArr" ref="headerLList">
                <p>{{item.title}}</p>
                <p>{{item.num}}</p>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name: 'RiskHeader',
        data(){
            return {
                RiskHeaderArr: [
                    {title: '累计总金额', num: 1234},
                    {title: '当前贷款余额', num: 4567},
                    {title: '累计不良金额', num: 2345},
                    {title: '累计不良金额', num: 465767},
                    {title: '累计不良用户数', num: 65434}
                ]
            }
        },
        methods: {},
        created() {
            this.$nextTick(function () {
                var headerHeight = this.$refs.headerLList[0].clientHeight;
                var riskHeight = this.$refs.riskHeight.clientHeight;

            })
        }

    }
</script>

<style lang="less" type="text/less" scoped>
    @import '../../less/common';

    #RiskHeader {
        position: relative;
        background: @riskHeaderBg;
        .b-r(5px);
        .h(22%);
        .w(100%);
        .f-s(0);
        ul {
            display: table;
            .h(60%);
            .w(100%);
            text-align: center;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
            li {
                display: table-cell;
                .h(100%);
                .f-s(16px);
                .l-h(60px);
                text-align: center;

            }
        }
    }
</style>