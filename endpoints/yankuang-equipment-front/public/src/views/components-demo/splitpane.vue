<template>
  <div class="app-container" style="width:100%">
    <div class="filter-container" style="width:100%">
      <div style="float:right;" v-for='item in authorityCodebutton' :key='item.a'>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline" v-if="item.name === '添加同级'" @click="handleCreate('1')">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline" v-if="item.name === '添加子级'" @click="handleCreate('2')">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary"  icon="el-icon-edit" v-if="item.name === '编辑'" @click="edit()">{{item.name}}</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="danger" icon="el-icon-delete" v-if="item.name === '删除'" @click="delData()">{{item.name}}</el-button>
      </div>
    </div>
    <tree-table :data="data" :columns="columns" @getClickedType="changeClickedType" border></tree-table>
    <!-- 添加类型弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="800px">
      <el-form :rules="rules" status-icon ref="dataForm" :model="temp" label-position="right" label-width="120px" style="max-height: 420px; overflow: auto;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'类型名称'" required prop="name">
              <el-input v-model="temp.name" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'编码'" required prop="code" v-if="dialogTitle === '添加类型'">
              <el-input v-model="temp.code" style="width:250px" :maxlength="maxLength" :minlength="minLength" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item :label="'编码'" required prop="editCode"  v-if="dialogTitle === '编辑类型'">
              <el-input v-model="temp.editCode" style="width:250px" :maxlength="maxLength" :minlength="minLength"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'主要技术参数'" prop="mainPara">
              <el-input v-model="temp.mainPara" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'参数类型'" prop="mainParaType">
              <el-select filterable class="filter-item" v-model="temp.mainParaType" style="width:250px">
                <el-option v-for="item in paramsTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'自定义参数1'" prop="defPara1">
              <el-input v-model="temp.defPara1" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'参数类型'" prop="defPara1Type">
              <el-select filterable class="filter-item" v-model="temp.defPara1Type" style="width:250px">
                <el-option v-for="item in paramsTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'自定义参数2'" prop="defPara2">
              <el-input v-model="temp.defPara2" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'参数类型'" prop="defPara2Type">
              <el-select filterable class="filter-item" v-model="temp.defPara2Type" style="width:250px">
                <el-option v-for="item in paramsTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'自定义参数3'" prop="defPara3">
              <el-input v-model="temp.defPara3" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'参数类型'" prop="defPara3Type">
              <el-select filterable class="filter-item" v-model="temp.defPara3Type" style="width:250px">
                <el-option v-for="item in paramsTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'自定义参数4'" prop="defPara4">
              <el-input v-model="temp.defPara4" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'参数类型'" prop="defPara4Type">
              <el-select filterable class="filter-item" v-model="temp.defPara4Type" style="width:250px">
                <el-option v-for="item in paramsTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'自定义参数5'" prop="defPara5">
              <el-input v-model="temp.defPara5" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'参数类型'" prop="defPara5Type">
              <el-select filterable class="filter-item" v-model="temp.defPara5Type" style="width:250px">
                <el-option v-for="item in paramsTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'自定义参数6'" prop="defPara6">
              <el-input v-model="temp.defPara6" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'参数类型'" prop="defPara6Type">
              <el-select filterable class="filter-item" v-model="temp.defPara6Type" style="width:250px">
                <el-option v-for="item in paramsTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'自定义参数7'" prop="defPara7">
              <el-input v-model="temp.defPara7" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'参数类型'" prop="defPara7Type">
              <el-select filterable class="filter-item" v-model="temp.defPara7Type" style="width:250px">
                <el-option v-for="item in paramsTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'自定义参数8'" prop="defPara8">
              <el-input v-model="temp.defPara8" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'参数类型'" prop="defPara8Type">
              <el-select filterable class="filter-item" v-model="temp.defPara8Type" style="width:250px">
                <el-option v-for="item in paramsTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogTitle=='添加类型'" type="primary"  @click="addType()">确定</el-button><!--  @click="createData" -->
        <el-button v-else type="primary" @click="updateType()">确定</el-button> <!--  @click="updateData" -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { require_get, require_put, require_post, require_delete, controllbutton } from '@/assets/pubJS'
import treeTable from '@/components/TreeTableForSplitPane'
import Cookies from 'js-cookie'
const token = Cookies.get('token')

export default {
  name: 'splitpane-demo',
  components: { treeTable },
  data() {
    // 表单验证
    const validateCode = (rule, value, callback) => { // 编码验证
      const level = this.subData.rowData.level
      if (value === '') {
        callback(new Error(rule.msg))
      } else if (this.isSame && value.length !== level * 2) {
        callback(new Error(`请输入${level * 2}位数字编码`))
      } else if (!this.isSame && value.length !== (level + 1) * 2) {
        callback(new Error(`请输入${(level + 1) * 2}位数字编码`))
      } else {
        callback()
      }
    }
    const validateEditCode = (rule, value, callback) => { // 编码验证
      const level = this.subData.rowData.level
      if (value === '') {
        callback(new Error(rule.msg))
      } else if (value.length !== level * 2) {
        callback(new Error(`请输入${level * 2}位数字编码`))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => { // 类型名称验证
      if (value === '') {
        callback(new Error(rule.msg))
      } else {
        callback()
      }
    }
    // 表单验证结束
    return {
      dialogTitle: '',
      maxLength: 2, // 设置编码最大长度
      minLength: 2, // 设置编码最小长度
      isSame: true, // 判断点击的添加同级或子级
      subData: {}, // 子组件传过来的数据
      paramsTypeList: [ // 参数类型
        {
          value: '文本',
          label: '文本'
        }, {
          value: '数字',
          label: '数字'
        }
      ],
      rules: { // 校验
        name: [{ msg: '请输入一个类型名称', validator: validateName }],
        code: [{ msg: '请输入编码', validator: validateCode }],
        editCode: [{ msg: '请输入编码', validator: validateEditCode }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑类型',
        create: '添加类型'
      },
      temp: {
        name: '', // 类型名
        code: '', // 编码
        editCode: '', // 编辑时code
        typeId: null,
        mainPara: '', // 主要技术参数
        mainParaType: '', // 主要技术参数类型
        defPara1: '', // 自定义参数1
        defPara1Type: '', // 自定义参数1类型
        defPara2: '',
        defPara2Type: '',
        defPara3: '',
        defPara3Type: '',
        defPara4: '',
        defPara4Type: '',
        defPara5: '',
        defPara5Type: '',
        defPara6: '',
        defPara6Type: '',
        defPara7: '',
        defPara7Type: '',
        defPara8: '',
        defPara8Type: ''
      },
      columns: [
        {
          text: '类型名称',
          value: 'name',
          width: 300
        },
        {
          text: '编码',
          value: 'code',
          width: 130
        },
        {
          text: '主要技术参数',
          value: 'mainPara',
          width: 130
        },
        {
          text: '自定义参数1',
          value: 'defPara1',
          width: 130
        },
        {
          text: '自定义参数2',
          value: 'defPara2',
          width: 130
        },
        {
          text: '自定义参数3',
          value: 'defPara3',
          width: 130
        },
        {
          text: '自定义参数4',
          value: 'defPara4',
          width: 130
        },
        {
          text: '自定义参数5',
          value: 'defPara5',
          width: 130
        },
        {
          text: '自定义参数6',
          value: 'defPara6',
          width: 130
        },
        {
          text: '自定义参数7',
          value: 'defPara7',
          width: 130
        },
        {
          text: '自定义参数8',
          value: 'defPara8',
          width: 130
        }
      ],
      data: [], // 设备类型数据源
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
    this.getSpTypeList()
  },
  methods: {
    setLength(level) { // 设置表单code项长度
      this.maxLength = level * 2
      this.minLength = level * 2
    },
    resetForm(formName) { // 表单重置
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      }
    },
    changeClickedType(data) { // 获取子组件传值
      this.subData = data
    },
    getSpTypeList() { // 获取规格型号列表
      const _this = this
      require_get('/v1/sbtype/list', {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        const result = res.data.data
        if (res.data.meta.code === '200') {
          _this.data = result
        } else {
          _this.$notify({
            title: '系统提示',
            message: res.data.meta.message,
            type: 'warning',
            duration: 2000
          })
        }
      }, function(err) {
        Vue.use(err)
        _this.$notify({
          title: '系统提示',
          message: '系统错误',
          type: 'error',
          duration: 3000
        })
      })
    },
    handleCreate(flag) { // 添加弹窗
      this.dialogTitle = '添加类型'
      this.temp.code = ''
      let level = this.subData.rowData ? this.subData.rowData.level : 1
      if (flag === '1') { // 添加同级或子级
        this.isSame = true
        this.setLength(level)
      } else {
        this.isSame = false
        level += 1
        this.setLength(level)
      }
      if (this.subData && this.subData.length === 1) {
        this.dialogFormVisible = true
        this.codeShowYN = false
        this.isUpdate = true
        this.resetForm('dataForm')
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行添加操作！',
          type: 'warning',
          duration: 3000
        })
      }
    },
    getSpTypeInfo(id) { // 获取设备类型详细显示在弹框中
      this.codeShowYN = false
      this.dialogFormVisible = true
      const _this = this
      // 获取规格型号详细
      require_get('/v1/sbtypeinfo/find/' + id, {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        const result = res.data.data
        _this.temp.id = result.id
        _this.temp.typeId = result.typeId
        _this.temp.editCode = result.typeCode
        _this.temp.name = result.typeName
        _this.temp.mainPara = result.mainPara
        _this.temp.mainParaType = result.mainParaType
        _this.temp.defPara1 = result.defPara1
        _this.temp.defPara1Type = result.defPara1Type
        _this.temp.defPara2 = result.defPara2
        _this.temp.defPara2Type = result.defPara2Type
        _this.temp.defPara3 = result.defPara3
        _this.temp.defPara3Type = result.defPara3Type
        _this.temp.defPara4 = result.defPara4
        _this.temp.defPara4Type = result.defPara4Type
        _this.temp.defPara5 = result.defPara5
        _this.temp.defPara5Type = result.defPara5Type
        _this.temp.defPara6 = result.defPara6
        _this.temp.defPara6Type = result.defPara6Type
        _this.temp.defPara7 = result.defPara7
        _this.temp.defPara7Type = result.defPara7Type
        _this.temp.defPara8 = result.defPara8
        _this.temp.defPara8Type = result.defPara8Type
      }, function(err) {
        Vue.use(err)
        _this.$notify({
          title: '系统提示',
          message: '系统错误',
          type: 'error',
          duration: 3000
        })
      })
    },
    // getTypeInfo(id) { // 获取设备类型详细信息
    //   // 获取规格型号详细
    //   require_get('/v1/sbtypeinfo/find/' + id, {
    //     token: token,
    //     authorityCode: 1
    //   }, {}, function(res) {
    //     const result = res.data.data
    //   })
    // },
    edit() { // 弹出编辑弹窗方法
      this.dialogTitle = '编辑类型'
      if (this.subData && this.subData.length === 1) {
        this.codeShowYN = true
        this.isUpdate = true
        const tId = this.subData.rowData.id
        const level = this.subData.rowData.level
        this.setLength(level)
        this.getSpTypeInfo(tId)
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行编辑操作',
          type: 'warning',
          duration: 3000
        })
      }
    },
    addType() { // 点击确定添加同级或子级类型
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const pCode = this.subData.rowData.pcode === '' ? '' : this.subData.rowData.pcode// 获取pcode
          const _this = this
          let sorting = 1
          let level = 1
          if (pCode === '') { // 根据层级添加sorting和level
            sorting = 1
            level = 1
          } else {
            sorting = pCode.length / 2
            level = sorting + 1
          }
          const params = { // 添加数据时传参
            code: this.temp.code,
            name: this.temp.name,
            pcode: pCode,
            sorting: sorting,
            level: level,
            remark: '',
            mainPara: this.temp.mainPara || '',
            mainParaType: this.temp.mainParaType || '',
            defPara1: this.temp.defPara1 || '',
            defPara1Type: this.temp.defPara1Type || '',
            defPara2: this.temp.defPara2 || '',
            defPara2Type: this.temp.defPara2Type || '',
            defPara3: this.temp.defPara3 || '',
            defPara3Type: this.temp.defPara3Type || '',
            defPara4: this.temp.defPara4 || '',
            defPara4Type: this.temp.defPara4Type || '',
            defPara5: this.temp.defPara5 || '',
            defPara5Type: this.temp.defPara5Type || '',
            defPara6: this.temp.defPara6 || '',
            defPara6Type: this.temp.defPara6Type || '',
            defPara7: this.temp.defPara7 || '',
            defPara7Type: this.temp.defPara7Type || '',
            defPara8: this.temp.defPara8 || '',
            defPara8Type: this.temp.defPara8Type || ''
          }
          if (this.isSame) { // 添加同级
          } else { // 添加子级
            params.pcode = this.subData.rowData.code
            params.sorting = params.pcode.length / 2
            params.level = params.sorting + 1
          }
          require_post('/v1/sbtype/create', {
            token: token,
            authorityCode: 1
          }, params, function(res) {
            if (res.data.meta.code === '200') {
              _this.dialogFormVisible = false
              _this.getSpTypeList() // 未分页
              _this.$notify({
                title: '系统提示',
                message: '添加成功',
                type: 'success',
                duration: 3000
              })
            } else if (res.data.meta.code === '500') {
              _this.$notify({
                title: '系统提示',
                message: res.data.meta.message,
                type: 'error',
                duration: 3000
              })
            } else if (res.data.meta.code === '400') {
              _this.$notify({
                title: '系统提示',
                message: res.data.meta.message,
                type: 'error',
                duration: 3000
              })
            }
          }, function(err) {
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
    updateType() { // 点击确定更新设备类别
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const _this = this
          const params = {
            id: this.temp.id,
            typeId: this.temp.typeId,
            typeCode: this.temp.editCode,
            typeName: this.temp.name,
            mainPara: this.temp.mainPara || '',
            mainParaType: this.temp.mainParaType || '',
            defPara1: this.temp.defPara1 || '',
            defPara1Type: this.temp.defPara1Type || '',
            defPara2: this.temp.defPara2 || '',
            defPara2Type: this.temp.defPara2Type || '',
            defPara3: this.temp.defPara3 || '',
            defPara3Type: this.temp.defPara3Type || '',
            defPara4: this.temp.defPara4 || '',
            defPara4Type: this.temp.defPara4Type || '',
            defPara5: this.temp.defPara5 || '',
            defPara5Type: this.temp.defPara5Type || '',
            defPara6: this.temp.defPara6 || '',
            defPara6Type: this.temp.defPara6Type || '',
            defPara7: this.temp.defPara7 || '',
            defPara7Type: this.temp.defPara7Type || '',
            defPara8: this.temp.defPara8 || '',
            defPara8Type: this.temp.defPara8Type || ''
          }
          require_put('/v1/sbtypeinfo/update', {
            token: token,
            authorityCode: 1
          }, params, function(res) {
            if (res.data.meta.code === '200') {
              _this.dialogFormVisible = false
              _this.getSpTypeList() // 未分页
              _this.$notify({
                title: '系统提示',
                message: '更新成功',
                type: 'success',
                duration: 3000
              })
            } else {
              _this.$notify({
                title: '系统提示',
                message: res.data.meta.message,
                type: 'error',
                duration: 3000
              })
            }
          }, function(err) {
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
    delData() { // 点击删除
      if (this.subData && this.subData.length === 1) {
        const id = this.subData.rowData.id
        this.$confirm('确认删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const _this = this
          require_delete('/v1/sbtype/delete/' + id, {
            token: token,
            authorityCode: 1
          }, {}, function(res) {
            if (res.data.meta.code === '200') {
              _this.dialogFormVisible = false
              _this.getSpTypeList() // 未分页
              _this.$notify({
                title: '系统提示',
                message: '删除成功！',
                type: 'success',
                duration: 2500
              })
            } else {
              _this.$notify({
                title: '系统提示',
                message: res.data.meta.message,
                type: 'error',
                duration: 3000
              })
            }
          }, function(err) {
            Vue.use(err)
            _this.$notify({
              title: '系统提示',
              message: '系统错误',
              type: 'error',
              duration: 3000
            })
          })
        }).catch(() => {
          this.$notify({
            title: '系统提示',
            message: '取消删除！',
            type: 'info',
            duration: 3000
          })
        })
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行删除操作！',
          type: 'warning',
          duration: 3000
        })
      }
    },
    // 每页多少条
    handleSizeChange(val) {
      // this.getList(this.currentPage, val)
    },
    // 当前页多少条
    handleCurrentChange(val) {
      // this.getList(val, this.pageSize)
    }
  }
}
</script>

<style scoped>
  .components-container {
    position: relative;
    height: 100vh;
  }
  .left-container {
    background-color: #F38181;
    height: 100%;
  }
  .right-container {
    background-color: #FCE38A;
    height: 200px;
  }
  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }
  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }
  .block {
    margin-top: 15px;
  }
</style>
