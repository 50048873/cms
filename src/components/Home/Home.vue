<template>
	<div>
		<cms-header :isLogin="isLogin" :username="this.$parent.username" @changePassword="changePassword"></cms-header>
		<cms-nav></cms-nav>
		<router-view></router-view>
		<change-password v-if="isChangingPassword"></change-password>
	</div>
</template>

<script>
	import CmsHeader from '@/components/Header/Header'
	import CmsNav from '@/components/Nav/Nav'
	import ChangePassword from '@/components/ChangePassword/ChangePassword'
	export default {
		name: 'app',
		data () { 
			return { 
				isChangingPassword: false
			}
		},
		computed: { 
			isLogin () { 
				return this.$parent.username ? true : false
			}
		},
		components: { 
			CmsHeader,
			CmsNav,
			ChangePassword
		},
		methods: { 
			changePassword () { 
				this.isChangingPassword = true
			}
		},
		created () { 
			if (!this.isLogin) { 
				this.$router.push('/login')
			}
		}
	}
</script>

<style lang="less">
	
</style>
