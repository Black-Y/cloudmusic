<template>
	<div class="content">
		<div class="cover" v-if="typeName=='歌单'">
			<div class="playcount">
				<span class="glyphicon glyphicon-headphones"></span>
				<span></span>
			</div>
			<img :src="recommendedCover"/>
			<div class="coverIntroduction">
				<span>{{recommendedTitle}}</span>
				<span>{{nickname}}</span>
			</div>
		</div>
		<div class="play-icon">
			<span class="glyphicon glyphicon-play-circle"></span>
			<span>播放全部</span>
		</div>
		<ol class="musicList">
			<li v-for="(item, index) in lists">
				<div @click="playmusic($event, index)">
					<span class="music-name" :class="item.id==currentId?'musicSelected':''">{{item.name}}</span>
					<span class="author">{{typeName=='歌单'?item.ar[0].name:item.artists[0].name}}-{{item.name}}</span>
				</div>
				<div class="operate">
					<span>...</span>
				</div>
			</li>
		</ol>
	</div>
</template>

<script>
	import api from '../api'
	import { mapGetters } from 'vuex'
	export default{
		props: {
			typeName: String
		},
	    data() {
			return {
				lists: '',
				nickname: '',
			}
		},
		computed: {
			...mapGetters([
				  'showRecDtail',
			      'recommendedCover',
			      'recommendedTitle',
			      'currentId',
			      'audioTarget',
			      'recommendedId'
			    ])
		},
		methods: {
			playmusic(event, index){
				let mid = this.lists[index].id;
				if(mid != this.currentId){
					if(!this.audioTarget.paused){
						this.$store.commit('playing', false);
					}
					this.$store.commit('setTimeCount', 0);
					this.$store.commit('playing', true);
					this.$store.commit('showPlayingPage', true);
					this.$store.commit('setCurrentId', mid);
					let len = this.lists.length;
					let temp = [];
					for(let i=0; i<len; i++){
						let obj = {};
						if(this.typeName=='歌单'){
							obj.author = this.lists[i].ar[0].name;
							obj.pic = this.lists[i].al.picUrl;
						}else{
							obj.author = this.lists[i].artists[0].name;
							obj.pic = this.lists[i].album.picUrl;
						}
						obj.id = this.lists[i].id;
						obj.name = this.lists[i].name;
						temp.push(obj);
						this.$store.commit('setMusicUrl', temp);
					}
				}else{
					this.$store.commit('showPlayingPage', true);
				}
			}
		},
		created: function(){
			if(this.typeName == '日推'){
				api.dailylist().then(res => { if(res.code == 200) {this.lists = res.recommend} });
			}else{
				let id = this.recommendedId;
				api.getRecommendDetail(id).then(res => { 
					if(res.code == 200) {
						this.lists = res.playlist.tracks;
						this.nickname = res.playlist.creator.nickname;
					} 
				});
			}
	    }
	}
</script>

<style scoped>
	.content{
		margin-top: 1.4rem;
		padding-bottom: 1.1rem;
	}
	.cover{
		position: relative;
		padding: 0 .4rem 0 .4rem;
		text-align: left;
		height: 5rem;
		width: 100%;
		display: flex;/*Flex布局*/
	    display: -webkit-flex; /* Safari */
	    align-items:center;/*指定垂直居中*/
	    text-align: center;
    	border-bottom: 1px solid rgba(232, 232, 232, 1);
		overflow: hidden;
	}
	.cover img{
		width: 4rem;
		height: 4rem;
	}
	.coverIntroduction{
		width: 4rem;
		text-align: left;
		margin-top: -1.5rem;
		margin-left: .4rem;
	}
	.coverIntroduction > span{
		display: block;
	}
	.playcount{
		position: absolute;
		top: .5rem;
		left: 2.4rem;
		padding-right: .4rem;
		height: .5rem;
		line-height: .5rem;
		font-size: .3rem;
		width: 2rem;
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
	.play-icon{
		height: 1rem;
		line-height: 1rem;
		text-align: left;
		overflow:hidden;/*不设置将导致.radboder的margin失效*/
		text-align: left;
		width: 98%;
		margin-left: .2rem;
		border-bottom: 1px solid rgba(232, 232, 232, 1);
		cursor: pointer;
	}
	ol.musicList li{
		height: 1.2rem;
		width: 98%;
		display: block;
		margin-left: .2rem;
		border-bottom: 1px solid rgba(232, 232, 232, 1);
		text-align: left;
	}
	ol.musicList li div{
		display: inline-block;
		padding-top: .1rem;
		height: 1.2rem;
		overflow: hidden;
		width: 95%;
	}
	ol.musicList li div.operate{
		width: 5%;
	}
	ol.musicList span{
		margin: 0;
		padding: 0;
	}
	.music-name, .author{
		width: 80%;
		display: block;
		font-size: .4rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
		display: inline-block;
		right: .2rem;
	}
	.operate span{
		font-size: .5rem;
		font-weight: bold;
		color: gray;
		cursor: pointer;
	}
</style>