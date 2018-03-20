import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerConfig from './router.config.js'   //引入路由配置
import 'animate.css/animate.min.css'  //引入animate.min.css
import '!style-loader!css-loader!less-loader!./commonLess/index.less'  //引入公用css
import store from './store'   //引入store
import {Table,TableColumn} from 'element-ui' //注意Table组件还需引入TableColumn
import Loading from './components/Loading'   //引入自定义Loading

Vue.use(Loading);
Vue.use(VueRouter);
Vue.use(Table);
Vue.use(TableColumn);

window.Event=new Vue();  //定义全局Event对象，用来实现同级组件之间通信

const router=new VueRouter(routerConfig);

new Vue({
    router, //挂载router
    store,  //挂载store
  el: '#app',
  render: h => h(App)
});
