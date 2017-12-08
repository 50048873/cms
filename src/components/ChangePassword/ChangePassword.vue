<template>
	<el-dialog
		title="修改密码"
		:visible.sync="dialogVisible"
		width="30%"
		@close="hide">
		<el-form :model="passwordForm" status-icon ref="passwordForm" label-width="100px" class="elForm">
		  <el-form-item label="旧密码" prop="oldPassword">
			<el-input type="password" v-model="passwordForm.oldPassword" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="新密码" prop="newPassword">
			<el-input type="password" v-model="passwordForm.newPassword" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" @click="changePassword" @keyup.enter.native="changePassword">确定</el-button>
			<el-button @click="resetForm">重置</el-button>
		  </el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
	import * as config from '../../api/config'
	import $ from 'jquery'
	export default {
		name: 'Header',
		data () {
			return {
				dialogVisible: false,
				passwordForm: {
		          oldPassword: '',
		          newPassword: '',
		        }
			}
		},
		methods: { 
			show () { 
				this.dialogVisible = true
			},
			hide () { 
				this.dialogVisible = false
			},
			changePassword () {
				$.ajax({
					type: 'POST',
					data: this.passwordForm,
					url: config.HOST + '/admin/updatePassword.do'
				}).then((res) => { 
					if (res.rspCode === config.rspCode) { 
						this.$alert('密码修改成功，请重新登录！', res.rspMsg, {
				          confirmButtonText: '确定',
				          callback: action => {
							this.$router.push('/admin/login')
				          }
				        });
						
					} else { 
						this.$alert(res.rspMsg)
					}
				})
			},
			resetForm () { 
				this.passwordForm.oldPassword = ''
				this.passwordForm.newPassword = ''
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
</style>
