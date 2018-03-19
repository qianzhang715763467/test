/**
 * Created by admin on 2017/1/11.
 */
export const LOGIN_SUC = 'LOGIN_SUC';
export const SHOW_LOGIN = 'SHOW_LOGIN';
// 输出一个json对象{state,actions,mutations,getters}
export default {
    state: {
        mobile: '',
        password: '',
        isShowLogin: false,
    },
    actions: {
        addMyInfo({ commit } , loginInfo){
        commit(LOGIN_SUC , loginInfo);
        
        console.log(LOGIN_SUC)
        },
        showLogin({ commit } , flag){
        	console.log(SHOW_LOGIN)
          commit(SHOW_LOGIN , flag);
        },
    },
    mutations: {
        [LOGIN_SUC] (state , loginInfo) {
          state.mobile = loginInfo.mobile;
          console.log(state)
        },
        [SHOW_LOGIN] (state , flag) {
          state.isShowLogin = flag;
        },
    }
//  ,
//  getters: {
//      getMsg(state){
//      	console.log(state.msg)
//          return state.msg;
//      }
//  }
};
