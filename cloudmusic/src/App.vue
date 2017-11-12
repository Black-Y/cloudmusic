<template>
  <div id="app">
  	<v-login v-show=""></v-login>
  	<v-playing v-show="playShow"></v-playing>
  	<v-header></v-header>
  	<v-playicon v-show="currentId"></v-playicon>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import footer from '@/components/footer'
import header from '@/components/header'
import playicon from '@/components/playicon'
import login from '@/pages/login'
import playing from '@/pages/playing'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
		return {
		}
	},
	computed:{
		...mapGetters([
		  'playShow',
		  'currentId'
	    ])
	},
  components: {
  	'v-login': login,
  	'v-header': header,
		'v-footer': footer,
		'v-playicon': playicon,
		'v-playing': playing
	},
	created: function () {
//  this.$router.push('/login');
 	}
}
</script>

<style>
html,body{
	width: 100%;
	height: 100%;
}
#app {
	position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
  font-size: .4rem;
}
</style>
