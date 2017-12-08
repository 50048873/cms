<template>
	<div>
		<cms-header :isLogin="isLogin" :username="username" @changePassword="changePassword"></cms-header>
		<cms-nav></cms-nav>
		<router-view></router-view>
		<change-password @hide="hide" ref="changePassword"></change-password>
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
				dialogVisible: false,
				isChangingPassword: false
			}
		},
		computed: { 
			isLogin () { 
				return window.localStorage.getItem('userCode') ? true : false
			},
			username () { 
				if (this.isLogin) { 
					return window.localStorage.getItem('userCode')
				}
			}
		},
		components: { 
			CmsHeader,
			CmsNav,
			ChangePassword
		},
		methods: { 
			changePassword () { 
				this.$refs.changePassword.show()
			},
			hide () { 
				this.$refs.changePassword.hide()
			}
		},
		created () { 
			if (!this.isLogin) { 
				this.$router.push('/admin/login')
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
</style>
