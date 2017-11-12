<template>
	<div class="banner">
		<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval=3000>
		    <ol class="carousel-indicators">
		        <li data-target="#myCarousel" :class="!index?'active':''"  v-for="(item, index) in images" :data-slide-to="index"></li>
		    </ol>   
		    <div class="carousel-inner">
		        <div class="item" :class="!index?'active':''" v-for="(img, index) in images">
		            <img :src="img.pic">
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
	import api from '../api'
	export default{
	    data() {
			return {
				images: ''
			}
		},
	    created: function(){
			api.getBanner().then(res => { if(res.code == 200) {this.images = res.banners;} });
	    }
	}
</script>

<style scoped>
	.banner{
		margin-top: 1.4rem;
	}
	#myCarousel ol{
		bottom: 0;
	}
	#myCarousel ol li{
		border: none;
		background-color: rgba(255,255,255,.3);
	}
	#myCarousel ol li.active{
		background-color: #fff;
	}
</style>