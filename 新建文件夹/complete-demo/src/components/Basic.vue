<template>
    <div id="basic">
        <h3>嵌套路由+animate.css：</h3>
        <ul>
            <li><router-link to="/basic/basicOne">基础信息一</router-link></li>
            <li><router-link to="/basic/basicTwo">基础信息二</router-link></li>
        </ul>
        <div>
            <transition enter-active-class="zoomInLeft" leaveActiveClass="zoomOutRight">
                <router-view class="animated"></router-view>
            </transition>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name:'basic'
    }
</script>

<style lang="less" type="text/less" scoped>
    @import '../commonLess/index.less';
    #basic{
        ul{
            overflow:hidden;
            .m-b(10px);
            li{
                .w(30%);
                float:left;
                .router-link-active{
                    background:@colorred;
                }
            }
        }
    }
</style>