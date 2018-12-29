<template>
    <div class="app-container">
        <div class="filter-container">
            <el-date-picker type="year" v-model="listQuery.date" placeholder="选择年" value-format="yyyy" format="yyyy" style="width: 200px;"></el-date-picker>
            <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="sousuo">搜索</el-button>
            <el-button class="filter-item" size="small" icon="el-icon-refresh" @click="chongzhi">重置</el-button>
            <el-button class="filter-item" type="primary" size="small" icon="el-icon-sort" v-if="jisuan" @click="newCalculation">重新计算</el-button>
            <div class="btn_right">
                <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning" icon="el-icon-upload" @click="exportExcel">导出</el-button>
            </div>
        </div>
        <div id="bbYear">
            <el-table :data="tableData1" class="inputsun"
                border fit highlight-current-row style="width: 100%;max-height:740px;" ref="upTable">
                <el-table-column align="center" :label="listQuery.date+'综机折旧修理费月报（汇总）---'+month+'月份'">
                  <el-table-column type='index' width="50px" align="center" label="序号"></el-table-column>
                  <el-table-column align="center" label="矿别">
                    <template slot-scope="scope">
                      <span>{{scope.row.deptName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="年度计划指标（万元）">
                    <!-- <template slot-scope="scope">
                      <span>{{scope.row.yearPlanVal}}</span>
                    </template> -->
                    <template slot-scope="scope">
                      <el-input @blur="changeCount(scope.row)" size="small" v-if="scope.row.deptName !== '小计'" v-model="scope.row.yearPlanVal"></el-input>
                        <span align="center" v-if="scope.row.deptName !== '小计'">{{scope.row.yearPlanVal}}</span>
                        <span align="center" v-else>{{scope.row.yearPlanVal}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="每月计划应收（万元）">
                    <template slot-scope="scope">
                      <span>{{scope.row.monthPlanVal}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="1-12月应收（万元）">
                    <template slot-scope="scope">
                      <span>{{scope.row.planVal}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="逐月累计收费金额（万元，不含税）">
                      <el-table-column align="center" label="1月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month01}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="2月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month02}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="3月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month03}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="4月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month04}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="5月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month05}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="6月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month06}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="7月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month07}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="8月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month08}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="9月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month09}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="10月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month10}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="11月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month11}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="12月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month12}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="合计">
                        <template slot-scope="scope">
                          <span>{{scope.row.sumVal}}</span>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column width="120px" align="center" label="合计-总计划（万元）">
                      <template slot-scope="scope">
                          <span>{{scope.row.sumPlanVal}}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-table :data="tableData2" :show-header="showHeader" class="inputsun"
                border fit highlight-current-row style="width: 100%;max-height:740px;" ref="upTable">
                <el-table-column align="center" label="2018综机折旧修理费月报（汇总）---6月份">
                  <el-table-column type='index' width="50px" align="center" label="序号"></el-table-column>
                  <el-table-column align="center" label="矿别">
                    <template slot-scope="scope">
                      <span>{{scope.row.deptName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="年度计划指标（万元）">
                    <template slot-scope="scope">
                      <el-input @blur="changeCount(scope.row)" size="small" v-if="scope.row.deptName !== '小计'" v-model="scope.row.yearPlanVal"></el-input>
                        <span align="center" v-if="scope.row.deptName !== '小计'">{{scope.row.yearPlanVal}}</span>
                        <span align="center" v-else>{{scope.row.yearPlanVal}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="每月计划应收（万元）">
                    <template slot-scope="scope">
                      <span>{{scope.row.monthPlanVal}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="1-12月应收（万元）">
                    <template slot-scope="scope">
                      <span>{{scope.row.planVal}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="逐月累计收费金额（万元，不含税）">
                      <el-table-column align="center" label="1月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month01}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="2月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month02}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="3月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month03}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="4月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month04}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="5月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month05}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="6月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month06}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="7月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month07}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="8月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month08}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="9月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month09}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="10月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month10}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="11月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month11}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="12月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month12}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="合计">
                        <template slot-scope="scope">
                          <span>{{scope.row.sumVal}}</span>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column width="120px" align="center" label="合计-总计划（万元）">
                      <template slot-scope="scope">
                          <span>{{scope.row.sumPlanVal}}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-table :data="tableData3" :show-header="showHeader"
                border fit highlight-current-row style="width: 100%;max-height:740px;" ref="upTable">
                <el-table-column align="center" label="2018综机折旧修理费月报（汇总）---6月份">
                  <el-table-column type='index' width="50px" align="center" label="序号"></el-table-column>
                  <el-table-column align="center" label="矿别">
                    <template slot-scope="scope">
                      <span>{{scope.row.deptName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="年度计划指标（万元）">
                    <template slot-scope="scope">
                      <span>{{scope.row.yearPlanVal}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="每月计划应收（万元）">
                    <template slot-scope="scope">
                      <span>{{scope.row.monthPlanVal}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="1-12月应收（万元）">
                    <template slot-scope="scope">
                      <span>{{scope.row.planVal}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="逐月累计收费金额（万元，不含税）">
                      <el-table-column align="center" label="1月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month01}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="2月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month02}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="3月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month03}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="4月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month04}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="5月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month05}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="6月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month06}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="7月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month07}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="8月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month08}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="9月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month09}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="10月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month10}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="11月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month11}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="12月">
                        <template slot-scope="scope">
                          <span>{{scope.row.month12}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="合计">
                        <template slot-scope="scope">
                          <span>{{scope.row.sumVal}}</span>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column width="120px" align="center" label="合计-总计划（万元）">
                      <template slot-scope="scope">
                          <span>{{scope.row.sumPlanVal}}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-table :data="zhu" :show-header="showHeader"
                border fit highlight-current-row style="width: 100%;max-height:740px;margin-top:20px" ref="downTable">
                <el-table-column>
                  <template slot-scope="scope">
                    <span @click="equipmentDialog = true">{{scope.row.remark}}</span>
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
      tableData1: [],
      tableData2: [],
      tableData3: [],
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
  created() {
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
        if (res.data.status === 200) {
          this.$notify.info({
            title: '系统提示',
            message: '修改成功!',
            type: 'success'
          })
          this.equipmentDialog = false
        } else {
          this.$notify.info({
            title: '系统提示',
            message: res.data.msg,
            type: 'error'
          })
        }
      })
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
    getList(date) {
      require_get('/v1/reportEquipmentZMonth/findByYear/' + date, { token: token, authorityCode: 1 }, {}, (res) => {
        if (res.data.status === 200) {
          if (res.data.data.id !== null) {
            this.tableData1 = res.data.data.list1
            this.tableData2 = res.data.data.list2
            this.tableData3 = res.data.data.list3
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
            this.zhu = data
            this.zhu1 = str
            this.listId = res.data.data.id
          } else {
            this.$notify.info({
              title: '系统提示',
              message: '查询结果为空！'
            })
          }
        } else {
          this.$notify.info({
            title: '系统提示',
            message: res.data.msg
          })
        }
      })
    },
    sousuo() {
      if (this.listQuery.date !== '') {
        this.getList(this.listQuery.date)
      } else {
        this.$notify.info({
          title: '系统提示',
          message: '查询年份不能为空！',
          type: 'warning'
        })
      }
    },
    chongzhi() {
      this.listQuery.date = ''
      this.tableData1 = []
      this.tableData2 = []
      this.tableData3 = []
      this.zhu1 = ''
      this.zhu = []
    },
    show(deptName) {
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
    exportExcel() {
      if (this.tableData1.length !== 0) {
        /* 从表生成工作簿对象*/
        const wb = XLSX.utils.table_to_book(document.querySelector('#bbYear'))
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
</style>