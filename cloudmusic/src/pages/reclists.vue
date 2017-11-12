<template>
	<div class="reclists" :class="sliding">
		<div class="head" :class="sliding">
			<span id="back-btn" class="glyphicon glyphicon-chevron-left" @click="back"></span>
			<span class="title">{{typeName}}</span>
		</div>
		<v-musiclists v-if="typeName=='日推'" typeName="日推"></v-musiclists>
		<div class="content" v-else-if="typeName=='歌单'">
			<div class="prompt">
				<div class="radboder">
					全部歌单
					<span>></span>
				</div>
			</div>
			<ol class="recommendedList">
				<li v-for="item in lists" @click="toRecommededList(item.id, item.coverImgUrl, item.name)">
					<div class="playcount">
						<span class="glyphicon glyphicon-headphones"></span>
						<span>{{parseInt(item.playCount/10000)}}万</span>
					</div>
					<img :src="item.coverImgUrl" />
					<span>{{item.name}}</span>
				</li>
			</ol>
		</div>
		<div class="content" v-else="typeName=='排行'">
			<div class="rank-title">
				&nbsp云音乐官方版
			</div>
			<ol class="rankList">
				<li v-for="item in lists">
					<img :src="item.coverImgUrl" />
					<span>{{item.name}}</span>
				</li>
			</ol>
		</div>
		<router-view></router-view>
	</div>
</template>

<script scoped>
	import api from '../api'
	import { mapGetters } from 'vuex'
	import musicLists from '@/components/musicLists'
	
	export default {
		name: 'reclists',
		data() {
			return {
				lists: '',
				sliding: 'slideOn',
				typeName: '',
			}
		},
		components: {
			'v-musiclists': musicLists
		},
		computed: {
			...mapGetters([
			      'currentId'
			    ])
		},
		methods: {
			back(){
				this.sliding='slideOut';
				setTimeout(() => {
					this.$router.push('/home');
				},250);
			},
			toRecommededList(id, coverPic, title){
				this.$store.commit('setShowRecDtail', true);
				this.$store.commit('setRecommendedCover', coverPic);
				this.$store.commit('setRecommendedId', id);
				this.$store.commit('setRecommendedTitle', title);
			}
		},
		created: function(){
			this.typeName = this.$route.params.page;
			if(this.typeName == '歌单'){
				api.reclist().then(res => { if(res.code == 200) {this.lists = res.playlists} });
			}else if(this.typeName =='排行'){
				api.ranklist().then(res => { if(res.code == 200) {this.lists = res} });
			}
		}
	}
</script>

<style scoped>
	.reclists{
		position: absolute;
		width: 100%;
		top: 0;
		left: 100%;
		height: 100%;
		background-color: snow;
		z-index: 99;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.content{
		margin-top: 1.4rem;
		padding-bottom: 1.1rem;
	}
	.slideOn{
  		animation:slideshow .25s ease-in-out;
		animation-fill-mode : forwards;
	}
	.slideOut{
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
		left: -3.4rem;
	}
	.prompt,.play-icon{
		/*margin-top: 1.4rem;*/
		height: 1rem;
		line-height: 1rem;
		text-align: left;
		overflow:hidden;/*不设置将导致.radboder的margin失效*/
	}
	.rank-title{
		height: 1rem;
		line-height: 1rem;
		text-align: left;
		font-size: .4rem;
		height: 100%;
		display:flex;/*Flex布局*/
	    display: -webkit-flex; /* Safari */
	    align-items:center;/*指定垂直居中*/
	}
	.rank-title::before{
		content: '';
		width: .08rem;
		height: .36rem;
		background-color: firebrick;
	}
	.play-icon{
		text-align: left;
		width: 98%;
		margin-left: 2%;
		border-bottom: 1px solid rgba(232, 232, 232, 1);
		cursor: pointer;
	}
	.radboder{
		margin-left: .1rem;
		margin-top: .15rem;
		height: .7rem;
		line-height: .7rem;
		text-align: center;
		width: 2.2rem;
		border: 1px solid #696969;
		border-radius: 1rem;
	}
	ol{
		color: #fff;
		text-align: left;
	}
	ol.recommendedList li, ol.rankList li{
		position: relative;
		width: 49.5%;
		display: inline-block;
		vertical-align: bottom;
		cursor: pointer;
	}
	ol.recommendedList  li:nth-child(odd){
		margin-right: 1%;
	}
	.playcount{
		position: absolute;
		right: 0;
		padding-right: .2rem;
		height: .5rem;
		line-height: .5rem;
		font-size: .3rem;
		width: 50%;
		text-align: right;
		background: -webkit-linear-gradient(to left,rgba(0,0,0,.3),rgba(0,0,0,0)); 
		background: -o-linear-gradient(to left,rgba(0,0,0,.3),rgba(0,0,0,0)); 
		background: -moz-linear-gradient(to left,rgba(0,0,0,.3),rgba(0,0,0,0)); 
		background: linear-gradient(to left,rgba(0,0,0,.3), rgba(0,0,0,0)); 
	}
	.playcount span{
		display: inline;
		color: #fff;
		margin: 0;
		padding: 0;
	}
	ol li img{
		width: 100%;
	}
	ol li span{
		width: 100%;
		height: 1.4rem;
		color: #000;
		display: block;
		padding: 5px;
		text-align: left;
	}
	ol.musicList li{
		height: 1.2rem;
		width: 98%;
		display: block;
		margin-left: .2rem;
		border-bottom: 1px solid rgba(232, 232, 232, 1);
	}
	ol.musicList li div{
		display: inline-block;
		padding-top: .1rem;
	}
	ol.musicList span{
		margin: 0;
		padding: 0;
		height: auto;
	}
	.music-name{
		font-size: .4rem;
	}
	.musicSelected{
		color: crimson;
	}
	.author{
		color: gray;
		font-size: .33rem;
	}
	.operate{
		position: absolute;
		right: .4rem;
	}
	.operate span{
		height: 100%;
		font-size: .5rem;
		font-weight: bold;
		color: gray;
		cursor: pointer;
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