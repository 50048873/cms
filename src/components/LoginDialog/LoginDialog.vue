<template>
	<el-dialog
            class="loginDialog"
            title="登录框"
            :visible.sync="dialogVisible"
            size="tiny">
        <el-row type="flex" justify="center" class="mb-15">
            <label class="label">请输入账号</label>
            <el-col :span="10">
                <el-input v-model="username" placeholder="请输入账号"></el-input>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <label class="label">请输入密码</label>
            <el-col :span="10">
                <el-input v-model="password" placeholder="请输入密码"></el-input>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="login">确 定</el-button>
        </span>
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
				username: 'admin',
				password: '123456',
			}
		},
		methods: { 
            login () {
                var params = {
                    username: this.username,
                    password: this.password
                };
                this.dialogVisible = false
                this.$router.push({name: 'Home', params: {username: this.username}})
                this.$emit('loginSuccess', this.username);
                /*$.ajax({
                    type: 'POST',
                    data: params,
                    url: config.HOST + '/admin/loginPost.do'
                }).then((res) => { 
                	console.log(res);
                	if (res.success === config.SUCCESS) { 
                		
                		
                	} else { 
                		//this.$alert('用户名或密码错误！')
                	}
                	
                })*/
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
