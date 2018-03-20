<template>
    <div id="GradeStatisticsBox">
        <div class="GradeStatistics">
            <div class="grade">
                <p class="title">当前总风险值评分</p>
                <div class="Border">
                    <div class="gradeBorder" ref="gradeBorder">
                        <span class="score">98</span>
                    </div>
                </div>

            </div>
            <div class="statisticsBox">
                <div class="statistics"  ref="statisticsBox">
                    <p class="title">今日事件统计</p>
                    <div class="statis">
                        <ul class="statisticsList" ref="statisticsList">
                            <li v-for="item in statistics" ref="statisticsDom">
                                <p>{{item.statist}}</p>
                                <p>{{item.num}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name: 'GradeStatistics',
        data() {
            return {
                statistics: [
                    {statist: '逾期数量', num: 1234},
                    {statist: '申请数量', num: 2344},
                    {statist: '通过数量', num: 3654},
                    {statist: '拒绝数量', num: 5435},
                    {statist: '放款数量', num: 4756},
                ]
            }
        },
        mounted() {

        }
    }
</script>

<style lang="less" type="text/less" scoped>
    @import '../../less/common';

    #GradeStatisticsBox {
        .w(100%);
        .h(26%);
        padding: 15px 0;
        box-sizing: border-box;
        background: @lightGray;
        .GradeStatistics {
            display: flex;
            .w(100%);
            .h(100%);
            background: @lightGray;
            .grade {
                flex: 0 0 180px;
                .b-r(4px);
                .h(100%);
                background: #fff;
                float: left;
                position: relative;
                .p(10px);
                box-sizing: border-box;
                .title {
                    width: 100%;
                    height: 20%;
                }
                .Border {
                    width: 100%;
                    height: 80%;
                    position: relative;
                }
                .gradeBorder {
                    .w(80px);
                    .h(80px);
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    border: 3px dashed @grade;
                    border-radius: 50%;
                    text-align: center;
                    .score {
                        .l-h(80px);
                        .f-s(30px);
                        color: @grade;
                        font-family: "宋体";
                    }
                }
            }
            .statisticsBox {
                flex: 1;
                .h(100%);
                padding-left: 15px;
                box-sizing: border-box;
                background: @lightGray;

                .statistics {
                    .w(100%);
                    .h(100%);
                    .b-r(4px);
                    .p(10px);
                    box-sizing: border-box;
                    background: @riskContentBg;
                    position: relative;
                    .title {
                        height: 20%;
                        width: 100%;
                    }
                    .statis {
                        width: 100%;
                        height: 80%;
                        position: relative;
                    }
                    .statisticsList {
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        margin: auto;
                        box-sizing: border-box;
                        width: 100%;
                        display: table;
                        li {
                            display: table-cell;
                            .w(calc(100% / 6));
                            text-align: center;
                            p {
                                line-height: 40px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>