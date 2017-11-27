<template>
	<el-dialog
            :title="title"
            :visible="visible"
            width="50%"
            @close="close">
        <el-form :model="form" :rules="rules" status-icon ref="form" label-width="100px" class="elForm">
		  <el-form-item label="标题" prop="title">
			<el-input type="text" v-model="form.title"></el-input>
		  </el-form-item>
		  <el-form-item label="作者" prop="author">
			<el-input type="text" v-model="form.author"></el-input>
		  </el-form-item>
		  <el-form-item label="创建时间" prop="createTime">
			<el-date-picker
		      v-model="form.createTime"
		      value-format="yyyy-MM-dd"
		      placeholder="选择创建时间">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="更新时间" prop="updateTime">
			<el-date-picker
		      v-model="form.updateTime"
		      value-format="yyyy-MM-dd"
		      placeholder="选择更新时间">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="内容" prop="content">
			<el-input type="text" v-model="form.content"></el-input>
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" @click="save">确定</el-button>
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
		props: { 
			visible: { 
				type: Boolean,
				default: false
			},
			title: { 
				type: String,
				default: '新增'
			}
		},
		data () {
			return {
				form: { 
					title: '',
					author: '',
					createTime: '',
					updateTime: '',
					content: ''
				},
				rules: {
		          title: [
		            { required: true, message: '请输入标题', trigger: 'blur' },
		            { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
		          ],
		          author: [
		            { required: true, message: '请输入作者', trigger: 'blur' },
		            { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
		          ]
		        }
			}
		},
		methods: { 
			close () { 
				this.$emit('update:visible', false)
			},
            save () {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(this.form),
                    url: config.HOST + '/notice/addNotice.do'
                }).then((res) => { 
                	console.log(res);
                	if (res.status === config.status) { 
                		this.visible = false
		                this.$emit('addSuccess', res)
                	} else { 
                		this.$alert(res.rspMsg)
                	}
                });
            },
			resetForm () { 
				
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
</style>