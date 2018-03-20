<template>
    <div id="user">
        <h3>路由传参：</h3>
        <ul>
            <li><router-link to="/user/Ivy/address/深圳">Ivy</router-link></li>
            <li><router-link to="/user/Jason/address/上海">Jason</router-link></li>
            <li><router-link to="/user/Blue/address/广州">Blue</router-link></li>
        </ul>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name:'user'
    }
</script>

<style lang="less" type="text/less" scoped>
    @import "../commonLess/index.less";
    li{
        .router-link-active{
            background:@colorred;  //对选中的元素高亮
        }
    }
</style>