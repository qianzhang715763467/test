<template>
	<header id="header">
		<ul>
			<li @click="modifyData($store.state)" v-show="!show">{{modifyBut}}</li>
			<li @click="cancelModify($store.state)" v-show="show">{{cancelBut}}</li>
			<li @click="saveModify" v-show="show">{{saveBut}}</li>
		</ul>
	</header>
</template>

<script>
	import {mapState,mapActions,mapGetters} from 'vuex'
	
	export default{
		name:'header',
		data(){
			return{
				modifyBut:'修改',
				cancelBut:'取消',
				saveBut:'保存'
			}
		},
		computed:{
			...mapState({
				'show':state => state.headerJs.modifySwitch				
			})
		},
		methods:{
			...mapActions([
				'modifyData',
				'cancelModify',
				'saveModify'
			])
		}
	}
</script>

<style type="text/less" lang="less">
	#header{
		ul{
			li{
				display: inline-block;
				padding: 4px 10px;
				border-radius: 5px;
				background-color: #eceff1;
				cursor: pointer;
				transition: background .3s;
				&:hover{
					color: #333;
					background-color: #cfd8dc;
				}
			}
		}
	}
</style>