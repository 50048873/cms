<template>
	<div class="header">
		<img class="logo" :src="logo" alt="">
		<div class="userInfo">
			<span v-if="!isLogin">登录</span>
	        <span v-if="isLogin">欢迎您：{{username}}</span>
	        <span>|</span>
	        <span v-if="isLogin" @click="logout" class="btn">退出</span>
	        <span>|</span>
	        <span @click="changePassword" class="btn">修改密码</span>
	    </div>
	    <slot></slot>
	</div>
</template>

<script>
	import $ from 'jquery'
	import * as config from '../../api/config'
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
		},
		data () { 
			return { 
				logo: '../../../cms/static/img/logo.png'
			}
		},
		methods: { 
			logout () { 
				// 调用退出接口
				$.ajax({
                    type: 'GET',
                    url: config.HOST + '/admin/logout.do'
                }).then((res) => { 
                	window.localStorage.removeItem('userCode')
                	this.$router.push('/admin/login')
                })
			},
			changePassword () { 
				this.$emit('changePassword');
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
	@import '../../assets/less/varialbe.less';
	.header {
		height: @header-height;
		line-height: @header-height;
		background-color: #1f2d3d;
		color: #fff;
		position: relative;
		.logo { 
			position: relative;
		    height: 70%;
		    top: 15%;
		    margin-left: 1em;
		}
		.userInfo {
			position: absolute;
			top: 0;
			right: 0;
			span {
				display: inline-block;
				padding: 10px;
				line-height: 30px;
				color: #fff;
			}
			.btn { 
				cursor: pointer;
				&:hover { 
					text-decoration: underline;
				}
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
