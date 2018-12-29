<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="权限名称" v-model="listQuery.title"></el-input> -->
      <!-- <el-button class="filter-item" size="small" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button> -->
      <!-- <el-button class="filter-item btn_right" size="small" style="margin-left: 10px;float:rignt;" type="danger" v-if="item.name === '删除'" v-waves icon="el-icon-delete" @click.prevent="delData()">{{item.name}}</el-button>
      <el-button class="filter-item btn_right" size="small" style="margin-left: 10px;float:rignt;" type="primary" v-if="item.name === '编辑'" v-waves icon="el-icon-edit" @click="edit()">{{item.name}}</el-button>
      <el-button class="filter-item btn_right" size="small" style="margin-left: 10px;float:rignt;" type="primary" v-if="item.name === '添加'" v-waves icon="el-icon-circle-plus-outline" @click="handleCreate">{{item.name}}</el-button> -->
      <div class="btn_right" v-for='item in authorityCodebutton' :key='item.a'>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-circle-plus-outline" v-if="item.name === '添加'"  @click="handleCreate">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-edit" v-if="item.name === '编辑'" @click="edit()">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="danger" v-waves icon="el-icon-delete" v-if="item.name === '删除'" @click.prevent="delData()">{{item.name}}</el-button>
      </div>
    </div>
    <tree-table :data="data" :columns="columns" border @getClickedType="changeGetdata" @getdataob="seeDetail"></tree-table>
    <!-- 添加的弹出窗部分 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="480px">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="120px" style='margin-left:15px;' :disabled="setDisabled">
        <el-form-item label="权限名称" required prop='rolename'>
          <el-input v-model="temp.rolename" style="width:250px;"></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="上级权限" >
          <el-input v-model="temp.name" style="width:250px;" @focus="opender"></el-input>
        </el-form-item>
        <el-form-item label="添加类型" required prop='type'>
           <el-select class="filter-item" v-model="temp.type" placeholder="请选择类型" style="width:250px">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" required prop='sorting'>
          <el-input v-model="temp.sorting" style="width:250px;"></el-input>
        </el-form-item>
        <el-form-item label="图标路径">
          <el-input v-model="temp.icon" style="width:250px;"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="temp.url" style="width:250px;"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" style="width:250px" v-model="temp.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer"  v-if="isUpdate">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createRole" :loading='istianjia'>{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    
    <!--添加的部门弹出框-->
    <el-dialog  :visible.sync="deptreeList" width="480px" style="margin-left: 100px;">
      <treeTableForTc :data="datas" :columns="columna" border @getClickedType="changeGetdata"></treeTableForTc>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="closeup">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="chooseDer">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import treeTable from '@/components/TreeTableForJurisdiction'
import treeTableForTc from '@/components/TreeTableForTc'
import $ from 'jquery'
import { require_get, require_post, require_put, baseIP, controllbutton } from '@/assets/pubJS'
const token = sessionStorage.getItem('token')

const typeLsit = [
  {
    value: 1,
    label: '菜单'
  }, {
    value: 2,
    label: '按钮'
  }
]

const typeValue = typeLsit.reduce((acc, cur) => {
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
    const validateRquTel = (rule, value, callback) => {
      const regex = /^[0-9]{1,5}$/
      if (value !== '') {
        if (regex.test(value) === false) {
          callback(new Error('请输入小于5位的数字序号'))
        } else {
          callback()
        }
      } else {
        callback('请输入序号')
      }
    }
    return {
      istianjia: false,
      data: [], // 权限列表
      datas: [],
      setDisabled: false, // 设置表单不可编辑
      listData: [],
      deptreeList: false,
      columna: [
        {
          text: '权限名称',
          value: 'name',
          width: 350
        }
      ],
      columns: [
        {
          text: '权限名称',
          value: 'name',
          width: 290
        },
        {
          text: '创建时间',
          value: 'createAt',
          width: 170
        },
        {
          text: '类型',
          value: 'type',
          width: 130
        },
        {
          text: '图标路径',
          value: 'icon',
          width: 270
        },
        {
          text: '菜单路径',
          value: 'url',
          width: 290
        },
        // {
        //   text: '排序',
        //   value: 'sorting',
        //   width: 130
        // },
        {
          text: '备注',
          value: 'remark',
          width: 230
        }
      ],
      typeList: [
        {
          value: 1,
          label: '菜单'
        },
        {
          value: 2,
          label: '按钮'
        }
      ],
      data2: [],
      currentPage: 1,
      pageSize: 15,
      tableKey: 0,
      isUpdate: true,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      props: {
        label: 'name',
        children: 'zones'
      },
      authorityCodebutton: [],
      authorityCodePage: '',
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: '',
        status1: '',
        pcode: '0',
        name: '',
        rolename: '',
        icon: '',
        url: '',
        sorting: '',
        code: '0'
      },
      buttonlist: [], // 按钮列表
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '添加权限',
        update: '编辑权限',
        info: '权限详细'
      },
      rules: {
        rolename: [{ required: true, message: '请输入权限名称' }],
        name: [{ required: true, message: '请选择上级公司' }],
        type: [{ required: true, message: '请选择类型' }],
        sorting: [{ validator: validateRquTel }],
        icon: [{ required: true, message: '请输入图标路径' }],
        url: [{ required: true, message: '请输入菜单路径' }],
        remark: [{ required: true, message: '请填写备注' }]
      }
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
  mounted() {
    this.authorityCodebutton = this.buttonlist[0]
    this.authorityCodePage = this.buttonlist[1]
    console.log(this.buttonlist, '123456')
  },
  created() {
    const url = sessionStorage.getItem('index')
    this.buttonlist = controllbutton(url)
    this.getJurList()
  },
  methods: {
    opender() {
      this.deptreeList = true
    },
    closeup() {
      this.deptreeList = false
      this.getJurList()
    },
    chooseDer() {
      const _this = this
      if (_this.listData.length !== 0 && _this.listData.length === 1) {
        _this.temp.name = _this.listData[0].name
        _this.temp.code = _this.listData[0].code
        _this.deptreeList = false
      } else if (_this.listData.length === 0) {
        _this.deptreeList = false
        _this.temp.code = '0'
      } else {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行添加！',
          type: 'warning',
          duration: 2000
        })
      }
    },
    seeDetail(val) {
      console.log(val)
      this.dialogStatus = 'info'
      this.isUpdate = false
      this.setDisabled = true
      this.handleUpdate(val)
    },
    // 获取子组件传值
    changeGetdata(data) {
      this.listData = data
      console.log(this.listData, '111')
    },
    getJurList() { // 获取公司list
      const _this = this
      require_get('/v1/acls/tree', {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        console.log(res)
        // var data = []
        if (res.data.status === 200) {
          var result = res.data.data
          for (var i = 0; i < result.length; i++) {
            if (result[i].type === 1) {
              result[i].type = '菜单'
            } else if (result[i].type === 2) {
              result[i].type = '按钮'
            }
            for (var j = 0; j < result[i].childList.length; j++) {
              if (result[i].childList[j].type === 1) {
                result[i].childList[j].type = '菜单'
              } else if (result[i].childList[j].type === 2) {
                result[i].childList[j].type = '按钮'
              }
              for (var z = 0; z < result[i].childList[j].childList.length; z++) {
                if (result[i].childList[j].childList[z].type === 1) {
                  result[i].childList[j].childList[z].type = '菜单'
                } else if (result[i].childList[j].childList[z].type === 2) {
                  result[i].childList[j].childList[z].type = '按钮'
                }
              }
            }
          }
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
          title: '系统提示',
          message: '系统错误',
          type: 'error',
          duration: 2000
        })
      })
    },
    delData() { // 勾选一条或多条数据删除
      const _this = this
      if (_this.listData) {
        const codes = []
        for (let i = 0; i < _this.listData.length; i++) {
          codes.push(_this.listData[i].code)
          // for (let j = 0; j < _this.listData[i].childList.length; j++) {
          //   codes.push(_this.listData[i].childList[j].code)
          //   for (let z = 0; z < _this.listData[i].childList[j].childList.length; z++) {
          //     codes.push(_this.listData[i].childList[j].childList[z].code)
          //     for (let h = 0; h < _this.listData[i].childList[j].childList[z].childList.length; h++) {
          //       codes.push(_this.listData[i].childList[j].childList[z].childList[h].code)
          //     }
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
              url: baseIP + '/v1/acls',
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
                  _this.getJurList()
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
    edit() {
      const _this = this
      this.setDisabled = false
      this.isUpdate = true
      _this.dialogStatus = 'update'
      if ((_this.listData | _this.listData.length !== 0) && _this.listData.length === 1) {
        _this.handleUpdate(_this.listData[0])
      } else {
        _this.$notify({
          title: '系统提示',
          message: '请选择一条或多条数据进行操作！',
          type: 'warning',
          duration: 2000
        })
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: '',
        status1: '',
        pcode: '0',
        name: '',
        rolename: '',
        icon: '',
        url: '',
        sorting: '',
        code: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.setDisabled = false
      this.isUpdate = true
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createRole() {
      if (this.temp.code === '') {
        this.temp.code = '0'
      }
      const params = {
        name: this.temp.rolename,
        pcode: this.temp.code,
        type: this.temp.type,
        sorting: this.temp.sorting,
        icon: this.temp.icon,
        url: this.temp.url,
        remark: this.temp.remark
      }
      const _this = this
      _this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.istianjia = true
          require_post('/v1/acls', {
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
              _this.getJurList()
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
    handleUpdate(row) {
      const _this = this
      _this.dialogFormVisible = true
      _this.$nextTick(() => {
        _this.$refs['dataForm'].clearValidate()
      })
      require_get('/v1/acls/' + row.code, {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        var result = res.data.data
        _this.temp.rolename = result.name
        _this.temp.name = result.pname
        _this.temp.type = result.type
        _this.temp.sorting = result.sorting
        _this.temp.icon = result.icon
        _this.temp.url = result.url
        _this.temp.remark = result.remark
        _this.temp.code = result.code
        _this.temp.pcode = result.pcode
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
    updateData() {
      const _this = this
      const params = {
        code: _this.temp.code,
        name: _this.temp.rolename,
        pcode: _this.temp.pcode,
        type: _this.temp.type,
        sorting: _this.temp.sorting,
        icon: _this.temp.icon,
        url: _this.temp.url,
        remark: _this.temp.remark
      }
      _this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          require_put('/v1/acls', {
            token: token,
            authorityCode: 1
          }, params, function(res) {
            _this.dialogFormVisible = false
            if (res.data.status === 200) {
              _this.$notify({
                title: '系统提示',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              _this.getJurList()
            } else {
              _this.$notify({
                title: '系统提示',
                message: '更新失败',
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
        }
      })
    },
    // 获取当前用户列表
    getList(page, size) {
      this.listLoading = true
      const _this = this
      const params = {
        name: _this.listQuery.title,
        page: page,
        size: size
      }
      require_get('/v1/acls', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        _this.data = res.data.data.list
      })
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    }
  }
}
</script>

<style>
  .btn_right{
    float: right;
  }
</style>
