<template>
  <div class="app-container" >
    <div class="filter-container" >
      <el-input @keyup.enter.native="search" class="filter-item" placeholder="设备识别码" style="width: 135px;" v-model="listQuery.code"></el-input>
      <el-input @keyup.enter.native="search" class="filter-item" placeholder="设备名称" style="width: 135px;" v-model="listQuery.name"></el-input>
      <el-select filterable class="filter-item" placeholder="所属公司" style="width: 135px;" v-model="listQuery.comp">
        <el-option v-for="item in orgList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select filterable class="filter-item" placeholder="大类" style="width: 135px;" v-model="listQuery.sbtypeOne" v-on:change="getEqMiddleTypeList($event)">
        <el-option v-for="item in sbtypeOneList" :key="item.code" :label="item.name" :value="item.code"></el-option>
      </el-select>
      <el-select filterable class="filter-item" placeholder="中类" style="width: 135px;" v-model="listQuery.sbtypeTwo" v-on:change="getEqSmallTypeList($event)">
        <el-option v-for="item in sbtypeTwoList" :key="item.code" :label="item.name" :value="item.code"></el-option>
      </el-select>
      <el-select filterable class="filter-item" placeholder="小类" style="width: 135px;" v-model="listQuery.sbtypeThree" v-on:change="getSbtypeOneNameList($event)">
        <el-option v-for="item in sbtypeThreeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
      </el-select>
      <el-select filterable class="filter-item" placeholder="规格型号" style="width: 135px;" v-model="listQuery.sbmodelCode">
        <el-option v-for="item in sbtypeOneNameList" :key="item.code" :label="item.name" :value="item.code"></el-option>
      </el-select>
      <el-select filterable class="filter-item" placeholder="是否租赁" style="width: 135px;" v-model="listQuery.isLease">
        <el-option v-for="item in isLeaseList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div style='padding-bottom:50px;'>
      <div style="float:left;">
          <el-button class="filter-item" type="primary" icon="el-icon-search" size='small' v-waves @click="search">搜索</el-button>
          <el-button class="filter-item" style="margin-left: 8px;" icon="el-icon-refresh" size='small' v-waves @click="reset">重置</el-button>
      </div>
      <div style="float:right;"  v-for='item in authorityCodebutton' :key='item.a'>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" size='small' v-waves icon="el-icon-circle-plus-outline" v-if="item.name === '添加'" @click="handleCreate">{{item.name}}</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" size='small' v-waves icon="el-icon-edit" v-if="item.name === '编辑'" @click="edit()">{{item.name}}</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="danger" size='small' v-waves icon="el-icon-delete" v-if="item.name === '删除'" @click.prevent="delData()">{{item.name}}</el-button>
      </div>
    </div>

    <!-- 设备列表 -->
    <el-table :key='tableKey' :data="tableData3" stripe border fit highlight-current-row v-loading="listLoading" :height="tableHeight" style="width: 100%;" @selection-change='selectRow' ref="moviesTable">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column align="center" label="设备名称" width="210px">
        <template slot-scope="scope">
          <span @click="handleInfo(scope.row)" class="link-type">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="设备识别码" align="center">
        <template slot-scope="scope">
          <span >{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="'规格型号'">
        <template slot-scope="scope">
          <span>{{scope.row.sbmodelName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('所属公司')">
        <template slot-scope="scope">
          <span>{{scope.row.comp}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('到货日期')">
        <template slot-scope="scope">
          <span>{{scope.row.arriveDate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('启用日期')">
        <template slot-scope="scope">
          <span>{{scope.row.useDate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('是否租赁')" >
        <template slot-scope="scope">
          <span>{{scope.row.isLease | isLeaseFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('是否全新')" >
        <template slot-scope="scope">
          <span>{{scope.row.isNew | isNew}}</span>
        </template>
      </el-table-column>
      <el-table-column width="250px" align="center" :label="$t('仓库')">
        <template slot-scope="scope">
          <span>{{scope.row.wareName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('购置价值')">
        <template slot-scope="scope">
          <span>{{scope.row.buyPrice}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" style="margin-top:5px;">
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="1100px" style='margin-top: 1% !important;padding: 10px 20px;'>
      <el-form class="form" :rules="rules" status-icon ref="dataForm" :model="temp" label-position="right" label-width="130px" style='max-height:550px;overflow:auto;' :disabled="setDisabled">
        <el-col :span="8">
          <el-form-item :label="'设备识别码:'" :disable='disable' required prop='code'>
            <el-input v-model="temp.code" :maxlength="50" :disabled="unEdit"></el-input>
          </el-form-item>
        </el-col> 
        <el-col :span="8">
            <el-form-item :label="'设备名称:'" required prop="name">
              <el-input v-model="temp.name" :maxlength="50"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'大类:'" required prop="sbtypeOne">
            <el-select filterable v-model="temp.sbtypeOne" placeholder="请选择" v-on:change="getEqMiddleTypeList($event)">
              <el-option
                v-for="item in sbtypeOneList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'中类:'" required prop="sbtypeTwo">
              <el-select filterable v-model="temp.sbtypeTwo" placeholder="请选择" v-on:change="getEqSmallTypeList($event)">
                <el-option
                  v-for="item in sbtypeTwoList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>     
        <el-col :span="8">
          <el-form-item :label="'小类:'" required prop="sbtypeThree">
            <el-select filterable v-model="temp.sbtypeThree" placeholder="请选择" v-on:change="getSbtypeOneNameList($event)">
              <el-option
                v-for="item in sbtypeThreeList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'规格型号:'" required prop="sbmodelCode">
            <el-select filterable v-model="temp.sbmodelCode" placeholder="请选择">
              <el-option
                v-for="item in sbtypeOneNameList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'所属公司:'" style="width:100%;" prop='comp'>
            <el-select filterable v-model="temp.comp" placeholder="请选择">
              <el-option
                v-for="item in orgList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'资产公司:'" required prop="assetComp">
            <el-select filterable v-model="temp.assetComp" placeholder="请选择">
              <el-option
                v-for="item in isassetCompList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'资产编号:'" :disable='disable' prop="assetCode">
            <el-input v-model="temp.assetCode" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'是否全新:'" required prop='isNew'>
            <el-select filterable v-model="temp.isNew" placeholder="请选择">
              <el-option
                v-for="item in isNewlist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'是否开启rfid:'" required prop='isRfid'>
            <el-select filterable v-model="temp.isRfid" placeholder="请选择">
              <el-option
                v-for="item in isRfidlist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">  
          <el-form-item :label="'是否租赁:'" required prop='isLease'>
              <el-select filterable v-model="temp.isLease" placeholder="请选择">
                <el-option
                  v-for="item in isLeaseList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'状态编码:'" prop="stateCode">
            <el-select filterable v-model="temp.stateCode" placeholder="请选择">
              <el-option
                v-for="item in stateCodelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item :label="'折旧年限:'" prop="costYears">
              <el-input v-model="temp.costYears" :maxlength="5"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'功能位置:'" prop="positionCode">
            <el-select filterable v-model="temp.positionCode" placeholder="请选择">
              <el-option
                v-for="item in positionList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item required :label="'仓库:'" prop='ware'>
            <el-select filterable v-model="temp.ware" placeholder="请选择">
              <el-option
                v-for="item in wareList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'技术识别码:'" required prop='techCode'>
            <el-input v-model="temp.techCode" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item :label="'生产厂家:'" required prop='factory'>
            <el-input v-model="temp.factory" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'出厂编码:'" prop="prodCode">
            <el-input v-model="temp.prodCode" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'出厂日期:'" prop="prodDate">
            <el-date-picker
              v-model="temp.prodDate"
              placeholder="选择日期" style="width:100%;" value-format='yyyy-MM-dd' format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'到货日期:'" required prop='arriveDate'>
            <el-date-picker
              v-model="temp.arriveDate"
              type="date"
              placeholder="选择日期" style="width:100%;" value-format='yyyy-MM-dd' format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'启用日期:'" required prop='useDate'>
            <el-date-picker
              v-model="temp.useDate"
              type="date"
              placeholder="选择日期" style="width:100%;" value-format='yyyy-MM-dd' format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'合同号:'" prop="contranct">
            <el-input v-model="temp.contranct" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'购置价值:'" required prop='buyPrice'>
            <el-input-number v-model="temp.buyPrice" controls-position="right" :min="1" :max="999999999"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item required :label="'主要技术参数:'" prop='mainPara'>
            <el-input v-model="temp.mainPara" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'技术参数1:'" prop="para1">
            <el-input v-model="temp.para1" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'技术参数2:'" prop="para2">
            <el-input v-model="temp.para2" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'技术参数3:'" prop="para3">
            <el-input v-model="temp.para3" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'技术参数4:'" prop="para4">
            <el-input v-model="temp.para4" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'技术参数5:'" prop="para5">
            <el-input v-model="temp.para5" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'技术参数6:'" prop="para6">
            <el-input v-model="temp.para6" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'技术参数7:'" prop="para7">
            <el-input v-model="temp.para7" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'技术参数8:'" prop="para8">
            <el-input v-model="temp.para8" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'防爆证书编号:'" prop="proofCode">
          <el-input v-model="temp.proofCode" :maxlength="50"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'防爆证书:'" prop="proof">
            <el-input v-model="temp.proof" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'生产许可证:'" prop="license">
            <el-input v-model="temp.license" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'MA证编号:'" prop="maCode">
            <el-input v-model="temp.maCode" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'MA有效期起:'" prop="maStartDate">
            <el-date-picker
              v-model="temp.maStartDate"
              type="date"
              placeholder="选择日期" style="width:100%;" value-format='yyyy-MM-dd' format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'MA有效期止:'" prop="maEndDate">
            <el-date-picker
              v-model="temp.maEndDate"
              type="date"
              placeholder="选择日期" style="width:100%;" value-format='yyyy-MM-dd' format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
      <div style="clear:both;"></div>
      <div slot="footer" class="dialog-footer" v-if="isUpdate">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" :loading='istianjia'>确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import waves from '@/directive/waves' // 水波纹指令
import { require_post, require_get, require_put, require_delete, controllbutton } from '@/assets/pubJS'
import Cookies from 'js-cookie'
const token = Cookies.get('token')

export default {
  name: 'tinymce',
  directives: {
    waves
  },
  data() {
    const validateInt = (rule, value, callback) => { // 只能输入数字
      const regex = /^\d+$/
      if (value !== '' && value !== null) {
        if (regex.test(value) === false) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateRquNumEn = (rule, value, callback) => { // 必填且不能输入中文
      const regex = /^[^\u4e00-\u9fa5]{0,}$/
      if (value !== '') {
        if (regex.test(value) === false) {
          callback(new Error('请输入数字或英文'))
        } else {
          callback()
        }
      } else {
        callback(new Error(rule.msg))
      }
    }
    const validateNumEn = (rule, value, callback) => { // 不能输入中文
      const regex = /^[^\u4e00-\u9fa5]{0,}$/
      if (regex.test(value) === false) {
        callback(new Error('请输入数字或英文'))
      } else {
        callback()
      }
    }
    return {
      istianjia: false,
      tableHeight: document.body.clientHeight - 275,
      setDisabled: false,
      unEdit: false, // 设置某个字段不可修改
      isUpdate: true,
      total: null,
      currentPage: 1, // 页数
      pageSize: 15,
      listLoading: true,
      disable: false,
      sbtypeOneList: [], // 大类
      sbtypeTwoList: [], // 中类
      sbtypeThreeList: [], // 小类
      sbtypeOneNameList: [], // 规格型号
      orgList: [{
        value: '设备管理中心',
        label: '设备管理中心'
      }],
      isNewlist: [{
        value: 1,
        label: '是'
      }, {
        value: 0,
        label: '否'
      }],
      isassetCompList: [{
        value: '1180',
        label: '1180（煤业）'
      }, {
        value: '1730',
        label: '1730（东华）'
      }],
      stateCodelist: [{
        value: '0001',
        label: '在租'
      }, {
        value: '0002',
        label: '已租'
      }],
      positionList: [], // 功能位置list
      wareList: [], // 仓库list
      isRfidlist: [{
        value: 1,
        label: '是'
      }, {
        value: 0,
        label: '否'
      }],
      isLeaseList: [{
        value: 1,
        label: '是'
      }, {
        value: 0,
        label: '否'
      }],
      statusOptions: ['中心', '矿处'],
      statusOptions1: ['中心1', '矿处1'],
      rules: {
        name: [{ required: true, message: '请输入设备名称' }],
        sbtypeOne: [{ required: true, message: '请选择设备大类', trigger: 'change' }],
        sbtypeTwo: [{ required: true, message: '请选择设备中类', trigger: 'change' }],
        sbtypeThree: [{ required: true, message: '请选择设备小类', trigger: 'change' }],
        sbmodelCode: [{ required: true, message: '请选择规格型号', trigger: 'change' }],
        code: [{ msg: '请输入设备识别码', validator: validateRquNumEn }],
        isNew: [{ required: true, message: '请选择是否全新', trigger: 'change' }],
        isRfid: [{ required: true, message: '请选择是否开启rfid', trigger: 'change' }],
        isLease: [{ required: true, message: '请选择是否租赁', trigger: 'change' }],
        techCode: [{ msg: '请输入技术识别码', validator: validateRquNumEn }],
        factory: [{ required: true, message: '请输入生产厂家' }],
        ware: [{ required: true, message: '请输入生产仓库' }],
        newRatio: [{ required: true, message: '请输入新度系数', trigger: 'change' }],
        mainPara: [{ required: true, message: '请输入主要技术参数' }],
        useDate: [{ required: true, message: '请选择启用日期' }],
        buyPrice: [{ required: true, message: '请输入购置价值' }],
        comp: [{ required: true, message: '请选择所属公司', trigger: 'change' }],
        arriveDate: [{ required: true, message: '请选择到货日期' }],
        costYears: [{ validator: validateInt }],
        maCode: [{ validator: validateNumEn }],
        contranct: [{ validator: validateNumEn }],
        prodCode: [{ validator: validateNumEn }],
        proofCode: [{ validator: validateNumEn }],
        assetCode: [{ validator: validateNumEn }],
        assetComp: [{ required: true, message: '请选择资产公司', trigger: 'change' }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑通用设备信息',
        create: '添加通用设备信息',
        info: '通用设备信息详情'
      },
      dialogPvVisible: false,
      tableKey: 0,
      value: '所属公司',
      hasChange: false,
      hasInit: false,
      ss: 11,
      listQuery: {
        code: '',
        name: '',
        comp: '',
        sbtypeOne: '',
        sbtypeTwo: '',
        sbtypeThree: '',
        sbmodelCode: '',
        isLease: ''
      },
      tableData3: [], // 页面显示列表
      temp: {
        assetComp: '', // 资产公司
        isLease: '', // 是否租赁
        repaircost: '', // 年修理费系数
        costYears: '', // 财务费用折旧年限
        stateCode: '', // 状态编码
        positionCode: '', // 功能位置编码
        isNew: '', // 是否全新
        code: '', // 设备识别码
        comp: '', // 所属公司
        sbmodelCode: '', // 规格型号
        sbtypeOne: '', // 大类
        sbtypeTwo: '', // 中类
        sbtypeThree: '', // 小类
        name: '', // 设备名称
        value1: '', // 大类
        techCode: '', // 技术识别码
        outcode: '', // 出场编码
        ontime: '', // MA有效期止
        allow: '', // 生产许可证
        value2: '', // 所属公司
        value3: '', // 是否全新
        isRfid: '', // 是否开启rfid
        value5: '', // 是否租赁
        value6: '', // 中类
        value7: '', // 规格型号
        value8: '', // 小类
        factory: '', // 生产厂家
        maCode: '', // MA编号
        certificate: '', // 防爆证书
        arriveDate: '', // 到货日期
        contractno: '', // 合同号
        warehouse: '', // 仓库
        outdate: '', // 出厂日期
        maStartDate: '', // MA有效期
        proofcode: '', // 防爆证书编号
        opendate: '', // 启用日期
        // buyPrice: '', // 购置价值
        // dayLeaseFee: '', // 单价
        position_code: '', // 功能位置编码
        state_code: '', // 状态编码
        leaseRate: '', // 融资租赁利率
        repair_ratio: '', // 年修理费系数
        manage_fee_ratio: '', // 年管理费系数
        equipment_use_ratio: '', // 年设备使用系数
        equipment: '', // 设备识别码
        new_ratio: '', // 新度系数
        main_para: '', // 主要技术参数
        assetCode: '',
        maEndDate: '',
        prodCode: '',
        prodDate: '',
        proof: '',
        proofCode: '',
        useDate: '',
        ware: '',
        repairRatio: '',
        manageFeeRatio: '',
        equipmentUseRatio: '',
        newRatio: '',
        mainPara: '',
        para1: '', // 技术参数1
        para2: '', // 技术参数2
        para3: '', // 技术参数3
        para4: '', // 技术参数4
        para5: '', // 技术参数5
        para6: '', // 技术参数6
        para7: '', // 技术参数7
        para8: '', // 技术参数8
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: '',
        status1: ''
      },
      buttonlist: [],
      authorityCodebutton: [],
      authorityCodePage: ''
    }
  },
  mounted() {
  },
  filters: {
    datachange(time) {
      var d = new Date(time)
      var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      //  + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      return times
    },
    isNew(value) {
      if (value === 1) {
        return '是'
      } else {
        return '否'
      }
    },
    isLeaseFilter(value) {
      if (value === 1) {
        return '是'
      } else if (value === 0) {
        return '否'
      }
    }
  },
  created() {
    const url = sessionStorage.getItem('index')
    this.buttonlist = controllbutton(url)
    this.authorityCodebutton = this.buttonlist[0]
    this.authorityCodePage = this.buttonlist[1]
    this.getList(this.currentPage, this.pageSize)
    this.getEqBigTypeList(1, '')
    this.getPositionOrWareList('01')
    this.getPositionOrWareList('02')
  },
  watch: {
    'sbtypeOneList': function(newValue, oldValue) {
      this.sbtypeTwoList = null
    }
  },
  methods: {
    // 获取当前选取的数据
    selectRow(val) {
      this.selectlistRow = val
    },
    // 搜索调用的方法
    search() {
      this.getList(this.currentPage, this.pageSize)
    },
    // 重置调用的方法
    reset() {
      this.listQuery.code = ''
      this.listQuery.name = ''
      this.listQuery.comp = ''
      this.listQuery.sbtypeOne = ''
      this.listQuery.sbtypeTwo = ''
      this.listQuery.sbtypeThree = ''
      this.listQuery.sbmodelCode = ''
      this.listQuery.isLease = ''
      this.sbtypeTwoList = []
      this.sbtypeThreeList = []
      this.sbtypeOneNameList = []
      this.getList(this.currentPage, this.pageSize)
      // window.location.reload()
    },
    // 获取列表
    getList(page, size) {
      this.listLoading = true
      const _this = this
      const params = {
        code: this.listQuery.code,
        name: this.listQuery.name,
        comp: this.listQuery.comp,
        sbtypeOne: this.listQuery.sbtypeOne,
        sbtypeTwo: this.listQuery.sbtypeTwo,
        sbtypeThree: this.listQuery.sbtypeThree,
        sbmodelCode: this.listQuery.sbmodelCode,
        isLease: this.listQuery.isLease,
        pageNum: page,
        pageSize: size
      }
      require_get('/v1/sbequipmentt/list', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        _this.listLoading = false
        if (res.data.meta.code === '200') {
          _this.total = res.data.data.total
          var result = res.data.data.list
          _this.tableData3 = result
        } else if (res.data.meta.code === '201') {
          _this.listLoading = false
          _this.tableData3 = []
          _this.$notify({
            title: '系统提示',
            message: res.data.msg,
            type: 'warning',
            duration: 3000
          })
        } else {
          _this.$notify({
            title: '系统提示',
            message: res.data.msg,
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
    // 添加弹窗
    handleCreate() {
      this.setDisabled = false
      this.unEdit = false
      this.isUpdate = true
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      setTimeout(() => {
        this.$refs['dataForm'].resetFields()
      }, 100)
    },
    // 添加操作
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.istianjia = true
          this.disable = true
          const _this = this
          require_post('/v1/sbequipmentt/create', {
            token: token,
            authorityCode: 1
          }, _this.temp, function(res) {
            if (res.data.meta.code === '200') {
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
                message: res.data.meta.message,
                type: 'warning',
                duration: 2000
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
    // 编辑数据
    edit() {
      if (this.selectlistRow) {
        if (this.selectlistRow.length !== 0 && this.selectlistRow.length === 1) {
          this.isUpdate = true
          this.setDisabled = false
          this.unEdit = true
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
          this.getManagement(this.selectlistRow[0].id)
          this.getEqMiddleTypeList(this.selectlistRow[0].sbtypeOne) // 获取中类列表
          this.getEqSmallTypeList(this.selectlistRow[0].sbtypeTwo) // 获取小类列表
          this.getSbtypeOneNameList(this.selectlistRow[0].sbtypeThree) // 获取规格型号
        } else {
          this.$notify({
            message: '请选择一条数据进行编辑！',
            type: 'warning',
            duration: 3000,
            title: '系统提示'
          })
        }
      } else {
        this.$notify({
          message: '请选择一条数据进行编辑！',
          type: 'warning',
          duration: 3000,
          title: '系统提示'
        })
      }
    },
    // 更新设备数据
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const _this = this
          require_put('/v1/sbequipmentt/update', {
            token: token,
            authorityCode: 1
          }, _this.temp, function(res) {
            if (res.data.meta.code === '200') {
              _this.dialogFormVisible = false
              _this.$notify({
                title: '系统提示',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              _this.getList(_this.currentPage, _this.pageSize)
            } else {
              _this.$notify({
                title: '系统提示',
                message: '更新失败',
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
    // 弹出详细弹窗方法
    handleInfo(row) {
      this.setDisabled = true
      this.unEdit = false
      this.dialogStatus = 'info'
      this.dialogFormVisible = true
      this.isUpdate = false
      this.getManagement(row.id)
      this.getEqMiddleTypeList(row.sbtypeOne) // 获取中类列表
      this.getEqSmallTypeList(row.sbtypeTwo) // 获取小类列表
      this.getSbtypeOneNameList(row.sbtypeThree) // 获取规格型号
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 获取设备管理详细
    getManagement(id) {
      this.codeShowYN = false
      this.dialogFormVisible = true
      const _this = this
      require_get('/v1/sbequipmentt/find/' + id, {
        token: token,
        authorityCode: 1
      }, { }, function(res) {
        if (res.data.meta.code === '200') {
          const result = res.data.data
          _this.temp = result
        } else {
          _this.$notify({
            title: '系统提示',
            message: res.data.meta.message,
            type: 'warning',
            duration: 2000
          })
        }
      }, function(err) {
        _this.listLoading = false
        Vue.use(err)
        this.$notify({
          title: '系统提示',
          message: '系统错误',
          type: 'error',
          duration: 3000
        })
      })
    },
    // 删除操作
    delData() {
      const _this = this
      if (_this.selectlistRow) {
        if (_this.selectlistRow.length !== 0) {
          _this.$confirm('确认要删除么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids = ''
            for (var i = 0; i < _this.selectlistRow.length; i++) {
              ids += _this.selectlistRow[i].id + ','
            }
            ids = ids.substring(0, ids.length - 1)
            require_delete('/v1/sbequipmentt/deletes/' + ids, {
              token: token,
              authorityCode: 1
            }, { }, function(res) {
              console.log(res)
              _this.$notify({
                message: '删除成功',
                type: 'warning',
                duration: 3000,
                title: '系统提示'
              })
              _this.getList(_this.currentPage, _this.pageSize)
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
          }).catch(() => {
            _this.$notify({
              type: 'info',
              message: '已取消删除',
              duration: 3000,
              title: '系统提示'
            })
          })
        } else {
          _this.$notify({
            message: '请选择数据进行删除操作！',
            type: 'warning',
            duration: 3000,
            title: '系统提示'
          })
        }
      } else {
        _this.$notify({
          message: '请选择数据进行删除操作！',
          type: 'warning',
          duration: 3000,
          title: '系统提示'
        })
      }
    },
    // 设备大类
    getEqBigTypeList(levelValue, pCode) {
      const _this = this
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
    // 设备中类
    getEqMiddleTypeList(event) {
      var selectBigCode = event
      this.getEqBigTypeList(2, selectBigCode)
    },
    // 设备小类
    getEqSmallTypeList(event) {
      var selectMiddleCode = event
      this.getEqBigTypeList(3, selectMiddleCode)
    },
    // 规格型号列表
    getSbtypeOneNameList(event) {
      var selectSbtypeOneName = event
      var _this = this
      require_get('/v1/sbmodel/listBySbtypeThree', {
        token: token,
        authorityCode: 1
      }, { sbtypeThree: selectSbtypeOneName }, function(res) {
        if (res.data.meta.code === '200') {
          _this.sbtypeOneNameList = res.data.data
        } else {
          _this.$notify({
            title: '系统提示',
            message: res.data.meta.message,
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
    // 设备功能位置 | 仓库列表
    getPositionOrWareList(type) {
      const _this = this
      const params = {
        type: type,
        pageNum: 1,
        pageSize: 1000
      }
      require_get('/v1/sbposition/list', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        var data = []
        if (res.data.meta.code === '200') {
          var result = res.data.data.list
          for (let i = 0; i < result.length; i++) {
            var obj = {}
            obj.code = result[i].code
            obj.name = result[i].name
            data[i] = obj
          }
          if (type === '01') {
            _this.positionList = data
          } else {
            _this.wareList = data
          }
        } else {
          _this.$notify({
            title: '系统提示',
            warning: res.data.meta.message,
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
  .tinymce-container {
    position: relative;
  }
  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
  .editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
  }
  .editor-upload-btn {
    display: inline-block;
  }
  .el-dialog {
    margin-top: 1% !important;
  }
  .el-dialog__body {
    padding: 10px 20px !important;
  }
  .form .el-input {
    width: 200px !important;
  }
</style>
