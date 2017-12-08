<template>
	<div class="publishNews">
		<div class="searchBox">
			<el-input v-model="listData.title" placeholder="请输入标题查询" size="small"></el-input>
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
				 width="300px"
				prop="title"
				label="标题">
			</el-table-column>
			<el-table-column
				width="150px"
				prop="author"
				label="作者">
			</el-table-column>
			<el-table-column
				width="100px"
				prop="createTime"
				label="创建时间"
				:formatter="formatTime">
			</el-table-column>
			<el-table-column
				width="100px"
				prop="updateTime"
				label="更新时间"
				:formatter="formatTime">
			</el-table-column>
			<el-table-column
				prop="content"
				label="内容">
			</el-table-column>
			<el-table-column
				width="100px"
				prop="isPub"
				label="是否发布">
				<template slot-scope="scope">
		      	<span v-if="scope.row.isPub">已发布</span>
		      	<span v-else>未发布</span>
		      </template>
			</el-table-column>
			<el-table-column label="操作" width="230px">
		      <template slot-scope="scope">
		      	<span v-if="!scope.row.isPub">
			      	<el-button
			          size="mini"
			          type="info"
			          plain
			          @click="publish(scope.$index, scope.row)">发布</el-button>
			        <el-button
			          size="mini"
			          type="primary"
			          plain
			          @click="edit(scope.$index, scope.row)">编辑</el-button>
		        </span>
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

		<notice-dialog :title="title" :visible="visible" @update:visible="close" :form="form" ref="noticeDialog" @saveSuccess="saveSuccess"></notice-dialog>
	</div>
</template>

<script>
	import $ from 'jquery'
	import * as config from '@/api/config'
	import NoticeDialog from '@/components/NoticeDialog/NoticeDialog'
	export default {
		name: 'publishNews',
		components: { 
			NoticeDialog
		},
		data () {
            return {
                // 关键字
                listData: { 
                	title: '',
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

                visible: false,
                title: '',
                form: {}
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
            	this.visible = false
            	this.getTableData()
            },
            close (val) { 
            	this.visible = false
            },
            // 新增按钮
            add () {
                this.visible = true
                this.title = '新增'
                this.$refs.noticeDialog.resetForm()
            },
            publish (index, row) {
            	const title = row.title
            	const id = {id: row.id}
                this.$confirm(`确定要发布 ${title} 吗？`, '发布确定对话框', { 
            		conformButtonText: '确认',
            		cancelButtonText: '取消',
            		callback: txt => { 
            			if (txt === 'confirm') { 
            				$.ajax({
			                    type: 'POST',
			                    url: config.HOST + '/notice/publishNotice.do',
			                    data: id
			                }).then((res) => { 
			                	if (res.status === config.status) { 
			                		this.$message({
							          message: res.msg,
							          type: 'success'
							        });
							        this.getTableData();
			                	} else { 
			                		this.$message({
							          message: res.msg,
							          type: 'error'
							        });
			                	}
			                });
            			}
            		}
            	})
            },
            // 编辑按钮
            edit (index, row) {
                this.visible = true
                this.title = '编辑'
                this.form = {
                	id: row.id,
                	title: row.title,
                	author: row.author,
                	content: row.content
                }
            },
            // 删除按钮
            del (index, row) {
            	const title = row.title
            	const id = {id: row.id}
            	this.$confirm(`删除不可撤销！您确定要删除 ${title} 吗？`, '删除确认对话框', { 
            		conformButtonText: '确认',
            		cancelButtonText: '取消',
            		callback: txt => { 
            			if (txt === 'confirm') { 
            				$.ajax({
			                    type: 'POST',
			                    url: config.HOST + '/notice/delete.do',
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
                    url: config.HOST + '/notice/getList.do',
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
	    .el-table .cell {
		    white-space: nowrap;
		}
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
	.el-pagination {
	    padding-left: 0;
	    .el-select .el-input {
		    margin-left: 0;
		}
	}
</style>
