<template>
	<div class="footer">
		<router-link tag="span" to="/home"><span class="glyphicon glyphicon-home"><p>首页</p></span></router-link>
		<router-link tag="span" to="/mymusic"><span class="glyphicon glyphicon-music"><p>我的音乐</p></span></router-link>
		<router-link tag="span" to="/person"><span class="glyphicon glyphicon-user"><p>个人</p></span></router-link>
	</div>
</template>

<script>
	export default{
		data () {
		    return {
		    	
		    }
	  	}
	}
</script>

<style scoped>
	.footer{
		position: fixed;
		bottom: 0;
		background-color: #252525;
		height: 1.4rem;
		width: 100%;
		color: darkgray;
		font-size: .6rem;
		padding-top: .2rem;
		/*margin-top: 1.4rem;*/
		z-index: 9999;
	}
	.footer span{
		width: 27%;
		font-size: .6rem;
		height: .6rem;
		line-height: .6rem;
	}
	.footer span > p{
		font-size: .3rem;
	}
	.active{
		color: #fff;
	}
</style>