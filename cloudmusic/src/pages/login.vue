<template>
	<div class="login">
		<div class="title">用户登陆</div>
		<div class="login-groups">
			<div class="changeLogin">
				<span @click="changeLoginType">切换登录模式</span>
			</div>
			<div v-if="loginType === 'phone'">
				<div class="input-groups">
					<span class="glyphicon glyphicon-phone"></span>
					<input key="phone-input" v-model="eml" required type="text" placeholder="手机号码" maxlength="11"/>
				</div>
			</div>
			<div v-else>
				<div class="input-groups">
					<span class="glyphicon glyphicon-envelope"></span>
					<input key="email-input" v-model="eml" required type="email" placeholder="登录邮箱" maxlength="30"/>
					<div class="match-list" v-show="test">
						<ol>
							<li v-for="item in allData " @click="completeEmail($event)">{{formatEmail+item.urlname}}</li>
						</ol>
					</div>
				</div>
			</div>
			<div class="input-groups">
				<span class="glyphicon glyphicon-lock"></span>
				<input id="pwd" v-model="pwd" type="password" placeholder="密码"/>
			</div>
			<div class="btn">
				<button class="submit" @click="userLogin">登录</button>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../api'
	
	export default {
		name: 'login',
		data () {
		    return {
		    	loginType: 'phone',
		    	eml: '',
		    	pwd: '',
		    	allData: [
			    	{urlname: '@163.com'}
		    	],
		    	flag: false,
		    	completed: true,
		    	btnflag: false
		    }
		},
		computed: {
			test(){
				let str = this.eml.replace(/\s/g, '');
				if(str != ''){
					this.flag = true;
					for (let i=0;i<this.allData.length;i++){
						if(str.search(this.allData[i])!=-1){
							this.completed = true;
							return;
						}
					}
				}else{
					this.flag = false;
				}
				return this.flag&&this.completed;
			},
			formatEmail(){
				return this.eml.replace(/\s+|@/g, "")
			}
		},
		methods: {
			userLogin(){
				let url = '';
				if(this.loginType == 'phone'){
					url = '/login/cellphone?phone='+this.eml+'&password='+this.pwd;
				}else{
					url = '/login?email='+this.eml+'&password='+this.pwd;
				}
				api.login(url).then(res => {
	                    if(res.code == 200) {
							this.$router.push('/home');
	                    }
	               }).catch(res => {
	                    if(res.code == 200) {
							this.$router.push('/home');
	                    }
	                })
			},
			changeLoginType(){
				if(this.loginType == 'phone'){
					this.loginType = 'email';
				}else{
					this.loginType = 'phone';
				}
			},
			completeEmail(event){
				this.eml = $(event.currentTarget).text();
				this.completed = false;
			}
		}
	}
</script>

<style scoped>
	.login{
		position: absolute;
		z-index: 99999;
		height: 100%;
		width: 100%;
		background-color: #fff;
	}
	.title{
		margin-top: 10%;
		display: inline-block;
		height: .8rem;
		line-height: .8rem;
		width: 2.2rem;
		border: 1px solid rgba(206, 13, 13, 1);
		border-radius: .4rem;
		font-size: .4rem;
		color: rgba(206, 13, 13, 1);
	}
	.login-groups{
		margin-top: 30%;
		text-align: center;
	}
	.input-groups{
		display: inline-block;
		height: 1rem;
		line-height: 1rem;
		width: 90%;
		border-bottom: 1px solid rgba(179, 179, 179, 1);
		text-align: left;
	}
	.input-groups:first-child{
		position: relative;
	}
	.input-groups:first-child .match-list{
		width: 100%;
		position: absolute;
		background-color: #fff;
		z-index: 999;
		border: 1px solid rgba(179, 179, 179, 1);
		border-top: none;
		border-bottom: none;
	}
	ol{
		margin: 0;
	}
	li{
		border-bottom: 1px solid rgba(179, 179, 179, 1);
		height: .8rem;
		line-height: .8rem;
		font-size: .38rem;
		text-indent: .2rem;
		font-weight: bold;
	}
	.input-groups span{
		font-size: .35rem;
		color: gray;
	}
	.input-groups > input{
		height: .6rem;
		line-height: .6rem;
		width: 90%;
		border: none;
		font-size: .4rem;
		text-indent: .1rem;
	}
	.changeLogin{
		display: inline-block;
		margin-bottom: 2%;
		font-size: .4rem;
		text-align: right;
		width: 90%;
		color: cornflowerblue;
	}
	.changeLogin span{
		cursor: pointer;
	}
	.btn{
		display: inline-block;
		width: 100%;
		margin-top: 10%;
	}
	.submit{
		width: 100%;
		background-color: rgba(206, 13, 13, 1);
		border: none;
		height: 1rem;
		color: #fff;
		border-radius: 1rem;
		font-size: .4rem;
	}
</style>