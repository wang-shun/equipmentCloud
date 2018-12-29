<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="btn_right" v-for='item in authorityCodebutton' :key='item.a'>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-circle-plus-outline" v-if="item.name === '添加'" @click="handleCreate">{{item.name}}</el-button><!--  @click="submit()"  @click="examine()" -->
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-edit" v-if="item.name === '编辑'" @click="edit()">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="danger" v-waves icon="el-icon-delete" v-if="item.name === '删除'" @click="delData()">{{item.name}}</el-button>
      </div>
    </div>

    <!--设备申请列表-->
    <el-table :key='tableKey' :data="chargingParamsData" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;max-height:740px;" @selection-change='selectRow' ref="moviesTable" :height="tableHeight">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column width="100px" align="center" label="年份" >
        <template slot-scope="scope">
          <span class="link-type" @click="handleInfo(scope.row)">{{scope.row.year}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="一类设备增值税率">
        <template slot-scope="scope">
          <span>{{scope.row.oneIncreRate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="170px" align="center" label="一类设备融资租赁利率">
        <template slot-scope="scope">
          <span>{{scope.row.oneElRate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="一类设备修理费率">
        <template slot-scope="scope">
          <span>{{scope.row.oneRepairRate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="一类设备管理费率">
        <template slot-scope="scope">
          <span>{{scope.row.oneManageRate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="一类设备使用系数">
        <template slot-scope="scope">
          <span>{{scope.row.oneUseRate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="二类设备修理费率">
        <template slot-scope="scope">
          <span>{{scope.row.twoRepairRate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="二类设备管理费率">
        <template slot-scope="scope">
          <span>{{scope.row.twoManageRate}}</span>
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

    <!-- 添加计费参数弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="800px">
      <el-form :rules="rules" status-icon ref="dataForm" :model="temp" label-position="right" label-width="170px" :disabled="setDisabled">
        <el-row>
          <el-col :span="12">
            <el-form-item label="年份" required prop="year">
              <el-date-picker v-model="temp.year" type="year" value-format="yyyy" format="yyyy" placeholder="选择年" style="width:210px" :picker-options="afterCurrentYear" :disabled="unEdit"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="一类设备增值税率" required prop="oneIncreRate">
              <el-input class="filter-item" v-model="temp.oneIncreRate" style="width:210px" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="一类设备融资租赁利率" required prop="oneElRate">
              <el-input class="filter-item" v-model="temp.oneElRate" style="width:210px" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="一类设备修理费率" required prop="oneRepairRate">
              <el-input class="filter-item" v-model="temp.oneRepairRate" style="width:210px" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="一类设备管理费率" required prop="oneManageRate">
              <el-input class="filter-item" v-model="temp.oneManageRate" style="width:210px" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="一类设备使用系数" required prop="oneUseRate">
              <el-input class="filter-item" v-model="temp.oneUseRate" style="width:210px" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="二类设备修理费率" required prop="twoRepairRate">
              <el-input class="filter-item" v-model="temp.twoRepairRate" style="width:210px" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="二类设备管理费率" required prop="twoManageRate">
              <el-input class="filter-item" v-model="temp.twoManageRate" style="width:210px" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addChargingParams" :loading='istianjia'>确定</el-button>
        <el-button v-else type="primary" @click="updateChargingParams">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import waves from '@/directive/waves' // 水波纹指令
import { require_get, require_post, require_put, require_delete, controllbutton } from '@/assets/pubJS'
import Cookies from 'js-cookie'
const token = Cookies.get('token')

export default {
  name: 'eqApplication_ty',
  directives: {
    waves
  },
  data() {
    const validateDouble = (rule, value, callback) => { // 只能输入整数或小数
      const regex = /^[0-9]+([.]{1}[0-9]+){0,1}$/
      if (value === '') {
        callback(new Error(rule.msg))
      } else {
        if (regex.test(value) === false) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }
    }
    return {
      istianjia: false,
      afterCurrentYear: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      tableHeight: document.body.clientHeight - 225,
      tableKey: 0,
      total: null,
      currentPage: 1,
      pageSize: 15,
      listLoading: true,
      dialogFormVisible: false, // 设备申请弹窗显示flag
      isUpdate: true, // 是编辑，显示操作按钮；是详细，隐藏
      setDisabled: false, // 设置表单不可编辑
      unEdit: false, // 设置某个字段不可修改
      dialogStatus: '', // 弹窗的名
      textMap: {
        create: '添加计费参数',
        update: '编辑计费参数',
        info: '计费参数详细'
      },
      listQuery: {
        name: '',
        startDate: '',
        endDate: '',
        planPosition: ''
      },
      chargingParamsData: [],
      temp: {
        id: '',
        year: '', // 年份
        oneIncreRate: '', // 一类设备增值税率
        oneElRate: '', // 一类设备融资租赁利率
        oneRepairRate: '', // 一类设备修理费率
        oneManageRate: '', // 一类设备管理费率
        oneUseRate: '', // 一类设备使用系数
        twoRepairRate: '', // 二类设备修理费率
        twoManageRate: '' // 二类设备管理费率
      },
      rules: { // 校验
        year: [{ required: true, message: '请选择年份' }],
        oneIncreRate: [{ validator: validateDouble, msg: '请输入一类设备增值税率' }],
        oneElRate: [{ validator: validateDouble, msg: '请输入一类设备融资租赁利率' }],
        oneRepairRate: [{ validator: validateDouble, msg: '请输入一类设备修理费率' }],
        oneManageRate: [{ validator: validateDouble, msg: '请输入一类设备管理费率' }],
        oneUseRate: [{ validator: validateDouble, msg: '请输入一类设备使用系数' }],
        twoRepairRate: [{ validator: validateDouble, msg: '请输入二类设备修理费率' }],
        twoManageRate: [{ validator: validateDouble, msg: '请输入二类设备管理费率' }]
      },
      buttonlist: [],
      authorityCodebutton: [],
      authorityCodePage: ''
    }
  },
  created() {
    const url = sessionStorage.getItem('index')
    this.buttonlist = controllbutton(url)
    this.authorityCodebutton = this.buttonlist[0]
    this.authorityCodePage = this.buttonlist[1]
    this.getList(this.currentPage, this.pageSize)
  },
  methods: {
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val
    },
    handleSizeChange(val) { // 每页多少条
      // this.getList(this.currentPage, val)
    },
    handleCurrentChange(val) { // 当前页多少条
      // this.getList(val, this.pageSize)
    },
    getList(page, size) { // 计费参数列表
      this.listLoading = false
      const _this = this
      require_get('/v1/sbelfeeconfig/list?pageNum=' + page + '&pageSize=' + size, {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        _this.listLoading = false
        var data = []
        if (res.data.meta.code === '200') {
          _this.total = res.data.data.total

          var result = res.data.data.list
          for (let i = 0; i < result.length; i++) {
            var obj = {}
            obj.id = result[i].id
            obj.year = result[i].year
            obj.oneIncreRate = result[i].oneIncreRate
            obj.oneElRate = result[i].oneElRate
            obj.oneRepairRate = result[i].oneRepairRate
            obj.oneManageRate = result[i].oneManageRate
            obj.oneUseRate = result[i].oneUseRate
            obj.twoRepairRate = result[i].twoRepairRate
            obj.twoManageRate = result[i].twoManageRate
            data[i] = obj
          }
          _this.chargingParamsData = data
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
    },
    handleCreate() { // 添加弹窗
      this.dialogFormVisible = true
      this.isUpdate = true
      this.setDisabled = false
      this.unEdit = false
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      setTimeout(() => {
        this.$refs['dataForm'].resetFields()
      }, 100)
    },
    addChargingParams() { // 添加计费参数
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.istianjia = true
          const _this = this
          require_post('/v1/sbelfeeconfig/create', {
            token: token,
            authorityCode: 1
          }, this.temp, function(res) {
            if (res.data.meta.code === '200') {
              _this.dialogFormVisible = false
              _this.istianjia = false
              _this.getList(_this.currentPage, _this.pageSize)
              _this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 3000
              })
            } else if (res.data.meta.code === '400') {
              _this.istianjia = false
              _this.$notify({
                title: '系统提示',
                message: '该年份计费参数已存在',
                type: 'warning',
                duration: 3000
              })
            } else {
              _this.istianjia = false
              _this.$notify({
                title: '失败',
                message: '创建失败',
                type: 'error',
                duration: 3000
              })
            }
          }, function(err) {
            _this.listLoading = false
            _this.istianjia = false
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
    handleInfo(row) { // 计划详细弹窗
      this.dialogFormVisible = true
      this.isUpdate = false
      this.setDisabled = true // 不可编辑表单
      this.unEdit = false
      this.dialogStatus = 'info'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.getChargingParamsInfo(row.id)
    },
    getChargingParamsInfo(id) {
      const _this = this
      // 获取规格型号详细
      require_get('/v1/sbelfeeconfig/find/' + id, {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.meta.code === '200') {
          const result = res.data.data
          _this.temp.id = result.id
          _this.temp.year = result.year
          _this.temp.oneIncreRate = result.oneIncreRate
          _this.temp.oneElRate = result.oneElRate
          _this.temp.oneRepairRate = result.oneRepairRate
          _this.temp.oneManageRate = result.oneManageRate
          _this.temp.oneUseRate = result.oneUseRate
          _this.temp.twoRepairRate = result.twoRepairRate
          _this.temp.twoManageRate = result.twoManageRate
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
    handleUpdate(row) { // 编辑计划弹窗
      this.dialogFormVisible = true
      this.isUpdate = true
      this.setDisabled = false
      this.unEdit = true
      this.dialogStatus = 'update'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    edit() { // 编辑设备申请弹窗
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          this.handleUpdate(this.selectlistRow[0])
          this.getChargingParamsInfo(this.selectlistRow[0].id)
        } else {
          this.$notify({
            title: '系统提示',
            message: '请选择一条数据进行编辑！',
            type: 'warning',
            duration: 3000
          })
        }
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行编辑！',
          type: 'warning',
          duration: 3000
        })
      }
    },
    updateChargingParams() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const _this = this
          require_put('/v1/sbelfeeconfig/update', {
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
    delData() { // 勾选一条数据删除
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 | this.selectlistRow.length === 1) {
          this.$confirm('确认要删除么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const _this = this
            require_delete('/v1/sbelfeeconfig/delete/' + this.selectlistRow[0].id, {
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
    }
  }
}
</script>
<style>
  .btn_right {
    float: right;
  }
  .block {
    margin-top: 15px;
  }
  .commonTit {
    border-left: 4px solid rgba(22, 155, 213, 1);
    padding-left: 5px;
    margin-top: 0;
    margin-bottom: 5px;
  }
  .el-dialog__body {
    padding: 10px 20px !important
  }
  .delEq {
    padding: 2px 10px;
    color: #FF0000;
    border: 1px solid #fff;
    border-radius: 3px;
  }
  .delEq:hover {
    border: 1px solid #FF0000;
    background: #FF0000;
    color: #fff;
    border-radius: 3px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
  .showOperBtn {
    pointer-events: none;
    color: gray;
  }
</style>


