<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-input @keyup.enter.native="search" style="width: 140px;" class="filter-item" placeholder="退租人" v-model="listQuery.name"></el-input>
        <el-select filterable clearable style="width: 140px" class="filter-item" v-model="listQuery.planPosition" placeholder="退租单位">
          <el-option v-for="item in applyCompanyList" :key="item.positionId" :label="item.name" :value="item.positionId">
          </el-option>
        </el-select>
        <el-date-picker v-model="listQuery.startDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 140px;" class="filter-item" placeholder="退租日期起"></el-date-picker>
        <el-date-picker v-model="listQuery.endDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 140px;" class="filter-item" placeholder="退租日期止"></el-date-picker>
      </el-row>
      <el-row>
        <el-button class="filter-item" type="primary" size="small" v-waves icon="el-icon-search" @click="search">搜索</el-button>
        <el-button class="filter-item" size="small" v-waves icon="el-icon-refresh" @click="reset">重置</el-button>
        <div class="btn_right"  v-for='item in authorityCodebutton' :key='item.a'>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-circle-plus-outline" v-if="item.name === '退租申请'" @click="handleCreate">退租申请</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-edit" v-if="item.name === '编辑'" @click="edit()">编辑</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-circle-check" v-if="item.name === '提交'" @click="submit()">提交</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-question" v-if="item.name === '审核'" @click="examine()">审核</el-button>
          <el-button class="filter-item" size="small" style="margin-left: 10px;" type="danger" v-waves icon="el-icon-delete" v-if="item.name === '删除'" @click.prevent="delData()">删除</el-button>
        </div>
      </el-row>
    </div>

    <!--设备申请列表-->
    <el-table :key='tableKey' :data="eqApplicationTable" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%" @selection-change='selectRow' ref="moviesTable" :height="tableHeight">
      <el-table-column type="selection" width="35"></el-table-column>
      <!-- <el-table-column width="300px" align="center" label="编号" >
        <template slot-scope="scope">
          <span class="link-type" @click="handleInfo(scope.row)">{{scope.row.code}}</span>
        </template>
      </el-table-column> -->
      <el-table-column width="180px" align="center" label="退租单位">
        <template slot-scope="scope">
          <span  class="link-type" @click="handleInfo(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="退租人">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="退租日期">
        <template slot-scope="scope">
          <span>{{scope.row.useAt}}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="状态">
        <template slot-scope="scope">
          <span v-bind:class="{ danger: scope.row.status === '1' }">{{scope.row.status | statusFilter}}</span>
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

    <!-- 设备申请弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">
      <p class="commonTit">基本信息</p>
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" :disabled="setDisabled">
        <!-- <el-form-item label="编号" class="el-col el-col-6" v-if="codeShowYN">
          <span>{{temp.code}}</span>
        </el-form-item> -->
        <el-form-item label="退租单位" required prop="planPosition" class="el-col el-col-6">
          <el-select filterable class="filter-item" v-model="temp.planPosition">
            <el-option v-for="item in applyCompanyList" :key="item.positionId" :label="item.name" :value="item.positionId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退租人" prop="applyName" class="el-col el-col-6">
          <span>{{temp.applyName}}</span>
        </el-form-item>
        <el-form-item label="退租日期" prop="applyDate" class="el-col el-col-6">
          <el-date-picker v-model="temp.applyDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" class="filter-item" :readonly="!(textMap[dialogStatus] === '通用设备退租申请')"></el-date-picker>
        </el-form-item>
        <div style="clear:both"></div>
        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" v-model="temp.remarks">
          </el-input>
        </el-form-item>
      </el-form>
      <p class="commonTit">设备列表</p>
      <el-button class="filter-item btn_right" size="small" style="margin-bottom: 10px;" v-if="isUpdate" v-waves @click="eqDialogShow">添加</el-button>
      <el-table :data="equipmentDatas" border fit highlight-current-row height="280px">
        <el-table-column prop="equipmentBigType" width="150" align="center" label="设备大类">
          <template slot-scope="scope">
            <span>{{scope.row.bigTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentMiddleType" width="150" align="center" label="设备中类">
          <template slot-scope="scope">
            <span>{{scope.row.middleTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentSmallType" width="150" align="center" label="设备小类">
          <template slot-scope="scope">
            <span>{{scope.row.smallTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="jssbh" width="150" align="center" label="技术识别号">
          <template slot-scope="scope">
            <span>{{scope.row.teachCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentName" width="150" align="center" label="设备名称">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentNum" width="150" align="center" label="设备数量">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentSpecification" width="150" align="center" label="规格型号">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentModel}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentParamName" width="150" align="center" label="技术参数名">
          <template slot-scope="scope">
            <span>{{scope.row.mainParamName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentParamValue" width="150" align="center" label="技术参数值">
          <template slot-scope="scope">
            <span>{{scope.row.mainParamValue}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="itemEffect" width="150" align="center" label="功能位置">
          <template slot-scope="scope">
            <span>{{scope.row.effectName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sbsbm" width="150" align="center" label="设备识别码">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="itemRemarks" width="200" align="center" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <a class="delEq" :class="{showOperBtn:setDisabled}" @click="handleDelete(scope.$index, equipmentDatas)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <el-form style="margin-top: 10px;" v-if="isExamine">
        <el-form-item label="审批意见">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" v-model="temp.planOpinion"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addApply">确定</el-button>
        <el-button v-else type="primary" @click="updateApply">确定</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="isExamine">
        <el-button type="success" @click="examinePass">通过</el-button>
        <el-button type="danger" @click="examineUnPass">不通过</el-button>
      </div>
    </el-dialog>

    <!--选择设备弹窗 -->
    <el-dialog width="1000px" :title="textMap_eq[dialogStatus_eq]" :visible.sync="equipmentDialog" append-to-body>
      <el-form ref="eqDataForm" :model="eqColumn" label-position="right" label-width="100px">
        <el-form-item :label="'设备大类'" class="el-col el-col-8">
          <el-select filterable class="filter-item" v-model="eqColumn.bigTypeCode" v-on:change="getEqMiddleTypeList($event)" style="width:200px">
            <el-option v-for="item in sbtypeOneList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'设备中类'" class="el-col el-col-8">
          <el-select filterable class="filter-item" v-model="eqColumn.middleTypeCode" v-on:change="getEqSmallTypeList($event)" style="width:200px">
            <el-option v-for="item in sbtypeTwoList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'设备小类'" class="el-col el-col-8">
          <el-select filterable class="filter-item" v-model="eqColumn.smallTypeCode" style="width:200px">
            <el-option v-for="item in sbtypeThreeList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备识别码" class="el-col el-col-8">
          <el-input class="filter-item" v-model="eqColumn.sbsbm" style="width: 200px" ></el-input>
        </el-form-item>
        <el-form-item label="设备名称" class="el-col el-col-8">
          <el-input class="filter-item" v-model="eqColumn.equipmentName" style="width: 200px" ></el-input>
        </el-form-item>
        <el-form-item label="功能位置" class="el-col el-col-8">
          <el-input v-model="eqColumn.itemEffect" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="规格型号" class="el-col el-col-8">
          <el-input class="filter-item" v-model="eqColumn.equipmentSpecification" style="width: 200px" ></el-input>
        </el-form-item>
        <el-form-item label="生产厂商" class="el-col el-col-8">
          <el-input class="filter-item" v-model="eqColumn.devlop" style="width: 200px" ></el-input>
        </el-form-item>
        <el-form-item class="el-col el-col-8" style="text-align: right;">
          <el-button class="filter-item" type="primary" size="small" v-waves icon="el-icon-search" @click="searchEq">搜索</el-button>
          <el-button class="filter-item" size="small" v-waves icon="el-icon-refresh" @click="reset">重置</el-button>
        </el-form-item>
        <div style="clear:both;"></div>
      </el-form>
      <el-table :data="eqDatas" border fit highlight-current-row height="280px" @selection-change='selectRow1'>
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="bigTypeName" width="150" align="center" label="设备大类">
          <template slot-scope="scope">
            <span>{{scope.row.bigTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="middleTypeName" width="150" align="center" label="设备中类">
          <template slot-scope="scope">
            <span>{{scope.row.middleTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="smallTypeName" width="150" align="center" label="设备小类">
          <template slot-scope="scope">
            <span>{{scope.row.smallTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="teachCode" width="150" align="center" label="技术识别号">
          <template slot-scope="scope">
            <span>{{scope.row.techCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentName" width="150" align="center" label="设备名称">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentNum" width="150" align="center" label="设备数量">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="modelName" width="150" align="center" label="规格型号">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentModel}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentCode" width="150" align="center" label="设备识别码">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mainParamName" width="150" align="center" label="技术参数名">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentParamName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mainParamValue" width="150" align="center" label="技术参数值">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentParamValue}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assetCode" width="150" align="center" label="资产编码">
          <template slot-scope="scope">
            <span>{{scope.row.assetCode}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="factoryName" width="150" align="center" label="生产厂商">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentFactory}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="effectName" width="150" align="center" label="功能位置">
          <template slot-scope="scope">
            <span>{{scope.row.effectName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" width="100" align="center" label="状态">
          <template slot-scope="scope">
            <span>在租</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="equipmentDialog = false">取消</el-button>
        <el-button v-if="dialogStatus_eq=='create'" type="primary" @click="createEq">确定</el-button>
        <!-- <el-button v-else type="primary" @click="updateEq">确定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { require_get, require_post, require_put, baseIP, controllbutton } from '@/assets/pubJS'
import Cookies from 'js-cookie'
import $ from 'jquery'
const token = Cookies.get('token')

const statusList = [{ // 状态列表
  value: '1',
  label: '未提交'
}, {
  value: '2',
  label: '已提交'
}, {
  value: '3',
  label: '审核未通过'
}, {
  value: '4',
  label: '审核已通过'
}]
const statuslabel = statusList.reduce((acc, cur) => { // 状态
  acc[cur.value] = cur.label
  return acc
}, {})

export default {
  name: 'eqApplication_ty',
  directives: {
    waves
  },
  data() {
    return {
      rules: { // 校验
        planPosition: [{ required: true, message: '请选择退租单位', trigger: 'change' }]
      },
      tableHeight: document.body.clientHeight - 275,
      planId: null, // 领用计划id
      tableKey: 0,
      total: null,
      currentPage: 1,
      pageSize: 15,
      listLoading: true,
      dialogFormVisible: false, // 设备申请弹窗显示flag
      codeShowYN: false, // 编号是否显示
      isUpdate: true, // 是编辑，显示操作按钮；是详细，隐藏
      isExamine: false, // ture：是审核；
      setDisabled: false, // 设置表单不可编辑
      dialogStatus: '', // 设备申请弹窗的名
      equipmentDialog: false, // 选择设备弹窗显藏变量
      textMap: {
        update: '通用设备退租申请编辑',
        create: '通用设备退租申请',
        info: '通用设备退租详细',
        examine: '通用设备退租审核'
      },
      dialogStatus_eq: '', // 选择设备弹窗
      textMap_eq: {
        create: '选择设备',
        update: '选择设备'
      },
      listQuery: {
        name: '',
        startDate: '',
        endDate: '',
        planPosition: ''
      },
      applyCompanyList: [{
        positionId: '',
        name: ''
      }], // 单位list
      sbtypeOneList: [], // 大类list
      sbtypeTwoList: [], // 中类list
      sbtypeThreeList: [], // 小类list
      eqApplicationTable: [], // 设备申请列表数据集
      equipmentDatas: [],
      eqDatas: [],
      temp: {
        code: '0101001', // 编码
        planPosition: '', // 申请单位id
        positionName: '', // 单位名
        applyName: '', // 申请人
        applyId: 12, // 申请人id
        applyDate: this.formatDate(), // 申请日期
        remarks: '', // 备注
        eqList: [] // 设备列表
      },
      eqColumn: {
        id: '',
        itemId: '', // 设备记录id
        positionId: '', // 使用单位id
        effectCode: '', // 功能位置编码
        bigTypeCode: '', // 大类编码
        middleTypeCode: '', // 中类编码
        smallTypeCode: '', // 小类编码
        specificationCode: '', // 规格型号编码
        equipmentParamName: '', // 主要技术参数名
        equipmentParamValue: '', // 主要技术参数值
        equipmentName: '', // 设备名称
        equipmentNum: '', // 设备数量
        itemRemarks: '', // 备注
        itemPosition: '', // 使用单位
        itemEffect: '', // 功能位置
        equipmentBigType: '', // 大类
        equipmentMiddleType: '', // 中类
        equipmentSmallType: '', // 小类
        equipmentSpecification: '', // 规格型号
        sbsbm: '', // 设备识别码
        develop: '' // 生产厂商
      },
      nowDate: '',
      user: {},
      position: {},
      buttonlist: [], // 权限按钮列表
      authorityCodebutton: [],
      authorityCodePage: ''
    }
  },
  created() {
    this.user = {
      name: sessionStorage.getItem('name'),
      id: sessionStorage.getItem('id'),
      code: sessionStorage.getItem('code')
    }
    this.position = {
      id: sessionStorage.getItem('deptId'),
      name: sessionStorage.getItem('deptName'),
      code: sessionStorage.getItem('deptCode')
    }
    const url = sessionStorage.getItem('index')
    this.buttonlist = controllbutton(url)
    this.authorityCodebutton = this.buttonlist[0]
    this.authorityCodePage = this.buttonlist[1]
    this.getEqBigTypeList(1, '')
    this.getList(this.currentPage, this.pageSize)
    this.getPosition()
  },
  computed: {
  },
  methods: {
    formatDate() {
      const date = new Date()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const strDate = date.getDate().toString().padStart(2, '0')
      // 时间格式yyyy-MM-dd HH:MM:SS
      return `${date.getFullYear()}-${month}-${strDate}`
    },
    getPosition() { // 获取单位列表
      const _this = this
      this.applyCompanyList = []
      require_get('/v1/elplan?page=1&size=1000&type=3&pCode', {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.status === 200) {
          const list = res.data.data.list
          list.forEach((val, idx) => {
            const pos = {}
            pos.positionId = val.id
            pos.name = val.name
            _this.applyCompanyList.push(pos)
          })
        } else {
          _this.$notify({
            title: '错误',
            message: res.data.meta.message,
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val
    },
    selectRow1(val) {
      this.selectlistRow = val
    },
    search() { // 搜索退租计划调用的方法
      this.listLoading = true
      const _this = this
      const page = this.currentPage
      const size = this.pageSize
      const jsonString = {}
      jsonString.useBy = this.listQuery.name
      jsonString.usePosition = this.listQuery.planPosition
      jsonString.startTime = this.listQuery.startDate
      jsonString.endTime = this.listQuery.endDate
      jsonString.useEquipmentType = '1'
      require_get('/v1/elUses/findListTz?page=' + page + '&size=' + size + '&jsonString=' + JSON.stringify(jsonString), {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        _this.listLoading = false
        var data = []
        if (res.data.status === 200) {
          _this.total = res.data.data.total
          const result = res.data.data.list
          result.forEach((val, idx) => {
            const obj = {}
            obj.id = val.id
            obj.code = val.code
            obj.useAt = val.useAt
            obj.useBy = val.useBy
            obj.usePosition = val.usePosition
            obj.status = val.status
            obj.name = val.name
            obj.userName = val.userName
            obj.version = val.version
            data[idx] = obj
          })
          _this.eqApplicationTable = data
        } else {
          _this.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error',
            duration: 3000
          })
        }
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
            data.forEach(val => {
              if (val.code !== '99') {
                _this.sbtypeOneList.push(val)
              }
            })
          } else if (levelValue === 2) {
            _this.sbtypeTwoList = data
          } else {
            _this.sbtypeThreeList = data
          }
        } else {
          that.$notify({
            title: '错误',
            message: res.data.meta.message,
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    getEqMiddleTypeList(event) { // 大类联动设备中类
      this.eqColumn.middleTypeCode = '' // 清空联动的下拉框默认值
      this.eqColumn.smallTypeCode = ''
      var selectBigCode = event
      this.getEqBigTypeList(2, selectBigCode)
    },
    getEqSmallTypeList(event) { // 中类联动设备小类
      this.eqColumn.smallTypeCode = ''
      var selectMiddleCode = event
      this.getEqBigTypeList(3, selectMiddleCode)
    },
    searchEq() { // 搜索设备调用的方法
      const _this = this
      const year = this.temp.applyDate.substring(0, 4)
      const month = parseInt(this.temp.applyDate.substring(5, 7)) + '' // 去掉0
      const jsonString = {}
      jsonString.planEquipmentType = '1' // 通用设备
      jsonString.bigTypeCode = this.eqColumn.bigTypeCode // 大类编码
      jsonString.middleTypeCode = this.eqColumn.middleTypeCode
      jsonString.smallTypeCode = this.eqColumn.smallTypeCode
      jsonString.equipmentCode = this.eqColumn.sbsbm
      jsonString.equipmentName = this.eqColumn.equipmentName
      jsonString.equipmentModel = this.eqColumn.equipmentSpecification // 规格型号
      jsonString.equipmentFactory = '' // 暂时没有工厂
      jsonString.effectCode = this.eqColumn.effectCode
      jsonString.planYear = year // 申请年限
      jsonString.planMonth = month // 申请月度
      jsonString.positionId = this.temp.planPosition // 退租单位
      require_get('/v1/elplan/findByCreatorId?jsonString=' + JSON.stringify(jsonString) + '&page=1&size=1000', {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.status === 200) {
          const result = res.data.data
          if (result !== null && result.list.length !== 0) {
            _this.eqDatas = result.list
          } else {
            _this.$notify({
              title: '提示',
              message: '查询结果为空！',
              type: 'info',
              duration: 3000
            })
          }
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
      })
    },
    // 重置调用的方法
    reset() {
      this.listQuery.name = ''
      this.listQuery.startDate = ''
      this.listQuery.endDate = ''
      this.listQuery.planPosition = ''
      this.getList(this.currentPage, this.pageSize)
    },
    resetForm() {
      this.eqColumn.bigTypeCode = ''
      this.eqColumn.middleTypeCode = ''
      this.eqColumn.smallTypeCode = ''
      this.eqColumn.sbsbm = ''
      this.eqColumn.equipmentName = ''
      this.eqColumn.itemEffect = ''
      this.eqColumn.equipmentSpecification = ''
      this.eqColumn.develop = ''
    },
    handleDelete(index, row) { // 设备行内删除
      const itemId = row[index].itemId
      if (itemId === undefined) {
        row.splice(index, 1)
      } else {
        const arr = [itemId]
        $.ajax({ // 批量删除时，要用原生ajax
          url: baseIP + '/v1/elUses/deleteById',
          method: 'delete',
          headers: {
            token: token,
            authorityCode: 1
          },
          dataType: 'json',
          data: JSON.stringify({ ids: arr }),
          success: function(res) {
            if (res.status === 200) {
              row.splice(index, 1)
            }
          }
        })
      }
    },
    handleSizeChange(val) { // 每页多少条
      this.getList(this.currentPage, val)
    },
    handleCurrentChange(val) { // 当前页多少条
      this.getList(val, this.pageSize)
    },
    getList(page, size) { // 设备列表
      this.listLoading = true
      const _this = this
      require_get('/v1/elUses/findListTz?page=' + page + '&size=' + size + '&jsonString={"useEquipmentType":"1"}', {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        _this.listLoading = false
        var data = []
        if (res.data.status === 200) {
          if (res.data.data.list.length !== 0) {
            _this.total = res.data.data.total
            const result = res.data.data.list
            result.forEach((val, idx) => {
              const obj = {}
              obj.id = val.id
              obj.code = val.code
              obj.useAt = val.useAt
              obj.useBy = val.useBy
              obj.usePosition = val.usePosition
              obj.status = val.status
              obj.name = val.name
              obj.userName = val.userName
              obj.version = val.version
              data[idx] = obj
            })
            _this.eqApplicationTable = data
          } else {
            _this.$notify({
              title: '提示',
              message: '查询结果为空！',
              type: 'info',
              duration: 3000
            })
          }
        } else {
          _this.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    handleCreate() { // 设备申请弹窗
      this.equipmentDatas = [] // 清空之前操作赋值
      this.dialogFormVisible = true
      this.codeShowYN = false
      this.isUpdate = true
      this.setDisabled = false
      this.isExamine = false
      this.dialogStatus = 'create'
      this.temp.remarks = ''
      this.temp.applyName = this.user.name
      this.temp.planPosition = parseInt(this.position.id)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.$refs['dataForm'].resetFields()
      })
    },
    handleUpdate() { // 编辑计划弹窗
      this.dialogFormVisible = true
      this.codeShowYN = true
      this.isUpdate = true
      this.isExamine = false
      this.setDisabled = false
      this.dialogStatus = 'update'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getPlanInfo(id) { // 获取退租详情
      const _this = this
      this.equipmentDatas = []
      require_get('/v1/elUses/findById/' + id, {
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.status === 200) {
          const result = res.data.data
          _this.temp.applyName = result.userName
          _this.temp.planPosition = result.usePosition
          _this.temp.remarks = result.remarks
          _this.temp.applyDate = result.useAt
          // this.temp.code = result.code // 暂时不用显示
          result.elUseItems.forEach((val, idx) => {
            const obj = {}
            obj.id = val.itemId
            obj.teachCode = val.sbEquipmentT.techCode // 技术识别号
            obj.effectName = val.equipmentEffect // 功能位置
            obj.bigTypeName = val.sbEquipmentT.sbtypeOneName // 大类编码
            obj.middleTypeName = val.sbEquipmentT.sbtypeTwoName // 中类编码
            obj.smallTypeName = val.sbEquipmentT.sbtypeThreeName // 小类编码
            obj.equipmentModel = val.sbEquipmentT.sbmodelCode // 规格型号编码
            obj.mainParamName = val.mainParamName // 主要技术参数名
            obj.mainParamValue = val.mainParamValue // 主要技术参数值
            obj.equipmentName = val.sbEquipmentT.name // 设备名称
            obj.equipmentNum = val.equipmentNum // 设备数量
            obj.equipmentCode = val.sbEquipmentT.code // 设备识别码
            obj.status = '在租' // 备注
            obj.itemId = val.itemId // 已添加的会有itemid
            obj.equipmentId = val.equipmentId
            obj.planUseId = val.planUseId
            obj.equipmentEffect = val.equipmentEffect
            // obj.modelCode = val.sbEquipmentT.sbmodelCode
            _this.equipmentDatas.push(obj)
          })
        } else {
          _this.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    edit() { // 编辑设备申请弹窗
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          // this.handleUpdate(this.selectlistRow[0])
          if (this.selectlistRow[0].status === '1') {
            this.planId = this.selectlistRow[0].id
            this.handleUpdate()
            this.getPlanInfo(this.planId)
          } else {
            this.$notify({
              title: '系统提示',
              message: '该计划已提交不可编辑！',
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
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行编辑！',
          type: 'warning',
          duration: 3000
        })
      }
    },
    handleInfo(row) { // 计划详细弹窗
      this.dialogFormVisible = true
      this.codeShowYN = true
      this.isUpdate = false
      this.isExamine = false
      this.setDisabled = true // 不可编辑表单
      this.dialogStatus = 'info'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.getPlanInfo(row.id)
    },
    eqDialogShow() { // 选择设备弹窗
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.eqDatas = [] // 每次点开设备搜索，清除前一次数据
          this.dialogStatus_eq = 'create'
          this.equipmentDialog = true
          this.resetForm()
          this.$nextTick(() => {
            this.$refs['eqDataForm'].clearValidate()
          })
        } else {
          this.$notify({
            title: '提示',
            message: '请选择退租单位',
            type: 'warning',
            duration: 3000
          })
        }
      })
    },
    addApply() { // 添加设备申请
      this.$refs['dataForm'].validate((valid) => {
        const _this = this
        if (valid) {
          const elUseItemsArr = []
          this.equipmentDatas.forEach(val => {
            const elUseItems = {}
            elUseItems.itemId = val.itemId
            elUseItems.equipmentPosition = this.temp.planPosition // 领用单位id
            elUseItems.equipmentId = val.equipmentId
            elUseItems.planUseId = val.planUseId
            elUseItems.equipmentEffect = val.effectName
            elUseItems.mainParamName = val.mainParamName // 主要技术参数
            elUseItems.mainParamValue = val.mainParamValue
            elUseItemsArr.push(elUseItems)
          })
          const params = {
            useBy: this.user.code, // 登陆后获取当前用户code
            dateTime: this.temp.applyDate,
            remarks: this.temp.remarks,
            usePosition: this.temp.planPosition, // 默认登陆后获取当前用户所在单位id
            createBy: this.user.code, // 登陆后获取当前用户code
            useEquipmentType: 1, // 不加默认通用，2为综机
            elUseItems: elUseItemsArr
          }
          if (elUseItemsArr.length !== 0) {
            require_post('/v1/elUses/createTz', {
              token: token,
              authorityCode: 1
            }, params, function(res) {
              if (res.data.status === 200) {
                _this.dialogFormVisible = false
                _this.getList(_this.currentPage, _this.pageSize)
                _this.$notify({
                  title: '系统提示',
                  message: '添加成功!',
                  type: 'success',
                  duration: 3000
                })
              } else if (res.data.status === 500) {
                _this.$notify({
                  title: '错误',
                  message: res.data.msg,
                  type: 'error',
                  duration: 3000
                })
              }
            })
          } else {
            this.$notify({
              title: '系统提醒',
              message: '设备列表不能为空，请选择设备！',
              type: 'warning',
              duration: 3000
            })
          }
        }
      })
    },
    updateApply() { // 编辑领用申请计划
      this.$refs['dataForm'].validate((valid) => {
        const _this = this
        if (valid) {
          const elUseItemsArr = []
          this.equipmentDatas.forEach(val => {
            const elUseItems = {}
            elUseItems.itemId = val.itemId
            elUseItems.equipmentPosition = this.temp.planPosition // 领用单位id
            elUseItems.equipmentId = val.equipmentId
            elUseItems.planUseId = val.planUseId
            elUseItems.equipmentEffect = val.effectName
            elUseItems.mainParamName = val.mainParamName // 主要技术参数
            elUseItems.mainParamValue = val.mainParamValue
            elUseItemsArr.push(elUseItems)
          })
          const params = {
            id: this.planId,
            useBy: this.user.code, // 登陆后获取当前用户id
            remarks: this.temp.remarks,
            usePosition: this.temp.planPosition, // 登陆后获取当前用户所在单位id
            createBy: this.user.code, // 登陆后获取当前用户id
            useEquipmentType: 1, // 不加默认通用，2为综机
            elUseItems: elUseItemsArr
          }
          if (elUseItemsArr.length !== 0) {
            require_put('/v1/elUses', {
              token: token,
              authorityCode: 1
            }, params, function(res) {
              if (res.data.status === 200) {
                _this.dialogFormVisible = false
                _this.getList(_this.currentPage, _this.pageSize)
                _this.$notify({
                  title: '系统提示',
                  message: '修改成功!',
                  type: 'success',
                  duration: 3000
                })
              } else if (res.data.status === 500) {
                _this.$notify({
                  title: '错误',
                  message: res.data.msg,
                  type: 'error',
                  duration: 3000
                })
              }
            })
          } else {
            this.$notify({
              title: '系统提醒',
              message: '设备列表不能为空，请选择设备！',
              type: 'warning',
              duration: 3000
            })
          }
        }
      })
    },
    createEq() { // 选择设备弹窗确定后数据渲染在设备列表
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0) {
          for (let i = 0; i < this.selectlistRow.length; i++) {
            var obj = {}
            obj.id = parseInt(Math.random() * 100) + 1024
            obj.teachCode = this.selectlistRow[i].techCode // 技术识别号
            obj.effectName = this.selectlistRow[i].effectName // 功能位置
            obj.bigTypeName = this.selectlistRow[i].bigTypeName // 大类编码
            obj.middleTypeName = this.selectlistRow[i].middleTypeName // 中类编码
            obj.smallTypeName = this.selectlistRow[i].smallTypeName // 小类编码
            obj.equipmentModel = this.selectlistRow[i].equipmentModel // 规格型号
            obj.mainParamName = this.selectlistRow[i].equipmentParamName // 主要技术参数名
            obj.mainParamValue = this.selectlistRow[i].equipmentParamValue // 主要技术参数值
            obj.equipmentName = this.selectlistRow[i].equipmentName // 设备名称
            obj.equipmentNum = this.selectlistRow[i].equipmentNum // 设备数量
            obj.equipmentCode = this.selectlistRow[i].equipmentCode // 设备识别码
            obj.status = '在租' // 备注
            obj.equipmentId = this.selectlistRow[i].equipmentId
            obj.planUseId = this.selectlistRow[i].id
            // obj.modelCode = this.selectlistRow[i].modelCode
            this.equipmentDatas.push(obj)
          }
          this.equipmentDialog = false
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success',
            duration: 3000
          })
        } else {
          this.$notify({
            title: '系统提示',
            message: '请选择要添加的设备！',
            type: 'warning',
            duration: 3000
          })
        }
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择要添加的设备！',
          type: 'warning',
          duration: 3000
        })
      }
    },
    submit() { // 提交
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          if (this.selectlistRow[0].status === '1') {
            this.$confirm('确认提交计划吗？提交后不可再编辑！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const id = this.selectlistRow[0].id
              const _this = this
              require_put('/v1/elUses/status/' + id, {
                token: token,
                authorityCode: 1
              }, {}, function(res) {
                if (res.data.status === 200) {
                  _this.dialogFormVisible = false
                  _this.getList(_this.currentPage, _this.pageSize)
                  _this.$notify({
                    title: '系统提示',
                    message: '提交成功！',
                    type: 'success',
                    duration: 3000
                  })
                } else {
                  _this.$notify({
                    title: '错误',
                    message: res.data.msg,
                    type: 'error',
                    duration: 3000
                  })
                }
              })
            }).catch(() => {
              this.$notify({
                title: '系统提示',
                message: '已取消提交！',
                type: 'info',
                duration: 3000
              })
            })
          } else {
            this.$notify({
              title: '系统提示',
              message: '该计划已提交！',
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
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行编辑！',
          type: 'warning',
          duration: 3000
        })
      }
    },
    examine() { // 审核
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          if (this.selectlistRow[0].status === '2') {
            this.dialogFormVisible = true
            this.codeShowYN = true
            this.isUpdate = false
            this.isExamine = true
            this.setDisabled = true // 不可编辑表单
            this.dialogStatus = 'examine'
            this.getPlanInfo(this.selectlistRow[0].id)
            this.planId = this.selectlistRow[0].id
          } else if (this.selectlistRow[0].status === '3' || this.selectlistRow[0].status === '4') {
            this.$notify({
              title: '系统提示',
              message: '该计划已审核！',
              type: 'warning',
              duration: 3000
            })
          } else {
            this.$notify({
              title: '系统提示',
              message: '该计划未提交，不可审核！',
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
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行编辑！',
          type: 'warning',
          duration: 3000
        })
      }
    },
    examinePass() { // 审核通过
      this.dialogFormVisible = false
      const _this = this
      const params = {
        id: this.planId
      }
      require_put('/v1/elUses/successStatusTz', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        if (res.data.status === 200) {
          _this.dialogFormVisible = false
          _this.getList(_this.currentPage, _this.pageSize)
          _this.$notify({
            title: '系统提示',
            message: '审核通过！',
            type: 'success',
            duration: 3000
          })
        } else {
          _this.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    examineUnPass() { // 审核不通过
      this.dialogFormVisible = false
      const _this = this
      const params = {
        id: this.planId
      }
      require_post('/v1/elUses/fail', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        if (res.data.status === 200) {
          _this.dialogFormVisible = false
          _this.getList(_this.currentPage, _this.pageSize)
          _this.$notify({
            title: '系统提示',
            message: '提交成功！',
            type: 'success',
            duration: 3000
          })
        } else if (res.data.status === 500) {
          _this.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    delData() { // 删除选中的未提交领用申请
      if (this.selectlistRow) {
        let flag = false // 标志位 判断所选项中是否有已提交项
        const arr = []
        for (let i = 0; i < this.selectlistRow.length; i++) {
          arr[i] = this.selectlistRow[i].id
          if (this.selectlistRow[i].status !== '1') {
            flag = true // 当有已提交项，跳出循环
            break
          }
        }
        if (!flag) {
          this.$confirm('确认删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const _this = this
            $.ajax({ // 批量删除时，要用原生ajax
              url: baseIP + '/v1/elUses',
              method: 'delete',
              headers: {
                token: token,
                authorityCode: 1
              },
              dataType: 'json',
              data: JSON.stringify({ ids: arr }),
              success: function(res) {
                if (res.status === 200) {
                  _this.getList(_this.currentPage, _this.pageSize)
                }
              }
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
            message: '选中的已提交计划不可删除！',
            type: 'warning',
            duration: 3000
          })
        }
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择数据进行删除！',
          type: 'warning',
          duration: 3000
        })
      }
    }
  },
  filters: {
    statusFilter(value) {
      return statuslabel[value]
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
  .el-dialog {
    margin-top: 1% !important;
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
  .danger{
    color: red;
  }
</style>


