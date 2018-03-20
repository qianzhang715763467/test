<template>
    <div class="childComponentA">
        <h1>A组件</h1>
        <span class="name">子组件A=>:</span>{{msgChildA}}
        <br/>
        <span class="name">来自父组件的数据：</span>=><span class="fromFather">{{msg.msgFather}}</span>
        <input type="button" value="点击改变父组件的数据" @click="update"/>
        <br/>
        <span class="name">来自子组件B的数据=>:</span><span :style="{color:greenText}">{{A}}</span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name:'childComponentA',
        data(){
            return{
                msgChildA:'我是子组件A的数据',
                greenText:'green',
                A:''
            }
        },
        mounted(){
            Event.$on('msg-b',function(b){
                this.A=b;
            }.bind(this));
        },
        props:['msg'],
        methods:{
            update(){
                this.msg.msgFather="我被改变了"
            }
        },
        updated(){
            document.getElementsByClassName("fromFather")[0].style.color="red";
        }
    }
</script>

<style lang="css">
    .childComponentA{
        margin-top:30px;
        border:2px dashed red;
    }
</style>