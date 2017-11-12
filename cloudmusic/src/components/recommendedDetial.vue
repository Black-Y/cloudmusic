<template>
	<div class="recDtail"  :class="[{slideOn:showRecDtail}]">
		<div class="head" :class="[{slideOn:showRecDtail}]">
			<span id="back-btn" class="glyphicon glyphicon-chevron-left" @click="back"></span>
			<span class="title">歌单</span>
		</div>
		<v-musiclists typeName="歌单"></v-musiclists>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import musicLists from '@/components/musicLists'
	export default{
	    data() {
			return {
				sliding: 'slideOn',
				typeName: '歌单'
			}
		},
		components: {
			'v-musiclists': musicLists
		},
		computed: {
			...mapGetters([
				  'showRecDtail',
			    ])
		},
		methods: {
			back(){
				$(".recDtail").toggleClass('slideOn slideOut');
				$(".recDtail .head").toggleClass('slideOn slideOut');
				setTimeout(() => {
					this.$store.commit('setShowRecDtail', false);
				},250);
			}
		},
	  
	}
</script>

<style scoped>
	.recDtail{
		position: absolute;
		width: 100%;
		top: 0;
		left: 100%;
		height: 100%;
		background-color: snow;
		z-index: 100;
		overflow-y: scroll;
	    display: none;
	}
	.slideOn{
		display: block;
  		animation:slideshow .25s ease-in-out;
		animation-fill-mode : forwards;
	}
	.slideOut{
		display: block;
		animation:slidehide .25s ease-in-out;
		animation-fill-mode : forwards;
	}
	.head{
		position: fixed;
		left: 100%;
		background-color: #222;
		height: 1.4rem;
		line-height: 1.4rem;
		width: 100%;
		color: #fff;
		font-size: .45rem;
		z-index: 100;
	}
	#back-btn{
		font-size: .45rem;
		left: -3.4rem;
	}
	@keyframes slideshow
	{
		from {left:100%;}
		to {left:0;}
	}
	
	@-webkit-keyframes slideshow /* Safari and Chrome */
	{
		from {left:100%;}
		to {left:0;}
	}
	@keyframes slidehide
	{
		from {left:0;}
		to {left:100%;}
	}
	
	@-webkit-keyframes slidehide /* Safari and Chrome */
	{
		from {left:0;}
		to {left:100%;}
	}
</style>