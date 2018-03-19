export default{
	state:{ // 该对象指向 store下的 state
		rawData:null,
		modifySwitch:false
	},
	mutations:{
		modifyData(state,meio){
			state.modifySwitch = !state.modifySwitch;
			state.rawData = meio.count;
		},
		cancelModify(state,meio){
			state.modifySwitch = !state.modifySwitch;
			meio.count = state.rawData;
		}
	},
	actions:{
		modifyData:(context,meio) => context.commit('modifyData',meio),
		cancelModify:(context,meio) => context.commit('cancelModify',meio)
	}
}
