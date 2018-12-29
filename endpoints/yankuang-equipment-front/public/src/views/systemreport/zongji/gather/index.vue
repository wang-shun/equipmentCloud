<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker type="year" v-model="listQuery.year" placeholder="选择年" style="width: 200px;" value-format="yyyy" format="yyyy"></el-date-picker>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="filter-item" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
      <div class="btn_right">
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning" icon="el-icon-upload" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <!-- 综机折旧修理费汇总表 -->
    <div id="reportDiv">
      <el-table :data="tableData3"  :span-method="objectSpanMethod" border fit highlight-current-row style="width: 100%;max-height:740px;">
        <el-table-column align="center" :label="`${listQuery.year || ''}年综机折旧修理费汇总表`">
          <el-table-column width="50px" align="center" type="index" label="序号"></el-table-column>
          <el-table-column width="120px" align="center" prop="deptName" label="矿别"></el-table-column>
          <el-table-column align="center" label="逐月累计收费金额（万元，不含税）">
            <el-table-column width="100px" align="center" prop="januaryRepairsCost" label="1月"></el-table-column>
            <el-table-column width="100px" align="center" prop="februaryRepairsCost" label="2月"></el-table-column>
            <el-table-column width="100px" align="center" prop="marchRepairsCost" label="3月"></el-table-column>
            <el-table-column width="100px" align="center" prop="aprilRepairsCost" label="4月"></el-table-column>
            <el-table-column width="100px" align="center" prop="mayRepairsCost" label="5月"></el-table-column>
            <el-table-column width="100px" align="center" prop="juneRepairsCost" label="6月"></el-table-column>
            <el-table-column width="100px" align="center" prop="julyRepairsCost" label="7月"></el-table-column>
            <el-table-column width="100px" align="center" prop="augustRepairsCost" label="8月"></el-table-column>
            <el-table-column width="100px" align="center" prop="sepRepairsCost" label="9月"></el-table-column>
            <el-table-column width="100px" align="center" prop="octRepairsCost" label="10月"></el-table-column>
            <el-table-column width="100px" align="center" prop="novRepairsCost" label="11月"></el-table-column>
            <el-table-column width="100px" align="center" prop="decRepairsCost" label="12月"></el-table-column>
            <el-table-column width="120px" align="center" prop="deptSum" label="合计"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="tableData" :show-header="showHeader"  :span-method="objectSpanMethod1"
        border fit highlight-current-row style="width: 100%;max-height:740px;margin-top:20px">
        <el-table-column align="center">
          <el-table-column width="50px" align="center" type="index" prop="sumText"></el-table-column>
          <el-table-column width="120px" align="center" prop="deptName"></el-table-column>
          <el-table-column align="center">
            <el-table-column width="100px" align="center" prop="januaryRepairsCost" label="1月"></el-table-column>
            <el-table-column width="100px" align="center" prop="februaryRepairsCost" label="2月"></el-table-column>
            <el-table-column width="100px" align="center" prop="marchRepairsCost" label="3月"></el-table-column>
            <el-table-column width="100px" align="center" prop="aprilRepairsCost" label="4月"></el-table-column>
            <el-table-column width="100px" align="center" prop="mayRepairsCost" label="5月"></el-table-column>
            <el-table-column width="100px" align="center" prop="juneRepairsCost" label="6月"></el-table-column>
            <el-table-column width="100px" align="center" prop="julyRepairsCost" label="7月"></el-table-column>
            <el-table-column width="100px" align="center" prop="augustRepairsCost" label="8月"></el-table-column>
            <el-table-column width="100px" align="center" prop="sepRepairsCost" label="9月"></el-table-column>
            <el-table-column width="100px" align="center" prop="octRepairsCost" label="10月"></el-table-column>
            <el-table-column width="100px" align="center" prop="novRepairsCost" label="11月"></el-table-column>
            <el-table-column width="100px" align="center" prop="decRepairsCost" label="12月"></el-table-column>
            <el-table-column width="120px" align="center" prop="deptSum" label="合计"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="totalNum" :show-header="showHeader" border fit highlight-current-row style="width: 100%;max-height:740px" :span-method="objectSpanMethod2">
        <el-table-column align="center">
          <el-table-column width="50px" align="center"></el-table-column>
          <el-table-column width="120px" align="center" prop="sumText"></el-table-column>
          <el-table-column align="center">
            <el-table-column width="100px" align="center" prop="addUpSum01"></el-table-column>
            <el-table-column width="100px" align="center" prop="addUpSum02"></el-table-column>
            <el-table-column width="100px" align="center" prop="addUpSum03"></el-table-column>
            <el-table-column width="100px" align="center" prop="addUpSum04"></el-table-column>
            <el-table-column width="100px" align="center" prop="addUpSum05"></el-table-column>
            <el-table-column width="100px" align="center" prop="addUpSum06"></el-table-column>
            <el-table-column width="100px" align="center" prop="addUpSum07"></el-table-column>
            <el-table-column width="100px" align="center" prop="addUpSum08"></el-table-column>
            <el-table-column width="100px" align="center" prop="addUpSum09"></el-table-column>
            <el-table-column width="100px" align="center" prop="addUpSum10"></el-table-column>
            <el-table-column width="100px" align="center" prop="addUpSum11"></el-table-column>
            <el-table-column width="100px" align="center" prop="addUpSum12"></el-table-column>
            <el-table-column width="120px" align="center" prop="moreDeptAddUpSum"></el-table-column>
          </el-table-column>
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
  name: 'gather',
  data() {
    return {
      listQuery: { // 搜索条件
        year: ''
      },
      analyse: '', // 分析内容
      showHeader: false,
      firstSum: [],
      secondSum: [],
      totalNum: [], // 总计
      tableData3: [], // 本部
      tableData: [], // 外部
      // analyseTable: [
      //   { name: '分析：' }
      // ],
      tempObj: {}, // 暂存小计
      tempObj2: {}
    }
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) { // 合并表第一个表最后一行前两列
      if (rowIndex === this.tableData3.length - 1) {
        if (columnIndex === 1) {
          return [1, 2]
        } else if (columnIndex === 0) {
          return [0, 0]
        }
      }
    },
    objectSpanMethod1({ row, column, rowIndex, columnIndex }) { // 合并表第二个表最后一行前两列
      if (rowIndex === this.tableData.length - 1) {
        if (columnIndex === 1) {
          return [1, 2]
        } else if (columnIndex === 0) {
          return [0, 0]
        }
      }
    },
    objectSpanMethod2({ row, column, rowIndex, columnIndex }) { // 合并表第二个表最后一行前两列
      if (columnIndex === 1) {
        return [1, 2]
      } else if (columnIndex === 0) {
        return [0, 0]
      }
    },
    search() { // 搜索综机折旧修理费报表 方法
      if (this.listQuery.year === '') {
        this.$notify({
          title: '系统提示',
          message: '请选择年份！',
          type: 'warning',
          duration: 3000
        })
      } else {
        const _this = this
        const year = this.listQuery.year
        const jsonString = {}
        jsonString.yearTime = year
        jsonString.assetComp = '1100' // 汇总固定为1100
        require_get('/v1/zjZjRepairFee/findCostRepairList?jsonString=' + JSON.stringify(jsonString), {
          token: token,
          authorityCode: 1
        }, {}, function(res) {
          if (res.data.status === 200) {
            const list = res.data.data
            if (list && list.length !== 0) {
              const temp = _this.tempObj
              const temp2 = _this.tempObj2
              const homeSum = list.zjDepreciationCostReportItemSumHomes[0]
              const externalSum = list.zjDepreciationCostReportItemSumExternals[0]
              temp.januaryRepairsCost = homeSum.month01xiaoji // 将zjDepreciationCostReportItemSumHomes加到tableData3尾
              temp.februaryRepairsCost = homeSum.month02xiaoji
              temp.marchRepairsCost = homeSum.month03xiaoji
              temp.aprilRepairsCost = homeSum.month04xiaoji
              temp.mayRepairsCost = homeSum.month05xiaoji
              temp.juneRepairsCost = homeSum.month06xiaoji
              temp.julyRepairsCost = homeSum.month07xiaoji
              temp.augustRepairsCost = homeSum.month08xiaoji
              temp.sepRepairsCost = homeSum.month09xiaoji
              temp.octRepairsCost = homeSum.month10xiaoji
              temp.novRepairsCost = homeSum.month11xiaoji
              temp.decRepairsCost = homeSum.month12xiaoji
              temp.deptSum = homeSum.moreDeptSum
              temp.deptName = '小计'
              _this.tableData3 = list.zjDepreciationCostReportItemsHome
              _this.tableData3.push(temp)
              temp2.januaryRepairsCost = externalSum.month01xiaoji // 将zjDepreciationCostReportItemSumExternals加到tableData尾
              temp2.februaryRepairsCost = externalSum.month02xiaoji
              temp2.marchRepairsCost = externalSum.month03xiaoji
              temp2.aprilRepairsCost = externalSum.month04xiaoji
              temp2.mayRepairsCost = externalSum.month05xiaoji
              temp2.juneRepairsCost = externalSum.month06xiaoji
              temp2.julyRepairsCost = externalSum.month07xiaoji
              temp2.augustRepairsCost = externalSum.month08xiaoji
              temp2.sepRepairsCost = externalSum.month09xiaoji
              temp2.octRepairsCost = externalSum.month10xiaoji
              temp2.novRepairsCost = externalSum.month11xiaoji
              temp2.decRepairsCost = externalSum.month12xiaoji
              temp2.deptSum = externalSum.moreDeptSum
              _this.tableData = list.zjDepreciationCostReportItemsExternal
              _this.tableData.push(temp2)
              list.zjDepreciationCostReportItemAddUpSums[0].sumText = '累计'
              _this.totalNum = list.zjDepreciationCostReportItemAddUpSums
            } else {
              _this.tableData3 = []
              _this.tableData = []
              _this.totalNum = []
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
      if (this.tableData3.length !== 0 || this.tableData.length !== 0) {
        const _this = this
        const data3 = []
        const data = []
        this.tableData3.forEach((val, idx) => { // 去掉最后一个sum数据
          if (idx !== this.tableData3.length - 1) {
            data3.push(val)
          }
        })
        this.tableData.forEach((val, idx) => {
          if (idx !== this.tableData.length - 1) {
            data.push(val)
          }
        })
        const params = {
          assetComp: '1100',
          reportName: `${this.listQuery.year}年综机折旧修理费汇总`,
          yearTime: this.listQuery.year,
          remark: this.analyse,
          zjDepreciationCostReportItemsHome: data3,
          zjDepreciationCostReportItemsExternal: data
        }
        require_post('/v1/zjZjRepairFee/saveZjDeCost', {
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
              message: res.data.msg,
              type: 'error',
              duration: 3000
            })
          }
        })
      } else {
        this.$notify({
          title: '提示',
          message: '数据为空，不能导出',
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
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '综机折旧修理费报表.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    },
    // 重置调用的方法
    reset() {
      this.listQuery.year = ''
      this.tableData3 = []
      this.tableData = []
    }
  }
}
</script>

<style <style lang="scss" scoped>
.btn_right{
    float: right;
  }
.filter-container .filter-item{
  margin-bottom: 5px
}
</style>


