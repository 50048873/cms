<template>
	<div class="header">
		<div class="userInfo">
			<a href="" v-if="!isLogin">登录</a>
	        <a href="javascript:;" v-if="isLogin">{{username}}</a>
	    </div>
	    <slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		props: { 
			username: { 
				type: String,
				default: 'test',
			},
			isLogin: { 
				type: Boolean,
				default: false
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
	.header {
		height: 50px;
		background-color: #1f2d3d;
		color: #fff;
		position: relative;
		.userInfo {
			position: absolute;
			top: 0;
			right: 0;
			a {
				display: inline-block;
				padding: 10px;
				line-height: 30px;
				color: #fff;
			}
		}
	}

	.loginDialog {
		.mb-15 {
			margin-bottom: 15px;
		}
		.label {
			line-height: 36px;
			margin-right: 1em;
		}
	}
</style>
