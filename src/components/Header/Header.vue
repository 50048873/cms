<template>
	<div class="header">
		<div class="userInfo">
			<span v-if="!isLogin">登录</span>
	        <span v-if="isLogin">欢迎您：{{username}}</span>
	        <span>|</span>
	        <span v-if="isLogin" @click="logout">退出</span>
	        <span>|</span>
	        <span @click="changePassword">修改密码</span>
	    </div>
	    <slot></slot>
	</div>
</template>

<script>
	import $ from 'jquery'
	import * as config from '../../config/config.js'
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
		methods: { 
			logout () { 
				// 调用退出接口
				$.ajax({
                    type: 'GET',
                    url: config.HOST + '/admin/logout.do'
                }).then((res) => { 
                	console.log(res);
                	if (res.success === config.SUCCESS) { 
                		
                		
                	} else { 
                		//this.$alert('用户名或密码错误！')
                	}
                	
                })

                this.$router.push('/login')
			},
			changePassword () { 
				this.$emit('changePassword');
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
			span {
				display: inline-block;
				padding: 10px;
				line-height: 30px;
				color: #fff;
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
