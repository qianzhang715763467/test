import Vue from 'vue'      //引入vue
import Vuex from 'vuex'    //引入vuex

Vue.use(Vuex);   //使用vuex

import mutations from './mutations'
import actions from './actions'

export default new Vuex.Store({
    modules:{
        mutations
    },
    actions
})