<template>
    <div id="loading">
        {{msg}}
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name:'loading',
        data(){
            return{
                msg:'加载中，请稍后...'
            }
        }
    }
</script>

<style lang="less" type="text/less">
    @import '../../commonLess/index.less';  //引入公用less
    #loading{
        color:@colorWhite;
        font-size:30px;
        .m(100px;);
    }
</style>