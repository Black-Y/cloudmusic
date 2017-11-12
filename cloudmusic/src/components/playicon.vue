<template>
	<div class="playicon" @click="toPlaying" >
		<div class="play-icon"></div>
		<div class="icon-cover" :class=" startPlay?'waving':'' "></div>
		<audio data-musicid="">
		</audio>
	</div>
</template>

<script>
	import api from '../api'
	import { mapGetters } from 'vuex'
	export default{
		data () {
		    return {
		    	showFlag: true,
		    	index: 0
		    }
	    },
	    methods: {
		  	toPlaying(){
		  		this.$store.commit('showPlayingPage', true);
		  	}
	    },
	    computed: {
	    	...mapGetters([
			      'startPlay',
			      'musicUrl',
			      'currentId',
			      'audioTarget',
			      'timer',
			      'timeCount',
			      'musicDuration'
			    ])
	    },
	    mounted() {
	    	this.$store.commit('getAudio', $("audio")[0]);
	    },
	    updated() {
	    	let tar = this.audioTarget;
	    	let len = this.musicUrl.length;
	    	for(let i =0; i<len; i++){
	    		if(this.musicUrl[i].id == this.currentId){
	    			this.index = i;
	    		}
	    	}
	    	if(tar.dataset.musicid != this.currentId){
	    		this.$store.commit('setTimeCount', 0);
				this.$store.commit('playing', true);
				api.getMusicUrl(this.currentId).then(res => { 
					if(res.code == 200){
						tar.src = res.data[0].url;
						this.$store.commit('setAuthor', this.musicUrl[this.index].author);
						this.$store.commit('setCurrentName', this.musicUrl[this.index].name);
						this.$store.commit('setCurrentPic', this.musicUrl[this.index].pic);
						tar.dataset.musicid = this.currentId;
					}
				});
				api.getLyric(this.currentId).then(res => {
					if(res.code == 200){
						let arr1 = api.formatLyric(res.lrc.lyric);
						let arr = api.timeStamp(res.lrc.lyric);
						this.$store.commit('setLyric', arr1);
						this.$store.commit('setTimeArr', arr);
					}else {
						this.$store.commit('setLyric', "歌词加载失败!");
					}
				});
    		}
	    	if(this.startPlay){
	    		clearInterval(this.timer);
	    		tar.addEventListener("canplay", () => {
	    			this.$store.commit('setDuration', tar.duration);
	    			tar.play();
	    		})
	    		let timer = setInterval(() => {
		    		if(Math.floor(this.musicDuration)!=0&&this.timeCount!=0&&this.timeCount >= Math.floor(this.musicDuration)){
		    			tar.pause();
		    			this.$store.commit('playing', false);
		    			this.index = this.index>=len?0:this.index+1;
		    			let id = this.musicUrl[this.index].id;
		    			this.$store.commit('setCurrentId', id);
		    		}else if(Math.floor(this.musicDuration)!=0){
		    			this.$store.commit('setTimeCount', this.timeCount+1);
		    		}
	    		},1000);
	    		this.$store.commit('setTimer', timer);
	    	}else{
	    		tar.pause();
	    		clearInterval(this.timer);
	    	}
	    }
	}
</script>

<style scoped>
	.playicon{
		position: fixed;
		top: 0;
   		right: 5%;
   		transform: translate(0,50%);
		width: .8rem;
		height: .7rem;
		z-index: 99998;
		text-align: right;
		overflow: hidden;
	}
	.play-icon{
		display: inline-block;
		margin-right: -.05rem;
		width: .05rem;
		height: .8rem;
		background-color: #fff;
		box-shadow: -.1rem 0 #fff, -.3rem 0 #fff, -.5rem 0 #fff, -.7rem 0 #fff;
		-webkit-box-shadow: -.1rem 0 #fff, -.3rem 0 #fff, -.5rem 0 #fff, -.7rem 0 #fff;
		-o-box-shadow: -.1rem 0 #fff, -.3rem 0 #fff, -.5rem 0 #fff, -.7rem 0 #fff;
		-moz-box-shadow: -.1rem 0 #fff, -.3rem 0 #fff, -.5rem 0 #fff, -.7rem 0 #fff;
	}
	.icon-cover{
		position: absolute;
		width: .09rem;
		height: 1rem;
		top: -1rem;
		right: -.09rem;
		background-color: #252525;
		box-shadow: -.12rem .2rem #252525, -.32rem .3rem #252525, -.52rem .1rem #252525, -.72rem .4rem #252525;
		-webkit-box-shadow: -.12rem .2rem #252525, -.32rem .3rem #252525, -.52rem .1rem #252525, -.72rem .4rem #252525;
		-o-box-shadow: -.12rem .2rem #252525, -.32rem .3rem #252525, -.52rem .1rem #252525, -.72rem .4rem #252525;
		-moz-box-shadow: -.12rem .2rem #252525, -.32rem .3rem #252525, -.52rem .1rem #252525, -.72rem .4rem #252525;
	}
	.waving{
		animation: wave .8s linear infinite;
	}
	@keyframes wave{
		0%{box-shadow: -.12rem .2rem #252525, -.32rem .3rem #252525, -.52rem .1rem #252525, -.72rem .4rem #252525;}
		70%{box-shadow: -.12rem .6rem #252525, -.32rem .05rem #252525, -.52rem .5rem #252525, -.72rem .15rem #252525;}
		100%{box-shadow: -.12rem .2rem #252525, -.32rem .3rem #252525, -.52rem .1rem #252525, -.72rem .4rem #252525;}
	}
	@-webkit-keyframes wave{
		0%{box-shadow: -.12rem .2rem #252525, -.32rem .3rem #252525, -.52rem .1rem #252525, -.72rem .4rem #252525;}
		70%{box-shadow: -.12rem .6rem #252525, -.32rem .05rem #252525, -.52rem .5rem #252525, -.72rem .15rem #252525;}
		100%{box-shadow: -.12rem .2rem #252525, -.32rem .3rem #252525, -.52rem .1rem #252525, -.72rem .4rem #252525;}
	}
</style>