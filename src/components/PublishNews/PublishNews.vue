<template>
	<div class="publishNews">
		<div class="searchBox">
			<el-row>
			  <el-col :span="6">
					<el-input v-model="keywords" placeholder="山塘名称、行政负责人、技术负责人姓名"></el-input>
			  </el-col>
			  <el-col :span="6">
					<el-button type="primary" @click="search" class="m-l-15">查询</el-button>
			  </el-col>
			  <el-col :span="6" :offset="6">
					<el-button type="primary" icon="plus" @click="showAddDialog" class="fr">新增</el-button>
			  </el-col>
			</el-row>
		</div>

		<el-table
				border
				:data="tableData">
			<el-table-column
					type="index"
					label="序号"
					width="64">
			</el-table-column>
			<el-table-column
					prop="ennm"
					label="山塘名称">
				<template scope="scope">
					<a href="" class="sk-name" @click.prevent="handleDetail(scope)">{{ scope.row.ennm }}</a>
				</template>
			</el-table-column>
			<el-table-column
					prop="cgyh"
					label="是否有隐患">
				<template scope="scope">
					{{scope.row.cgyh ? '是' : '否'}}
				</template>
			</el-table-column>
			<el-table-column
					prop="szgz"
					label="是否私自改造">
				<template scope="scope">
					{{scope.row.szgz ? '是' : '否'}}
				</template>
			</el-table-column>
			<el-table-column
					prop="yt"
					label="用途">
				<template scope="scope">
					{{getYTname(scope.row.yt)}}
				</template>
			</el-table-column>
			<el-table-column
					prop="zdzyya"
					label="制定是否转移预案">
				<template scope="scope">
					{{scope.row.zdzyya ? '是' : '否'}}
				</template>
			</el-table-column>
			<el-table-column
					prop="realzkr"
					label="实际库容（万m3）"
					class="lfm">
			</el-table-column>
			<el-table-column
					label="操作"
					width="150">
				<template scope="scope">
					<a @click.stop="handleEdit(scope.$index, scope.row, $event)">编辑</a>
					<a @click.stop="handleDelete(scope.$index, scope.row)">删除</a>
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
	</div>
</template>

<script>
	import $ from 'jquery'
	import * as config from '@/config/config.js'
	export default {
		name: 'publishNews',
		data () {
            return {
                // 关键字
                keywords: '',

                //表格
                tableData: [],

                // 分页
                currentPage: 1, // 当前页
                pageSizeSelection: [5,10,20,40],
                pageSize: 10, // 每页大小
                total: 1, // 总记录条数
            }
        },
        methods: {
            // 查询
            search () {
                this.getTableData();
            },
            handleChange () {
                this.getTableData();
            },
            // 新增按钮
            showAddDialog () {
                this.openDialog(0);
            },
            // 编辑按钮
            handleEdit (index, row) {
                this.openDialog(1, row.pid);
            },
            // 删除按钮
            handleDelete (index, row) {
                var _this = this;
                var title = row.gcmc || '';
                top.layer.open({
                    title: '提示',
                    content: '确定删除<b class="ennm">' + title + '</b>水库？删除后不可撤销。',
                    area: '400px',
                    skin: 'layer-closeBtn',
                    shade: 0.3,
                    btn: ['确定', '取消'],
                    yes(index, layero){
                        $.ajax({
                            type: 'POST',
                            url: config.HOST + '/cmPoolInfoCtrl/delete.do',
                            contentType: 'application/json',
                            data: JSON.stringify([{pid: row.pid}]),
                            success (data, textStatus, jqXHR) {
                                if (data.status) {
                                    layer.msg('删除成功');
                                } else {
                                    layer.msg('删除失败');
                                }
                                top.layer.close(index);
                                _this.search();
                            },
                            error (XMLHttpRequest, textStatus, errorThrown) {
                                console.log(arguments);
                            }
                        });
                    },
                    btn2(index, layero){
                        top.layer.close(index);
                    }
                });
            },
            // 表格数据
            getTableData () {
                var _this = this;
                var datas = {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                    keywords: this.keywords,
                    gltz: this.gltz,
                    cgyh: this.cgyh,
                    szgz: this.szgz,
                    yt: this.yt
                };

                $.ajax({
                    type: 'POST',
                    url: config.HOST + '/cmPoolInfoCtrl/list.do',
                    contentType: 'application/json',
                    data: JSON.stringify(datas),
                    success (data, textStatus, jqXHR) {
                        //console.log(JSON.stringify(data,null,2));
                        if (data.status && data.data) {
                            _this.total = data.data.total;

                            _this.tableData = _this.formatDate(data.data.rows);
                        }
                    },
                    error (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(arguments);
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
		margin-left: 150px;
		padding: 15px;
	}
	.searchBox { 
		margin-bottom: 15px;
	}
</style>
