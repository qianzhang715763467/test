import {SHOWLOADING,HIDELOADING} from './types.js'

const state={
    showLoading:true
};

const mutations={
    [SHOWLOADING](state){
        state.showLoading=true;
    },
    [HIDELOADING](state){
        state.showLoading=false;
    }
};

const getters={
    showLoading(state){
        return state.showLoading
    }
};

export default{
    state,
    mutations,
    getters
}