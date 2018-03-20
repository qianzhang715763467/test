<template>
    <div class="childComponentB">
        <h1>B组件</h1>
        <span class="name">子组件B=>:</span><span :style="{color:greenText}">{{msgChildB}}</span>
        <br/>
        <input type="button" value="把子组件B的数据发送给子组件A" @click="send"/>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name:'childComponentB',
        data(){
            return{
                msgChildB:'我是子组件B的数据',
                greenText:''
            }
        },
        methods:{
            send(){
                Event.$emit("msg-b",this.msgChildB);
                this.greenText='green'
            }
        }
    }
</script>

<style lang="css">
    .childComponentB{
        margin-top:30px;
        border:2px dashed green;
    }
</style>