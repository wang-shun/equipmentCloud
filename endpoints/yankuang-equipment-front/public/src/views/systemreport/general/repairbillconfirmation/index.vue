<template>
  <div class="app-container">
    <div class="filter-container">
        <el-date-picker v-model="listQuery.date" type="year" placeholder="选择年" value-format="yyyy" format="yyyy" style="width: 140px;" class="filter-item" ></el-date-picker>
        <el-select filterable clearable style="width: 140px" class="filter-item" v-model="listQuery.isquer" placeholder="选择季度">
          <el-option v-for="item in querList" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
        <el-select filterable clearable style="width: 140px" class="filter-item" v-model="listQuery.isdw" placeholder="选择使用单位">
          <el-option v-for="item in positionList" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
        <el-button class="filter-item" type="primary" size="small"  icon="el-icon-search" @click="search">搜索</el-button>
        <el-button class="filter-item" type="primary" size="small" icon="el-icon-edit" @click="recalculate" id='resetjs'>重新计算</el-button>
        <el-button class="filter-item" size="small"  icon="el-icon-refresh" @click="reset">重置</el-button>
        <div class="btn_right" style="float:right;">
            <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning"  icon="el-icon-upload" @click="exportExcel">导出</el-button>
        </div>
    </div>
    <div class="content" id='reportDiv'>
        <el-table style="width: 100%;" border fit highlight-current-row >
          <el-table-column align="center"  label="兖州煤业股份有限公司">
            <el-table-column align="center"  :label="this.listQuery.isquername + ' 通用设备折旧修理费确认单'">
              <el-table-column align="left"   :label= "'使用单位：（盖章）' + this.listQuery.isdwname" >
              </el-table-column>
              <el-table-column align="right"  :label= "this.listQuery.date + '年'" >
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-table :data="summarytable"  border fit highlight-current-row
        style="width: 100%;max-height:740px;" ref="moviesTable"  :height="tableHeight" class="tb-edit">
            <el-table-column align="center" label="月份"  width="200px">
                <template slot-scope="scope">
                    <span align="center">{{scope.row.reportMonth}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="在用数量"  width="200px">
                <template slot-scope="scope">
                    <span align="center">{{scope.row.useNum}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="月度费用（元）"  width="200px">
                <template slot-scope="scope">
                    <span align="center">{{scope.row.totalCostA1}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="费用调整（元）"  width="200px">
                <template slot-scope="scope">
                    <span align="center">{{scope.row.totalCostA3}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="月度合计（元）"  width="200px">
                <template slot-scope="scope">
                    <span align="center">{{scope.row.totalFee}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="使用天数" width="200px">
                <template slot-scope="scope">
                    <span align="center">{{scope.row.totalDay}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="备注" width="200px">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.remarks" placeholder="请输入内容" ></el-input>
                    <span align="center">{{scope.row.remarks}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-table style="width: 100%;" border fit highlight-current-row>
              <el-table-column align="left"  label="中心主管：">
              </el-table-column>
              <el-table-column align="left"   label= "中心科室负责人：" >
              </el-table-column>
              <el-table-column align="left"  label= '中心经办人：' >
              </el-table-column>
        </el-table>
        <el-table style="width: 100%;" border fit highlight-current-row>
              <el-table-column align="left"  label="设备使用方机电矿长：">
              </el-table-column>
        </el-table>
    </div>
    </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { require_get, require_post } from '@/assets/pubJS'
import $ from 'jquery'
const token = sessionStorage.getItem('token')
const positionList = JSON.parse(sessionStorage.getItem('dwList'))
const querList = [
  {
    code: '01',
    name: '一季度'
  },
  {
    code: '02',
    name: '二季度'
  },
  {
    code: '03',
    name: '三季度'
  },
  {
    code: '04',
    name: '四季度'
  }
]
const dwValue = positionList.reduce((acc, cur) => {
  acc[cur.code] = cur.name
  return acc
}, {})
const querValue = querList.reduce((acc, cur) => {
  acc[cur.code] = cur.name
  return acc
}, {})
export default {
  name: 'listofcollectfees',
  data() {
    return {
      tableHeight: document.body.clientHeight - 410,
      listQuery: {
        date: '',
        isdw: '',
        isdwname: '',
        isquer: '',
        isquername: ''
      },
      positionList,
      querList,
      summarytable: []
    }
  },
  mounted() {
    this.sfoutdate()
  },
  methods: {
    sfoutdate() {
      var date = new Date()
      var strDate = date.getDate()
      var currentdate = strDate
      if (currentdate >= 21 && currentdate <= 31) {
        $('#resetjs').show()
      } else {
        $('#resetjs').hide()
      }
    },
    // 重新计算
    recalculate() {
      const _this = this
      _this.summarytable = []
      var params = {
        positionCode: _this.listQuery.isdw,
        reportYear: _this.listQuery.date,
        reportQuarter: _this.listQuery.isquer
      }
      require_get('/v1/elFeeQuarterT/refresh', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        console.log(res)
        if (res.data.status === 200) {
          var result = res.data.data
          if (result) {
            _this.summarytable = result
          } else {
            _this.$notify({
              title: '系统提示',
              message: res.data.msg,
              type: 'warning',
              duration: 2000
            })
          }
        } else {
          _this.$notify({
            title: '系统提示',
            message: res.data.msg,
            type: 'warning',
            duration: 2000
          })
        }
      }, function(err) {
        console.log(err)
        _this.$notify({
          title: '系统提示',
          message: '重新计算失败',
          type: 'warning',
          duration: 2000
        })
      })
    },
    search() {
      const _this = this
      _this.summarytable = []
      require_get('/v1/elFeeQuarterT', {
        token: token,
        authorityCode: 1
      }, {
        positionCode: _this.listQuery.isdw,
        reportYear: _this.listQuery.date,
        reportQuarter: _this.listQuery.isquer
      }, function(res) {
        console.log(res)
        if (res.data.status === 200) {
          var result = res.data.data
          if (result) {
            _this.summarytable = result
          } else {
            _this.$notify({
              title: '系统提示',
              message: res.data.msg,
              type: 'warning',
              duration: 2000
            })
          }
        } else {
          _this.$notify({
            title: '系统提示',
            message: res.data.msg,
            type: 'warning',
            duration: 2000
          })
        }
      }, function(err) {
        console.log(err)
        _this.$notify({
          title: '系统提示',
          message: '报表查询失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    reset() {
      this.listQuery.date = ''
      this.listQuery.isdw = ''
      this.listQuery.isquer = ''
      this.listQuery.isquername = ''
      this.summarytable = []
    },
    exportExcel() {
      const _this = this
      var params = _this.summarytable
      if (_this.summarytable.length === 0) {
        _this.$notify({
          title: '系统提示',
          message: '导出报表不能为空',
          type: 'warning',
          duration: 2000
        })
      } else {
        require_post('/v1/elFeeQuarterT', {
          token: token,
          authorityCode: 1
        }, params, function(res) {
          if (res.data.status === 200) {
            /* generate workbook object from table */
            var wb = XLSX.utils.table_to_book(document.querySelector('#reportDiv'))
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
              FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '通用设备折旧修理费确认单.xlsx')
            } catch (e) {
              if (typeof console !== 'undefined') {
                console.log(e, wbout)
              }
            }
            _this.$notify({
              title: '系统提示',
              message: '报表导出成功',
              type: 'success',
              duration: 2000
            })
            return wbout
          } else {
            _this.$notify({
              title: '系统提示',
              message: res.data.msg,
              type: 'warning',
              duration: 2000
            })
          }
        }, function(err) {
          console.log(err)
          _this.$notify({
            title: '系统提示',
            message: '报表导出失败',
            type: 'error',
            duration: 2000
          })
        })
      }
    }
  },
  watch: {
    'listQuery.isdw': function(newValue, oldValue) {
      this.listQuery.isdwname = dwValue[this.listQuery.isdw]
      if (this.listQuery.isdwname === undefined) {
        this.listQuery.isdwname = ''
      }
    },
    'listQuery.isquer': function(newValue, oldValue) {
      this.listQuery.isquername = querValue[this.listQuery.isquer]
      if (this.listQuery.isquername === undefined) {
        this.listQuery.isquername = ''
      }
    },
    'listQuery.date': function(newValue, oldValue) {
      if (this.listQuery.date === null) {
        this.listQuery.date = ''
      }
    }
  },
  filters: {
    stateFilter(state) {
      return dwValue[state]
    }
  }
}
</script>
<style>
.el-table__empty-block{
  min-height: 0;
}
.app-container {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    overflow: auto;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
}
.tb-edit .el-input {
    display: none
}
.el-input--small .el-input__inner {
  height: 22px;
  line-height: 22px;
}
.tb-edit .current-row .el-input {
    display: block
}
.tb-edit .current-row .el-input+span {
    display: none
}
</style>


