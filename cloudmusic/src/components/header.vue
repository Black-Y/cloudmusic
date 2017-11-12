<template>
	<div class="header">
		<div class="header-content" v-if="getTitle === 'home'">
			<span class="glyphicon glyphicon-search searchIcon"></span>
			<input class="textInput" type="text" placeholder="搜索音乐、歌手"/>
		</div>
		<div class="header-content" v-else-if="getTitle === 'mymusic'">
			<span class="title">我的音乐</span>
		</div>
		<div class="header-content" v-else-if="getTitle === 'person'">
			<span class="title">个人</span>
		</div>
	</div>
</template>

<script>
	export default {
	  data () {
	    return {
	    }
	  },
	  computed :{
	  	getTitle(){
	  		return this.$route.path.replace(/\/+/,"")
	  	}
	  }
	}
</script>

<style scoped>
	.header{
		position: fixed;
		width: 100%;
		background-color: #252525;
		height: 1.4rem;
		line-height: 1.4rem;
		overflow: hidden;
		z-index: 99;
	}
	.header-content{
		display: inline-block;
	}
	.title{
		font-size: .4rem;
		color: #fff;
	}
	.searchIcon{
		position: absolute;
		width: .7rem;
		font-size: .4rem;
		top: .5rem;
		color: grey;
	}
	.textInput{
		width: 6rem;
		height: .8rem;
		line-height: .8rem;
		text-indent: .65rem;
		border: none;
		font-size: .4rem;
		border-radius: .8rem;
	}
</style>