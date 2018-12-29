<template>
  <div class="app-container">
    <div class="filter-container1">
      <el-date-picker v-model="listQuery.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 140px;" class="filter-item" ></el-date-picker>
      <el-select filterable clearable style="width: 140px" class="filter-item" v-model="listQuery.useDepartment" placeholder="选择单位">
        <el-option v-for="item in applyCompanyList" :key="item.deptCode" :label="item.name" :value="item.name">
        </el-option>
      </el-select>
      <el-input style="width: 140px;" placeholder="输入编号" v-model="listQuery.number"></el-input>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="filter-item" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
      <div class="btn_right">
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning" icon="el-icon-upload"  @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="table-center1" id="reportDiv">
      <el-table style="width: 961px;" fit class="fix-header">
        <el-table-column :label="listQuery.date | monthFilter" align="center">
          <el-table-column :label="'使用单位：' + listQuery.useDepartment"></el-table-column>
          <el-table-column :label="listQuery.date | dateFilter" align="center"></el-table-column>
          <el-table-column :label="'编号：' + listQuery.number" align="right"></el-table-column>
        </el-table-column>
      </el-table>
      <!-- 综机折旧修理费报表 -->
      <el-table :data="tableData3" :span-method="objectSpanMethod" border fit highlight-current-row style="width: 961px" class="list-table1">
        <el-table-column width="180px" align="center" prop="usePosition" label="使用地点"></el-table-column>
        <el-table-column width="180px" align="center" prop="usePositionNum" label="申请单编号"></el-table-column>
        <el-table-column width="160px" align="center" prop="appendixPage" label="附清单（张）"></el-table-column>
        <el-table-column width="200px" align="center" prop="zjxlFee" label="综机折旧大修费（元）"></el-table-column>
        <el-table-column width="240px" align="center" label="备注">
          <template slot-scope="scope">
            <el-input type="text" class="table-input" v-model="scope.row.remark"  v-if="!scope.row.notShow"></el-input>
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableData" style="width:901px" :show-header="false" class="fix-header">
        <el-table-column width="185px">
					<template slot-scope="scope">
            <span>{{scope.row.name1}}</span>
            <span style="display: none">{{sign.satrap}}</span> <!--  导出时显示签名-->
            <el-input type="text" v-model="sign.satrap"></el-input>
					</template>
				</el-table-column>
        <el-table-column width="185px">
					<template slot-scope="scope">
            <span>{{scope.row.name2}}</span>
            <span style="display: none">{{sign.shPerson}}</span>
            <el-input type="text" v-model="sign.shPerson"></el-input>
					</template>
				</el-table-column>
        <el-table-column width="230px">
					<template slot-scope="scope">
            <span>{{scope.row.name3}}</span>
            <span style="display: none">{{sign.centerManager}}</span>
            <el-input type="text" v-model="sign.centerManager"></el-input>
					</template>
				</el-table-column>
        <el-table-column width="300px">
					<template slot-scope="scope">
            <span>{{scope.row.name4}}</span>
            <span style="display: none">{{sign.sectionChief}}</span>
            <el-input type="text" v-model="sign.sectionChief"></el-input>
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
  name: 'ydh',
  data() {
    return {
      listQuery: { // 搜索条件
        date: '',
        useDepartment: '', // 单位信息
        number: '' // 编号
      },
      applyCompanyList: [],
      tableData3: [],
      sign: {
        satrap: '',
        sectionChief: '',
        shPerson: '',
        centerManager: ''
      },
      tableData: [
        { name1: '主管：', name2: '审核：', name3: '公司经办人：', name4: '东滩矿机电环保科科长：' }
      ] // 假数据
    }
  },
  created() {
    this.getDeptList()
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) { // 合并表格第一列的最后两行
        if (rowIndex === this.tableData3.length - 2) { // 倒数第二行
          return [2, 1]
        } else if (rowIndex === this.tableData3.length - 1) { // 最后一行
          return [0, 0]
        }
      }
      if (rowIndex === this.tableData3.length - 1) { // 合并表格最后一行的2 3 4列
        if (columnIndex === 3) {
          return [1, 3]
        } else if (columnIndex === 2 || columnIndex === 4) {
          return [0, 0]
        }
      }
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
    search() { // 搜索设备使用清单 方法
      if (this.listQuery.useDepartment === '' || this.listQuery.date === '' || this.listQuery.date === null || this.listQuery.equipmentEffect === '') {
        this.$notify({
          title: '系统提示',
          message: '请完整选择搜索条件！',
          type: 'warning',
          duration: 3000
        })
      } else {
        const _this = this
        const year = this.listQuery.date.substring(0, 4)
        const month = parseInt(this.listQuery.date.substring(5, 7)) + '' // 去掉10月之前月份的0
        const day = parseInt(this.listQuery.date.substring(8)) + ''
        const jsonString = {}
        jsonString.zjxlYear = year
        jsonString.zjxlMonth = month
        jsonString.zjxlDay = day
        jsonString.useDepartment = this.listQuery.useDepartment // 部门编号code
        jsonString.number = this.listQuery.number // 编号
        require_get('/v1/zjxl?page=1&size=1000&jsonString=' + JSON.stringify(jsonString), {
          token: token,
          authorityCode: 1
        }, {}, function(res) {
          if (res.data.status === 200) {
            const list = res.data.data
            if (list && list.length !== 0) {
              _this.sign.satrap = list[0].satrap // 获取签字
              _this.sign.sectionChief = list[0].sectionChief
              _this.sign.shPerson = list[0].shPerson
              _this.sign.centerManager = list[0].centerManager
              _this.addBottom(list)
            } else {
              _this.tableData3 = []
              _this.sign.satrap = '' // 获取签字
              _this.sign.sectionChief = ''
              _this.sign.shPerson = ''
              _this.sign.centerManager = ''
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
    addBottom(list) { // 添加最后两行
      const obj = {
        usePosition: '合计',
        usePositionNum: '',
        appendixPage: list[0].appendixPageSum,
        zjxlFee: list[0].sum,
        remark: '',
        notShow: true
      }
      const obj2 = {
        usePosition: '',
        usePositionNum: '大写',
        appendixPage: null,
        zjxlFee: list[0].capital,
        remark: ''
      }
      list.push(obj, obj2)
      this.tableData3 = list
    },
    exportExcel() { // 点击导出按钮触发保存
      if (this.tableData3.length !== 0) {
        const _this = this
        const year = this.listQuery.date.substring(0, 4)
        const month = parseInt(this.listQuery.date.substring(5, 7)) + '' // 去掉10月之前月份的0
        const day = parseInt(this.listQuery.date.substring(8)) + ''
        const listZReportItems = []
        this.tableData3.forEach((val, idx) => {
          if (!(idx === this.tableData3.length - 2 || idx === this.tableData3.length - 1)) { // 去掉最后两项
            const obj = {}
            obj.appendixPage = val.appendixPage // 清单
            obj.appendixPageSum = val.appendixPageSum // 清单总数
            obj.capital = val.capital
            obj.centerManager = this.sign.centerManager
            obj.kb = val.kb
            obj.number = val.number
            obj.remark = val.remark
            obj.satrap = this.sign.satrap
            obj.sectionChief = this.sign.sectionChief
            obj.shPerson = this.sign.shPerson
            obj.sum = val.sum
            obj.useDepartment = this.listQuery.useDepartment // 单位name
            obj.usePosition = val.usePosition
            obj.usePositionNum = val.usePositionNum
            obj.zc = val.zc
            obj.zjxlDay = day
            obj.zjxlFee = val.zjxlFee
            obj.zjxlMonth = month
            obj.zjxlYear = year
            listZReportItems.push(obj)
          }
        })
        const params = {
          zjxlReports: listZReportItems
        }
        require_post('/v1/zjxl', {
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
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '东华重工有限公司综机折旧修理费.xlsx')
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
      this.listQuery.useDepartment = '' // 单位信息
      this.listQuery.number = '' // 编号
      this.tableData3 = []
    }
  },
  filters: {
    dateFilter(value) { // 年月日
      const year = value ? value.substring(0, 4) : ''
      const month = value ? value.substring(5, 7) : ''
      const day = value ? value.substring(8) : ''
      return `${year} 年 ${month} 月 ${day} 日`
    },
    monthFilter(value) { // 月份
      const month = value ? value.substring(5, 7) : ''
      return month ? `东华重工有限公司（${month}）月综机折旧修理费` : '东华重工有限公司综机折旧修理费'
    }
  }
}
</script>

<style>
  /* 头部表名table无数据时不显示 暂无数据字样 */
  .fix-header .el-table__empty-block{
    min-height: 0;
  }
  .fix-header span{
    float: left;
    line-height: 30px;
  }
  .fix-header .el-input{
    float: left;
    width: 120px;
  }
  .fix-header .el-input--medium .el-input__inner{
    height: 30px;
    line-height: 30px;
    border: none;
    padding: 0 10px;
  }
  .btn_right{
      float: right;
  }
  .filter-container1 .filter-item{
    margin-bottom: 5px
  }
  .table-center1{
    width: 1000px;
    margin: 0 auto;
  }
  .theader1{
    font-size: 1.2rem
  }
  .set-color1{
    width: 961px;
    padding: 15px;
    color: #606266
  }
  .center{
    text-align: center
  }
  .right{
    text-align: right
  }
  .set-color1 .el-input--medium .el-input__inner{
    height: 22px;
    line-height: 22px;
    border: none;
    padding: 0 10px;
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
