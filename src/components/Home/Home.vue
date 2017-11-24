<template>
		<div>
			<cms-header :isLogin="isLogin" :username="this.$route.params.username"></cms-header>
			<cms-nav></cms-nav>
			<router-view></router-view>
		</div>
</template>

<script>
	import CmsHeader from '@/components/Header/Header'
	import CmsNav from '@/components/Nav/Nav'
	export default {
		name: 'app',
		data () { 
			return { 
				
			}
		},
		computed: { 
			isLogin () { 
				return this.$route.params.username ? true : false
			}
		},
		components: { 
			CmsHeader,
			CmsNav
		},
		methods: { 
			
		},
		created () { 

		}
	}
</script>

<style lang="less">
	
</style>
