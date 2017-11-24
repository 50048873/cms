import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginDialog from '@/components/LoginDialog/LoginDialog'
import Home from '@/components/Home/Home'
import PublishNews from '@/components/PublishNews/PublishNews'
import Other from '@/components/Other/Other'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			name: 'LoginDialog',
			component: LoginDialog
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			redirect: '/home/publishNews',
			children: [
		        {
		          path: 'publishNews',
		          component: PublishNews
		        },
		        {
		          path: 'other',
		          component: Other
		        }
		    ]
		}
	]
})
