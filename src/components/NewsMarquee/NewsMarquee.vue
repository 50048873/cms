<template>
	<div class="publishNews">
		<div class="searchBox">
			<el-input v-model="listData.title" placeholder="请输入标题查询" size="small"></el-input>
			<el-input v-model="listData.content" placeholder="请输入内容查询" size="small"></el-input>
			<el-button type="info" @click="search" size="small">查询</el-button>
			<el-button type="primary" @click="add" class="fr" size="small">新增</el-button>
		</div>
		
		<el-table border size="small" :data="tableData">
			<el-table-column
				type="index"
				label="序号"
				width="64">
			</el-table-column>
			<el-table-column
				width="200px"
				prop="msgTitle"
				label="标题">
			</el-table-column>
			<el-table-column
				prop="msgContent"
				label="内容">
			</el-table-column>
			<el-table-column
				width="200px"
				prop="startTime"
				label="开始时间">
			</el-table-column>
			<el-table-column
				width="200px"
				prop="endTime"
				label="结束时间">
			</el-table-column>
			<el-table-column label="操作" width="150px">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          type="primary"
		          plain
		          @click="edit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          plain
		          @click="del(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>

		<div style="margin-top: 10px;">
			<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="pageSizeSelection"
					:page-size="pageSize"
					layout="sizes, prev, pager, next, jumper, total"
					:total="total">
			</el-pagination>
		</div>

		<news-marquee-dialog ref="newsMarqueeDialog" :form="form" :title="title" @saveSuccess="saveSuccess"></news-marquee-dialog>
	</div>
</template>

<script>
	import $ from 'jquery'
	import * as config from '@/api/config'
	import NewsMarqueeDialog from '@/components/NewsMarqueeDialog/NewsMarqueeDialog'
	import {expired} from '@/assets/js/tool'
	export default {
		name: 'publishNews',
		components: { 
			NewsMarqueeDialog
		},
		data () {
            return {
                // 关键字
                listData: { 
                	title: '',
                	content: '',
                	page: '0',
                	size: '10'
                },
                

                //表格
                tableData: [],

                // 分页
                currentPage: 1, // 当前页
                pageSizeSelection: [10, 15, 30, 50],
                pageSize: 10, // 每页大小
                total: 0, // 总记录条数

                form: { 
					id: '',
					msgTitle: '',
					msgContent: '',
					startTime: '',
					endTime: ''
				},
                title: ''
            }
        },
        methods: {
        	formatTime (row, column, cellValue) { 
        		if (cellValue && typeof cellValue === 'number') { 
	            	const date = new Date(cellValue)
	            	const year = date.getFullYear()
	            	const month = date.getMonth() + 1
	            	const day = date.getDate()
	            	return `${year}-${month}-${day}`
            	}
            	return ''
            },
            // 查询
            search () {
                this.getTableData()
            },
            saveSuccess () { 
            	this.$refs.newsMarqueeDialog.hide()
            	this.getTableData()
            },
            // 新增按钮
            add () {
            	this.title = '新增'
            	this.form = {
                	id: '',
					msgTitle: '',
					msgContent: '',
					startTime: '',
					endTime: ''
                }
                this.$refs.newsMarqueeDialog.show()
                this.$refs.newsMarqueeDialog.resetForm()
            },
            // 编辑按钮
            edit (index, row) {
                this.title = '编辑'
                this.form = {
                	id: row.id,
                	msgTitle: row.msgTitle,
                	msgContent: row.msgContent,
                	startTime: row.startTime,
                	endTime: row.endTime
                }
                this.$refs.newsMarqueeDialog.show()
            },
            // 删除按钮
            del (index, row) {
            	const title = row.msgTitle
            	const id = {id: row.id}
            	this.$confirm(`删除不可撤销！您确定要删除 ${title} 吗？`, '删除确认对话框', { 
            		conformButtonText: '确认',
            		cancelButtonText: '取消',
            		callback: txt => { 
            			if (txt === 'confirm') { 
            				$.ajax({
			                    type: 'POST',
			                    url: config.HOST + '/message/delete.do',
			                    data: id
			                }).then((res) => { 
			                	if (res.status === config.status) { 
			                		this.$message({
							          message: '删除成功！',
							          type: 'success'
							        });
							        this.getTableData()
			                	} else { 
			                		this.$message({
							          message: '删除失败！',
							          type: 'error'
							        });
			                	}
			                });
            			}
            		}
            	})
            },
            
            // 表格数据
            getTableData () {
                $.ajax({
                    type: 'GET',
                    url: config.HOST + '/message/getMsgList',
                    data: this.listData
                }).then((res) => { 
                	// 登录过期
                	if (typeof res === 'string' && res.search('<!DOCTYPE html>') === 0) { 
						this.$alert(`登录过期，请重新登录！`, '提示', { 
				    		conformButtonText: '确认',
				    		callback: txt => { 
				    			this.$router.push('/admin/login')
				    		}
				    	})
					}

                	const content = res.content;
                	if (content.length) { 
                		this.tableData = res.content
                		this.total = res.totalElements
                	}
                });
            },
            // 分页
            handleSizeChange(val) {
                this.listData.size = val;
                this.getTableData();
            },
            handleCurrentChange(val) {
                this.listData.page = val - 1;
                this.getTableData();
            }
        },
        created () {
            // 加载表格数据
            this.getTableData()
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
	.m-l-15 { 
		margin-left: 15px;
	}
	.fr { 
		float: right;
	}
	.publishNews { 
		position: absolute;
	    top: 60px;
	    right: 0;
	    bottom: 0;
	    left: 150px;
	    padding: 15px;
	    overflow: auto;
	}
	.searchBox { 
		.el-input { 
			width: auto;
			.el-input__inner { 
				width: auto;
				min-width: 300px;
			}
		}
		margin-bottom: 15px;
	}
	.el-table .cell {
	    white-space: nowrap;
	}
	.el-pagination {
	    padding-left: 0;
	    .el-select .el-input {
		    margin-left: 0;
		}
	}
</style>
