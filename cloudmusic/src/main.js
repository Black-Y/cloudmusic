// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './vuex/store'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
el: '#app',
router,
store,
template: '<App/>',
components: { App }
})
