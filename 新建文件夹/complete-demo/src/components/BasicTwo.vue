<template>
    <div id="basicTwo">
        <h3>父子组件及同级组件之间的通信：</h3>
        <div class="fatherComponent">
            <span class="name">父组件的数据=>:</span><span class="fatherData">{{dataFromFather.msgFather}}</span><br/>
            <child-A :msg="dataFromFather"></child-A>   <!--子组件A-->
            <child-B></child-B>   <!--子组件B-->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    import Child_A from './ChildA.vue'   //引入子组件A
    import Child_B from './ChildB.vue'   //引入子组件B

//    const Event =new Vue();   //定义全局Event对象，用来实现组件之间通信

    export default{
        name:'basicTwo',
        data(){
            return{
                dataFromFather:{
                    msgFather:'我是父组件数据'
                }
            }
        },
        components:{
            'child-A':Child_A,   //子组件A
            'child-B':Child_B    //子组件B
        },
        updated(){
            document.getElementsByClassName("fatherData")[0].style.color="red";
        }
    }
</script>

<style lang="css">
    .name{
        background:yellow;
    }
    .fatherComponent{
        margin-top:30px;
    }
</style>