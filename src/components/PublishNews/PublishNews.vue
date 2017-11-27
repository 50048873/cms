<template>
	<div class="publishNews">
		<div class="searchBox">
			<el-input v-model="listData.title" placeholder="请输入标题查询" size="small"></el-input>
			<el-button type="primary" @click="search" size="small">查询</el-button>
			<el-button type="primary" @click="add" class="fr" size="small">新增</el-button>
		</div>
		
		<el-table
				border
				size="small"
				:data="tableData">
			<el-table-column
				type="index"
				label="序号"
				width="64">
			</el-table-column>
			<el-table-column
				width="400px"
				prop="title"
				label="标题">
			</el-table-column>
			<el-table-column
				width="200px"
				prop="author"
				label="作者">
			</el-table-column>
			<el-table-column
				width="150px"
				prop="createTime"
				label="创建时间"
				:formatter="formateTime">
			</el-table-column>
			<el-table-column
				width="150px"
				prop="updateTime"
				label="更新时间">
			</el-table-column>
			<el-table-column
				prop="content"
				label="内容">
			</el-table-column>
			<el-table-column label="操作" width="150px">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          type="primary"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

		<add-dialog :visible="visible" @update:visible="close"></add-dialog>
	</div>
</template>

<script>
	import $ from 'jquery'
	import * as config from '@/config/config.js'
	import AddDialog from '@/components/AddDialog/AddDialog'
	export default {
		name: 'publishNews',
		components: { 
			AddDialog
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
                pageSizeSelection: [5,10,20,40],
                pageSize: 10, // 每页大小
                total: 1, // 总记录条数

                visible: false
            }
        },
        filters: { 
        	formateTime (row, column, cellValue) { 
            	console.log(cellValue);
            }
        },
        methods: {
            // 查询
            search () {
                this.getTableData();
            },
            // 新增按钮
            add () {
                this.visible = true
            },
            close (val) { 
            	this.visible = false
            },
            // 编辑按钮
            handleEdit (index, row) {
                this.openDialog(1, row.pid);
            },
            // 删除按钮
            handleDelete (index, row) {
                
            },
            
            // 表格数据
            getTableData () {
                $.ajax({
                    type: 'GET',
                    url: config.HOST + '/notice/getList.do',
                    data: this.listData
                }).then((res) => { 
                	console.log(res)
                	var content = res.content;
                	if (content.length) { 
                		this.tableData = res.content
                	}
                });
            },
            // 分页
            handleSizeChange(val) {
                this.pageSize = val;
                this.getTableData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
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
</style>
