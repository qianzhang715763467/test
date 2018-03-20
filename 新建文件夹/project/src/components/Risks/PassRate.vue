<template>
    <div id="passRateBox">
        <div class="passRate">
            <p>征信模型通过率</p>
            <ul>
                <li v-for="item in passRateArr" ref="passRateLi">
                    <p>{{item.name}}</p>
                    <div class="squareOuterBox" ref="squareOuterBox">
                        <div class="squareInnerBox" v-for="rate in item.passRate">
                            <span class="square"></span>
                            <span class="square"></span>
                        </div>
                        <div class="squareInnerBox" v-for="rate in item.passRate">
                            <span class="square"></span>
                            <span class="square"></span>
                        </div>
                        <div class="squareInnerBox" v-for="rate in item.passRate">
                            <span class="square"></span>
                            <span class="square"></span>
                        </div>
                        <div class="squareInnerBox" v-for="rate in item.passRate">
                            <span class="square"></span>
                            <span class="square"></span>
                        </div>
                        <div class="squareInnerBox" v-for="rate in item.passRate">
                            <span class="square"></span>
                            <span class="square"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import $ from 'jquery';
    export default{
        name:'passRate',
        data(){
            return{
                passRateArr:[
                    {'name':'百融','id':1,'passRate':[{'val':'72%'}]},
                    {'name':'卫诚','id':2,'passRate':[{'val':'65%'}]},
                    {'name':'前海','id':3,'passRate':[{'val':'80%'}]},
                    {'name':'百融','id':4,'passRate':[{'val':'72%'}]},
                    {'name':'卫诚','id':5,'passRate':[{'val':'75%'}]},
                    {'name':'前海','id':6,'passRate':[{'val':'66%'}]},
                    {'name':'聚信立','id':7,'passRate':[{'val':'62%'}]}
                ]
            }
        },
        mounted(){
            this.$nextTick(function(){
                var count=$(this.$refs.squareOuterBox).find('span').length/this.passRateArr.length;  //每一组span的个数，每组10个span
                for(var i=0;i<this.passRateArr.length;i++){
                    var spanIndex=Math.round(parseInt(this.passRateArr[i].passRate[0].val)/10);   //根据passRateArr的val值获取span的下标
                    for(var j=count;j>0;j--){
                        console.log($(this.$refs.passRateLi[i]).find('span').eq(spanIndex));
                        if(spanIndex>0&&spanIndex%2==0){
                            $(this.$refs.passRateLi[i]).find('span').eq(10-spanIndex).parent().find('span').css('background','#2060f1');
                            $(this.$refs.passRateLi[i]).find('span').eq(10-spanIndex).parent().nextAll().find('span').css('background','#2060f1');
                        }else{
                            $(this.$refs.passRateLi[i]).find('span').eq(10-spanIndex).prev().css('background','#2060f1');
                            $(this.$refs.passRateLi[i]).find('span').eq(10-spanIndex).parent().nextAll().find('span').css('background','#2060f1');
                        }
                    }
                }
            })

        }
    }
</script>

<style lang="less" type="text/less" scoped>
    @import '../../less/common';

    #passRateBox{
        .w(100%);
        .h(26%);
        padding-bottom:15px;
        box-sizing:border-box;
        .passRate{
            .w(100%);
            .h(100%);
            .p(10px);
            .b-r(4px);
            box-sizing:border-box;
            background:@riskContentBg;
            p{
                .h(20%);
            }
            ul{
                display:flex;
                padding-top:15px;
                box-sizing:border-box;
                .h(80%);
                li{
                    flex:1;
                    text-align:center;
                    p{
                        .h(30%);
                    }
                    .squareOuterBox{
                        .h(70%);
                        .squareInnerBox{
                            .h(8px);
                            .square{
                                display:inline-block;
                                .w(15px);
                                .h(6px);
                                background:#fff;
                            }
                        }
                    }
                }
            }
        }
    }
</style>