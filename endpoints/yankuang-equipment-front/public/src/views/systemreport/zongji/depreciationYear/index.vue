<template>
    <div class="app-container">
        <div class="filter-container">
            <el-date-picker type="year" v-model="listQuery.date" placeholder="选择年" value-format="yyyy" format="yyyy" style="width: 200px;"></el-date-picker>
            <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button class="filter-item" size="small" icon="el-icon-refresh" @click="chongzhi">重置</el-button>
            <el-button class="filter-item" size="small" icon="el-icon-sort" type="primary" v-if="jisuan" @click="newCalculation">重新计算</el-button>
            <div class="btn_right">
                <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning" icon="el-icon-upload" @click="exportExcel">导出</el-button>
            </div>
        </div>
        <div id="rng">
            <el-table :data="tableData1" @row-click="handleCurrentChange" class="inputsun"
                border fit highlight-current-row style="width: 100%;max-height:740px;" ref="upTable">
                <el-table-column align="center" :label="listQuery.date+'综机折旧修理费月报（汇总）---'+month+'月份'">
                <el-table-column type="index" width="50px" align="center" prop="deptCode" label="序号"></el-table-column>
                <el-table-column width="200" align="center" prop="deptName" label="矿别"></el-table-column>
                <el-table-column width="230" align="center" label="上报煤业版  年度计划指标（万元）">
                  <template slot-scope="scope">
                    <el-input @blur="changeCount(scope.row)" size="small" v-if="scope.row.deptName !== '小计'" v-model="scope.row.yearPlanVal"></el-input>
                    <span align="center" v-if="scope.row.deptName !== '小计'">{{scope.row.yearPlanVal}}</span>
                    <span align="center" v-else>{{scope.row.yearPlanVal}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="200" align="center" prop="curMonthsPlanVal" :label="'1-'+month+'月预期（万元）'"></el-table-column>
                <el-table-column width="200" align="center" prop="curMonthsVal" :label="'1-'+month+'月实收（万元）'"></el-table-column>
                <el-table-column width="200" align="center" prop="preMonthsVal" :label="'1-'+ss+'月实收（万元）'"></el-table-column>
                <el-table-column width="200" align="center" prop="curMonthVal" :label="ss+'月实收（万元）'"></el-table-column>
                </el-table-column>
            </el-table>
            <el-table :data="tableData2" :show-header="showHeader" class="inputsun"
                border fit highlight-current-row style="width: 100%;max-height:740px;margin-top:20px" ref="downTable">
                <el-table-column align="center">
                    <el-table-column type="index" width="50px" align="center" prop="serialNumber" label="序号"></el-table-column>
                    <el-table-column width="200px" align="center" prop="deptName" label="矿别"></el-table-column>
                    <el-table-column width="230" align="center" label="上报煤业版  年度计划指标（万元）">
                      <template slot-scope="scope">
                        <el-input @blur="changeCount(scope.row)" size="small" v-if="scope.row.deptName !== '小计'" v-model="scope.row.yearPlanVal"></el-input>
                        <span align="center" v-if="scope.row.deptName !== '小计'">{{scope.row.yearPlanVal}}</span>
                        <span align="center" v-else>{{scope.row.yearPlanVal}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column width="200" align="center" prop="curMonthsPlanVal" label="上半年按煤业版的一半（万元）"></el-table-column>
                    <el-table-column width="200px" align="center" prop="curMonthsVal" label="1-6月实收（万元）"></el-table-column>
                    <el-table-column width="200px" align="center" prop="preMonthsVal" label="1-5月实收（万元）"></el-table-column>
                    <el-table-column width="200px" align="center" prop="curMonthVal" label="6月实收（万元）"></el-table-column>
                </el-table-column>
            </el-table>
            <el-table :data="tableData3" :show-header="showHeader"
                border fit highlight-current-row style="width: 100%;max-height:740px;margin-top:20px" ref="downTable">
                <el-table-column align="center">
                    <el-table-column type="index" width="50px" align="center" prop="serialNumber" label="序号"></el-table-column>
                    <el-table-column width="200" align="center" prop="deptName" label="矿别"></el-table-column>
                    <el-table-column width="230" align="center" prop="yearPlanVal" label="上报煤业版  年度计划指标（万元）"></el-table-column>
                    <el-table-column width="200" align="center" prop="curMonthsPlanVal" label="上半年按煤业版的一半（万元）"></el-table-column>
                    <el-table-column width="200" align="center" prop="curMonthsVal" label="1-6月实收（万元）"></el-table-column>
                    <el-table-column width="200" align="center" prop="preMonthsVal" label="1-5月实收（万元）"></el-table-column>
                    <el-table-column width="200" align="center" prop="curMonthVal" label="6月实收（万元）"></el-table-column>
                </el-table-column>
            </el-table>
            <el-table :data="zhu" :show-header="showHeader"
                border fit highlight-current-row style="width: 100%;max-height:740px;margin-top:20px" ref="downTable">
                <el-table-column>
                  <template slot-scope="scope">
                    <span @click="equipmentDialogShow">{{scope.row.remark}}</span>
                  </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :visible.sync="equipmentDialog"  width="80%" title="注">
          <el-form style="margin-top: 10px;">
            <el-form-item>
              <el-input type="textarea" v-model="zhu1" :maxlength="200">
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="equipmentDialog = false">取消</el-button>
            <el-button type="danger" @click="examineUnPass">确定</el-button>
          </div>
        </el-dialog>
    </div>
</template>


<script>
import { require_get, require_put } from '@/assets/pubJS'
import Cookies from 'js-cookie'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
const token = Cookies.get('token')

export default {
  name: 'gather',
  data() {
    return {
      equipmentDialog: false,
      ddd: true,
      sss: false,
      showHeader: false,
      jisuan: false,
      firstSum: [],
      secondSum: [],
      totalNum: [],
      tableData3: [],
      tableData1: [],
      tableData2: [],
      month: '',
      ss: '',
      zhu1: '',
      listId: '',
      zhu: [{
        remark: ''
      }],
      listQuery: {
        date: '2018'
      }
    }
  },
  created(date) {
    this.getList(this.listQuery.date)
    this.times()
  },
  methods: {
    examineUnPass() {
      var parames = {
        remark: this.zhu1,
        id: this.listId
      }
      require_put('/v1/reportEquipmentZMonth/updateRemarkById', { token: token, authorityCode: 1 }, parames, (res) => {
        console.log(res)
      })
    },
    equipmentDialogShow() {
      this.equipmentDialog = true
      console.log(this.zhu1)
    },
    search() {
      console.log(this.listQuery.date)
      if (this.listQuery.date !== '') {
        this.getList(this.listQuery.date)
      } else {
        this.$notify.info({
          title: '系统提示',
          message: '查询年份不能为空!',
          type: 'warning'
        })
      }
    },
    times() {
      var myDate = new Date()
      this.month = myDate.getMonth() + 1
      this.ss = this.month
      if (myDate.getDate() > 20 && myDate.getDate() < 32) {
        this.jisuan = true
      }
    },
    newCalculation() {
      require_put('/v1/reportEquipmentZMonth/ReCalReportEquipmentZMonth', { token: token, authorityCode: 1 }, {}, (res) => {
        console.log(res)
        if (res.data.status === 200) {
          this.getList(this.listQuery.date)
        } else {
          this.$notify.info({
            title: '系统提示',
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    handleCurrentChange(row, event, column) {
    },
    chongzhi() {
      this.listQuery.date = ''
      this.tableData1 = []
      this.tableData2 = []
      this.tableData3 = []
      this.zhu1 = ''
      this.zhu = []
      this.listId = ''
    },
    show(row) {
      this.sss = true
      this.ddd = false
    },
    changeCount(id) {
      this.sss = false
      this.ddd = true
      if (id.id !== null) {
        var parames = {
          id: id.id,
          yearPlanVal: Number(id.yearPlanVal)
        }
        require_put('/v1/reportEquipmentZMonth/updateYearPlanValById', { token: token, authorityCode: 1 }, parames, (res) => {
          this.getList(this.listQuery.date)
        })
      } else {
        this.getList(this.listQuery.date)
        this.$notify.info({
          title: '系统提示',
          message: '小计和累计不允许更改！',
          type: 'warning'
        })
      }
    },
    getList(date) {
      require_get('/v1/reportEquipmentZMonth/findSumByYear/' + date, { token: token, authorityCode: 1 }, {}, (res) => {
        if (res.data.status === 200) {
          if (res.data.data.id !== null) {
            this.tableData1 = res.data.data.list1
            this.tableData2 = res.data.data.list2
            this.tableData3 = res.data.data.list3
            // this.zhu[0].remark = res.data.data.remark
            var str = res.data.data.remark
            var strs = str.split('。')
            var data = []
            for (var i = 0; i < strs.length; i++) {
              if (strs[i].toString() + '。' === '。') {
                break
              } else {
                var obj = {}
                obj.remark = strs[i].toString() + '。'
                data[i] = obj
              }
            }
            this.zhu1 = res.data.data.remark
            this.zhu = data
            this.listId = res.data.data.id
          } else {
            this.$notify.info({
              title: '系统提示',
              message: '查询结果为空！',
              type: 'warning'
            })
            this.chongzhi()
          }
        } else {
          this.$notify.info({
            title: '系统提示',
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    exportExcel() {
      if (this.listId !== '') {
        /* 从表生成工作簿对象*/
        const wb = XLSX.utils.table_to_book(document.querySelector('#rng'))
        /* 获取二进制字符串作为输出 */
        const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), this.listQuery.date + '综机折旧修理费月报（汇总）.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') { '' }
        }
        return wbout
      } else {
        this.$notify.info({
          title: '系统提示',
          message: '列表为空，不能导出！',
          type: 'warning'
        })
      }
    }
  },
  mounted() {
  }
}
</script>



<style>
.btn_right{
    float: right;
  }
.filter-container .filter-item{
  margin-bottom: 5px
}
.inputh .el-input__inner{
    height: 22px;
    line-height: 22px;
}
.el-table__empty-block{
  min-height: 0;
}
.app-container {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    overflow: auto;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
}
.inputsun .el-input {
    display: none
}
.inputsun .current-row .el-input {
    display: block;
}
.el-input--small .el-input__inner {
  height: 22px;
  line-height: 22px;
}
.inputsun .current-row .el-input+span {
    display: none
}
</style>