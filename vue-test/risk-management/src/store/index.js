import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//import Header from './header.js'; // 引入某个store对象
const Header = require('./header.js');
console.log(Header)
const state = {// 主状态
	count:1,
	revisability:false
}
const modules = {// 添加其他要使用vuex的组件, 当前对象里面的属性 会挂载到 state 下面
	headerJs:Header
}
const actions = {// 事件分发
	add:context => context.commit('add'),
	reduce:context => context.commit('reduce'),
	saveModify:context => context.commit('saveModify')
}
const mutations = { // mutations 是固定写法，只要改变state数值的方法，都必须写在mutations里面
	add(state){
		state.count +=1;
	},
	reduce(state){
		state.count -=1;
	},
	saveModify(state){
		state.headerJs.modifySwitch = !state.headerJs.modifySwitch;
	}
}
const getters = {// 格式化返回的数据
	count(state){//这里的state对应着上面这个state
        return '当前值：'+state.count;
	}
}
export default new Vuex.Store({ // 封装代码，用于外部引用
	state,
	actions,
	modules,
	mutations,
	getters
})