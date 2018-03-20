<template>
    <div id="basicOne">
        <table border="1px solid #000" width="100%">
            <caption>Arr和Json的循环、过滤器、自定义指令</caption>
            <tr>
                <th>姓名</th>
                <th>年龄</th>
                <th>性别</th>
                <th>身高</th>
                <th>资产</th>
            </tr>
            <!--方法一：-->
            <!--<tr v-for="(arrVal,index) in arr">-->
                <!--<td v-for="(jsonVal,key) in arrVal">{{jsonVal}}</td>-->
            <!--</tr>-->

            <!--方法二：-->
            <tr v-for="(arrVal,index) in arr">
                <td>{{arrVal.name}}</td>
                <td>{{arrVal.age}}</td>
                <td>{{arrVal.sex}}</td>
                <td>{{arrVal.height|height}}</td>
                <td v-yellow>{{arrVal.asset|currency}}</td>
            </tr>
        </table>
        <hr/>
        <h3>动态组件（选项卡）：</h3>
        <ul class="tabs">
            <li><a href="javascript:;" @click="a='aaa'" :class="{active:a=='aaa'}">选项一</a></li>
            <li><a href="javascript:;" @click="a='bbb'" :class="{active:a=='bbb'}">选项二</a></li>
        </ul>
        <br/>
        <component :is="a"></component>
    </div>
</template>
<script type="text/ecmascript-6">
    import '../filter/filter'   //引入过滤器
    import '../directive/directive'
    import AAA from './Aaa.vue'
    import BBB from './Bbb.vue'
    export default{
        name:'basicOne',
        data(){
            return{
                arr:[
                    {'name':'Blue','age':12,'sex':'男','height':175,'asset':200},
                    {'name':'Lily','age':18,'sex':'女','height':165,'asset':350},
                    {'name':'Ivy','age':15,'sex':'女','height':167,'asset':236},
                    {'name':'Eric','age':28,'sex':'男','height':180,'asset':212}
                ],
                a:'aaa'
            }
        },
        components:{
            'aaa':AAA,
            'bbb':BBB,
        }
    }
</script>

<style lang="less" type="text/less" scoped>
    @import "../commonLess/index.less";
    hr{
        margin-top:50px;
    }
    .basicInfo{
        a{
            display:inline-block;
            .w(50px);
            .h(30px);
            .l-h(30px);
            .t-a(center);
            color:@colorblack;
        }
        .router-link-active{
            background:@colorred;
        }
    }
    li{
        margin:5px;
        .f-l(left);
    }
    .active{
        background:@colorred;
    }
</style>