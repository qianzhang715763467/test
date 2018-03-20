<template>
  <div id="app">
    <div :class="leftJson" :style="[c]">
        <h2>less的使用：</h2>
        <ul>
            <li>
                <router-link to="/sell">资产售卖进度</router-link>
            </li>
            <li>
                <router-link to="/basic">资产基础信息</router-link>
            </li>
            <li>
                <router-link to="/loan">放款统计</router-link>
            </li>
            <li>
                <router-link to="/user">用户管理</router-link>
            </li>
        </ul>

    </div>
    <div :class="rightJson">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        leftJson:{
          left:true
      },
        rightJson:{
            right:true
        },
        c:{
          color:'#fff'
        }
    }
  }
}
</script>

<style lang="less" type="text/less">  //下载less和less-loader
    @import "commonLess/index.less";
    #app{
        .h(100%);
        .w(100%);
        .left{        //嵌套
            .h(100%);
            .w(30%);
            background:@colorBlue;
            .f-l(left);
            ul{
                margin-top:20px;
                li{
                    .h(30px);
                    .l-h(30px);
                    a{
                        display:block;
                        .w(100%);
                        .h(100%);
                    }
                    .router-link-active{
                        background:@colorDarkBlue;  //对选中的元素高亮
                    }
                }
            }
        }
        .right{
            .h(100%);
            .w(70%);
            background:@colorPink;
            .f-l(left);
        }
    }
</style>
