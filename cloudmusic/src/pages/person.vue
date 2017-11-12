<template>
	<div class="person">
		<div class="top">
			<div>
				<img class="userpic" :src="userProfile.avatarUrl"/>
			</div>
			<div>
				<span class="nickname">{{userProfile.nickname}}</span><br />
				<span class="level"><i>Lv.{{user.level}}</i></span>
			</div>
			<div class="sign">
				<span class="glyphicon glyphicon-pencil"></span>
				<span>签到</span>
			</div>
		</div>
		<div class="clock">
			<span class="glyphicon glyphicon-time"></span>
			<span>定时关闭</span>
		</div>
		<div class="about">
			<span class="glyphicon glyphicon-info-sign"></span>
			<span>关于我</span>
		</div>
		<div class="exit" @click="loginOut">
			退出登录
		</div>
	</div>
</template>

<script>
	import api from '../api'
	
	export default {
		name: 'person',
		data () {
		    return {
		    	user: '',
		    	userProfile: ''
		    }
		},
		methods: {
			loginOut(){
				this.$router.push('/login');
			}
		},
		created: function(){
			api.getDetail('/user/detail?uid=604457657').then(res => {  if(res.code == 200) {this.user = res;this.userProfile = res.profile} });
		}
	}
</script>

<style scoped>
	.person{
		padding-top: 1.4rem;
		background-color: rgba(232, 232, 232, 1);
		height: 100%;
	}
	.top{
		height: 2rem;
		text-align: left;
		padding: 0 2% 0 2%;
		background-color: #fff;
		display:flex;/*Flex布局*/
	    display: -webkit-flex; /* Safari */
	    align-items:center;/*指定垂直居中*/
	}
	.top div{
		display: inline-block;
		vertical-align: middle;
	}
	.top div:first-child{
		margin-right: .1rem;
	}
	img.userpic{
		display: block;
		height: 1.3rem;
		width: 1.3rem;
		border-radius: 50%;
	}
	span.nickname{
		font-size: .4rem;
	}
	span.level{
		display: block;
		text-align: center;
		width: 1rem;
		font-size: .32rem;
		font-weight: bold;
		border: 1px solid rgba(232, 232, 232, 1);
		border-radius: 1rem;
	}
	.sign{
		margin-left: 55%;
		text-align: center;
		width: 1.6rem;
		height: .6rem;
		line-height: .6rem;
		border: 1px solid red;
		color: crimson;
		border-radius: 1rem;
		font-size: .35rem;
		cursor: pointer;
	}
	.clock,.about,.exit{
		position: relative;
		margin-top: .2rem;
		height: 1rem;
		line-height: 1rem;
		background-color: #fff;
		text-align: left;
		padding-left: .2rem;
		border-bottom: 1px solid rgba(232, 232, 232, 1);
	 	display:flex;/*Flex布局*/
	    display: -webkit-flex; /* Safari */
	    align-items:center;/*指定垂直居中*/
	}
	.clock span:first-child, .about span:first-child{
		margin-right: .1rem;
		color: gray;
		font-size: .4rem;
	}
	.about{
		margin: 0;
	}
	.exit{
		display: block;
		text-align: center;
		color: red;
		cursor: pointer;
		font-size: .4rem;
	}
</style>
