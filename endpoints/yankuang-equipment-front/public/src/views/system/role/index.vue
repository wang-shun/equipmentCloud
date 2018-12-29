<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="角色名称" v-model="listQuery.title"></el-input>
      <el-button class="filter-item" size="small" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <div class="btn_right" v-for='item in authorityCodebutton' :key='item.a'>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-circle-plus-outline" v-if="item.name === '添加'" @click="handleCreate">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-edit" v-if="item.name === '编辑'" @click="edit()">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="danger" v-waves icon="el-icon-delete" v-if="item.name === '删除'" @click.prevent="delData()">{{item.name}}</el-button>
        <!-- <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves @click="authorization()"><i class="icon_grant"></i>角色授权</el-button> -->
      </div>
    </div>
    <!-- 表单内容 -->
    <el-table :key='tableKey' :data="roleDatas" v-loading="listLoading"  border fit highlight-current-row
      style="width: 100%;" @selection-change='selectRow' ref="moviesTable" :height="tableHeight">
      <el-table-column type="selection" width="35"></el-table-column>
      <!-- <el-table-column align="center" label="角色编号" width="120px" fixed>
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column> -->
      <el-table-column width="150px" align="center" label="角色名称" fixed>
        <template slot-scope="scope">
          <span class="link-type" @click="handleInfo(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="所在部门">
        <template slot-scope="scope">
          <span>{{scope.row.deptName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{scope.row.createBy}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createAt}}</span>
        </template>
      </el-table-column>
      <el-table-column width="480px" align="center" label="角色描述">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="180px" align="center" label="角色权限" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.auth}}</span>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 添加的弹出窗部分 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="480px">
      <el-form :rules="rules" ref="roleDatas" :model="temp" label-position="right" label-width="120px" style='margin-left:15px;' :disabled="setDisabled">
        <el-form-item required label="所在部门" prop='depname'>
          <el-input v-model="temp.depname" style="width:250px" @focus="upder"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" required prop='rolename'>
          <el-input v-model="temp.rolename" style="width:250px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色权限" v-if = 'isDetail'>
          <el-input type="textarea" v-model="temp.jurRole" style="width:250px"></el-input>
        </el-form-item> -->
        <el-form-item label="备注">
          <el-input type="textarea" placeholder="请输入角色描述" v-model="temp.remark" style="width:250px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" :loading='istianjia'>{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <!-- 角色授权弹窗 -->
    <el-dialog title="角色授权" :visible.sync="dialogPvVisible" width="480px">
      <el-form :rules="rules" ref="roleDatas" :model="temp" label-position="right" label-width="120px" style='margin-left:15px;' :show-overflow-tooltip="true">
        <el-form-item :label="'权限'" required >
          <el-input v-model="jurtemp.rolename" style="width:250px" @focus="deptreeList = true" type='textarea'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPvVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="addrole">{{$t('table.confirm')}}</el-button>
        <!-- <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button> -->
      </div>
    </el-dialog>
    
    <!--添加权限弹出框-->
    <el-dialog  :visible.sync="deptreeList" width="480px" style="margin-left: 100px;">
      <treeTableForTc :data="datas" :columns="columna" border @getClickedType="changeGetdata"></treeTableForTc>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="deptreeList = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="chooseDer">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <!--添加部门弹出框-->
    <el-dialog  :visible.sync="comtreeList" width="480px" style="margin-left: 100px;">
      <treeTableForTc :data="datafordep" :columns="columns" border @getClickedType="changeGetdata"></treeTableForTc>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="closeder">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="choosecompany">{{$t('table.confirm')}}</el-button>
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
import waves from '@/directive/waves' // 水波纹指令
import { require_get, require_post, require_put, baseIP, controllbutton } from '@/assets/pubJS'
import treeTableForTc from '@/components/TreeTableForTc'
import $ from 'jquery'
// import { mousemove, mouseout, mouseover } from '@/assets/Fdisplay'
const token = sessionStorage.getItem('token')
// import eldialog1 from '@eld'

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  components: { treeTableForTc },
  data() {
    return {
      istianjia: false,
      tableHeight: document.body.clientHeight - 240,
      data: [], // 权限树数据
      datas: [],
      datafordep: [], // 部门树数据
      columna: [
        {
          text: '权限名称',
          value: 'name',
          width: 250
        }
      ],
      columns: [
        {
          text: '部门名称',
          value: 'name',
          width: 250
        }
      ],
      setDisabled: false, // 是否能更改
      isDetail: false,
      comtreeList: false,
      rolename: '',
      deptreeList: false, // 控制权限弹出窗
      currentPage: 1,
      pageSize: 15,
      isUpdate: true, // 是编辑，显示操作按钮；是详细，隐藏
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: '',
        type: '',
        sort: '+id'
      },
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
      roleDatas: [], // 角色列表
      companyList: [{
        value: '中心',
        label: '中心'
      }, {
        value: '矿处',
        label: '矿处'
      }],
      departmentList: [{
        value: '综合科',
        label: '综合科'
      }, {
        value: '综机科',
        label: '综机科'
      }],
      selectlistRow: [], // 获取选中数据
      statusOptions2: ['管理员权限', '科长权限'],
      showReviewer: false,
      temp: {
        deptCode: '', // 部门编号
        jurRole: '',
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: '',
        status1: '',
        depname: '',
        code: '',
        rolename: ''
      },
      jurtemp: {
        rolename: '',
        code: '',
        authorityCodes: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '添加角色',
        update: '编辑角色',
        info: '角色详细'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        depname: [{ required: true, message: '请输入所在部门' }],
        rolename: [{ required: true, message: '请输入角色名称' }]
      },
      downloadLoading: false,
      buttonlist: [],
      authorityCodebutton: [],
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
    }
  },
  created() {
    const url = sessionStorage.getItem('index')
    this.buttonlist = controllbutton(url)
    this.authorityCodebutton = this.buttonlist[0]
    this.authorityCodePage = this.buttonlist[1]
    this.getList(this.currentPage, this.pageSize)
    this.getJurList()
    this.getdepList()
  },
  methods: {
    upder() {
      this.comtreeList = true
    },
    closeder() {
      this.comtreeList = false
      this.getdepList()
    },
    // 选择部门
    choosecompany() {
      const _this = this
      if (_this.listData.length !== 0 && _this.listData.length === 1) {
        _this.temp.depname = _this.listData[0].name
        _this.temp.code = _this.listData[0].code
        _this.comtreeList = false
      } else {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行添加！',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 选择权限
    chooseDer() {
      const _this = this
      if (_this.listData.length === 0) {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行添加！',
          type: 'warning',
          duration: 2000
        })
      } else {
        var jsonstring = ''
        var authorityCodes = []
        for (let i = 0; i < _this.listData.length; i++) {
          jsonstring += _this.listData[i].name + '   '
          authorityCodes.push(_this.listData[i].code)
          if (_this.listData[i].childList.length !== 0) {
            for (let j = 0; j < _this.listData[i].childList.length; j++) {
              jsonstring += _this.listData[i].childList[j].name + '   '
              authorityCodes.push(_this.listData[i].childList[j].code)
              if (_this.listData[i].childList[j].childList.length !== 0) {
                for (let z = 0; z < _this.listData[i].childList[j].childList.length; z++) {
                  jsonstring += _this.listData[i].childList[j].childList[z].name + '   '
                  authorityCodes.push(_this.listData[i].childList[j].childList[z].code)
                  if (_this.listData[i].childList[j].childList[z].childList.length !== 0) {
                    for (let h = 0; h < _this.listData[i].childList[j].childList[z].childList.length; h++) {
                      jsonstring += _this.listData[i].childList[j].childList[z].childList[h].name + '   '
                      authorityCodes.push(_this.listData[i].childList[j].childList[z].childList[h].code)
                    }
                  }
                }
              }
            }
          }
        }
        _this.jurtemp.rolename = jsonstring
        _this.jurtemp.authorityCodes = authorityCodes
        _this.deptreeList = false
      }
    },
    // 获取子组件传值
    changeGetdata(data) {
      this.listData = data
      // console.log(this.listData, '111')
    },
    // 获取角色列表
    getList(page, size) {
      const _this = this
      _this.listLoading = true
      const params = {
        name: _this.listQuery.title,
        page: page,
        size: size
      }
      require_get('/v1/roles', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        if (res.status === 200) {
          _this.roleDatas = res.data.data.list
          _this.total = res.data.data.total
          _this.listLoading = false
        } else {
          _this.$notify({
            title: '系统错误',
            message: res.data.msg,
            type: 'warning',
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
    getJurList() { // 获取权限list
      const _this = this
      require_get('/v1/acls/tree', {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.status === 200) {
          var result = res.data.data
          _this.data = result
          _this.datas = result
          console.log(_this.data)
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
          title: '系统错误',
          message: '请求错误',
          type: 'error',
          duration: 2000
        })
      })
    },
    selectRow(val) {
      this.selectlistRow = val
      console.log(val)
    },
    getdepList() { // 获取部门list
      const _this = this
      require_get('/v1/depts/tree', {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        console.log(res)
        if (res.data.status === 200) {
          var result = res.data.data
          _this.datafordep = result
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
    },
    delData() { // 勾选一条或多条数据删除
      const _this = this
      if (_this.selectlistRow) {
        const codes = []
        for (let i = 0; i < _this.selectlistRow.length; i++) {
          codes.push(_this.selectlistRow[i].code)
          // if (_this.selectlistRow[i].childList) {
          //   for (let j = 0; j < _this.selectlistRow[i].childList.length; j++) {
          //     codes.push(_this.selectlistRow[i].childList[j].code)
          //     if (_this.selectlistRow[i].childList[j].childList) {
          //       for (let z = 0; z < _this.selectlistRow[i].childList[j].childList.length; z++) {
          //         codes.push(_this.selectlistRow[i].childList[j].childList[z].code)
          //         if (_this.selectlistRow[i].childList[j].childList[z].childList) {
          //           for (let h = 0; h < _this.selectlistRow[i].childList[j].childList[z].childList.length; h++) {
          //             codes.push(_this.selectlistRow[i].childList[j].childList[z].childList[h].code)
          //             if (_this.selectlistRow[i].childList[j].childList[z].childList[h].childList) {
          //               for (let y = 0; y < _this.selectlistRow[i].childList[j].childList[z].childList[h].childList.length; y++) {
          //                 codes.push(_this.selectlistRow[i].childList[j].childList[z].childList[h].childList[y].code)
          //               }
          //             }
          //           }
          //         }
          //       }
          //     }
          //   }
          // }
        }
        if (_this.selectlistRow.length !== 0) {
          const length = _this.selectlistRow.length
          for (let i = 0; i < length; i++) {
            _this.$confirm('确认要删除么?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              $.ajax({
                url: baseIP + '/v1/roles',
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
                    _this.getList(_this.currentPage, _this.pageSize)
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
          }
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
    authorization() {
      const _this = this
      if (_this.selectlistRow) {
        if (_this.selectlistRow.length !== 0 && _this.selectlistRow.length === 1) {
          _this.dialogPvVisible = true
        } else {
          _this.$notify({
            title: '系统提示',
            message: '请选择一个角色进行授权',
            type: 'error',
            duration: 2000
          })
        }
      } else {
        _this.$notify({
          title: '系统提示',
          message: '请选择一个角色进行授权',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 添加角色
    createData() {
      const _this = this
      const params = {
        name: _this.temp.rolename,
        deptCode: _this.temp.code,
        remark: _this.temp.remark
      }
      this.$refs['roleDatas'].validate((valid) => {
        if (valid) {
          this.istianjia = true
          const _this = this
          require_post('/v1/roles', {
            token: token,
            authorityCode: 1
          }, params, function(res) {
            if (res.data.status === 200) {
              _this.dialogFormVisible = false
              _this.istianjia = false
              _this.getList(_this.currentPage, _this.pageSize)
              _this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
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
            console.log(err)
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
    handleCreate() { // 添加弹窗
      this.resetTemp()
      this.isUpdate = true
      this.setDisabled = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.isDetail = false
      this.$nextTick(() => {
        this.$refs['roleDatas'].clearValidate()
      })
    },
    handleUpdate(row) { // 编辑弹窗
      this.isUpdate = true
      this.setDisabled = false
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.isDetail = false
      this.getRole(row.code)
      this.$nextTick(() => {
        this.$refs['roleDatas'].clearValidate()
      })
    },
    handleInfo(row) { // 详细弹窗
      this.isUpdate = false
      this.setDisabled = true
      this.dialogStatus = 'info'
      this.dialogFormVisible = true
      this.isDetail = true
      this.getRole(row.code)
    },
    // 获取角色详情
    getRole(code) {
      const _this = this
      _this.dialogFormVisible = true
      require_get('/v1/roles/' + code, {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        console.log(res)
        if (res.data.status === 200) {
          const result = res.data.data
          _this.temp.depname = result.deptName
          _this.temp.rolename = result.name
          _this.temp.jurRole = result.jurRole
          _this.temp.remark = result.remark
          _this.temp.deptCode = result.deptCode
        }
      }, function(err) {
        console.log(err)
        _this.$notify({
          title: '系统提示',
          message: '查询失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    edit() {
      const _this = this
      if ((_this.selectlistRow | _this.selectlistRow.length !== 0) && _this.selectlistRow.length === 1) {
        _this.handleUpdate(_this.selectlistRow[0])
        _this.dialogStatus = 'update'
        _this.codeShowYN = true
        _this.isUpdate = true
        _this.setDisabled = false
        _this.dialogFormVisible = true
        _this.$nextTick(() => {
          _this.$refs['roleDatas'].clearValidate()
        })
      } else {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行编辑',
          type: 'warning',
          duration: 2000
        })
      }
    },
    handleFilter() {
      this.getList(this.currentPage, this.pageSize)
    },
    // 每页多少条
    handleSizeChange(val) {
      this.getList(this.currentPage, val)
    },
    // 当前页多少条
    handleCurrentChange(val) {
      this.getList(val, this.pageSize)
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        deptCode: '', // 部门编号
        jurRole: '',
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: '',
        status1: '',
        depname: '',
        code: '',
        rolename: ''
      }
    },
    // 添加公司
    addrole() {
      const _this = this
      const params = {
        roleCode: _this.selectlistRow[0].code,
        authorityCodes: _this.jurtemp.authorityCodes
      }
      _this.$refs['roleDatas'].validate((valid) => {
        if (valid) {
          require_post('/v1/roles/acls', {
            token: token,
            authorityCode: 1
          }, params, function(res) {
            console.log(res)
            if (res.data.status === 200) {
              _this.$notify({
                title: '系统提示',
                message: '角色授权成功',
                type: 'success',
                duration: 2000
              })
              _this.dialogPvVisible = false
            } else {
              _this.$notify({
                title: '系统提示',
                message: '角色授权失败',
                type: 'warning',
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
        }
      })
    },
    updateData() {
      const _this = this
      if (_this.temp.code === '') {
        _this.temp.code = _this.temp.deptCode
      }
      const params = {
        name: _this.temp.rolename,
        code: _this.selectlistRow[0].code,
        remark: _this.temp.remark,
        deptCode: _this.temp.deptCode,
        deptCodeNew: _this.temp.code
      }
      // console.log(_this.selectlistRow[0].deptCode)
      this.$refs['roleDatas'].validate((valid) => {
        if (valid) {
          require_put('/v1/roles', {
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
              _this.getList(_this.currentPage, _this.pageSize)
            } else {
              _this.dialogFormVisible = false
              _this.$notify({
                title: '系统提示',
                message: '更新失败',
                type: 'warning',
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
        }
      })
    }
  }
}
</script>

<style>
  .btn_right{
    float: right;
  }
  .icon_grant {
    background: url('/src/images/icon/icon_grantAuth.png') no-repeat;
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    font-weight: bold;
  }
</style>
