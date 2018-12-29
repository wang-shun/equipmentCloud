<template>
  <div class="app-container">
    <div class="filter-container2">
      <el-date-picker v-model="listQuery.date" type="month" placeholder="选择年月" value-format="yyyy-MM" format="yyyy-MM" style="width: 140px;" class="filter-item" ></el-date-picker>
      <el-select filterable clearable style="width: 140px" class="filter-item" v-model="listQuery.deptCode" placeholder="选择单位"  @change="getEffect">
        <el-option v-for="item in applyCompanyList" :key="item.deptCode" :label="item.name" :value="item.deptCode">
        </el-option>
      </el-select>
      <el-select filterable clearable style="width: 140px" class="filter-item" v-model="listQuery.equipmentEffect" placeholder="选择功能位置">
        <el-option v-for="item in effectList" :key="item.code" :label="item.name" :value="item.name">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="filter-item" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
      <div class="btn_right">
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning" icon="el-icon-upload" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="table-center2" id="reportDiv">
      <el-table style="width: 1401px;" fit class="fix-header">
        <el-table-column label="综机设备使用清单" align="center">
          <el-table-column :label="'使用单位：' + obj.name || ''"></el-table-column>
          <el-table-column :label="'编号：' + listQuery.equipmentEffect" align="right"></el-table-column>
        </el-table-column>
      </el-table>
      <!-- 综机折旧修理费报表 -->
      <el-table :data="tableData3" class="list-table1" border fit highlight-current-row style="width: 1401px">
        <el-table-column width="40px" align="center" prop="sumTxt"></el-table-column>
        <el-table-column width="180px" align="center" prop="sbName" label="名称"></el-table-column>
        <el-table-column width="180px" align="center" prop="equipmentModel" label="规格型号"></el-table-column>
        <el-table-column width="60px" align="center" prop="assetUnit" label="单位"></el-table-column>
        <el-table-column width="80px" align="center" label="数量">
					<template slot-scope="scope">
            <el-input type="text" class="table-input" v-model="scope.row.equipmentNum" v-show="!scope.row.notShow" @change="handleEdit(scope.$index, scope.row)"></el-input>
						<span>{{scope.row.equipmentNum}}</span>
					</template>
				</el-table-column>
				<el-table-column width="160px" align="center" label="日计费标准（元）">
					<template slot-scope="scope">
            <el-input type="text" class="table-input" v-model="scope.row.costA1" v-show="!scope.row.notShow" @change="handleEdit(scope.$index, scope.row)"></el-input>
						<span>{{scope.row.costA1}}</span>
					</template>
				</el-table-column>
				<el-table-column width="100px" align="center" label="收费天数">
					<template slot-scope="scope">
            <el-input type="text" class="table-input" v-model="scope.row.day" v-show="!scope.row.notShow" @change="handleEdit(scope.$index, scope.row)"></el-input>
						<span>{{scope.row.day}}</span>
					</template>
				</el-table-column>
				<el-table-column width="100px" align="center" label="金额（元）">
					<template slot-scope="scope">
						<span>{{scope.row.sum | numFilter}}</span>
					</template>
				</el-table-column>
        <el-table-column width="100px" align="center" prop="isNew" label="新设备"></el-table-column>
        <el-table-column width="160px" align="center" prop="feeDay" label="收费期限"></el-table-column>
        <el-table-column width="240px" align="center" label="备注">
          <template slot-scope="scope">
            <el-input type="text" class="table-input" v-model="scope.row.remarks" v-show="!scope.row.notShow"></el-input>
            <span>{{scope.row.remarks}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { require_get, require_post } from '@/assets/pubJS'
import Cookies from 'js-cookie'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
const token = Cookies.get('token')

export default {
  name: 'zjm',
  data() {
    return {
      listQuery: { // 搜索条件
        date: '',
        deptCode: '', // 单位信息
        equipmentEffect: '' // 功能位置name
      },
      applyCompanyList: [], // 单位列表
      effectList: [], // 功能位置列表
      tableData3: [], // table显示信息
      dtkData: {}, // dtkList
      equipmentList: [],
      obj: { // 存放选中的单位信息以显示在html
        name: '',
        deptCode: '',
        id: ''
      },
      firstLine: { // table第一行sum
        sumTxt: '总计',
        notShow: true,
        sbName: '',
        equipmentModel: '',
        assetUnit: '',
        equipmentNum: '',
        costA1: '',
        day: '',
        sum: 0,
        newEquipment: '',
        limit: '',
        remarks: ''
      }
    }
  },
  created() {
    this.getDeptList()
  },
  methods: {
    handleEdit(idx, row) { // 行内编辑
      row.sum = row.equipmentNum * row.day * row.costA1
      let sum = 0
      this.tableData3.forEach((val, idx) => {
        if (idx !== 0) {
          sum += val.sum
        }
      })
      this.tableData3[0].sum = sum
    },
    getDeptList() { // 获取单位列表
      const _this = this
      this.applyCompanyList = []
      require_get('/v1/elplan?page=1&size=100&type=21', { // 暂时写死
        token: token,
        authorityCode: 1
      }, {}, function(res) {
        if (res.data.status === 200) {
          const list = res.data.data.list
          list.forEach((val, idx) => {
            const pos = {}
            pos.deptCode = val.code
            pos.name = val.name
            pos.id = val.id
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
    getEffect(val) { // 获取功能位置列表
      if (val !== '') {
        const _this = this
        this.effectList = []
        this.listQuery.equipmentEffect = '' // 每次点击清空复选框默认值
        this.obj = this.applyCompanyList.find((item) => { // 获取选中的单位name
          return item.deptCode === val
        })
        if (this.listQuery.deptCode) {
          const planPosition = this.listQuery.deptCode // 部门code
          require_get('/v1/elplan/findPositionList?planPosition=' + planPosition, {
            token: token,
            authorityCode: 1
          }, {}, function(res) {
            if (res.data.status === 200) {
              const list = res.data.data
              list.forEach((val, idx) => {
                const pos = {}
                pos.code = val.code
                pos.name = val.name
                _this.effectList.push(pos)
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
        } else {
          this.$notify({
            title: '提示',
            message: '请先选择单位！',
            type: 'info',
            duration: 3000
          })
        }
      }
    },
    search() { // 搜索设备使用清单 方法
      if (this.listQuery.deptCode === '' || this.listQuery.date === '' || this.listQuery.equipmentEffect === '') {
        this.$notify({
          title: '系统提示',
          message: '请完整选择搜索条件！',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.tableData3 = [] // 每次点击搜索 清空上次结果
        this.dtkData = []
        const _this = this
        const year = this.listQuery.date.substring(0, 4)
        const month = parseInt(this.listQuery.date.substring(5, 7)) + '' // 去掉10月之前月份的0
        const jsonString = {}
        jsonString.equipmentEffect = this.listQuery.equipmentEffect // 功能位置name
        jsonString.useYear = year
        jsonString.useMonth = month
        jsonString.deptCode = this.listQuery.deptCode// 部门编号code
        require_get('/v1/report?page=1&size=1000&jsonString=' + JSON.stringify(jsonString), {
          token: token,
          authorityCode: 1
        }, {}, function(res) {
          if (res.data.status === 200) {
            const list = res.data.data.pageInfo.list
            if (list && list.length !== 0) {
              _this.dtkData = res.data.data.dtkList
              _this.firstLine.sum = _this.dtkData.sum
              list.unshift(_this.firstLine)
              _this.tableData3 = list
            } else {
              _this.tableData3 = []
              _this.$notify({
                title: '系统提示',
                message: '搜索结果为空',
                type: 'info',
                duration: 3000
              })
            }
          } else {
            _this.$notify({
              title: '错误',
              message: res.data.meta.message,
              type: 'error',
              duration: 3000
            })
          }
        })
      }
    },
    exportExcel() { // 点击导出按钮触发保存
      if (this.tableData3.length !== 0) {
        const _this = this
        const year = this.listQuery.date.substring(0, 4)
        const month = this.listQuery.date.substring(5)
        const listZReportItems = []
        this.tableData3.forEach((val, idx) => {
          if (idx !== 0) { // 将自己加的table第一行去掉
            const obj = {}
            obj.name = val.sbName || '' // 设备名
            obj.equipmentModel = val.equipmentModel || '' // 规格型号
            obj.equipmentUnit = val.unit || '' // 单位
            obj.equipmentNum = parseInt(val.equipmentNum) || null // 数量
            obj.costA1 = parseFloat(val.costA1) || null // 日记费标准
            obj.day = parseInt(val.day) || null
            obj.sum = parseFloat(val.sum) || null
            obj.remark = val.remarks || ''
            obj.equipmentCode = val.sbCode || ''// 设备code
            obj.isNew = val.isNew // 1 新设备 2 旧设备
            obj.feeDay = val.feeDay // 收费期限
            listZReportItems.push(obj)
          }
        })
        const params = {
          useDeptName: this.obj.name, // 使用单位名
          useDeptCode: this.listQuery.deptCode,
          // number: this.dtkData.number, // 编号
          number: this.listQuery.equipmentEffect, // 编号 暂时和equipemntPosition用一个值
          createExcelName: this.dtkData.createExcelName || '', // 制表人name
          statusName: this.dtkData.statusName || '', // 审核人name
          sureName: this.dtkData.sureName || '', // 矿方确认name
          createExcelCode: this.dtkData.createExcelCode || '', // 制表人code
          statusCode: this.dtkData.statusCode || '', // 审核人code
          sureCode: this.dtkData.sureCode || '', // 矿方确认code
          sum: this.tableData3[0].sum, // 合计金额
          useAtString: this.dtkData.useAt, // l领用时间
          equipmentPosition: this.listQuery.equipmentEffect, // 功能位置name
          useYear: year,
          useMonth: month,
          type: this.dtkData.type || null, // 矿类别
          listZReportItems: listZReportItems
        }
        require_post('/v1/report', {
          token: token,
          authorityCode: 1
        }, params, function(res) {
          if (res.data.status === 200) {
            _this.excel()
            _this.$notify({
              title: '系统提示',
              message: '导出成功',
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
        })
      } else {
        this.$notify({
          title: '提示',
          message: '数据为空，不可导出',
          type: 'info',
          duration: 3000
        })
      }
    },
    excel() { // 报表导出方法
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#reportDiv'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '综机设备使用清单.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    },
    // 重置调用的方法
    reset() {
      this.listQuery.date = ''
      this.listQuery.deptCode = '' // 单位信息
      this.listQuery.equipmentEffect = '' // 功能位置name
      this.tableData3 = []
    }
  },
  // 保留小数点后两位的过滤器，尾数不四舍五入
  filters: {
    numFilter(value) { // 截取当前数据到小数点后2位
      const transformVal = Number(value).toFixed(2)
      const realVal = transformVal.substring(0, transformVal.length)
      // num.toFixed(2)获取的是字符串
      return Number(realVal)
    }
  }
}
</script>

<style>
/* 头部表名table无数据时不显示 暂无数据字样 */
  .fix-header .el-table__empty-block{
    min-height: 0;
  }
  .btn_right{
      float: right;
  }
  .table-center2{
    width: 1450px;
    padding-top: 30px;
    margin: 0 auto;
  }
  .theader{
    color: #606266;
    font-size: 1.2rem
  }
  .set-color-zjm{
    width: 1401px;
    padding: 15px;
    color: #606266
  }
  .center{
    text-align: center
  }
  .right{
    text-align: right
  }
  /* 行内编辑 */
  .list-table1 .el-input {
    display: none
  }
  .list-table1 .current-row .el-input {
    display: block
  }
  .list-table1 .current-row .el-input + span {
    display: none
  }
  .list-table1 .el-input--medium .el-input__inner{
    height: 22px;
    line-height: 22px;
    padding: 0 10px;
  }
</style>
