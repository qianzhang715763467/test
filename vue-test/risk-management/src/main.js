import Vue from 'vue';
import App from './App.vue';
import store from './store'
import router from './router'

new Vue({
  el: '#app',
  router,// 使用router
  store,// 使用store
  template:'<App/>',
  components:{App}
})
