<template>
	<div class="playingPage" :class="[{slideOn:playShow}]" >
		<!--<div class="page">-->
			<div class="head">
				<div id="back-btn" class="glyphicon glyphicon-chevron-left" @click="back"></div>
				<div class="title"> 
					<p>{{currentName}}</p>
					<p>{{currentAuthor}}</p> 
				</div>
				<div class="glyphicon glyphicon-share"></div>
			</div>
			<div class="content">
				<div id="coverPage">
					<div @click="showLyric">
						<div class="needle-groups" >
							<img class="needle" :class="startPlay?'needleRotate':'needleRotateBack'" src="../assets/needle.png" />
						</div>
						<div class="turntable-groups" :class=" startPlay?'turntableRotate':'' ">
							<img class="coverPic" :src="musicPic"/>
							<img class="turntable"  src="../assets/turntable.png" />
						</div>
					</div>
					<div class="operation">
						<span class="glyphicon glyphicon-heart-empty"></span>
						<span class="glyphicon glyphicon-download-alt"></span>
					</div>
				</div>
				<div id="lyric" v-show="!coverShow">
					<div class="voice-groups">
						<span class="glyphicon glyphicon-volume-up"></span>
						<div class="voice-bar">
							<div class="voice-process" :style="{width: voiceProgress + 'rem'}"></div>
							<div class="voice-slide" :style="{left: voiceProgress + 'rem'}"></div>
						</div>
					</div>
					<div class="lyricContent">
						<ol>
							<li v-for="item in musicLyric">{{item}}</li>
						</ol>
					</div>
				</div>
				<div class="footbar">
					<div class="play-groups">
						<div class="playedTime">{{playedTime}}</div>
						<div class="play-bar">
							<div class="process" :style="{width: progess + 'rem'}"></div>
							<div class="slide-radio" :style="{left: progess + 'rem'}"></div>
						</div>
						<div class="totalTime">{{totalTime}}</div>
					</div>
					<div class="control-groups">
						<span class="glyphicon glyphicon-retweet"></span>
						<span class="glyphicon glyphicon-step-backward"></span>
						<span @click="playing" :class="startPlay?'glyphicon glyphicon-pause':'glyphicon glyphicon-play'"></span>
						<span class="glyphicon glyphicon-step-forward"></span>
						<span class="glyphicon glyphicon-list" @click="listShow = !listShow"></span>
					</div>
				</div>
			</div>
			<transition name="fade">
				<div id="list" v-if="listShow" >
					<div @click="listShow = !listShow"></div>
					<div class="list-content">
						<div class="list_head">
							<span class="glyphicon glyphicon-trash"></span>
							<span>清空</span>
						</div>
						<ol>
							<li></li>
						</ol>
						<div class="list_foot" @click="listShow = !listShow">
							关闭
						</div>	
					</div>
				</div>
			</transition>
		<!--</div>-->
		<!--<div id="bgCover"></div>-->
	</div>
</template>

<script scoped>
	import api from '../api'
	import { mapGetters } from 'vuex'
	export default {
		name: 'playing',
		data() {
			return {
				sliding: '',
				backurl: '',
				coverShow: true,
				listShow: false
			}
		},
		computed: {
			...mapGetters([
			    'playShow',
			    'startPlay',
			    'currentName',
			    'currentAuthor',
			    'musicLyric',
			    'musicPic',
			    'timeCount',
			    'musicDuration',
			    'audioTarget',
			    'timeArr'
		    ]),
			playedTime(){
			 	return api.formatTime(this.timeCount);
			},
			totalTime(){
				let time = Math.floor(this.musicDuration); 
		 		return api.formatTime(time);
			},
			progess(){
				let now = this.timeCount;
				let total = Math.floor(this.musicDuration);
				return (now*6.5/total)-.15;
			},
			voiceProgress(){
				return this.audioTarget.volume*6.5;
			}
		},
		methods: {
			back(){
				$(".playingPage").toggleClass('slideOn slideOut');
				setTimeout(() => {
					this.$store.commit('showPlayingPage', false);
				},250);
			},
			playing(){
				if(this.audioTarget.paused){
					this.audioTarget.play();
					this.$store.commit('playing', true);
				}else{
					this.audioTarget.pause();
					this.$store.commit('playing', false);
				}
			},
			showLyric(){
				if(this.coverShow){
					$("#coverPage").removeClass("opacityUp").addClass("opacityDown");
					this.coverShow = false;
				}else{
					$("#coverPage").removeClass("opacityDown").addClass("opacityUp");
					this.coverShow = true;
				}
			}
		},
		updated: function(){
//			this.$nextTick(function () {
//			$("#bgCover").css('backgroundImage',"url("+this.$store.getters.musicPic+")");
//			  })
			if(this.startPlay){
				let timeArr = this.timeArr;
				let len = timeArr.length;
				for(let i=0; i<len; i++){
					if(this.timeCount==timeArr[i]){
						$(".lyricContent ol li").css("color",'rgba(255,255,255,.5)');
						$(".lyricContent ol li")[i].style.color = '#fff';
						$(".lyricContent ol li")[0].style.marginTop = (5 - 1*i)+'rem';
					}
				}
			}
		}
	}
</script>

<style scoped>
	.playingPage{
		position: absolute;
		top: 0;
		left: 100%;
		width: 100%;
		height: 100%;
		z-index: 99999;
		overflow: scroll;
		color: #fff;
		background: -webkit-radial-gradient(circle,rgba(151,191,207,1), rgba(7,29,39,1)); /* Safari 5.1 - 6.0 */
	    background: -o-radial-gradient(circle,rgba(151,191,207,1), rgba(7,29,39,1)); /* Opera 11.6 - 12.0 */
	    background: -moz-radial-gradient(circle,rgba(151,191,207,1), rgba(7,29,39,1)); /* Firefox 3.6 - 15 */
	    background: radial-gradient(circle,rgba(151,191,207,1), rgba(7,29,39,1)); /* 标准的语法 */
	    display: none;
	}
	/*.page{
		position: absolute;
		z-index: 100001;
		width: 100%;
		height: 100%;
	}*/
	/*#bgCover{//filter属性导致卡顿
		position: absolute; 
		z-index: 100000;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	    -webkit-filter: blur(30px); 
        -moz-filter: blur(30px);
        -ms-filter: blur(30px);    
        filter: blur(30px); 
        opacity: .8;
	}*/
	.slideOn{
		display: block;
  		animation:slideshow .25s linear;
		animation-fill-mode : forwards;
	}
	.slideOut{
		display: block;
		animation:slidehide .25s linear;
		animation-fill-mode : forwards;
	}
	.head{
		height: 1.4rem;
		font-size: .45rem;
		display:flex;/*Flex布局*/
	    display: -webkit-flex; /* Safari */
	    align-items:center;/*指定垂直居中*/
	    justify-content: space-around;
	}
	.glyphicon-share{
		font-size: .45rem;
		cursor: pointer;
		margin-right: .5rem;
	}
	#back-btn{
		font-size: .45rem;
		margin-left: .5rem;
	}
	.title{
		font-size: .4rem;
		height: 1.4rem;
		width: 6rem;
		text-align: center;
		padding-top: .3rem;
		overflow: hidden;
	}
	.title > p{
		width: 100%;
		line-height: .5rem;
		margin: 0;
		width: 6rem;
	}
	.title > p:last-child{
		font-size: .3rem;
		text-align: center;
	}
	.content{
		position: relative;
		text-align: center;
		overflow: hidden;
	}
	#coverPage{
		/*height: 13rem;*/
		border-top: 1px solid rgba(255,255,255,.3);
		padding-bottom: .5rem;
	}
	.opacityUp{
		animation: show .5s forwards;
	}
	@keyframes show{
		from{opacity: 0;}
		to{opacity: 1;}
	}
	.opacityDown{
		animation: hide .5s forwards;
	}
	@keyframes hide{
		from{opacity: 1;}
		to{opacity: 0;}
	}
	#lyric{
		position: absolute;
		z-index: -2;
		left: 0;
		top: 0;
		/*height: 13rem;*/
		width: 100%;
		overflow: hidden;
	}
	.glyphicon-volume-up{
		margin-left: -.75rem;
		vertical-align: middle;
	}
	.voice-groups{
		height: 1rem;
		line-height: 1rem;
	}
	.voice-bar{
		margin-left: .75rem;
		position: relative;
		display: inline-block;
		vertical-align: middle;
		font-size: .3rem;
		width: 6.5rem;
		height: 2px;
		border-radius: 4px;
		background: rgba(255,255,255,.3);
	}
	.voice-process{
		width: 0;
		height: 100%;
		background-color: rgba(255,255,255,.6);
	}
	.voice-slide{
		position: absolute;
		top: -.125rem;
		left: -.125rem;
		width: .25rem;
		height: .25rem;
		border-radius: 50%;
		background-color: #fff;
	}
	.lyricContent{
		height: 10rem;
		overflow: hidden;
	}
	.lyricContent ol{
		display: inline-block;
		height: 100%;
		overflow: scroll;
		color: rgba(255,255,255,.5);
	}
	.lyricContent ol li{
		height: .5rem;
		line-height: .5rem;
		margin-bottom: .5rem;
		width: 8rem;
		font-size: .4rem;
	}
	.lyricContent ol li:first-child{
		margin-top: 5rem;
	}
	.needle-groups{
		width: 100%;
	}
	.needle{
		margin-left: 41%;
		margin-top: -5%;
		width: 50%;
		transform-origin: 10% 19%;
	}
	.needleRotate{
		animation: needleRound .3s ease-in-out forwards;
	}
	.needleRotateBack{
		animation: needleBack .3s ease-in-out forwards;
	}
	.turntable-groups{
		position: relative;
		margin: auto;
		display:flex;/*Flex布局*/
	    display: -webkit-flex; /* Safari */
	   	display: -moz-flex;
	    align-items:center;/*指定垂直居中*/
		width: 7.5rem;
		height: 7.5rem;
		border-radius: 50%;
		border: .15rem solid rgba(255,255,255,.3);
		z-index: -1;
		overflow: hidden;
	}
	.turntableRotate{
		animation: round 20s linear infinite;
	}
	.turntable-groups::before{
		content: "";
		position: absolute;
		width: 99.7%;
		height: 99.7%;
		border-radius: 50%;
		top: 50%;
   		left: 50%;
   		transform: translate(-50%,-50%);
		background-color: rgba(0,0,0,.5);
	}
	.turntable-groups img{
		position: absolute;
	}
	.coverPic{
		width: 5.2rem;
		height: 5.2rem;
		border-radius: 50%;
		top: 50%;
   		left: 50%;
   		transform: translate(-50%,-50%);
	}
	.turntable{
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
	.operation{
		/*padding-top: 1rem;*/
		/*margin-top: 2rem;*/
	}
	.operation span:first-child{
		font-size: .45rem;
		margin-right: 35%;
	}
	.footbar{
		display: inline-block;
		/*margin-top: .5rem;*/
	}
	.play-groups > div{
		display: inline-block;
		vertical-align: middle;
		font-size: .3rem;
	}
	.play-bar{
		position: relative;
		width: 6.5rem;
		height: 3px;
		margin: 0 .1rem 0 .1rem;
		border-radius: 4px;
		background: rgba(255,255,255,.4);
	}
	div.playedTime, div.totalTime{
		width: 1rem;
	}
	.process{
		width: 0;
		height: 100%;
		background-color: crimson;
	}
	.slide-radio{
		position: absolute;
		top: -.15rem;
		left: -.15rem;
		width: .35rem;
		height: .35rem;
		border-radius: 50%;
		border: .13rem solid #fff;
		background-color: crimson;
	}
	.control-groups{
		display:block;
		height: 2rem;
		line-height: 2rem;
	}
	.control-groups span{
		width: 18%;
	}
	#list{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100010;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,.5);
	}
	#list > div:first-child{
		width: 100%;
		height: 100%;
	}
	.list-content{
		position: absolute;
		display: inline-block;
		height: 12rem;
		width: 100%;
		left: 0;
		bottom: 0;
		background-color: #fff;
		overflow: hidden;
	}
	.list_head, .list_foot{
		width: 100%;
		color: #000000;
		height: 1.2rem;
		line-height: 1.2rem;
		font-size: .4rem;
	}
	.list_head{
		text-align: right;
		border-bottom: 1px solid rgba(232, 232, 232, 1);
	}
	.list_head > span:last-child{
		margin-right: .2rem;
	}
	.list_foot{
		margin-top: 9.6rem;
		border-top: 1px solid rgba(232, 232, 232, 1);
	}
	.fade-enter-active, .fade-leave-active {
	    transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to{  /* .fade-leave-active in below version 2.1.8 */ 
	 	opacity: 0;
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
	
	@keyframes needleRound{
		from{transform: rotate(0deg);}
		to{transform: rotate(38deg);}
	}
	@-webkit-keyframes needleRound{
		from{transform: rotate(0deg);}
		to{transform: rotate(38deg);}
	}
	@-moz-keyframes needleRound{
		from{transform: rotate(0deg);}
		to{transform: rotate(38deg);}
	}
	
	@keyframes needleBack{
		from{transform: rotate(38deg);}
		to{transform: rotate(0deg);}
	}
	@-webkit-keyframes needleBack{
		from{transform: rotate(38deg);}
		to{transform: rotate(0deg);}
	}
	@-moz-keyframes needleBack{
		from{transform: rotate(38deg);}
		to{transform: rotate(0deg);}
	}
	
	@keyframes round{
		from {transform:rotate(0);}
		to {transform:rotate(360deg);}
	}
	@-webkit-keyframes round /* Safari and Chrome */
	{
		from {transform:rotate(0);}
		to {transform:rotate(360deg);}
	}
</style>