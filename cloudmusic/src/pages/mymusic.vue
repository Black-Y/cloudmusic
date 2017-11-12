<template>
	<div class="mymusic">
		<div class="playing-record">
			<div class="icon">
				<span class="glyphicon glyphicon-headphones"></span>
			</div>
			<div class="count">
				<span>最近播放</span>
				<span>{{weekData.length}}</span>
				<span>></span>
			</div>
		</div>
		<div class="my-lists" v-for="item in mylist">
			<div class="cover"><img :src="item.coverImgUrl"/></div>
			<div class="list-name">
				<span>{{item.name}}</span>
				<span>{{item.trackCount}}首</span>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../api'
	export default {
	  data () {
	    return {
	    	mylist: '',
	    	weekData: ''
	    }
	  },
	  created: function(){
	  	api.getMymusic('/user/playlist?offset=0&limit=10&uid=604457657').then(res => {  if(res.code == 200) {this.mylist = res.playlist} });
	  	api.getWeekData('/user/record?uid=604457657&type=1').then(res => {  if(res.code == 200) {this.weekData = res.weekData} });
	  }
	}
</script>

<style scoped>
	.mymusic{
		padding-top: 1.4rem;
	}
	.playing-record{
		height: 1.3rem;
		line-height: 1.3rem;
		display:flex;/*Flex布局*/
	    display: -webkit-flex; /* Safari */
	    align-items:center;/*指定垂直居中*/
	}
	.icon{
		height: 1.15rem;
		width: 1rem;
		float: left;
		margin-left: .2rem;
		margin-right: .1rem;
	}
	.icon .glyphicon{
		font-size: .45rem;
		color: crimson;
	}
	.count{
		padding-right: .2rem;
		width: 87%;
		text-align: right;
		color: gray;
		border-bottom: 1px solid rgba(232, 232, 232, 1);
	}
	.count span:first-child{
		float: left;
		font-size: .4rem;
		color: #000000;
	}
	.my-lists{
		height: 1.3rem;
		text-align: left;
		display:flex;/*Flex布局*/
	    display: -webkit-flex; /* Safari */
	    align-items:center;/*指定垂直居中*/
	}
	.my-lists > div{
		display: inline-block;
	}
	.cover{
		margin-left: .2rem;
		margin-right: .1rem;
	}
	.my-lists img{
		width: 1rem;
	}
	.list-name{
		height: 100%;
		width: 87%;
	    border-bottom: 1px solid rgba(232, 232, 232, 1);
	}
	.list-name span{
		padding-top: .1rem;
		font-size: .4rem;
		display: block;
	}
	.list-name span:last-child{
		padding-top: 0;
		font-size: .32rem;
		color: gray;
	}
</style>