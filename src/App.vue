<template>
	<div id="app">
		<router-view @loginSuccess="loginSuccess"></router-view>
	</div>
</template>

<script>
	import CmsHeader from '@/components/Header/Header'
	import CmsNav from '@/components/Nav/Nav'
	export default {
		name: 'app',
		data () { 
			return { 
				isLogin: false,
				username: '',
			}
		},
		components: { 
			CmsHeader,
			CmsNav
		},
		methods: { 
			loginSuccess (username) { 
				this.isLogin = true
				this.username = username
			}
		}
	}
</script>

<style lang="less">
	html, body {
		margin: 0;
		padding: 0;
	}

	ul { 
		margin: 0;
		padding: 0;
	}

	ul, li { 
		list-style: none;
	}

	a {
		text-decoration: none;
	}

	[v-cloak] {
		display: none;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
