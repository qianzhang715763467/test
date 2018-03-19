import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

let routes = [];

export default new VueRouter({ // 封装代码，用于外部引用
	mode: 'history',//路由的 history 模式:依赖 HTML5 History API 和服务器配置。
    base: __dirname,
    routes
})
