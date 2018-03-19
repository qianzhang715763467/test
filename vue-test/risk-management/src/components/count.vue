<template>
	<div id="count">
		<h2>{{msg}}</h2>
		<hr/>
		<h3>{{count}}</h3>
		<button v-show="show" @click="add"> + </button>
		<button v-show="show" @click="reduce"> - </button>
	</div>
</template>

<script>
	import {mapState,mapActions,mapGetters} from 'vuex';
	export default{
		name:'count',
		data(){
			return{
				msg:'Hello Vuex'
			}
		},
		computed:{
			...mapState({
				'show':state => state.headerJs.modifySwitch
			}),
			...mapGetters([
				'count'
			])
		},
		methods:{
			...mapActions([
				'add',
				'reduce'
			])
		}
	}
</script>

<style>
</style>