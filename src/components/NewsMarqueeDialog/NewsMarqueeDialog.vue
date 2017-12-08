<template>
	<el-dialog
		:title="title"
		:visible="visible"
		width="80%"
		top="10vh"
		@close="close">
		<el-form :model="form" :rules="rules" status-icon ref="newsMarqueeForm" class="elForm" label-width="100px">

			<el-form-item label="标题" prop="msgTitle">
				<el-input type="text" v-model="form.msgTitle" placeholder="请输入标题"></el-input>
			</el-form-item>

			<el-form-item label="消息内容" prop="msgContent">
				<el-input type="textarea" :rows="10" v-model="form.msgContent" placeholder="请输入消息内容"></el-input>
			</el-form-item>
			
			<el-form-item label="开始时间" prop="startTime">
				<el-date-picker
					id="startTime"
				  	type="datetime"
			    	v-model="form.startTime"
			    	value-format="yyyy-MM-dd HH:mm:ss"
			    	placeholder="选择开始时间">
			    </el-date-picker>
		  	</el-form-item>
		
		  	<el-form-item label="结束时间" prop="endTime">
			    <el-date-picker
			    	id="endTime"
				  	type="datetime"
			    	v-model="form.endTime"
			    	value-format="yyyy-MM-dd HH:mm:ss"
			    	placeholder="选择结束时间">
			    </el-date-picker>
		  	</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="save">确定</el-button>
				<el-button @click="resetForm">重置</el-button>
			</el-form-item>

		</el-form>
	</el-dialog>
</template>

<script>
	import * as config from '../../api/config'
	import $ from 'jquery'
	import {getUuid} from '../../assets/js/tool.js'
	
	export default {
		name: 'Header',
		props: { 
			form: { 
				type: Object,
				default: () => { 
					return { 
						id: '',
						msgTitle: '',
						msgContent: '',
						startTime: '',
						endTime: ''
					}
				}
			},
			title: { 
				type: String,
				default: '新增'
			}
		},
		data () {
			return {
				visible: false,
				rules: {
					msgTitle: [
						{ required: true, message: '请输入标题', trigger: 'blur' },
						{ min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
					],
					msgContent: [
						{ required: true, message: '请输入消息内容', trigger: 'blur' }
					],
					startTime: [
						{ required: true, message: '请输入开始时间', trigger: 'blur' }
					],
					endTime: [
						{ required: true, message: '请输入结束时间', trigger: 'blur' }
					]
				}
			}
		},
		methods: { 
			show () { 
				this.visible = true
			},
			hide () { 
				this.visible = false
			},
			close () { 
				this.hide()
			},
			save () {
				if (!this.form.id) { 
					this.form.id = getUuid(32, 16)
				}
				
				this.$refs.newsMarqueeForm.validate((boolean) => { 
					if (boolean) { 
						$.ajax({
							type: 'POST',
							contentType: 'application/json',
							data: JSON.stringify(this.form),
							url: config.HOST + '/message/addMessage.do'
						}).then((res) => { 
							if (res.status === config.status) { 
								this.$emit('saveSuccess')
							}
							this.$message({
					        	message: res.msg,
					        	type: 'success'
					        });
						});
					}
				})
				
			},
			resetForm () { 
				this.$nextTick(() => { 
					this.$refs.newsMarqueeForm.resetFields()
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
	.line { 
		text-align: center;
	}
</style>