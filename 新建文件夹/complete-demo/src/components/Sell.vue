<template>
    <div id="sell">
        <h3>Element-ui、methods和mounted生命周期的用法：</h3>
        <el-table :data="tableData" stripe style="width:100%">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="quantity" label="数量" class="quantity"></el-table-column>
            <el-table-column prop="price" label="单价" class="price"></el-table-column>
            <el-table-column prop="amount" label="小计(单价＊数量计算出来)"></el-table-column>
        </el-table>
        <div></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    export default{
        name:'sell',
        data(){
            return{
                tableData:[]
            }
        },
        mounted(){
            this.aa();
        },
        methods:{
            aa() {
               axios.get('./src/data/td.json').then(function (res) {
                   const data=res.data.tdDetails;
                   data.forEach(function(val){
                       val.amount=val.quantity*val.price;   //计算小计金额
                   })
                   this.tableData=data;
               }.bind(this)).catch(function (err) {

             })
            }
        }
    }
</script>

<style lang="css" scoped> /*scoped表示局部,只在本组件内使用*/
    h3{
        margin-left:10px;
    }
</style>