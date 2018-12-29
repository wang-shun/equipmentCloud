<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="search" style="width: 140px;" class="filter-item" placeholder="编码" v-model="listQuery.code"></el-input>
      <el-input @keyup.enter.native="search" style="width: 140px;" class="filter-item" placeholder="名称"  v-model="listQuery.name"></el-input>
      <el-button class="filter-item" type="primary" size="small" v-waves icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="filter-item" size="small" v-waves icon="el-icon-refresh" @click="reset">重置</el-button>
      <el-button class="filter-item btn_right" size="small" style="margin-left: 10px;" type="danger" v-waves icon="el-icon-delete" @click.prevent="delSpModal()">删除</el-button>
      <el-button class="filter-item btn_right" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-edit" @click="edit()">编辑</el-button>
      <el-button class="filter-item btn_right" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-circle-plus-outline" @click="handleCreate">添加</el-button>
    </div>

    <el-table :key='tableKey' :data="specificationModelTable" v-loading="listLoading" :height="tableHeight" border fit highlight-current-row style="width: 100%;" @selection-change='selectRow' ref="moviesTable">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column width="180px" align="center" :label="'编号'" >
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="'规格型号名称'">
        <template slot-scope="scope">
          <span class="link-type" align="center" @click="handleInfo(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="'设备大类'">
        <template slot-scope="scope">
          <span>{{scope.row.sbtypeOneName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="'设备中类'">
        <template slot-scope="scope">
          <span>{{scope.row.sbtypeTwoName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="'设备小类'">
        <template slot-scope="scope">
          <span>{{scope.row.sbtypeThreeName}}</span>
        </template>
      </el-table-column>
    </el-table>

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

    <!-- 添加的弹出窗部分 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="480px">
      <el-form :rules="rules" status-icon ref="dataForm" :model="temp" label-position="right" label-width="120px" style='margin-left: 25px;' :disabled="setDisabled">
        <el-form-item label="编号" v-if="codeShowYN">
          <span>{{temp.code}}</span>
        </el-form-item>
        <el-form-item label="规格型号名称" required prop="name">
          <el-input class="filter-item" v-model="temp.name" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item :label="'设备大类'" required prop="sbtypeOne">
          <el-select class="filter-item" v-model="temp.sbtypeOne" v-on:change="getEqMiddleTypeList($event)" style="width:250px">
            <el-option v-for="item in sbtypeOneList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'设备中类'" required prop="sbtypeTwo">
          <el-select class="filter-item" v-model="temp.sbtypeTwo" v-on:change="getEqSmallTypeList($event)" style="width:250px">
            <el-option v-for="item in sbtypeTwoList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'设备小类'" prop="sbtypeThree">
          <el-select class="filter-item" v-model="temp.sbtypeThree" style="width:250px">
            <el-option v-for="item in sbtypeThreeList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addSpModel">确定</el-button>
        <el-button v-else type="primary" @click="updateSpModal">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import waves from '@/directive/waves' // 水波纹指令
import { require_get, require_post, require_put, require_delete } from '@/assets/pubJS'
import Cookies from 'js-cookie'
const token = Cookies.get('token')

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      tableHeight: document.body.clientHeight - 240,
      codeShowYN: false, // 编号是否显示
      isUpdate: true, // 是编辑，显示操作按钮；是详细，隐藏
      setDisabled: false,
      tableKey: 0,
      list: null,
      total: null,
      currentPage: 1,
      pageSize: 15,
      listLoading: true,
      listQuery: {
        code: '',
        name: ''
      },
      specificationModelTable: [], // 表格数据集
      sbtypeOneList: [], // 大类
      sbtypeTwoList: [], // 中类
      sbtypeThreeList: [], // 小类
      temp: {
        id: '',
        code: '',
        name: '',
        sbtypeOne: '',
        sbtypeTwo: '',
        sbtypeThree: '',
        sbtypeOneName: '',
        sbtypeTwoName: '',
        sbtypeThreeName: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false,
      textMap: {
        update: '编辑设备规格型号',
        create: '添加设备规格型号',
        info: '设备规格型号详细'
      },
      rules: { // 校验
        name: [{ required: true, message: '请输入规格型号名称', trigger: 'blur' }],
        sbtypeOne: [{ required: true, message: '请选择设备大类', trigger: 'change' }],
        sbtypeTwo: [{ required: true, message: '请选择设备中类', trigger: 'change' }]
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false
    }
  },
  filters: {
  },
  created() {
    this.getList(this.currentPage, this.pageSize)
    this.getEqBigTypeList(1, '')
  },
  methods: {
    // 搜索调用的方法
    search() {
      this.getList(this.currentPage, this.pageSize)
    },
    // 重置调用的方法
    reset() {
      this.listQuery.code = ''
      this.listQuery.name = ''
      this.getList(this.currentPage, this.pageSize)
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val
    },
    handleCreate() { // 添加弹窗
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.codeShowYN = false
      this.isUpdate = true
      this.setDisabled = false
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      setTimeout(() => {
        this.$refs['dataForm'].resetFields()
        this.temp.sbtypeTwoName = ''
        this.temp.sbtypeThreeName = ''
      }, 300)
    },
    edit() { // 弹出编辑弹窗方法
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          this.getEqMiddleTypeList(this.selectlistRow[0].sbtypeOne)
          this.getEqSmallTypeList(this.selectlistRow[0].sbtypeTwo)
          this.getSpModalInfo(this.selectlistRow[0].id)
          this.dialogStatus = 'update'
          this.codeShowYN = true
          this.isUpdate = true
          this.setDisabled = false
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
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
    handleInfo(row) { // 弹出详细弹窗方法
      this.dialogStatus = 'info'
      this.dialogFormVisible = true
      this.codeShowYN = true
      this.isUpdate = false
      this.setDisabled = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.getEqMiddleTypeList(row.sbtypeOne)
      this.getEqSmallTypeList(row.sbtypeTwo)
      this.getSpModalInfo(row.id)
    },
    getList(page, size) { // 规格型号列表
      this.listLoading = true
      const _this = this
      const that = _this
      const params = {
        code: this.listQuery.code,
        name: this.listQuery.name,
        pageNum: page,
        pageSize: size
      }
      require_get('/v1/sbmodel/list', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        _this.listLoading = false
        var data = []
        if (res.data.meta.code === '200') {
          _this.total = res.data.data.total

          var result = res.data.data.list
          for (let i = 0; i < result.length; i++) {
            var obj = {}
            obj.id = result[i].id
            obj.code = result[i].code
            obj.name = result[i].name
            obj.sbtypeOne = result[i].sbtypeOne
            obj.sbtypeTwo = result[i].sbtypeTwo
            obj.sbtypeThree = result[i].sbtypeThree
            obj.sbtypeOneName = result[i].sbtypeOneName
            obj.sbtypeTwoName = result[i].sbtypeTwoName
            obj.sbtypeThreeName = result[i].sbtypeThreeName
            data[i] = obj
          }
          _this.specificationModelTable = data
        } else {
          that.$notify({
            title: '错误',
            message: res.data.meta.message,
            type: 'warning',
            duration: 2000
          })
        }
      }, function(err) {
        _this.listLoading = false
        Vue.use(err)
        _this.$notify({
          title: '错误',
          message: '请求失败',
          type: 'error',
          duration: 3000
        })
      })
    },
    getEqBigTypeList(levelValue, pCode) { // 设备大类
      const _this = this
      const that = _this
      const params = {
        level: levelValue,
        p_code: pCode
      }
      require_get('/v1/sbtype/listByPcodeOrLevel', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        _this.listLoading = false
        var data = []
        if (res.data.meta.code === '200') {
          var result = res.data.data
          for (let i = 0; i < result.length; i++) {
            var obj = {}
            obj.code = result[i].code
            obj.name = result[i].name
            data[i] = obj
          }
          if (levelValue === 1) {
            _this.sbtypeOneList = data
          } else if (levelValue === 2) {
            _this.sbtypeTwoList = data
          } else {
            _this.sbtypeThreeList = data
          }
        } else {
          that.$notify({
            title: '错误',
            message: res.data.meta.message,
            type: 'warning',
            duration: 2000
          })
        }
      }, function(err) {
        _this.listLoading = false
        Vue.use(err)
        _this.$notify({
          title: '错误',
          message: '请求失败',
          type: 'error',
          duration: 3000
        })
      })
    },
    getEqMiddleTypeList(event) { // 设备中类
      var selectBigCode = event
      this.getEqBigTypeList(2, selectBigCode)
    },
    getEqSmallTypeList(event) { // 设备小类
      var selectMiddleCode = event
      this.getEqBigTypeList(3, selectMiddleCode)
    },
    addSpModel() { // 添加规格型号
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const _this = this
          require_post('/v1/sbmodel/create', {
            token: token,
            authorityCode: 1
          }, this.temp, function(res) {
            if (res.data.meta.code === '200') {
              _this.dialogFormVisible = false
              _this.getList(_this.currentPage, _this.pageSize)
              _this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 3000
              })
            } else {
              _this.$notify({
                title: '失败',
                message: '创建失败',
                type: 'error',
                duration: 3000
              })
            }
          }, function(err) {
            _this.listLoading = false
            Vue.use(err)
            _this.$notify({
              title: '错误',
              message: '请求失败',
              type: 'error',
              duration: 3000
            })
          })
        }
      })
    },
    getSpModalInfo(id) { // 获取规格型号详细
      const _this = this
      // 获取规格型号详细
      require_get('/v1/sbmodel/find/' + id, {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.meta.code === '200') {
          const result = res.data.data
          _this.temp.id = result.id
          _this.temp.code = result.code
          _this.temp.name = result.name
          _this.temp.sbtypeOne = result.sbtypeOne
          _this.temp.sbtypeTwo = result.sbtypeTwo
          _this.temp.sbtypeThree = result.sbtypeThree
          _this.temp.sbtypeOneName = result.sbtypeOneName
          _this.temp.sbtypeTwoName = result.sbtypeTwoName
          _this.temp.sbtypeThreeName = result.sbtypeThreeName
        } else {
          _this.$notify({
            title: '错误',
            message: '请求失败',
            type: 'error',
            duration: 3000
          })
        }
      }, function(err) {
        _this.listLoading = false
        Vue.use(err)
        _this.$notify({
          title: '错误',
          message: '请求失败',
          type: 'error',
          duration: 3000
        })
      })
    },
    updateSpModal() { // 编辑规格型号
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const _this = this
          require_put('/v1/sbmodel/update', {
            token: token,
            authorityCode: 1
          }, this.temp, function(res) {
            if (res.data.meta.code === '200') {
              _this.dialogFormVisible = false
              _this.getList(_this.currentPage, _this.pageSize)
              _this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 3000
              })
            } else {
              _this.$notify({
                title: '失败',
                message: '更新失败',
                type: 'error',
                duration: 3000
              })
            }
          }, function(err) {
            _this.listLoading = false
            Vue.use(err)
            _this.$notify({
              title: '错误',
              message: '请求失败',
              type: 'error',
              duration: 3000
            })
          })
        }
      })
    },
    delSpModal() { // 勾选一条或多条数据删除
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          this.$confirm('确认要删除么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const _this = this
            require_delete('/v1/sbmodel/delete/' + this.selectlistRow[0].id, {
              token: token,
              authorityCode: 1
            }, {}, function(res) {
              if (res.data.meta.code === '200') {
                _this.dialogFormVisible = false
                _this.getList(_this.currentPage, _this.pageSize)
                _this.$notify({
                  title: '成功',
                  message: '删除成功！',
                  type: 'success',
                  duration: 3000
                })
              } else {
                _this.$notify({
                  title: '错误',
                  message: res.data.meta.message,
                  type: 'error',
                  duration: 3000
                })
              }
            }, function(err) {
              _this.listLoading = false
              Vue.use(err)
              _this.$notify({
                title: '错误',
                message: '请求失败',
                type: 'error',
                duration: 3000
              })
            })
          }).catch(() => {
            this.$notify({
              title: '系统提示',
              message: '已取消删除',
              type: 'info',
              duration: 2000
            })
          })
        } else {
          this.$notify({
            title: '系统提示',
            message: '请选择一条数据进行删除操作！',
            type: 'warning',
            duration: 2000
          })
        }
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行删除操作！',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 每页多少条
    handleSizeChange(val) {
      this.getList(this.currentPage, val)
    },
    // 当前页多少条
    handleCurrentChange(val) {
      this.getList(val, this.pageSize)
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
