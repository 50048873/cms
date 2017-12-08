import Vue from 'vue'
import Router from 'vue-router'
import LoginDialog from '@/components/LoginDialog/LoginDialog'
import Home from '@/components/Home/Home'
import PublishNews from '@/components/PublishNews/PublishNews'
import NewsMarquee from '@/components/NewsMarquee/NewsMarquee'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: '/cms/',
	routes: [
		{
			path: '/',
			redirect: '/index',
		},
		{
			path: '/admin/login',
			name: 'login',
			component: LoginDialog
		},
		{
			path: '/:index',
			name: 'index',
			component: Home,
			redirect: '/index/publishNews',
			children: [
				{
					path: 'publishNews',
					name: 'publishNews',
					component: PublishNews
				},
				{
					path: 'newsMarquee',
					name: 'newsMarquee',
					component: NewsMarquee
				}
			]
		}
	]
})
