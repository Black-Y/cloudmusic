<template>
	<div class="home">
			<v-banner></v-banner>
			<div class="topic">
				<router-link tag="span" :to="{name: 'reclists', params: { page: '日推' }}">
				<span class="glyphicon glyphicon-calendar"><p class="dayli">日推</p></span>
				</router-link>
				<router-link tag="span" :to="{name: 'reclists', params: { page: '歌单' }}">
					<span class="glyphicon glyphicon-list-alt"><p>歌单</p></span>
				</router-link>
				<router-link tag="span" :to="{name: 'reclists', params: { page: '排行' }}">
				<span class="glyphicon glyphicon-stats"><p>排行</p></span>
				</router-link>
			</div>
			<v-recommended></v-recommended>
			<v-recommendedDetial v-if="showRecDtail" ></v-recommendedDetial>
			<router-view></router-view>
	</div>
</template>

<script>
	import banner from '@/components/banner'
	import recommended from '@/components/recommended'
	import recommendedDetial from '@/components/recommendedDetial'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapGetters([
				  'showRecDtail'
			    ])
		},
		components: {
			'v-banner': banner,
			'v-recommended': recommended,
			'v-recommendedDetial': recommendedDetial
		}
	}
</script>

<style scoped>
	.home{
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.topic{
		height: 1.8rem;
		border-bottom: 1px solid rgba(232, 232, 232, 1);
		display:flex;/*Flex布局*/
	    display: -webkit-flex; /* Safari */
	    align-items:center;/*指定垂直居中*/
	    justify-content: space-around;
	}
	.topic span{
		height: 1.1rem;
		line-height: .6rem;
		color: rgba(197, 38, 38, 1);
		font-size: .6rem;
	}
	.topic span > p{
		font-size: .3rem;
	}
	.dayli{
		text-indent: -.05rem;
	}
</style>