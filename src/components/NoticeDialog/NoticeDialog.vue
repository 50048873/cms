<template>
	<el-dialog
		:title="title"
		:visible="visible"
		:width="width"
		top="10vh"
		:fullscreen="isFullscreen"
		@close="close">
		<template slot="title">
			<span>{{title}}</span>
			<button type="button" class="fullscreenBtn" @click="fullscreen">
				<i class="fa fa-window-minimize" v-if="isFullscreen"></i>
				<i class="fa fa-window-maximize" v-else></i>
			</button>
		</template>
		<el-form :model="form" :rules="rules" status-icon ref="form" class="elForm" label-width="60px">
			<el-form-item label="标题" prop="title">
				<el-input type="text" v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="作者" prop="author">
				<el-input type="text" v-model="form.author"></el-input>
			</el-form-item>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<quill-editor v-model="form.content"
					ref="myQuillEditor"
					:options="editorOption"
					@blur="onEditorBlur($event)"
					@focus="onEditorFocus($event)"
					@ready="onEditorReady($event)">
				</quill-editor>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="save">确定</el-button>
				<el-button @click="resetForm">重置</el-button>
				<el-button @click="fullscreen" class="fr">{{fullscreenText}}</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
	import * as config from '../../api/config'
	import $ from 'jquery'
	
	export default {
		name: 'Header',
		props: { 
			form: { 
				type: Object,
				default: () => { 
					return { 
						title: '',
						author: '',
						content: ''
					}
				}
			},
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
				content: '<h2>I am Example</h2>',
				editorOption: {
					// some quill options
				},
				isFullscreen: false,
				fullscreenText: '全屏',
				width: '80%',
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
			fullscreen () { 
				this.isFullscreen = !this.isFullscreen
				this.isFullscreen ? this.fullscreenText = '退出全屏' : this.fullscreenText = '全屏'
				this.isFullscreen ? this.width = '100%' : this.width = '80%'
				this.$nextTick(() => { 
					this.isFullscreen ? $('.ql-editor').css('max-height', 'none') : $('.ql-editor').css('max-height', '400px')
				})
			},
			onEditorBlur(quill) {
			},
			onEditorFocus(quill) {
			},
			onEditorReady(quill) {
			},
			close () { 
				this.$emit('update:visible', false)
			},
			save () {
				this.$refs.form.validate((boolean) => { 
					if (boolean) { 
						$.ajax({
							type: 'POST',
							contentType: 'application/json',
							data: JSON.stringify(this.form),
							url: config.HOST + '/notice/addNotice.do'
						}).then((res) => { 
							if (res.status === config.status) { 
								this.$emit('saveSuccess')
							} else { 
								this.$alert(res.rspMsg || config.errorTooltip)
							}
						});
					}
				})
				
			},
			resetForm () { 
				this.$nextTick(() => { 
					this.$refs.form.resetFields()
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
	.elForm { 
		width: 90%;
	}

	.quill-editor { 
		&:hover { 
			.ql-toolbar.ql-snow { 
				border-color: #b4bccc;
			}
			.ql-container.ql-snow {
			    border-color: #b4bccc;
			}
		}
	}

	.ql-toolbar.ql-snow { 
		border: 1px solid #d8dce5;
		border-radius: 4px 4px 0 0;
		&:hover { 
			border-color: #b4bccc;
		}
	}

	.ql-container.ql-snow {
	    border: 1px solid #d8dce5;
	    border-radius: 0 0 4px 4px;
	    &:hover { 
			border-color: #b4bccc;
		}
	}

	.ql-editor { 
		min-height: 200px;
		max-height: 400px;
	}

	.el-form-item__label { 
		//float: none;
	}

	.fullscreenBtn { 
		position: absolute;
	    top: 15px;
	    right: 40px;
	    padding: 0;
	    background: 0 0;
	    border: none;
	    outline: 0;
	    cursor: pointer;
	    font-size: 16px;
	    color: #878d99;
	    .fa { 
	    	&:hover { 
				color: #409eff;
	    	}
	    }
	}
</style>