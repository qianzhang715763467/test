<template>
  <div id="app">
    <ul class="leftNav">
      <li>
        <router-link to="/risk">风险指标大盘</router-link>
      </li>
      <li>
        <router-link to="/check">贷前审核管理</router-link>
      </li>
      <li>
        <router-link to="/monitor">贷后监控管理</router-link>
      </li>
    </ul>
    <div class="rightView">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less" type="text/less">
  @import 'less/common';
  html,body,#app{
    .w(100%);
    .h(100%);
    .leftNav{
      .w(15%);
      .h(100%);
      float:left;
      padding-top:30px;
      background:@lightBlue;
      box-sizing:border-box;
      li{
        .w(100%);
        .h(40px);
        .l-h(40px);
        background:@lightPurple;
        margin:20px 0;
        text-align:center;
        a{
          display:block;
          .w(100%);
          .h(100%);
          color:@white;
          .f-s(18px);
          &.router-link-active{
            background:@darkBlue;
          }
        }

      }
    }
    .rightView{
      .w(85%);
      .h(100%);
      padding:20px 15px 0 20px;
      box-sizing:border-box;
      float:left;
      background:@lightGray;
    }
  }
</style>
