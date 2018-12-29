<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="float:left;">
        <el-input @keyup.enter.native="search" style="width: 200px;" class="filter-item" placeholder="用户姓名" v-model="listQuery.title"></el-input>
        <el-button class="filter-item" size="small" type="primary" v-waves icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <div style="float:right;" v-for='item in authorityCodebutton' :key='item.a'>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline" v-if="item.name === '添加'" @click="handleCreate">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-edit" v-if="item.name === '编辑'" @click="edit()">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="danger" icon="el-icon-delete" v-if="item.name === '删除'" @click.prevent="delData()">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" icon="el-icon-caret-right" v-if="item.name === '启用用户'" @click="enable()">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" icon="el-icon-remove-outline" v-if="item.name === '禁用用户'" @click="disable()">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves @click="authorization()" v-if="item.name === '用户授权'"><i class="icon_grant"></i>{{item.name}}</el-button>
      </div>
    </div>
    <el-table :key='tableKey' :data="userDatas" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;" @selection-change='selectRow' ref="moviesTable" :height="tableHeight">
      <el-table-column type="selection" width="55">
    </el-table-column>
      <el-table-column align="center" label="账号" width="150px" fixed>
        <template slot-scope="scope">
          <span>{{scope.row.account}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="姓名" fixed>
        <template slot-scope="scope">
          <span class="link-type" @click="handleInfo(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="部门">
        <template slot-scope="scope">
          <span>{{scope.row.deptName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sex === 0? '男' : '女'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status == 1? '启用' : '禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.telephone}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{scope.row.mail}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加的弹出窗部分 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="480px" >
      <el-form status-icon :rules="rules" ref="userDatas" :model="temp" label-position="right" label-width="120px" style='margin-left:15px;' :disabled="setDisabled">
        <el-form-item label="登陆账号" prop="account" required>
          <el-input v-model="temp.account" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name" required>
          <el-input v-model="temp.name" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" required  >
          <el-radio v-model="temp.sex" label='0' >男</el-radio>
          <el-radio v-model="temp.sex" label='1' >女</el-radio>
        </el-form-item>
        <el-form-item label="所属部门" required prop="deptName">
          <el-input v-model="temp.deptName" style="width:250px" @focus="upder"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="temp.role" style="width:250px" @focus="roleshow" type="textarea" rows="2"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" v-if='hvuser'>
          <el-input v-model="temp.userRole" style="width:250px" type="textarea" rows="2"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop='telephone'>
          <el-input v-model="temp.telephone" style="width:250px" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='mail'>
          <el-input v-model="temp.mail" style="width:250px" ></el-input>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input v-model="temp.remark" style="width:250px" type="textarea" rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addUsers" :loading='istianjia'>{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>

    <!--添加的部门弹出框-->
    <el-dialog  :visible.sync="comtreeList" width="480px" style="margin-left: 100px;">
      <treeTableForTc :data="data" :columns="columns" border @getClickedType="changeGetdata"></treeTableForTc>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="closeder">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="chooseDer">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <!-- 部门关联角色弹窗 -->
    <el-dialog  :visible.sync="roletree" width="480px" style="margin-left: 100px;" :title='textMap[addjs]'>
      <el-table :key='tableKey' :data="jsList" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;" @selection-change='selectRole' ref="moviesTable" >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" label="角色名称" width="200px" >
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="roletree = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="choosejs">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 用户授权弹窗 -->
    <el-dialog title="用户授权" :visible.sync="dialogRoleVisible" width="480px">
      <el-form  :rules="rules" ref="userDatas" :model="temp" label-position="right" label-width="120px" style='margin-left:15px;' :show-overflow-tooltip="true">
        <el-form-item :label="'权限'" required >
          <el-input v-model="jurtemp.rolename" style="width:250px" @focus="tcquanxuan" type='textarea' rows="8"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="addrole" :disabled="setuserDisabled">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <!--添加权限弹出框-->
    <el-dialog  :visible.sync="deptreeList" width="480px" style="margin-left: 100px;" title='选择权限'>
      <!-- <treeTableForTc :data="datas" ref='articleTable' :columns="columna" border @getClickedType="Getroledata" @getAllType='GetAllroledata'></treeTableForTc> -->
      <el-tree
        :data="datas"
        show-checkbox
        node-key="code"
        ref="tree"
        highlight-current
        :props="defaultProps"
        check-change = getHalfCheckedNodes>
      </el-tree>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="deptreeList = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="chooseRole">{{$t('table.confirm')}}</el-button>
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
import { require_get, require_post, require_put, require_patch, baseIP, controllbutton } from '@/assets/pubJS'
import treeTableForTc from '@/components/TreeTableForTc'
import $ from 'jquery'
const token = sessionStorage.getItem('token')

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  components: { treeTableForTc },
  data() {
    const validateRquNumEn = (rule, value, callback) => { // 必填且不能输入中文
      const regex = /^[a-zA-Z0-9]{4,20}$/
      if (value !== '') {
        if (regex.test(value) === false) {
          callback(new Error('请输入4-20位数字或字母'))
        } else {
          callback()
        }
      } else {
        callback(new Error(rule.msg))
      }
    }
    const validateRquTel = (rule, value, callback) => {
      const regex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (value !== '') {
        if (regex.test(value) === false) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateRquEm = (rule, value, callback) => {
      const regex = /^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_\.]?[a-z0-9]+)+[\.][a-z0-9]{2,3}([\.][a-z0-9]{2})?$/
      if (value !== '') {
        if (regex.test(value) === false) {
          callback(new Error('请输入正确的邮箱地址'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      istianjia: false,
      defaultProps: {
        children: 'childList',
        label: 'name'
      },
      abc: 'articleTable',
      roleAllData: [],
      selectlistRow: [],
      jsList: [],
      jsData: [], // 角色信息
      tableHeight: document.body.clientHeight - 240,
      columns: [
        {
          text: '部门名称',
          value: 'name',
          width: 350
        }
      ],
      columna: [
        {
          text: '权限名称',
          value: 'name',
          width: 350
        }
      ],
      setDisabled: false,
      hvuser: false,
      addjs: 'addjs',
      roletree: false, // 部门关联角色，选择角色
      dialogRoleVisible: false, // 控制角色授权弹出
      comtreeList: false,
      data: [], // 部门树
      datas: [], // 权限树
      listData: [], // 当前选中行数据
      roleData: [], // 当前选中行数据 权限树
      jurtemp: {
        rolename: '',
        code: '',
        authorityCodes: []
      },
      setuserDisabled: false,
      props: {
        label: 'name',
        value: 'id',
        children: 'childList'
      },
      currentPage: 1,
      pageSize: 15,
      isUpdate: true,
      radio: '1',
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: null,
        type: undefined,
        sort: '+id'
      },
      userDatas: [], // 列表项
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
        value: '通用科',
        label: '通用科'
      }, {
        value: '机电科',
        label: '机电科'
      }],
      roleList: [{
        value: '超级管理员',
        label: '超级管理员'
      }, {
        value: '科长',
        label: '科长'
      }],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        timestamp: new Date(),
        title: '',
        type: '',
        status: '',
        account: '',
        name: '',
        password: '',
        mail: '',
        telephone: '',
        sex: '0',
        remark: '',
        sorting: '',
        roleId: '',
        compony: '',
        department: '',
        role: '',
        company: '',
        deptName: '',
        rolescode: [],
        userRole: '',
        deptCode: '',
        roleCodes: []
      },
      buttonlist: [], // 按钮列表
      authorityCodebutton: [],
      authorityCodePage: '',
      dialogFormVisible: false,
      deptreeList: false,
      dialogStatus: '',
      textMap: {
        update: '编辑用户',
        create: '添加用户',
        info: '用户详细',
        addjs: '添加角色'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        account: [{ msg: '请输入登陆账号', validator: validateRquNumEn }],
        name: [{ required: true, message: '请输入用户名' }],
        sex: [{ required: true, message: '请选择性别' }],
        deptName: [{ required: true, message: '请选择部门' }],
        telephone: [{ validator: validateRquTel }],
        mail: [{ msg: '请输入正确的邮箱地址', validator: validateRquEm }]
      },
      downloadLoading: false
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
  mounted() {
  },
  created() {
    const url = sessionStorage.getItem('index')
    this.buttonlist = controllbutton(url)
    this.authorityCodebutton = this.buttonlist[0]
    this.authorityCodePage = this.buttonlist[1]
    this.getList(this.currentPage, this.pageSize)
    this.getDepList()
    this.getJurList()
  },
  methods: {
    upder() {
      this.comtreeList = true
    },
    closeder() {
      this.comtreeList = false
      this.getDepList()
    },
    tcquanxuan() {
      this.deptreeList = true
      // this.getJurList()
      this.roleAllData = []
      this.roleData = []
    },
    roleshow() {
      const _this = this
      this.roletree = true
      if (_this.temp.deptCode) {
        require_get('/v1/roles/byDeptCode/' + _this.temp.deptCode, {
          token: token,
          authorityCode: 1
        }, {}, function(res) {
          if (res.data.status === 200) {
            _this.jsList = res.data.data
          }
        })
      }
    },
    // 选择角色
    choosejs() {
      const _this = this
      if (_this.jsData.length === 0) {
        _this.temp.roleCodes = ['0']
        _this.roletree = false
      } else {
        var jsonstring = ''
        var authorityCodes = []
        for (let i = 0; i < _this.jsData.length; i++) {
          jsonstring += _this.jsData[i].name + '   '
          authorityCodes.push(_this.jsData[i].code)
        }
        _this.temp.role = jsonstring
        _this.temp.rolescode = authorityCodes
        _this.temp.roleCodes = authorityCodes
        _this.roletree = false
      }
    },
    // 获取角色信息
    selectRole(data) {
      this.jsData = data
    },
    // 授权前置空信息
    resetjurtemp() {
      this.jurtemp.rolename = ''
      this.jurtemp.code = ''
      this.jurtemp.authorityCodes = ''
    },
    // 用户授权
    authorization() {
      const _this = this
      if (_this.selectlistRow) {
        if (_this.selectlistRow.length !== 0 && _this.selectlistRow.length === 1) {
          _this.resetjurtemp()
          require_get('/v1/users/' + _this.selectlistRow[0].code, {
            token: token,
            authorityCode: 1
          }, {}, function(res) {
            if (res.data.status === 200) {
              var result = res.data.data
              var authoritiesdata = ''
              var authoritiescodedatas = []
              for (let j = 0; j < result.authorities.length; j++) {
                authoritiesdata += result.authorities[j].name + '   '
                authoritiescodedatas.push(result.authorities[j].code)
              }
              _this.jurtemp.rolename = authoritiesdata
              _this.jurtemp.authorityCodes = authoritiescodedatas
            }
          }, function(err) {
            console.log(err)
            _this.$notify({
              title: '系统提示',
              message: '系统错误',
              type: 'warning',
              duration: 2000
            })
          })
          _this.dialogRoleVisible = true
        } else {
          _this.$notify({
            title: '系统提示',
            message: '请选择一个用户进行授权',
            type: 'warning',
            duration: 2000
          })
        }
      } else {
        _this.dialogRoleVisible = true
        _this.$notify({
          title: '系统提示',
          message: '请选择一个用户进行授权',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 选择权限
    chooseRole() {
      const _this = this
      var data = []
      // console.log(this.$refs.tree.getHalfCheckedNodes())
      // console.log(this.$refs.tree.getCheckedNodes())
      for (var i = 0; i < this.$refs.tree.getHalfCheckedNodes().length; i++) {
        data.push(this.$refs.tree.getHalfCheckedNodes()[i])
      }
      for (var j = 0; j < this.$refs.tree.getCheckedNodes().length; j++) {
        data.push(this.$refs.tree.getCheckedNodes()[j])
      }
      // console.log(data)
      // _this.jurtemp.authorityCodes = []
      // _this.jurtemp.rolename = ''
      // console.log(_this.roleAllData.length, '231234342')
      // console.log(_this.roleData.length, '1345524567890-08-')
      if (data.length !== 0) {
        var codesall = []
        var namesall = ''
        for (let i = 0; i < data.length; i++) {
          namesall += data[i].name + '   '
          codesall.push(data[i].code)
        }
        _this.jurtemp.rolename = namesall
        _this.jurtemp.authorityCodes = codesall
        // console.log(_this.jurtemp.rolename)
        // _this.$refs.articleTable.abc()
        _this.deptreeList = false
        _this.getJurList()
      } else if (data.length === 0) {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行添加！',
          type: 'warning',
          duration: 2000
        })
      } else {
        // _this.jurtemp.authorityCodes = []
        // _this.jurtemp.rolename = ''
        var jsonstring = ''
        var authorityCodes = []
        for (let i = 0; i < data.length; i++) {
          jsonstring += data[i].name + '   '
          authorityCodes.push(data[i].code)
        }
        _this.jurtemp.rolename = jsonstring
        _this.jurtemp.authorityCodes = authorityCodes
        _this.deptreeList = false
        // _this.$refs.articleTable.abc()
      }
    },
    // 添加权限
    addrole() {
      const _this = this
      _this.setuserDisabled = true
      const params = {
        userCode: _this.selectlistRow[0].code,
        authorityCodes: _this.jurtemp.authorityCodes
      }
      require_post('/v1/users/acls', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        if (res.data.status === 200) {
          _this.$notify({
            title: '系统提示',
            message: '用户授权成功',
            type: 'success',
            duration: 2000
          })
          _this.setuserDisabled = false
          _this.dialogRoleVisible = false
        } else {
          _this.$notify({
            title: '系统提示',
            message: '用户授权失败',
            type: 'warning',
            duration: 2000
          })
          _this.setuserDisabled = false
        }
      }, function(err) {
        _this.setuserDisabled = false
        console.log(err)
        _this.$notify({
          title: '系统提示',
          message: '用户授权失败',
          type: 'err',
          duration: 2000
        })
      })
    },
    // 获取子组件传值  部门树
    changeGetdata(data) {
      this.listData = data
    },
    // 获取子组件传值 权限树
    Getroledata(data) {
      this.roleData = data
      // console.log(this.roleData, '111')
    },
    GetAllroledata(data) {
      this.roleAllData = data
    },
    // 获取部门list
    getDepList() {
      const _this = this
      require_get('/v1/depts/tree', {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.status === 200) {
          var result = res.data.data
          _this.data = result
        } else {
          _this.$notify({
            title: '错误',
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
    // 选择一个部门
    chooseDer() {
      const _this = this
      if (_this.listData.length !== 0 && _this.listData.length === 1) {
        _this.temp.deptName = _this.listData[0].name
        _this.temp.deptCode = _this.listData[0].code
        _this.comtreeList = false
        // 根据部门code找到对应角色
        require_get('/v1/roles/byDeptCode/' + _this.listData[0].code, {
          token: token,
          authorityCode: 1
        }, {}, function(res) {
          if (res.data.status === 200) {
            _this.jsList = res.data.data
            _this.temp.role = ''
            _this.temp.roleCodes = []
          }
        })
      } else {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行添加！',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 获取权限list
    getJurList() {
      const _this = this
      require_get('/v1/acls/tree', {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.status === 200) {
          var result = res.data.data
          _this.datas = result
        } else {
          _this.$notify({
            title: '错误',
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
    // 获取当前用户列表
    getList(page, size) {
      const _this = this
      _this.listLoading = true
      const params = {
        name,
        page: page,
        size: size
      }
      const param = {
        name: _this.listQuery.title,
        page: page,
        size: size
      }
      var ginseng = {}
      if (_this.listQuery.title === null || _this.listQuery.title === '') {
        ginseng = params
      } else {
        ginseng = param
      }
      require_get('/v1/users', {
        token: token,
        authorityCode: 1
      }, ginseng, function(res) {
        _this.listLoading = false
        if (res.data.status === 200) {
          _this.userDatas = res.data.data.list
          _this.total = res.data.data.total
        } else if (res.data.status === 502) {
          _this.$notify({
            title: '系统提示',
            message: '登陆超时，请重新登录',
            type: 'warning',
            duration: 2000
          })
        } else {
          _this.$notify({
            title: '系统提示',
            message: '刷新列表失败',
            type: 'warning',
            duration: 2000
          })
        }
      }, function(err) {
        console.log(err)
        _this.$notify({
          title: '系统错误',
          message: '系统错误，请及时联系管理员',
          type: 'warning',
          duration: 2000
        })
      })
    },
    // 获取当前选中列表数据
    selectRow(val) {
      this.selectlistRow = val
    },
    // 重置temp
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        timestamp: new Date(),
        title: '',
        type: '',
        status: '',
        account: '',
        name: '',
        password: '',
        mail: '',
        telephone: '',
        sex: '',
        remark: '',
        sorting: '',
        roleId: '',
        compony: '',
        department: '',
        role: '',
        company: '',
        deptName: '',
        rolescode: [],
        userRole: '',
        deptCode: '',
        roleCodes: []
      }
    },
    handleCreate() { // 添加弹窗
      this.setDisabled = false
      this.hvuser = false
      this.resetTemp()
      this.isUpdate = true
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userDatas'].clearValidate()
      })
    },
    // 添加弹窗点击确定添加
    addUsers() {
      const _this = this
      if (_this.temp.rolescode === '') {
        _this.temp.rolescode = ['0']
      }
      this.$refs['userDatas'].validate((valid) => {
        if (valid) {
          this.istianjia = true
          require_post('/v1/users', {
            token: token,
            authorityCode: 1
          }, {
            account: _this.temp.account,
            name: _this.temp.name,
            sex: _this.temp.sex,
            mail: _this.temp.mail,
            telephone: _this.temp.telephone,
            remark: _this.temp.remark,
            deptCode: _this.temp.deptCode,
            roleCodes: _this.temp.rolescode
          }, function(res) {
            if (res.data.status === 200) {
              _this.dialogFormVisible = false
              _this.getList(_this.currentPage, _this.pageSize)
              _this.istianjia = false
              _this.$notify({
                title: '系统提示',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            } else {
              _this.istianjia = false
              _this.$notify({
                title: '系统提示',
                message: '创建失败',
                type: 'error',
                duration: 2000
              })
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
    handleUpdate(row) { // 编辑弹窗
      this.setDisabled = false
      this.hvuser = false
      this.isUpdate = true
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userDatas'].clearValidate()
      })
    },
    handleInfo(row) { // 详细弹窗
      this.dialogStatus = 'info'
      this.hvuser = true
      this.dialogFormVisible = true
      this.isUpdate = false
      this.setDisabled = true
      this.getUserDetail(row.code)
    },
    getUserDetail(code) { // 获取用户详情
      this.dialogFormVisible = true
      const _this = this
      require_get('/v1/users/' + code, {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.status === 200) {
          var result = res.data.data
          const number = result.sex
          var sexs = ''
          if (number === 0) {
            sexs = '0'
          } else if (number === 1) {
            sexs = '1'
          }
          var jsonstring = ''
          var codedatas = []
          for (let i = 0; i < result.roles.length; i++) {
            jsonstring += result.roles[i].name + '   '
            codedatas.push(result.roles[i].code)
          }
          _this.temp.roleCodes = codedatas
          var authoritiesdata = ''
          for (let j = 0; j < result.authorities.length; j++) {
            authoritiesdata += result.authorities[j].name + '   '
          }
          _this.temp.account = result.account
          _this.temp.name = result.name
          _this.temp.sex = sexs
          _this.temp.deptName = result.deptName
          _this.temp.telephone = result.telephone
          _this.temp.mail = result.mail
          _this.temp.role = jsonstring
          _this.temp.deptCode = result.deptCode
          _this.temp.remark = result.remark
          _this.temp.userRole = authoritiesdata
          _this.temp.code = result.code
        }
      }, function(err) {
        console.log(err)
        _this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行编辑',
          type: 'warning',
          duration: 2000
        })
      })
    },
    edit() { // 编辑操作
      const _this = this
      if ((_this.selectlistRow | _this.selectlistRow.length !== 0) && _this.selectlistRow.length === 1) {
        _this.isUpdate = true
        this.handleUpdate()
        _this.getUserDetail(_this.selectlistRow[0].code)
      } else {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行编辑',
          type: 'warning',
          duration: 2000
        })
      }
    },
    delData() { // 勾选一条或多条数据删除
      const _this = this
      if (_this.selectlistRow) {
        if (_this.selectlistRow.length !== 0) {
          _this.$confirm('确认要删除么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var codes = []
            for (let i = 0; i < _this.selectlistRow.length; i++) {
              codes.push(_this.selectlistRow[i].code)
            }
            $.ajax({
              url: baseIP + '/v1/users/',
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
                } else {
                  _this.$notify({
                    title: '系统提示',
                    message: '删除失败',
                    type: 'warning',
                    duration: 2000
                  })
                }
              }
            })
          }).catch(() => {
            _this.$notify.info({
              title: '系统提示',
              message: '已取消删除',
              type: 'warning',
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
    // 用户启用
    enable() {
      const _this = this
      if (_this.selectlistRow) {
        if (_this.selectlistRow.length !== 0 && _this.selectlistRow.length === 1) {
          const val = _this.selectlistRow
          require_patch('/v1/users/start/' + val[0].code, {
            token: token,
            authorityCode: 1
          }, {}, function(res) {
            if (res.data.status === 200) {
              _this.getList(_this.currentPage, _this.pageSize)
            } else {
              _this.$notify({
                title: '系统提示',
                message: '禁用失败',
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
        } else {
          _this.$notify({
            title: '系统提示',
            message: '请选择一条数据进行禁用操作！',
            type: 'warning',
            duration: 2000
          })
        }
      } else {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行禁用操作！',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 用户禁用
    disable() {
      const _this = this
      if (_this.selectlistRow) {
        if (_this.selectlistRow.length !== 0 && _this.selectlistRow.length === 1) {
          const val = _this.selectlistRow
          require_patch('/v1/users/stop/' + val[0].code, {
            token: token,
            authorityCode: 1
          }, {}, function(res) {
            if (res.data.status === 200) {
              _this.getList(_this.currentPage, _this.pageSize)
            } else {
              _this.$notify({
                title: '系统提示',
                message: '禁用失败',
                type: 'fail',
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
        } else {
          _this.$notify({
            title: '系统提示',
            message: '请选择一条数据进行禁用操作！',
            type: 'warning',
            duration: 2000
          })
        }
      } else {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行禁用操作！',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 搜索调用
    search() {
      this.getList(this.currentPage, this.pageSize)
    },
    // 备用，重置调用
    reset() {
      this.listQuery = []
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
    updateData() {
      const _this = this
      _this.$refs['userDatas'].validate((valid) => {
        if (valid) {
          require_put('/v1/users/', {
            token: token,
            authorityCode: 1
          }, {
            code: _this.selectlistRow[0].code,
            account: _this.temp.account,
            name: _this.temp.name,
            mail: _this.temp.mail,
            telephone: _this.temp.telephone,
            sex: _this.temp.sex,
            remark: _this.temp.remark,
            deptCode: _this.temp.deptCode,
            roleCodes: _this.temp.roleCodes
          }, function(res) {
            if (res.data.status === 200) {
              _this.dialogFormVisible = false
              _this.$notify({
                title: '系统提示',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              _this.dialogFormVisible = false
              _this.getList(_this.currentPage, _this.pageSize)
            } else {
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
</style>
