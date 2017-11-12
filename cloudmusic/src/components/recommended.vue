<template>
	<div class="recommended">
		<div class="title">
			&nbsp推荐歌单 
			<span>&nbsp></span>
		</div>
		<ol>
			<li v-for="item in lists" @click="toRecommededList(item.id, item.picUrl, item.name)">
				<div class="playcount">
					<span class="glyphicon glyphicon-headphones"></span>
					<span>{{item.playCount/10000>1?parseInt(item.playCount/10000)+'万':item.playCount}}</span>
				</div>
				<img :src="item.picUrl" />
				<span class="introduction">{{item.name}}</span>
			</li>
		</ol>
	</div>
</template>

<script>
	import api from '../api'
	export default {
		name: 'recommended',
		data() {
			return {
				lists: '',
			}
		},
		methods: {
			toRecommededList(id, coverPic, title){
				this.$store.commit('setShowRecDtail', true);
				this.$store.commit('setRecommendedCover', coverPic);
				this.$store.commit('setRecommendedId', id);
				this.$store.commit('setRecommendedTitle', title);
			}
		},
		created: function(){
			api.homereclist().then(res => { if(res.code == 200) {this.lists = res.result} });
		}
	}
</script>

<style scoped>
	.recommended{
		margin-bottom: 1.4rem;
	}
	.title{
		height: 1rem;
		line-height: 1rem;
		text-align: left;
		display:flex;/*Flex布局*/
	    display: -webkit-flex; /* Safari */
	    align-items:center;/*指定垂直居中*/
	}
	.title span{
		font-size: .4rem;
		font-weight: bold;
		color: dimgray;
	}
	.title::before{
		content: '';
		width: .08rem;
		height: .36rem;
		background-color: firebrick;
	}
	ol{
		color: #fff;
		text-align: left;
	}
	ol li{
		position: relative;
		width: 33%;
		display: inline-block;
		vertical-align: bottom;
	}
	ol li:nth-child(3n+2){
		margin: 0 .5% 0 .5%;
	}
	.playcount{
		position: absolute;
		font-size: .3rem;
		right: 0;
		width: 50%;
		padding-right: .1rem;
		height: .5rem;
		line-height: .5rem;
		text-align: right;
		background: -webkit-linear-gradient(to left,rgba(0,0,0,.3),rgba(0,0,0,0)); 
		background: -o-linear-gradient(to left,rgba(0,0,0,.3),rgba(0,0,0,0)); 
		background: -moz-linear-gradient(to left,rgba(0,0,0,.3),rgba(0,0,0,0)); 
		background: linear-gradient(to left,rgba(0,0,0,.3), rgba(0,0,0,0)); 
	}
	.playcount span{
		display: inline;
		color: #fff;
	}
	ol li img{
		width: 100%;
	}
	ol li span.introduction{
		width: 100%;
		height: 1.4rem;
		line-height: .4rem;
		font-size: .36rem;
		color: #000;
		padding: 5px;
		text-align: left;
		display: block;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>