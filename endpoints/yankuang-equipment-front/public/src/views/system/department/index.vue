<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="btn_right" v-for='item in authorityCodebutton' :key='item.a'>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-circle-plus-outline" v-if="item.name === '添加'"  @click="handleCreate">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-edit" v-if="item.name === '编辑'" @click="edit()">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="danger" v-waves icon="el-icon-delete" v-if="item.name === '删除'" @click.prevent="delData()">{{item.name}}</el-button>
      </div>
    </div>
    <tree-table :data="data" :columns="columns" border @getClickedType="changeClickedType" @getdataob="seeDetail"></tree-table>

    <!-- 添加的弹出窗部分 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="480px">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="120px" style='margin-left:15px;' :disabled="setDisabled">
        <el-form-item label="部门名称" required prop='name'>
          <el-input v-model="temp.name" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="上级公司" >
          <el-input v-model="temp.upname" style="width:250px;" @focus="opender"></el-input>
        </el-form-item>
        <el-form-item label="类型" required prop='type'>
          <el-select class="filter-item" v-model="temp.type" style="width:250px">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号" required prop='sorting'>
          <el-input v-model="temp.sorting" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" style="width:250px" v-model="temp.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addDepartmentmanagement" :loading='istianjia'>确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

    <!--添加的部门弹出框-->
    <el-dialog  :visible.sync="deptreeList" width="480px" style="margin-left: 100px;">
      <treeTableForTc :data="datas" :columns="columna" border @getClickedType="changeGetdata"></treeTableForTc>
      <div slot="footer" class="dialog-footer" >
        <el-button @click='closeup'>{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="chooseDer">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import treeTable from '@/components/TreeTableFordepartment'
import treeTableForTc from '@/components/TreeTableForTc'
const token = sessionStorage.getItem('token')
import $ from 'jquery'
import { require_get, require_post, require_put, baseIP, controllbutton } from '@/assets/pubJS'

const typeList = [
  {
    value: 1,
    label: '公司'
  },
  {
    value: 2,
    label: '单位'
  },
  {
    value: 3,
    label: '部门'
  },
  {
    value: 21,
    label: '矿单位'
  }
]
const typeValue = typeList.reduce((acc, cur) => { // 类型
  acc[cur.value] = cur.label
  return acc
}, {})
export default {
  name: 'complexTable',
  directives: {
    waves
  },
  components: { treeTable, treeTableForTc },
  data() {
    const validateInt = (rule, value, callback) => { // 只能输入数字
      const regex = /^\d+$/
      if (value !== '') {
        if (regex.test(value) === false) {
          callback(new Error('请输入数字序号'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入数字序号'))
      }
    }
    return {
      istianjia: false,
      deptreeList: false,
      listData: [], // 当前选中元素的数据
      typeList,
      columna: [
        {
          text: '部门名称',
          value: 'name',
          width: 250
        }
      ],
      columns: [
        {
          text: '名称',
          value: 'name',
          width: 300
        },
        {
          text: '创建人',
          value: 'createBy',
          width: 130
        },
        {
          text: '创建时间',
          value: 'createAt',
          width: 170
        },
        {
          text: '创建类型',
          value: 'type',
          width: 130
        },
        {
          text: '备注',
          value: 'remark',
          width: 250
        }
      ],
      data: [], // 公司部门列表
      datas: [],
      currentPage: 1,
      pageSize: 15,
      total: null,
      isUpdate: true, // 是编辑，显示操作按钮；是详细，隐藏
      setDisabled: false, // 设置表单不可编辑
      tableKey: 0,
      list: null,
      listLoading: true,
      departmentDatas: [], // 数据列表
      companyList: [],
      showReviewer: false,
      temp: {
        id: undefined,
        orgId: '',
        name: '',
        remark: '',
        type: '',
        sorting: '',
        code: '',
        createBy: '',
        createTime: '',
        upname: '',
        pcode: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '添加部门',
        update: '编辑部门',
        info: '部门详细'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        name: [{ required: true, message: '请输入部门名称' }],
        type: [{ required: true, message: '请选择类型' }],
        sorting: [{ message: '请输入数字序号', validator: validateInt }]
      },
      downloadLoading: false,
      authorityCodePage: ''
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return typeValue[type]
    }
  },
  created() {
    const url = sessionStorage.getItem('index')
    var buttonlist = controllbutton(url)
    this.authorityCodebutton = buttonlist[0]
    this.authorityCodePage = buttonlist[1]
    this.getCompanyList()
  },
  methods: {
    opender() {
      this.deptreeList = true
    },
    closeup() {
      this.deptreeList = false
      this.getCompanyList()
    },
    // 获取子组件传值
    changeGetdata(data) {
      this.listData = data
      // console.log(this.listData, '111')
    },
    // 看呀嘛看单条数据的详细
    seeDetail(val) {
      // console.log(val)
      this.dialogStatus = 'info'
      this.isUpdate = false
      this.setDisabled = true
      this.handleUpdate(val)
    },
    chooseDer() {
      const _this = this
      if (_this.listData.length !== 0 && _this.listData.length === 1) {
        _this.temp.upname = _this.listData[0].name
        _this.temp.pcode = _this.listData[0].code
        // _this.temp.pcode = _this.listData[0].code
        _this.deptreeList = false
      } else if (_this.listData.length === 0) {
        _this.deptreeList = false
        _this.temp.pcode = '0'
      } else {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行添加！',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 获取子组件传值
    changeClickedType(data) {
      this.listData = data
      // console.log(this.listData, '111')
    },
    // 获取页面列表
    getList(page, size) {
      this.listLoading = true
      const _this = this
      const params = {
        page: page,
        size: size
      }
      require_get('/v1/depts/', {
        token: token,
        authorityCode: _this.authorityCodePage
      }, params, function(res) {
        if (res.data.status === 200) {
          _this.total = res.data.data.total
          _this.departmentDatas = res.data.data.list
          setTimeout(() => {
            _this.listLoading = false
          }, 1.5 * 1000)
        } else {
          _this.$notify({
            title: '系统提示',
            message: res.data.msg,
            type: 'error',
            duration: 2000
          })
        }
      }, function(err) {
        console.log(err)
        _this.$notify({
          title: '系统提示',
          message: '系统错误',
          type: 'error',
          duration: 2000
        })
      })
    },
    // 选择列表行的数据
    selectRow(val) {
      this.selectlistRow = val
      // console.log(val)
    },
    // 添加弹窗
    handleCreate() {
      this.resetTemp()
      this.isUpdate = true
      this.setDisabled = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      setTimeout(() => {
        this.temp.name = ''
        this.temp.orgId = ''
        this.temp.remark = ''
      }, 300)
    },
    handleUpdate(row) { // 详情弹窗
      this.resetTemp()
      const _this = this
      _this.dialogFormVisible = true
      _this.$nextTick(() => {
        _this.$refs['dataForm'].clearValidate()
      })
      require_get('/v1/depts/' + row.code, {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.status === 200) {
          var result = res.data.data
          _this.temp.name = result.name
          _this.temp.upname = result.pname
          _this.temp.code = result.code
          _this.temp.sorting = result.sorting
          _this.temp.remark = result.remark
          _this.temp.type = result.type
          _this.temp.pcode = result.pcode
        } else {
          _this.$notify({
            title: '系统提示',
            message: '查看详情失败！',
            type: 'warning',
            duration: 2000
          })
        }
      })
    },
    // 编辑弹窗操作并渲染详情
    edit() {
      const _this = this
      this.setDisabled = false
      this.isUpdate = true
      _this.dialogStatus = 'update'
      if (this.listData) {
        if ((_this.listData | _this.listData.length !== 0) && _this.listData.length === 1) {
          _this.handleUpdate(_this.listData[0])
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
    // 勾选一条或多条数据删除
    delData() {
      const _this = this
      if (_this.listData) {
        const codes = []
        for (let i = 0; i < _this.listData.length; i++) {
          codes.push(_this.listData[i].code)
          // for (let j = 0; j < _this.listData[i].childList.length; j++) {
          //   codes.push(_this.listData[i].childList[j].code)
          //   for (let z = 0; z < _this.listData[i].childList[j].childList.length; z++) {
          //     codes.push(_this.listData[i].childList[j].childList[z].code)
          //   }
          // }
        }
        if (_this.listData.length !== 0) {
          _this.$confirm('确认要删除么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            $.ajax({
              url: baseIP + '/v1/depts',
              method: 'delete',
              headers: {
                token: token,
                authorityCode: 1,
                'Content-Type': 'application/json; charset=utf-8'
              },
              dataType: 'json',
              data: JSON.stringify({ codes: codes }),
              success: function(res) {
                if (res.status === 200) {
                  _this.getCompanyList()
                }
              }
            })
          }).catch(() => {
            _this.$notify({
              title: '系统提示',
              message: '已取消删除',
              type: 'info',
              duration: 2000
            })
          })
        } else {
          _this.$notify({
            title: '系统提示',
            message: '请选择一条或多条数据进行删除操作！',
            type: 'warning',
            duration: 2000
          })
        }
      } else {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条或多条数据进行删除操作！',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 添加部门管理，点击确定调用
    addDepartmentmanagement() {
      const _this = this
      if (this.temp.pcode === undefined) {
        this.temp.pcode = '0'
      }
      const params = {
        name: _this.temp.name,
        pcode: _this.temp.pcode,
        sorting: _this.temp.sorting,
        type: _this.temp.type,
        remark: _this.temp.remark
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.istianjia = true
          require_post('/v1/depts/', {
            token: token,
            authorityCode: 1
          }, params, function(res) {
            if (res.data.status === 200) {
              _this.dialogFormVisible = false
              _this.istianjia = false
              _this.$notify({
                title: '系统提示',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              _this.getCompanyList()
            }
          }, function(err) {
            _this.istianjia = false
            console.log(err)
            _this.$notify({
              title: '系统提示',
              message: '系统错误',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() { // 编辑确定调用的方法
      const _this = this
      const params = {
        name: _this.temp.name,
        code: _this.temp.code,
        remark: _this.temp.remark,
        sorting: _this.temp.sorting,
        type: _this.temp.type,
        pcode: _this.temp.pcode
      }
      _this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          require_put('/v1/depts/', {
            token: token,
            authorityCode: 1
          }, params, function(res) {
            if (res.data.status === 200) {
              _this.dialogFormVisible = false
              _this.$notify({
                title: '系统提示',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              _this.getCompanyList()
            }
          }, function(err) {
            console.log(err)
            _this.$notify({
              title: '系统提示',
              message: '更新失败',
              type: 'fail',
              duration: 2000
            })
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        orgId: '',
        name: '',
        remark: '',
        type: '',
        sorting: '',
        code: '',
        createBy: '',
        createTime: '',
        upname: ''
      }
    },
    getCompanyList() { // 获取公司list
      const _this = this
      require_get('/v1/depts/tree', {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.status === 200) {
          var result = res.data.data
          _this.data = result
          _this.datas = result
        } else {
          _this.$notify({
            title: '系统提示',
            message: res.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      }, function(err) {
        console.log(err)
        _this.$notify({
          title: '系统提示',
          message: '系统错误',
          type: 'error',
          duration: 2000
        })
      })
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
