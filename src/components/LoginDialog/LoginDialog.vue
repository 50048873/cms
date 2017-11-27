<template>
	<el-dialog
            title="登录框"
            :visible.sync="dialogVisible"
            width="30%">
        <el-form :model="loginForm" status-icon ref="loginForm" label-width="100px" class="elForm">
		  <el-form-item label="请输入账号" prop="oldPassword">
			<el-input type="password" v-model="loginForm.userCode" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="请输入密码" prop="newPassword">
			<el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" @click="login">确定</el-button>
			<el-button @click="resetForm">重置</el-button>
		  </el-form-item>
		</el-form>
    </el-dialog>
</template>

<script>
	import * as config from '../../config/config.js'
	import $ from 'jquery'
	export default {
		name: 'Header',
		data () {
			return {
				dialogVisible: true,
				loginForm: { 
					userCode: 'admin',
					password: '123456'
				}
			}
		},
		methods: { 
            login () {
                $.ajax({
                    type: 'POST',
                    data: this.loginForm,
                    url: config.HOST + '/admin/loginPost.do'
                }).then(res => { 
                	if (res.rspCode === config.rspCode) { 
                		this.dialogVisible = false
		                this.$emit('loginSuccess', this.loginForm.userCode)
		                this.$router.push('home')
                	} else { 
                		this.$alert(res.rspMsg)
                	}
                }, res => { 
                	this.$alert('服务器出错，请联系管理员！')
                });
            },
			resetForm () { 
				this.loginForm.userCode = ''
				this.loginForm.password = ''
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
</style>