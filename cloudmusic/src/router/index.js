import Vue from 'vue'
import Router from 'vue-router'
import playicon from '@/components/playicon'
import login from '@/pages/login'
import home from '@/pages/home'
import reclists from '@/pages/reclists'
import mymusic from '@/pages/mymusic'
import person from '@/pages/person'

Vue.use(Router)

export default new Router({
//	mode: 'history',
	linkActiveClass: 'active',
 	routes: [
 		{
		   	path: '/login',
		   	name: 'login',
		   	component: login
	    },
	    {
		    path: '/home',
		    name: 'home',
		    component: home,
		    children: [
		      	{
		      		path: 'reclists',
		      		name: 'reclists',
		      		component: reclists,
		      	}
		    ]
	    },
	    {
		   	path: '/mymusic',
		   	name: 'mymusic',
		   	component: mymusic
	    },
	    {
	    	path: '/person',
		   	name: 'person',
		   	component: person
	    },
	    {
	    	path: '/playicon',
		   	name: 'playicon',
		   	component: playicon
	    }
    ]
})
