<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="condition">
        <el-date-picker v-model="listQuery.planYear" type="year" :editable="false" value-format="yyyy" format="yyyy" style="width: 220px;" class="filter-item" placeholder="选择年"></el-date-picker>
        <el-select filterable clearable style="width: 220px" class="filter-item" v-model="listQuery.planPosition" placeholder="提出单位" multiple collapse-tags @change="selectAll">
          <el-option v-for="item in unitList" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
        <el-select filterable clearable style="width: 220px" class="filter-item" v-model="listQuery.planStatus" placeholder="状态" multiple collapse-tags @change="selectAllzt">
          <el-option v-for="item in statusList" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </div>
      <el-button class="filter-item" type="primary" size="small" v-waves icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="filter-item" size="small" v-waves icon="el-icon-refresh" @click="reset">重置</el-button>
      <div class="btn_right" v-for='item in authorityCodebutton' :key='item.a'>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-circle-plus-outline" @click="handleCreate" v-if="item.name === '添加'">添加</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-edit" @click="edit()" v-if="item.name === '编辑'">编辑</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-circle-check" @click="submit()" v-if="item.name === '提交'">提交</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-question" @click="examine()" v-if="item.name === '审核'">审核</el-button>
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="danger" v-waves icon="el-icon-delete" @click.prevent="delData()" v-if="item.name === '删除'">删除</el-button>
      </div>
    </div>

    <!--年度计划列表-->
    <el-table :key='tableKey' :data="specificationModelTable" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;" @selection-change='selectRow' ref="moviesTable" :height="tableHeight" :cell-style="statusStyle">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column width="100px" align="center" label="计划年份" >
        <template slot-scope="scope">
          <span class="link-type" @click="handleInfo(scope.row)">{{scope.row.planYear}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="提出单位">
        <template slot-scope="scope">
          <span v-show="show = false">{{scope.row.planPosition}}</span>
          <span>{{scope.row.planPositionName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{scope.row.planCreatorName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.planStatus | statusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="审核意见">
        <template slot-scope="scope">
          <span>{{scope.row.planOpinion}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="最后调整时间">
        <template slot-scope="scope">
          <span>{{scope.row.updateTimeStr}}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.planRemarks}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page= "currentPage"
        :page-sizes= "[15, 30, 45, 60, 75, 100]"
        :page-size= "pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total= "total">
      </el-pagination>
    </div>

    <!-- 添加年度计划的弹出窗部分 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">
      <p class="commonTit">基本信息</p>
      <el-form :rules="rules" status-icon ref="dataForm" :model="temp" label-position="right" label-width="120px" :disabled="setDisabled">
        <el-form-item label="计划年份" required prop="planYear" class="el-col el-col-12">
          <div>
            <el-date-picker v-model="temp.planYear" type="year" value-format="yyyy" format="yyyy" :editable="false" placeholder="选择年" style="width:250px" :picker-options="afterCurrentYear"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="提出单位" required prop="planPosition" class="el-col el-col-12">
          <el-select filterable class="filter-item" v-model="temp.planPosition" v-on:change="getUseOrgList($event)" style="width:250px">
            <el-option v-for="item in proposedCompanyList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人" prop="planCreatorName" class="el-col el-col-12">
          <span>{{temp.planCreatorName}}</span>
        </el-form-item>
        <div style="clear:both"></div>
        <el-form-item label="备注" prop="planRemarks">
          <el-input type="textarea" prop="planRemarks" v-model="temp.planRemarks" :maxlength="200">
          </el-input>
        </el-form-item>
      </el-form>
      <p class="commonTit">设备列表</p>
      <el-button class="filter-item btn_right" size="small" style="margin-bottom: 10px;" v-if="isUpdate" v-waves @click="eqDialogShow">选择设备</el-button>
      <el-table :data="equipmentDatas" border fit highlight-current-row height="280px">
        <el-table-column prop="positionId" width="150" align="center" label="使用单位">
          <template slot-scope="scope">
            <span v-show="show = false">{{scope.row.positionId}}</span>
            <span>{{scope.row.ipName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="effectCode" width="150" align="center" label="功能位置">
          <template slot-scope="scope">
            <span v-show="show = false">{{scope.row.effectCode}}</span>
            <span>{{scope.row.itemEffect}}</span>
          </template></el-table-column>
        <el-table-column prop="bigTypeCode" width="150" align="center" label="设备大类">
          <template slot-scope="scope">
            <span v-show="show = false">{{scope.row.bigTypeCode}}</span>
            <span>{{scope.row.equipmentBigType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="middleTypeCode" width="150" align="center" label="设备中类">
          <template slot-scope="scope">
            <span v-show="show = false">{{scope.row.middleTypeCode}}</span>
            <span>{{scope.row.equipmentMiddleType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="smallTypeCode" width="150" align="center" label="设备小类">
          <template slot-scope="scope">
            <span v-show="show = false">{{scope.row.smallTypeCode}}</span>
            <span>{{scope.row.equipmentSmallType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="specificationCode" width="150" align="center" label="规格型号">
          <template slot-scope="scope">
            <span v-show="show = false">{{scope.row.specificationCode}}</span>
            <span>{{scope.row.equipmentSpecification}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentParamName" width="150" align="center" label="主要技术参数名">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentParamName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentParamValue" width="150" align="center" label="主要技术参数值">
          <template slot-scope="scope">
            <span>{{scope.row.equipmentParamValue}}</span>
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
        <el-table-column prop="itemRemarks" width="200" align="center" label="备注">
          <template slot-scope="scope">
            <span>{{scope.row.itemRemarks}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <a class="editEq" :class="{showOperBtn:setDisabled}" @click="eqDialogShowUpdate(scope.row)">编辑</a>
            <a class="delEq" :class="{showOperBtn:setDisabled}" @click="handleDelete(scope.$index, equipmentDatas)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <el-form style="margin-top: 10px;" v-if="isExamine">
        <el-form-item label="审批意见">
          <el-input type="textarea" v-model="temp.planOpinion" :maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addYearPlan">确定</el-button>
        <el-button v-else type="primary" @click="updateYearPlan">确定</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="isExamine">
        <el-button type="success" @click="examinePass">通过</el-button>
        <el-button type="danger" @click="examineUnPass">不通过</el-button>
      </div>
    </el-dialog>

    <!--选择设备弹窗 -->
    <el-dialog width="800px" :title="textMap_eq[dialogStatus_eq]" :visible.sync="equipmentDialog" append-to-body>
      <el-form :rules="rules" status-icon ref="eqDataForm" :model="eqColumn" label-position="right" label-width="120px">
        <el-form-item label="使用单位" required prop="positionId" class="el-col el-col-12">
          <el-select filterable class="filter-item" v-model="eqColumn.positionId" style="width:250px">
            <el-option v-for="item in useCompanyList" :key="item.id" :label="item.name" :value="item.id">
              <span :id="'positionId'+item.id">{{item.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能位置" required prop="effectCode" class="el-col el-col-12">
          <el-select filterable class="filter-item" v-model="eqColumn.effectCode" style="width:250px">
            <el-option v-for="item in positionList" :key="item.code" :label="item.name" :value="item.code">
              <span :id="'effectCode'+item.code">{{item.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'设备大类'" required prop="bigTypeCode" class="el-col el-col-12">
          <el-select filterable class="filter-item" v-model="eqColumn.bigTypeCode" v-on:change="getEqMiddleTypeList($event)" style="width:250px">
            <el-option v-for="item in sbtypeOneList" :key="item.code" :label="item.name" :value="item.code">
              <span :id="'bigTypeCode'+item.code">{{item.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'设备中类'" required prop="middleTypeCode" class="el-col el-col-12">
          <el-select filterable class="filter-item" v-model="eqColumn.middleTypeCode" v-on:change="getEqSmallTypeList($event)" style="width:250px">
            <el-option v-for="item in sbtypeTwoList" :key="item.code" :label="item.name" :value="item.code">
              <span :id="'middleTypeCode'+item.code">{{item.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'设备小类'" prop="smallTypeCode" class="el-col el-col-12">
          <el-select filterable class="filter-item" v-model="eqColumn.smallTypeCode" v-on:change="getLinkage($event)" style="width:250px">
            <el-option v-for="item in sbtypeThreeList" :key="item.code" :label="item.name" :value="item.code">
              <span :id="'smallTypeCode'+item.code">{{item.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格型号" prop="specificationCode" class="el-col el-col-12">
          <el-select filterable class="filter-item" v-model="eqColumn.specificationCode" style="width:250px">
            <el-option v-for="item in spModelList" :key="item.code" :label="item.name" :value="item.code">
              <span :id="'specificationCode'+item.code">{{item.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主要技术参数名" prop="equipmentParamName" class="el-col el-col-12">
          <span>{{eqColumn.equipmentParamName}}</span>
        </el-form-item>
        <el-form-item label="主要技术参数值" prop="equipmentParamValue" class="el-col el-col-12">
          <el-select filterable class="filter-item" v-model="eqColumn.equipmentParamValue" style="width:250px">
            <el-option v-for="item in parameterList" :key="item.code" :label="item.name" :value="item.code">
              <span :id="'equipmentParamValue'+item.code">{{item.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="equipmentName" class="el-col el-col-12">
          <el-input  v-model="eqColumn.equipmentName" style="width:250px" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="设备数量" required prop="equipmentNum" class="el-col el-col-12">
          <el-input v-model="eqColumn.equipmentNum" style="width:250px" :maxlength="8"></el-input>
        </el-form-item>
        <div style="clear:both;"></div>
        <el-form-item label="备注" prop="itemRemarks">
          <el-input type="textarea" v-model="eqColumn.itemRemarks" style="width:98.5%;" :maxlength="200">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="equipmentDialog = false">取消</el-button>
        <el-button v-if="dialogStatus_eq=='create'" type="primary" @click="createEq">确定</el-button>
        <el-button v-else type="primary" @click="updateEq">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { require_post, require_get, require_put, require_delete, controllbutton } from '@/assets/pubJS'
import Cookies from 'js-cookie'
const token = Cookies.get('token')
const statusList = [
  {
    code: '全选',
    name: '全选'
  }, { // 状态列表
    code: '1',
    name: '未提交'
  }, {
    code: '2',
    name: '已提交'
  }, {
    code: '3',
    name: '审核未通过'
  }, {
    code: '4',
    name: '审核已通过'
  }
]
const proposedCompanylabel = {}
const statuslabel = statusList.reduce((acc, cur) => { // 状态
  acc[cur.code] = cur.name
  return acc
}, {})

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      unitList: [],
      afterCurrentYear: { // 限制只能选择当前年份之后年份
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      tableHeight: document.body.clientHeight - 255,
      proposedCompanylabel,
      currentPage: 1,
      pageSize: 15,
      total: null,
      codeShowYN: false, // 编号是否显示
      isUpdate: true, // 是编辑，显示操作按钮；是详细，隐藏
      isExamine: false, // ture：是审核；
      setDisabled: false, // 设置表单不可编辑
      isShow: false, // 审核时编辑删除按钮不可点击
      listLoading: true,
      equipmentDialog: false, // 选择设备弹窗显藏变量
      tableKey: 0,
      listQuery: {
        planYear: [],
        planStatus: [],
        planPosition: [],
        planYears: []
      },
      specificationModelTable: [], // 年度计划数据集
      equipmentDatas: [], // 设备列表数据集
      temp: {
        planId: '',
        planYear: '', // 计划年份
        positionId: '', // 提出单位
        planRemarks: '', // 备注
        planCreatorId: sessionStorage.getItem('id'),
        planCreatorName: sessionStorage.getItem('name'), // 创建人
        planOpinion: '', // 审批意见
        elPlanItemList: [] // 设备列表
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
        ipName: '', // 使用单位
        itemEffect: '', // 功能位置
        equipmentBigType: '', // 大类
        equipmentMiddleType: '', // 中类
        equipmentSmallType: '', // 小类
        equipmentSpecification: '' // 规格型号
      },
      sbtypeOneList: [], // 大类list
      sbtypeTwoList: [], // 中类list
      sbtypeThreeList: [], // 小类list
      spModelList: [], // 规格型号list
      parameterList: [], // 主要技术参数值list
      proposedCompanyList: [], // 提出单位
      useCompanyList: [], // 使用单位
      positionList: [], // 功能位置
      parameter: [{ // 主要技术参数列表
        value: '1',
        label: '功率：kW'
      }, {
        value: '2',
        label: '电压：V'
      }, {
        value: '3',
        label: '电流：A'
      }],
      statusList, // 状态
      dialogFormVisible: false,
      dialogStatus: '', // 计划弹窗的名
      textMap: {
        update: '编辑通用设备租赁年度计划',
        create: '添加通用设备租赁年度计划',
        info: '通用设备租赁年度计划详细',
        examine: '通用设备租赁年度计划审核'
      },
      dialogStatus_eq: '', // 选择设备弹窗
      textMap_eq: {
        create: '选择设备',
        update: '选择设备'
      },
      rules: {
        planYear: [{ required: true, message: '请选择年份' }],
        planPosition: [{ required: true, message: '请选择提出单位', trigger: 'change' }],
        positionId: [{ required: true, message: '请选择使用单位', trigger: 'change' }],
        effectCode: [{ required: true, message: '请选择功能位置', trigger: 'change' }],
        bigTypeCode: [{ required: true, message: '请选择设备大类', trigger: 'change' }],
        middleTypeCode: [{ required: true, message: '请选择设备中类', trigger: 'change' }],
        smallTypeCode: [{ required: true, message: '请选择设备小类', trigger: 'change' }],
        // specificationCode: [{ required: true, message: '请选择规格型号', trigger: 'change' }],
        equipmentNum: [
          { required: true, message: '请填写设备数量' },
          { pattern: /^[0-9]*$/, message: '请输入数字' }
        ]
      },
      downloadLoading: false,
      buttonlist: [],
      authorityCodebutton: [],
      authorityCodePage: '',
      oldOptions: [],
      oldOptionszt: []
    }
  },
  created() {
    this.listQuery.planYear = this.yearDate()
    const url = sessionStorage.getItem('index')
    this.buttonlist = controllbutton(url)
    this.authorityCodebutton = this.buttonlist[0]
    this.authorityCodePage = this.buttonlist[1]
    this.getList(this.currentPage, this.pageSize)
    this.getEqBigTypeList(1, '')
    this.getProposedOrgList(21, '')
  },
  mounted() {
  },
  methods: {
    yearDate() {
      const date = new Date()
      return `${date.getFullYear()}`
    },
    // 不同状态显示不同颜色
    statusStyle({ row, column, rowIndex, columnIndex }) {
      if (row.planStatus === '1' && columnIndex === 4) { // 指定坐标
        return 'color: red'
      } else {
        return ''
      }
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val
    },
    // 搜索调用的方法
    search() {
      this.getList(this.currentPage, this.pageSize)
    },
    // 重置调用的方法
    reset() {
      this.listQuery.planYear = this.yearDate()
      this.listQuery.planPosition = []
      this.listQuery.planStatus = []
      this.getList(this.currentPage, this.pageSize)
    },
    handleCreate() { // 添加计划弹窗
      this.dialogFormVisible = true
      this.codeShowYN = false
      this.isUpdate = true
      this.isExamine = false
      this.setDisabled = false
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      setTimeout(() => {
        this.$refs['dataForm'].resetFields()
        this.temp.planCreatorId = sessionStorage.getItem('id')
        this.temp.planCreatorName = sessionStorage.getItem('name')
        this.equipmentDatas = []
      }, 100)
    },
    handleUpdate(row) { // 编辑计划弹窗
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
      this.getYearPlanInfo(row.planId)
    },
    eqDialogShow() { // 选择设备弹窗
      if (this.temp.planPosition !== undefined && this.temp.planPosition !== '') {
        this.dialogStatus_eq = 'create'
        this.equipmentDialog = true
        this.$nextTick(() => {
          this.$refs['eqDataForm'].clearValidate()
        })
        setTimeout(() => {
          this.eqColumn = Object.assign({}, {})
        }, 100)
      } else {
        this.$notify.info({
          title: '系统提示',
          message: '请先填写基本信息'
        })
      }
    },
    eqDialogShowUpdate(row) { // 选择设备编辑弹窗
      this.eqColumn = Object.assign({}, row)
      this.getFunPosition(row.pCode) // 获取功能位置
      this.getEqMiddleTypeList(row.bigTypeCode) // 获取中类列表
      this.getEqSmallTypeList(row.middleTypeCode) // 获取小类列表
      this.getLinkage(row.smallTypeCode) // 获取规格型号
      this.dialogStatus_eq = 'update'
      this.equipmentDialog = true
      this.$nextTick(() => {
        this.$refs['eqDataForm'].clearValidate()
      })
    },
    createEq() { // 选择设备弹窗确定后数据渲染在设备列表
      this.$refs['eqDataForm'].validate((valid) => {
        if (valid) {
          var obj = {}
          obj.id = parseInt(Math.random() * 100) + 1024
          obj.positionId = this.eqColumn.positionId // 使用单位id
          obj.ipName = document.getElementById('positionId' + this.eqColumn.positionId).innerText
          obj.effectCode = this.eqColumn.effectCode // 功能位置编码
          obj.itemEffect = document.getElementById('effectCode' + this.eqColumn.effectCode).innerText
          obj.bigTypeCode = this.eqColumn.bigTypeCode // 大类编码
          obj.equipmentBigType = document.getElementById('bigTypeCode' + this.eqColumn.bigTypeCode).innerText
          obj.middleTypeCode = this.eqColumn.middleTypeCode // 中类编码
          obj.equipmentMiddleType = document.getElementById('middleTypeCode' + this.eqColumn.middleTypeCode).innerText
          obj.smallTypeCode = this.eqColumn.smallTypeCode // 小类编码
          if (this.eqColumn.smallTypeCode !== undefined) {
            obj.equipmentSmallType = document.getElementById('smallTypeCode' + this.eqColumn.smallTypeCode).innerText
          } else {
            obj.equipmentSmallType = ''
          }
          obj.specificationCode = this.eqColumn.specificationCode // 规格型号编码
          if (this.eqColumn.specificationCode !== undefined) {
            obj.equipmentSpecification = document.getElementById('specificationCode' + this.eqColumn.specificationCode).innerText
          } else {
            obj.equipmentSpecification = ''
          }
          obj.equipmentParamName = this.eqColumn.equipmentParamName // 主要技术参数名
          obj.equipmentParamValue = this.eqColumn.equipmentParamValue // 主要技术参数值
          obj.equipmentName = this.eqColumn.equipmentName // 设备名称
          obj.equipmentNum = this.eqColumn.equipmentNum // 设备数量
          obj.itemRemarks = this.eqColumn.itemRemarks // 记录备注
          this.equipmentDatas.push(obj)
          this.equipmentDialog = false
        }
      })
    },
    updateEq() { // 编辑选择设备弹窗确定后数据渲染在设备列表
      this.$refs['eqDataForm'].validate((valid) => {
        if (valid) {
          for (const v of this.equipmentDatas) {
            if (v.itemId === undefined) {
              if (v.id === this.eqColumn.id) {
                const index = this.equipmentDatas.indexOf(v)
                this.equipmentDatas.splice(index, 1, this.eqColumn)
                break
              }
            } else {
              if (v.itemId === this.eqColumn.itemId) {
                const index = this.equipmentDatas.indexOf(v)
                this.equipmentDatas.splice(index, 1, this.eqColumn)
                break
              }
            }
          }
          this.equipmentDialog = false
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
        authorityCode: _this.authorityCodePage
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
      var selectBigCode = event
      this.getEqBigTypeList(2, selectBigCode)
    },
    getEqSmallTypeList(event) { // 中类联动设备小类
      var selectMiddleCode = event
      this.getEqBigTypeList(3, selectMiddleCode)
    },
    getLinkage(event) { // 小类联动规格型号、主要技术参数名、主要技术参数值
      this.getSpModelList(event)
      this.getMainPara(event)
      this.getMainParaValue(event)
    },
    getSpModelList(event) { // 设备规格型号
      const _this = this
      const that = _this
      require_get('/v1/sbmodel/listBySbtypeThree', {
        token: token,
        authorityCode: _this.authorityCodePage
      }, {
        sbtypeThree: event
      }, function(res) {
        var data = []
        if (res.data.meta.code === '200') {
          var result = res.data.data
          for (let i = 0; i < result.length; i++) {
            var obj = {}
            obj.code = result[i].code
            obj.name = result[i].name
            data[i] = obj
          }
          _this.spModelList = data
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
    getMainPara(event) { // 主要技术参数名
      const _this = this
      const that = _this
      require_get('/v1/sbtypeinfo/findMainParaBySbtypeThree', {
        token: token,
        authorityCode: _this.authorityCodePage
      }, {
        sbtypeThree: event
      }, function(res) {
        const result = res.data.data
        if (res.data.meta.code === '200') {
          _this.eqColumn.equipmentParamName = result.mainPara
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
    getMainParaValue(event) { // 主要技术参数值
      const _this = this
      const that = _this
      require_get('/v1/sbequipmentt/list', {
        token: token,
        authorityCode: _this.authorityCodePage
      }, {
        sbtypeThree: event,
        pageNum: 1,
        pageSize: 50
      }, function(res) {
        var data = []
        var arr_params = []
        if (res.data.meta.code === '200') {
          var result = res.data.data.list
          for (let i = 0; i < result.length; i++) {
            var obj = {}
            obj.code = result[i].mainPara
            obj.name = result[i].mainPara
            data[i] = obj
            // 去除重复数据及空数据
            var flag = true
            if (data[i].code === '') {
              flag = false
            }
            for (let j = 0; j < arr_params.length; j++) {
              if (data[i].code === arr_params[j].code) {
                flag = false
              }
            }
            if (flag) {
              arr_params.push(data[i])
            }
          }
          _this.parameterList = arr_params
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
    getProposedOrgList(type, pCode) { // 获取提出单位list
      const _this = this
      require_get('/v1/elplan', {
        token: token,
        authorityCode: _this.authorityCodePage
      }, {
        page: 1,
        size: 1000,
        type: type,
        pCode: pCode
      }, function(res) {
        var data = [] // 提出单位
        var data_useOrg = [] // 使用单位
        if (res.data.status === 200) {
          var result = res.data.data.list
          for (let i = 0; i < result.length; i++) {
            var obj = {}
            obj.code = result[i].code
            obj.name = result[i].name
            data[i] = obj
            var obj_useOrg = {}
            obj_useOrg.id = result[i].id
            obj_useOrg.name = result[i].name
            data_useOrg[i] = obj_useOrg
          }
          if (pCode === '') {
            _this.proposedCompanyList = data
            const arr = [..._this.proposedCompanyList]
            var quan = { code: '全选', name: '全选' }
            arr.unshift(quan)
            _this.unitList = arr
          } else {
            _this.useCompanyList = data_useOrg
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
    getUseOrgList(id) { // 提出单位联动使用单位list
      const pCode = id
      this.getProposedOrgList(3, pCode)
      this.getFunPosition(pCode)
    },
    getFunPosition(id) { // 获取功能位置list
      const _this = this
      const that = _this
      require_get('/v1/elplan/findPositionList', {
        token: token,
        authorityCode: _this.authorityCodePage
      }, {
        planPosition: id
      }, function(res) {
        var data = []
        if (res.data.status === 200) {
          var result = res.data.data
          for (let i = 0; i < result.length; i++) {
            var obj = {}
            obj.code = result[i].code
            obj.name = result[i].name
            data[i] = obj
          }
          _this.positionList = data
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
    getList(page, size) { // 年度计划列表
      this.listLoading = true
      const _this = this
      const that = _this
      const params = {
        planYears: this.listQuery.planYears,
        planStatusS: this.listQuery.planStatus,
        planPositions: this.listQuery.planPosition
      }
      require_post('/v1/elplan/list/generic/year?pageNum=' + page + '&pageSize=' + size, {
        token: token,
        authorityCode: _this.authorityCodePage
      }, params, function(res) {
        _this.listLoading = false
        var data = []
        if (res.data.status === 200) {
          _this.total = res.data.data.total
          var result = res.data.data.data
          for (let i = 0; i < result.length; i++) {
            var obj = {}
            obj.planId = result[i].planId
            obj.planYear = result[i].planYear
            obj.planPosition = result[i].planPosition
            obj.planPositionName = result[i].planPositionName
            obj.planCreatorId = result[i].planCreatorId
            obj.planCreatorName = result[i].planCreatorName
            obj.planStatus = result[i].planStatus
            obj.planOpinion = result[i].planOpinion
            obj.updateTimeStr = result[i].updateTimeStr
            obj.planRemarks = result[i].planRemarks
            data[i] = obj
          }
          _this.specificationModelTable = data
        } else if (res.data.status === 201) {
          _this.listLoading = false
          _this.specificationModelTable = []
          that.$notify({
            title: '系统提示',
            message: res.data.msg,
            type: 'warning',
            duration: 3000
          })
        } else {
          that.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    handleDelete(index, row) { // 设备行内删除
      for (let i = 0; i < row.length; i++) {
        if (index === i) {
          const itemId = row[i].itemId
          const _this = this
          if (itemId === undefined) {
            row.splice(index, 1)
          } else {
            require_delete('/v1/elplan/planItem/' + itemId, {
              token: token,
              authorityCode: _this.authorityCodePage
            }, {}, function(res) {
              if (res.data.status === 200) {
                row.splice(index, 1)
              } else {
                _this.$notify({
                  title: '错误',
                  message: res.data.msg,
                  type: 'error',
                  duration: 3000
                })
              }
            })
          }
          break
        }
      }
    },
    handleSizeChange(val) { // 每页多少条
      this.getList(this.currentPage, val)
    },
    handleCurrentChange(val) { // 当前页多少条
      this.getList(val, this.pageSize)
    },
    addYearPlan() { // 添加年度计划
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const _this = this
          const eqData = _this.equipmentDatas
          var eq_arr = []
          for (let i = 0; i < eqData.length; i++) {
            var obj = {}
            obj.positionId = eqData[i].positionId // 使用单位id
            obj.effectCode = eqData[i].effectCode // 功能位置编码
            obj.bigTypeCode = eqData[i].bigTypeCode // 大类编码
            obj.middleTypeCode = eqData[i].middleTypeCode // 中类编码
            obj.smallTypeCode = eqData[i].smallTypeCode // 小类编码
            obj.specificationCode = eqData[i].specificationCode // 规格型号编码
            obj.equipmentParamName = eqData[i].equipmentParamName // 主要技术参数名
            obj.equipmentParamValue = eqData[i].equipmentParamValue // 主要技术参数值
            obj.equipmentName = eqData[i].equipmentName // 设备名称
            obj.equipmentNum = eqData[i].equipmentNum // 设备数量
            obj.itemRemarks = eqData[i].itemRemarks // 记录备注
            eq_arr[i] = obj
          }
          const params = {
            elPlanItemList: eq_arr,
            planCreatorId: this.temp.planCreatorId,
            planCreatorName: this.temp.planCreatorName,
            planPosition: this.temp.planPosition,
            planRemarks: this.temp.planRemarks,
            planYear: this.temp.planYear
          }
          if (eq_arr.length !== 0) {
            require_post('/v1/elplan/generic/year', {
              token: token,
              authorityCode: _this.authorityCodePage
            }, params, function(res) {
              if (res.data.status === 200) {
                _this.dialogFormVisible = false
                _this.getList(_this.currentPage, _this.pageSize)
                _this.$notify({
                  title: '成功',
                  message: '添加成功',
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
    edit() { // 编辑弹窗
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          if (this.selectlistRow[0].planStatus === '1') {
            this.handleUpdate(this.selectlistRow[0])
            this.getYearPlanInfo(this.selectlistRow[0].planId)
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
    getYearPlanInfo(id) { // 获取年度计划详细
      const _this = this
      const that = _this
      // 获取规格型号详细
      require_get('/v1/elplan/' + id, {
        token: token,
        authorityCode: _this.authorityCodePage
      }, {}, function(res) {
        if (res.data.status === 200) {
          const result = res.data.data
          _this.temp.planYear = result.planYear
          _this.temp.planId = result.planId
          _this.temp.planPosition = result.planPosition
          _this.temp.planCreatorName = result.planCreatorName
          _this.temp.planRemarks = result.planRemarks
          _this.equipmentDatas = result.elPlanItemList
          _this.getUseOrgList(result.planPosition) // 调用使用单位列表
        } else {
          that.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    updateYearPlan() { // 编辑年度计划
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const _this = this
          const that = _this
          const eqData = _this.equipmentDatas
          var eq_arr = []
          for (let i = 0; i < eqData.length; i++) {
            var obj = {}
            obj.itemId = eqData[i].itemId // 设备记录id
            obj.positionId = eqData[i].positionId // 使用单位id
            obj.effectCode = eqData[i].effectCode // 功能位置编码
            obj.bigTypeCode = eqData[i].bigTypeCode // 大类编码
            obj.middleTypeCode = eqData[i].middleTypeCode // 中类编码
            obj.smallTypeCode = eqData[i].smallTypeCode // 小类编码
            obj.specificationCode = eqData[i].specificationCode // 规格型号编码
            obj.equipmentParamName = eqData[i].equipmentParamName // 主要技术参数名
            obj.equipmentParamValue = eqData[i].equipmentParamValue // 主要技术参数值
            obj.equipmentName = eqData[i].equipmentName // 设备名称
            obj.equipmentNum = eqData[i].equipmentNum // 设备数量
            obj.itemRemarks = eqData[i].itemRemarks // 记录备注
            eq_arr[i] = obj
          }
          const params = {
            elPlanItemList: eq_arr,
            planId: this.temp.planId,
            planUpdatorId: this.temp.planCreatorId,
            planUpdatorName: this.temp.planCreatorName,
            planPosition: this.temp.planPosition,
            planRemarks: this.temp.planRemarks,
            planYear: this.temp.planYear
          }
          if (eq_arr.length !== 0) {
            require_put('/v1/elplan/', {
              token: token,
              authorityCode: _this.authorityCodePage
            }, params, function(res) {
              if (res.data.status === 200) {
                _this.dialogFormVisible = false
                _this.getList(_this.currentPage, _this.pageSize)
                that.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 3000
                })
              } else if (res.data.status === 500) {
                that.$notify({
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
    submit() { // 提交
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          if (this.selectlistRow[0].planStatus === '1') {
            this.$confirm('确认提交计划吗？提交后不可再编辑！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const _this = this
              const that = _this
              const params = {
                planId: this.selectlistRow[0].planId,
                planUpdatorId: this.temp.planCreatorId,
                planUpdatorName: this.temp.planCreatorName
              }
              require_post('/v1/elplan/approve/submit', {
                token: token,
                authorityCode: _this.authorityCodePage
              }, params, function(res) {
                if (res.data.status === 200) {
                  _this.dialogFormVisible = false
                  _this.getList(_this.currentPage, _this.pageSize)
                  that.$notify({
                    title: '系统提示',
                    message: '提交成功！',
                    type: 'success',
                    duration: 3000
                  })
                } else if (res.data.status === 500) {
                  that.$notify({
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
          if (this.selectlistRow[0].planStatus === '2') {
            this.dialogFormVisible = true
            this.codeShowYN = true
            this.isUpdate = false
            this.isExamine = true
            this.setDisabled = true // 不可编辑表单
            this.dialogStatus = 'examine'
            this.temp.planOpinion = ''
            this.getYearPlanInfo(this.selectlistRow[0].planId)
          } else if (this.selectlistRow[0].planStatus === '3' || this.selectlistRow[0].planStatus === '4') {
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
      const _this = this
      const that = _this
      const params = {
        planApproverId: this.temp.planCreatorId,
        planApproverName: this.temp.planCreatorName,
        planId: this.temp.planId,
        planOpinion: this.temp.planOpinion
      }
      require_post('/v1/elplan/approve/passed', {
        token: token,
        authorityCode: _this.authorityCodePage
      }, params, function(res) {
        if (res.data.status === 200) {
          _this.dialogFormVisible = false
          _this.getList(_this.currentPage, _this.pageSize)
          that.$notify({
            title: '成功',
            message: '审核通过！',
            type: 'success',
            duration: 3000
          })
        } else {
          that.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    examineUnPass() { // 审核不通过
      const _this = this
      const that = _this
      const params = {
        planApproverId: this.temp.planCreatorId,
        planApproverName: this.temp.planCreatorName,
        planId: this.temp.planId,
        planOpinion: this.temp.planOpinion
      }
      require_post('/v1/elplan/approve/failed', {
        token: token,
        authorityCode: _this.authorityCodePage
      }, params, function(res) {
        if (res.data.status === 200) {
          _this.dialogFormVisible = false
          _this.getList(_this.currentPage, _this.pageSize)
          that.$notify({
            title: '成功',
            message: '审核不通过！',
            type: 'success',
            duration: 3000
          })
        } else {
          that.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    delData() { // 勾选一条或多条数据删除
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          if (this.selectlistRow[0].planStatus === '1') {
            this.$confirm('确认删除吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const _this = this
              const that = _this
              require_delete('/v1/elplan/' + this.selectlistRow[0].planId, {
                token: token,
                authorityCode: _this.authorityCodePage
              }, {}, function(res) {
                if (res.data.status === 200) {
                  _this.dialogFormVisible = false
                  _this.getList(_this.currentPage, _this.pageSize)
                  that.$notify({
                    title: '系统提示',
                    message: '删除成功！',
                    type: 'success',
                    duration: 3000
                  })
                } else {
                  that.$notify({
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
                message: '取消删除！',
                type: 'info',
                duration: 3000
              })
            })
          } else {
            this.$notify({
              title: '系统提示',
              message: '该计划已提交不可删除！',
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
      } else {
        this.$notify({
          title: '系统提示',
          message: '请选择一条数据进行删除！',
          type: 'warning',
          duration: 3000
        })
      }
    },
    selectAll(val) {
      const allValues = []
      // 保留所有值
      for (const item of this.unitList) {
        allValues.push(item.code)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : []
      // 若是全部选择
      if (val.includes('全选')) this.listQuery.planPosition = allValues
      // 取消全部选中,上次有当前没有表示取消全选
      if (oldVal.includes('全选') && !val.includes('全选')) this.listQuery.planPosition = []
      // 点击非全部选中,需要排除全部选中以及当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('全选') && val.includes('全选')) {
        const index = val.indexOf('全选')
        val.splice(index, 1) // 排除全选选项
        this.listQuery.planPosition = val
      }
      // 全选未选但是其他选项全部选上,则全选选上,上次和当前,都没有全选
      if (!oldVal.includes('全选') && !val.includes('全选')) {
        console.log(11)
        if (val.length === allValues.length - 1) this.listQuery.planPosition = ['全选'].concat(val)
      }
      // 储存当前最后的结果作为下次的老数据
      this.oldOptions[0] = this.listQuery.planPosition
    },
    selectAllzt(val) {
      const allValues = []
      // 保留所有值
      for (const item of this.statusList) {
        allValues.push(item.code)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptionszt.length === 1 ? this.oldOptionszt[0] : []
      // 若是全部选择
      if (val.includes('全选')) this.listQuery.planStatus = allValues
      // 取消全部选中,上次有当前没有表示取消全选
      if (oldVal.includes('全选') && !val.includes('全选')) this.listQuery.planStatus = []
      // 点击非全部选中,需要排除全部选中以及当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('全选') && val.includes('全选')) {
        const index = val.indexOf('全选')
        val.splice(index, 1) // 排除全选选项
        this.listQuery.planStatus = val
      }
      // 全选未选但是其他选项全部选上,则全选选上,上次和当前,都没有全选
      if (!oldVal.includes('全选') && !val.includes('全选')) {
        console.log(11)
        if (val.length === allValues.length - 1) this.listQuery.planStatus = ['全选'].concat(val)
      }
      // 储存当前最后的结果作为下次的老数据
      this.oldOptionszt[0] = this.listQuery.planStatus
    }
  },
  watch: {
    'listQuery.planYear': function(newValue, oldValue) {
      this.listQuery.planYears.push(this.listQuery.planYear)
    }
  },
  computed: {
  },
  filters: {
    YearFilter(value) {
      // return Yearlabel[value]
    },
    proposedCompanyFilter(value) {
      // return proposedCompanylabel[value]
    },
    statusFilter(value) {
      return statuslabel[value]
    }
  }
}
</script>

<style>
  .btn_right{
    float: right;
  }
  .block {
    margin-top: 5px;
  }
  el-input{
    width: 140px;
  }
  .commonTit {
    border-left: 4px solid rgba(22, 155, 213, 1);
    padding-left: 5px;
    margin-top: 0;
    margin-bottom: 5px;
  }
  .editEq {
    padding: 2px 10px;
    color: #009900;
    border: 1px solid #fff;
    border-radius: 3px;
  }
  .editEq:hover {
    border: 1px solid #009900;
    background: #009900;
    color: #fff;
    border-radius: 3px;
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
  .el-dialog {
    margin-top: 1% !important;
  }
  .el-dialog__body {
    padding: 10px 20px !important
  }
  .showOperBtn {
    pointer-events: none;
    color: gray;
  }
</style>
