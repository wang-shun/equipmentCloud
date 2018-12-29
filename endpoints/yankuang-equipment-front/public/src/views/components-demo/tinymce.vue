<template>
  <div class="app-container">
    <div class="filter-container" style="100%">
      <el-input @keyup.enter.native="search" style="width: 130px;" class="filter-item" placeholder="编号" v-model="listQuery.code"></el-input>
      <el-input @keyup.enter.native="search" style="width: 130px;" class="filter-item" placeholder="名称"  v-model="listQuery.name"></el-input>
      <el-select filterable v-model="listQuery.type" class="filter-item" placeholder="类型" style="width: 130px;" >
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select filterable v-model="listQuery.org" class="filter-item" placeholder="所属单位" style="width: 130px;" >
        <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select filterable v-model="listQuery.position" class="filter-item" placeholder="所在位置" style="width: 130px;" >
        <el-option v-for="item in positionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" size="small" v-waves icon="el-icon-search" @click="search" >搜索</el-button>
      <el-button class="filter-item" size="small" v-waves icon="el-icon-refresh" @click="reset">重置</el-button>
      <div class="btn_right" v-for='item in authorityCodebutton' :key='item.a'>
        <el-button class="filter-item" style="" type="primary" v-waves icon="el-icon-circle-plus-outline" v-if="item.name === '添加'" @click="handleCreate" size="small">添加</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-edit" v-if="item.name === '编辑'" @click="edit()" size="small">编辑</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="danger" v-waves icon="el-icon-delete" v-if="item.name === '删除'" @click.prevent="delData()" size="small">删除</el-button>
      </div>
    </div>

    <el-table :key='tableKey' :data="specificationModelTable" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;" @selection-change='selectRow' ref="moviesTable" :height="tableHeight">
      <el-table-column type="selection" width="35px">
    </el-table-column>
      <el-table-column width="110px" align="center" :label="'编号'" fixed>
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column width="280px" align="center" :label="'功能位置名称'" fixed>
        <template slot-scope="scope">
          <span class="link-type" align="center" @click="handleInfo(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="'默认状态'">
        <template slot-scope="scope">
          <span>{{scope.row.state | stateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="'类型'">
        <template slot-scope="scope">
          <span>{{scope.row.type | typeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="'是否可用'">
        <template slot-scope="scope">
          <span>{{scope.row.isuse | isuseFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="'是否开启rfid'">
        <template slot-scope="scope">
          <span>{{scope.row.isrfid | isrfidFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="'所属单位'">
        <template slot-scope="scope">
          <span>{{scope.row.org}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="'所在位置'">
        <template slot-scope="scope">
          <span v-show="show = false">{{scope.row.position}}</span>
          <span>{{scope.row.positionName}}</span>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="800px">
      <el-form :rules="rules" status-icon ref="dataForm" :model="temp" label-position="right" label-width="120px" :disabled="setDisabled">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" v-if="codeShowYN">
              <span>{{temp.code}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="功能位置名称" required prop="name">
              <el-input class="filter-item" v-model="temp.name" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'状态'" prop="state">
              <el-select filterable class="filter-item" v-model="temp.state" style="width:250px">
                <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'类型'" required prop="type">
              <el-select filterable class="filter-item" v-model="temp.type" style="width:250px">
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'所属单位'" required prop="org">
              <el-select filterable class="filter-item" v-model="temp.org" style="width:250px">
                <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'所在位置'" required prop='position'>
              <el-select filterable class="filter-item" v-model="temp.position" style="width:250px" v-on:change="getLocationList($event)">
                <el-option v-for="item in positionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'是否可用'" required prop="isuse">
              <el-select filterable class="filter-item" v-model="temp.isuse" style="width:250px">
                <el-option v-for="item in isuseList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'是否开启rfid'" required prop="isrfid">
              <el-select filterable class="filter-item" v-model="temp.isrfid" style="width:250px">
                <el-option v-for="item in isrfidList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addPosition" :loading='istianjia'>确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
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

const stateList = [ // 状态
  {
    value: '01',
    label: '在用'
  }, {
    value: '02',
    label: '备用'
  }, {
    value: '03',
    label: '闲置'
  }, {
    value: '04',
    label: '待修'
  }, {
    value: '05',
    label: '待报废'
  }, {
    value: '06',
    label: '报废'
  }
]
const typeList = [ // 类型
  {
    value: '01',
    label: '使用地点'
  }, {
    value: '02',
    label: '储备库'
  }, {
    value: '03',
    label: '租赁库'
  }, {
    value: '04',
    label: '本部'
  }
]
const companyList = [ // 公司
  {
    value: '1',
    label: '设备管理中心'
  }
]
const isuseList = [ // 是否可用
  {
    value: 1,
    label: '是'
  }, {
    value: 2,
    label: '否'
  }
]
const isrfidList = [ // 是否开启rfid
  {
    value: 1,
    label: '是'
  }, {
    value: 2,
    label: '否'
  }
]
const ispositionList = JSON.parse(sessionStorage.getItem('positonList'))
// arr to obj ,such as { CN : "China", US : "USA" }
const stateValue = stateList.reduce((acc, cur) => { // 状态
  acc[cur.value] = cur.label
  return acc
}, {})
const typeValue = typeList.reduce((acc, cur) => { // 类型
  acc[cur.value] = cur.label
  return acc
}, {})
const companyValue = companyList.reduce((acc, cur) => { // 公司
  acc[cur.value] = cur.label
  return acc
}, {})
const isuseValue = isuseList.reduce((acc, cur) => { // 是否可用
  acc[cur.value] = cur.label
  return acc
}, {})
const isrfidValue = isrfidList.reduce((acc, cur) => { // 是否开启rifd
  acc[cur.value] = cur.label
  return acc
}, {})

const isrpositons = ispositionList.reduce((acc, cur) => {
  acc[cur.id] = cur.name
  return acc
})

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      istianjia: false,
      szposition: [],
      tableHeight: document.body.clientHeight - 250,
      currentPage: 1,
      pageSize: 15,
      codeShowYN: false, // 编号是否显示
      isUpdate: true, // 是编辑，显示操作按钮；是详细，隐藏
      setDisabled: false,
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        code: null,
        name: null,
        type: null,
        org: null,
        position: null
      },
      count: 1,
      specificationModelTable: [], // 列表数据集
      stateList, // 状态
      typeList, // 类型
      companyList, // 公司
      positionList: [], // 所在位置
      isuseList, // 是否可用
      isrfidList, // 是否开启rifd
      temp: {
        id: undefined,
        name: '',
        state: '',
        type: '',
        org: '',
        position: '',
        isuse: '',
        isrfid: ''
      },
      dialogFormVisible: false,
      dialogPvVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑设备功能位置',
        create: '添加设备功能位置',
        info: '设备功能位置详细'
      },
      rules: {
        name: [{ required: true, message: '请输入功能位置名称' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        position: [{ required: true, message: '请选择所在位置', trigger: 'change' }],
        isuse: [{ required: true, message: '请选择是否可用', trigger: 'change' }],
        isrfid: [{ required: true, message: '请选择是否开启rfid', trigger: 'change' }],
        org: [{ required: true, message: '请选择所属公司', trigger: 'change' }]
      },
      buttonlist: [],
      authorityCodebutton: [],
      authorityCodePage: ''
    }
  },
  filters: {
    stateFilter(state) {
      return stateValue[state]
    },
    typeFilter(type) {
      return typeValue[type]
    },
    companyFilter(company) {
      return companyValue[company]
    },
    isuseFilter(isuse) {
      return isuseValue[isuse]
    },
    isrfidFilter(isrfid) {
      return isrfidValue[isrfid]
    },
    isposition(ispos) {
      return isrpositons[ispos]
    }
  },
  created() {
    const url = sessionStorage.getItem('index')
    this.buttonlist = controllbutton(url)
    this.authorityCodebutton = this.buttonlist[0]
    this.authorityCodePage = this.buttonlist[1]
    this.getList(this.currentPage, this.pageSize)
    this.getLocationList()
  },
  methods: {
    // 搜索调用的方法
    search() {
      this.getList(this.currentPage, this.pageSize)
    },
    // 重置调用的方法
    reset() {
      this.listQuery = []
      this.getList(this.currentPage, this.pageSize)
    },
    getList(page, size) { // 功能位置列表
      this.listLoading = true
      const _this = this
      const params = {
        code: this.listQuery.code,
        name: this.listQuery.name,
        type: this.listQuery.type,
        org: this.listQuery.org,
        position: this.listQuery.position,
        pageNum: page,
        pageSize: size
      }
      require_get('/v1/sbposition/list', {
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
            obj.state = result[i].state
            obj.type = result[i].type
            obj.isuse = result[i].isuse
            obj.isrfid = result[i].isrfid
            obj.org = result[i].org
            obj.position = result[i].position
            obj.positionName = result[i].positionName
            data[i] = obj
          }
          _this.specificationModelTable = data
        } else if (res.data.meta.code === '201') {
          _this.listLoading = false
          _this.specificationModelTable = []
          _this.$notify({
            title: '系统提示',
            message: res.data.msg,
            type: 'warning',
            duration: 3000
          })
        } else {
          _this.$notify({
            title: '系统提示',
            message: res.data.meta.message,
            type: 'error',
            duration: 2000
          })
        }
      }, function(err) {
        _this.listLoading = false
        Vue.use(err)
        _this.$notify({
          title: '系统提示',
          message: '系统错误',
          type: 'error',
          duration: 3000
        })
      })
    },
    handleCreate() { // 添加弹窗
      this.codeShowYN = false
      this.isUpdate = true
      this.setDisabled = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      setTimeout(() => {
        this.$refs['dataForm'].resetFields()
        this.temp.code = ''
      }, 300)
    },
    addPosition() { // 添加功能位置
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.istianjia = true
          const _this = this
          require_post('/v1/sbposition/create', {
            token: token,
            authorityCode: 1
          }, this.temp, function(res) {
            if (res.data.meta.code === '200') {
              _this.dialogFormVisible = false
              _this.getList(_this.currentPage, _this.pageSize)
              _this.istianjia = false
              _this.$notify({
                title: '系统提示',
                message: '功能位置添加成功',
                type: 'success',
                duration: 3000
              })
            } else {
              _this.istianjia = false
              _this.$notify({
                title: '系统提示',
                message: '功能位置添加失败',
                type: 'error',
                duration: 3000
              })
            }
          }, function(err) {
            _this.listLoading = false
            _this.istianjia = false
            Vue.use(err)
            _this.$notify({
              title: '系统提示',
              message: '系统错误',
              type: 'error',
              duration: 3000
            })
          })
        }
      })
    },
    // 获取所在位置
    getLocationList(event) {
      const _this = this
      require_get('/v1/elplan', {
        token: token,
        authorityCode: 1
      }, {
        page: 1,
        size: 100,
        pCode: '',
        type: 3
      }, function(res) {
        var data = []
        if (res.data.status === 200) {
          var result = res.data.data.list
          for (let i = 0; i < result.length; i++) {
            var obj = {}
            obj.id = result[i].id
            obj.name = result[i].name
            data[i] = obj
          }
          _this.positionList = data
          _this.szposition = _this.positionList
        } else {
          _this.$notify({
            title: '系统提示',
            message: res.data.msg,
            type: 'warning',
            duration: 3000
          })
        }
      }, function(err) {
        _this.listLoading = false
        Vue.use(err)
        _this.$notify({
          title: '系统提示',
          message: '系统错误',
          type: 'error',
          duration: 3000
        })
      })
    },
    // 每页多少条
    handleSizeChange(val) {
      this.getList(this.currentPage, val)
    },
    // 当前页多少条
    handleCurrentChange(val) {
      this.getList(val, this.pageSize)
    },
    handleUpdate(row) { // 弹出编辑弹窗方法
      this.codeShowYN = true
      this.isUpdate = true
      this.setDisabled = false
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleInfo(row) { // 弹出详细弹窗方法
      this.dialogStatus = 'info'
      this.dialogFormVisible = true
      this.codeShowYN = true
      this.isUpdate = false
      this.setDisabled = true
      this.getSpModalInfo(row.id)
    },
    getSpModalInfo(id) { // 获取功能位置详细
      const _this = this
      // 获取功能位置详细
      require_get('/v1/sbposition/find/' + id, {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.meta.code === '200') {
          const result = res.data.data
          _this.temp.id = result.id
          _this.temp.code = result.code
          _this.temp.name = result.name
          _this.temp.state = result.state
          _this.temp.type = result.type
          _this.temp.org = result.org
          _this.temp.position = parseInt(result.position)
          _this.temp.isuse = result.isuse
          _this.temp.isrfid = result.isrfid
        } else {
          _this.$notify({
            title: '系统提示',
            message: '请求失败',
            type: 'error',
            duration: 3000
          })
        }
      }, function(err) {
        _this.listLoading = false
        Vue.use(err)
        _this.$notify({
          title: '系统提示',
          message: '系统错误',
          type: 'error',
          duration: 3000
        })
      })
    },
    updateData() { // 编辑确定调用的方法
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const _this = this
          require_put('/v1/sbposition/update', {
            token: token,
            authorityCode: 1
          }, this.temp, function(res) {
            if (res.data.meta.code === '200') {
              _this.dialogFormVisible = false
              _this.getList(_this.currentPage, _this.pageSize)
              _this.$notify({
                title: '系统提示',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            } else {
              _this.$notify({
                title: '系统提示',
                message: res.data.meta.message,
                type: 'error',
                duration: 2000
              })
            }
          }, function(err) {
            _this.listLoading = false
            Vue.use(err)
            _this.$notify({
              title: '系统提示',
              message: '系统错误',
              type: 'error',
              duration: 3000
            })
          })
        }
      })
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val
    },
    // 编辑数据
    edit() {
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          this.handleUpdate()
          this.getSpModalInfo(this.selectlistRow[0].id)
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
    delData() { // 勾选一条或多条数据删除
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0) {
          this.$confirm('确认要删除么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const _this = this
            var ids = ''
            for (var i = 0; i < _this.selectlistRow.length; i++) {
              ids += _this.selectlistRow[i].id + ','
            }
            ids = ids.substring(0, ids.length - 1)
            require_delete('/v1/sbposition/deletes/' + ids, {
              token: token,
              authorityCode: 1
            }, { }, function(res) {
              _this.getList(_this.currentPage, _this.pageSize)
              _this.$notify({
                title: '系统提示',
                message: '删除成功！',
                type: 'success',
                duration: 2000
              })
            }, function(err) {
              _this.listLoading = false
              Vue.use(err)
              _this.$notify({
                title: '系统提示',
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
            message: '请选择一条数据进行删除操作',
            type: 'warning',
            duration: 2000
          })
        }
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行删除操作',
          type: 'warning',
          duration: 2000
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
    margin-top: 10px;
  }
  .el-dialog__body {
    padding: 6px 20px !important;
  }
</style>



