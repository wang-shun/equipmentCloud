<template>
	<div class="app-container">
		<div class="filter-container1">
      <el-date-picker v-model="listQuery.date" type="month" placeholder="选择年月" value-format="yyyy-MM" format="yyyy-MM" style="width: 140px;" class="filter-item" ></el-date-picker>
      <el-select filterable clearable style="width: 140px" class="filter-item" v-model="listQuery.useDepartment" placeholder="选择单位" @change="getDeptCode">
        <el-option v-for="item in applyCompanyList" :key="item.deptCode" :label="item.name" :value="item.name">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="filter-item" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
      <div class="btn_right">
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning" icon="el-icon-upload"  @click="exportExcel">导出</el-button>
      </div>
    </div>
		<div class="table-center1" id="reportDiv">
      <el-table style="width: 1221px;" fit class="fix-header">
        <el-table-column label="综机设备新度系数调节费清单" align="center">
          <el-table-column :label="'使用单位：'+listQuery.useDepartment"></el-table-column>
        </el-table-column>
      </el-table>
			<!-- 综机折旧修理费报表 -->
			<el-table :data="tableData3" border fit highlight-current-row style="width:1221px" class="list-table" ref="upTable">
				<el-table-column width="100px" align="center" prop="equipmentPosition" label="工作面"></el-table-column>
				<el-table-column width="180px" align="center" prop="name" label="名称"></el-table-column>
				<el-table-column width="180px" align="center" prop="equipmentModel" label="规格型号"></el-table-column>
				<el-table-column width="60px" align="center" prop="equipmentUnit" label="单位"></el-table-column>
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
				<el-table-column width="240px" align="center" label="备注">
					<template slot-scope="scope">
            <el-input type="text" class="table-input" v-model="scope.row.remark" v-show="!scope.row.notShow"></el-input>
						<span>{{scope.row.remark}}</span>
					</template>
				</el-table-column>
			</el-table>
      <el-table :data="tableData" style="width:1161px" :show-header="false" class="fix-header">
        <el-table-column width="387px">
					<template slot-scope="scope">
            <span>{{scope.row.name1}}</span>
            <span style="display: none">{{sign.createExcelName}}</span> <!--  导出时显示签名-->
            <el-input type="text" v-model="sign.createExcelName"></el-input>
					</template>
				</el-table-column>
        <el-table-column width="387px">
					<template slot-scope="scope">
            <span>{{scope.row.name2}}</span>
            <span style="display: none">{{sign.statusName}}</span>
            <el-input type="text" v-model="sign.statusName"></el-input>
					</template>
				</el-table-column>
        <el-table-column width="387px">
					<template slot-scope="scope">
            <span>{{scope.row.name3}}</span>
            <span style="display: none">{{sign.sureNam}}</span>
            <el-input type="text" v-model="sign.sureName"></el-input>
					</template>
				</el-table-column>
      </el-table>
      <!-- <el-row class="set-color1">
        <el-col :span="8">
          <div class="grid-content border">制表：<el-input type="text" class="table-input" style="width: 100px" v-model="sign.createExcelName"></el-input></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">审核：<el-input type="text" class="table-input" style="width: 100px" v-model="sign.statusName"></el-input></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">矿方确认签字：<el-input type="text" class="table-input" style="width: 100px" v-model="sign.sureName"></el-input></div>
        </el-col>
      </el-row> -->
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
  name: 'newDegree',
  data() {
    return {
      style: {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none'
      },
      deptCode: {}, // 选中的单位code和name
      listQuery: { // 搜索条件
        date: '',
        useDepartment: '' // 单位信息
      },
      sign: {
        createExcelName: '',
        statusName: '',
        sureName: ''
      },
      applyCompanyList: [],
      tableData3: [],
      tableData: [
        { name1: '制表：', name2: '审核：', name3: '矿方确认人：' }
      ] // 假数据
    }
  },
  created() {
    this.getDeptList()
  },
  methods: {
    handleEdit(idx, row) {
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
    search() { // 搜索设备使用清单 方法
      if (this.listQuery.useDepartment === '' || this.listQuery.date === '') {
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
        const firstLine = {}
        const jsonString = {}
        jsonString.useYear = year
        jsonString.useMonth = month
        jsonString.useDeptCode = this.deptCode.deptCode // 部门编号code
        jsonString.useDeptName = this.deptCode.name
        require_get('/v1/newReport?page=1&size=1000&jsonString=' + JSON.stringify(jsonString), {
          token: token,
          authorityCode: 1
        }, {}, function(res) {
          if (res.data.status === 200) {
            const list = res.data.data.list
            if (list && list.length !== 0) {
              _this.tableData3 = list
              _this.sign.createExcelName = list[0].createExcelName // 获取签字
              _this.sign.statusName = list[0].statusName
              _this.sign.sureName = list[0].sureName
              firstLine.sum = list[0].feeSum // 添加第一行合计
              firstLine.name = '合计'
              firstLine.notShow = true
              _this.tableData3.unshift(firstLine)
            } else {
              _this.tableData3 = []
              _this.sign.createExcelName = '' // 获取签字
              _this.sign.statusName = ''
              _this.sign.sureName = ''
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
    getDeptCode(val) {
      this.deptCode = this.applyCompanyList.find((item) => { // 获取选中的单位code
        return item.name === val
      })
    },
    exportExcel() { // 点击导出按钮触发保存
      if (this.tableData3.length !== 0) {
        const _this = this
        const year = this.listQuery.date.substring(0, 4)
        const month = parseInt(this.listQuery.date.substring(5, 7)) + '' // 去掉10月之前月份的0
        const zNewReports = []
        this.tableData3.forEach((val, idx) => {
          if (idx !== 0) { // 去掉第一行
            const obj = {}
            obj.name = val.name
            obj.equipmentModel = val.equipmentModel // 型号
            obj.equipmentUnit = val.equipmentUnit // 单位
            obj.equipmentNum = parseInt(val.equipmentNum)
            obj.sum = parseFloat(val.sum)
            obj.costA1 = parseFloat(val.costA1)
            obj.day = parseInt(val.day)
            obj.remark = val.remark
            obj.equipmentCode = val.equipmentCode
            obj.feeDay = val.feeDay
            obj.feeSum = this.tableData3[0].sum // 合计
            obj.useDeptName = this.deptCode.name // 使用单位name
            obj.useDeptCode = this.deptCode.deptCode // 使用单位code
            obj.number = obj.number // 编号
            obj.createExcelName = this.sign.createExcelName // 制表人
            obj.statusName = this.sign.statusName // 审核人
            obj.sureName = this.sign.sureName // 矿方确认人
            obj.useAt = val.useAt
            obj.equipmentPosition = val.equipmentPosition // 功能位置
            obj.useYear = year
            obj.useMonth = month
            obj.type = val.type // 矿类别
            zNewReports.push(obj)
          }
        })
        const params = {
          zNewReports: zNewReports
        }
        require_post('/v1/newReport', {
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
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '综机设备新度系数调节费清单.xlsx')
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
      this.tableData3 = []
    }
  },
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
  .fix-header span{
    float: left;
    line-height: 30px;
  }
  .fix-header .el-input{
    float: left;
    width: 180px;
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
  .no-border-input .el-input__inner{
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
	.table-center1{
		width: 1250px;
		margin: 0 auto;
	}
  .grid-content{
    line-height: 35px;
  }
	.theader{
		font-size: 1.2rem
	}
	.set-color1{
		width: 1221px;
		padding: 15px;
		color: #606266
	}
	.center{
		text-align: center
	}
	.right{
		text-align: right
	}
  .bottom-sign{
    margin-top: 50px
  }
  .set-color1 .el-input--medium .el-input__inner{
    height: 22px;
    line-height: 22px;
    border: none;
    padding: 0 10px;
  }
  /* 行内编辑 */
  .list-table .el-input {
    display: none
  }
  .list-table .current-row .el-input {
    display: block
  }
  .list-table .current-row .el-input + span {
    display: none
  }
  .list-table .el-input--medium .el-input__inner{
    height: 22px;
    line-height: 22px;
    padding: 0 10px;
  }
</style>
