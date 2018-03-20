<template>
    <div id="userDetail">
        {{$route.params}}
        <h2>用户：{{$route.params.username}}，家庭住址：{{$route.params.address}}</h2>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name:'userDetail'
    }
</script>

<style lang="less" type="text/less" scoped>

</style>