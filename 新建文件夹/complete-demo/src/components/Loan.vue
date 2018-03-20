<template>
    <div id="loan">
        <h2>自定义组件＋vuex：</h2>
        <Loading v-show="showLoading"></Loading>
    </div>
</template>

<script type="text/ecmascript-6">
//    import Loading from './Loading/Loading.vue'
import {mapActions,mapGetters} from 'vuex';

    export default{
        name:'loan',
        computed:mapGetters([
            'showLoading'
        ])
    }
</script>

<style lang="css">

</style>
