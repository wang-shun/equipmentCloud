<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="btn_right">
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-circle-plus-outline" @click="handleCreate">添加</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-edit" @click="edit()">编辑</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="danger" v-waves icon="el-icon-delete" @click.prevent="delData()">删除</el-button>
      </div>
    </div>

    <el-table :key='tableKey' :data="companyDatas" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;" @selection-change='selectRow' ref="moviesTable" v-if='hasshow' height="705px">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column width="150px" align="center" label="上级公司">
        <template slot-scope="scope">
          <span>{{scope.row.pId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="190px" align="center" label="公司名称">
        <template slot-scope="scope">
          <span class="link-type" @click="handleInfo(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-else><p style='width:100%;text-align:center;line-height:50px;color:gray;'>您无权限查看</p></div>

    <!-- 添加的弹出窗部分 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="480px">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="120px" style='margin-left:15px;' :disabled="setDisabled">
        <el-form-item label="公司名称" required prop="name">
          <el-input v-model="temp.name" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="上级公司" required prop="pId" >
          <el-select class="filter-item" v-model="temp.pId" style="width:250px" v-on:change="getCompanyList($event)">
            <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="temp.remark" style="width:250px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addCompany">确定</el-button>
        <el-button v-else type="primary" @click="updateCompany">确定</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        @size-change= "handleSizeChange"
        @current-change= "handleCurrentChange"
        :current-page= "currentPage"
        :page-sizes= "[15, 30, 45, 60, 75, 100]"
        :page-size= "pageSize"
        layout= "total, sizes, prev, pager, next, jumper"
        :total= 'total'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchPv } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { require_get, require_post, require_put, require_delete } from '@/assets/pubJS'
// import Cookies from 'js-cookie'
const token = sessionStorage.getItem('token')

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      hasshow: true,
      currentPage: 1,
      pageSize: 15,
      isUpdate: true, // 是编辑，显示操作按钮；是详细，隐藏
      setDisabled: false, // 设置表单不可编辑
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      companyDatas: [{
        id: '',
        name: '',
        pcode: '',
        remark: ''
      }],
      statusOptions: [],
      temp: {
        name: '',
        pcode: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑公司',
        create: '新添公司',
        info: '公司详细'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        name: [{ required: true, message: '请输入公司名称', trigger: 'change' }],
        pId: [{ required: true, message: '请选择上级公司', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  mounted() {
  },
  filters: {
  },
  created() {
    this.getList(this.currentPage, this.pageSize)
    this.getCompanyList()
  },
  methods: {
    // 获取当前用户列表
    getList(page, size) {
      this.listLoading = true
      this.listLoading = true
      const _this = this
      const params = {
        page: page,
        size: size,
        jsonString: { typeId: 1 }
      }
      require_get('/v1/orgs', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        if (res.data.status === 200) {
          _this.total = res.data.data.total
          _this.companyDatas = res.data.data.list
        } else {
          _this.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error',
            duration: 2000
          })
          _this.hasshow = false
        }
      }, function(err) {
        this.$notify({
          title: '错误',
          message: err,
          type: 'error',
          duration: 2000
        })
      })
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    },
    selectRow(val) {
      this.selectlistRow = val
    },
    handleFilter() {
      this.getList(this.currentPage, this.pageSize)
    },
    // 每页多少条
    handleSizeChange(val) {
      this.getList(this.currentPage, val)
    },
    // 当前页多少行
    handleCurrentChange(val) {
      this.getList(val, this.pageSize)
    },
    handleCreate() { // 添加弹窗
      this.isUpdate = true
      this.setDisabled = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      setTimeout(() => {
        this.$refs['dataForm'].resetFields()
        this.temp.remark = ''
        this.temp.pId = ''
      }, 300)
    },
    handleUpdate(row) { // 编辑弹窗
      this.isUpdate = true
      this.setDisabled = false
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 点击此按钮进行编辑
    edit() {
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          this.handleUpdate()
          this.getCompanyDetail(this.selectlistRow[0].id)
        } else {
          this.$notify({
            title: '系统提示',
            message: '请选择一条数据进行编辑！',
            type: 'warning',
            duration: 2000
          })
        }
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行编辑！',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 弹出详细弹窗方法
    handleInfo(row) {
      this.isUpdate = false
      this.setDisabled = true
      this.dialogStatus = 'info'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.getCompanyDetail(row.id)
    },
    // 查询详情方法
    getCompanyDetail(id) {
      this.dialogFormVisible = true
      const _this = this
      require_get('/v1/orgs/' + id, {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        _this.temp = res.data.data
      })
    },
    // 添加上级公司下拉选
    getCompanyList(event) {
      const _this = this
      const that = _this
      require_get('/v1/orgs/findList', {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        that.statusOptions = res.data.data
      })
    },
    // 添加公司
    addCompany() {
      const _this = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          require_post('/v1/orgs/', {
            token: token,
            authorityCode: 1
          }, {
            name: _this.temp.name,
            pId: _this.temp.pId
          }, function(res) {
            _this.dialogFormVisible = false
            _this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            _this.getList(_this.currentPage, _this.pageSize)
          })
        }
      })
    },
    // 更新公司
    updateCompany() {
      const _this = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const params = {
            id: _this.selectlistRow[0].id,
            name: _this.temp.name,
            pId: _this.selectlistRow[0].pId
          }
          require_put('/v1/orgs', {
            token: token,
            authorityCode: 1
          }, params, function(res) {
            if (res.data.status === 200) {
              _this.dialogFormVisible = false
              _this.getList(_this.currentPage, _this.pageSize)
              _this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            } else {
              _this.$notify({
                title: '成功',
                message: '更新失败',
                type: 'warning',
                duration: 2000
              })
            }
          }, function(err) {
            console.log(err)
            _this.$notify({
              title: '系统提示',
              message: '请求错误',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.companyDatas.indexOf(row)
      this.companyDatas.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    delData() { // 勾选一条或多条数据删除
      const _this = this
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          const length = this.selectlistRow.length
          for (let i = 0; i < length; i++) {
            this.$confirm('确认要删除么?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const val = this.selectlistRow
              // 获取选中行的索引的方法
              // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
              // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
              val.forEach((val, index) => {
                this.companyDatas.forEach((v, i) => {
                  if (val.id === v.id) {
                    // i 为选中的索引
                    require_delete('/v1/orgs/' + v.id, {
                      token: token,
                      authorityCode: 1
                    }, { }, function(res) {
                      this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 3000
                      })
                      _this.getList(_this.currentPage, _this.pageSize)
                    }, function(err) {
                      _this.$notify({
                        title: '错误',
                        message: err,
                        type: 'error',
                        duration: 3000
                      })
                    })
                  // 删除完数据之后清除勾选框
                  // this.$refs.companyDatas.clearSelection()
                  }
                })
              })
              // break
            }).catch(() => {
              this.$notify({
                title: '系统提示',
                message: '取消删除',
                type: 'info',
                duration: 3000
              })
            })
          }
        } else {
          this.$notify({
            title: '系统提示',
            message: '请选择一条数据进行删除！',
            type: 'warning',
            duration: 3000
          })
        }
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行删除！',
          type: 'warning',
          duration: 3000
        })
      }
    }
  }
}
</script>

<style>
  .btn_right{
    float: right;
  }
  .block {
    margin-top: 15px;
  }
</style>
