<template>
    <div class="app-container">
        <div class="filter-container">
            <el-date-picker v-model="listQuery.date" type="month" value-format="yyyy-MM" format="yyyy-MM" style="width: 140px;" class="filter-item" placeholder="选择年月"></el-date-picker>
            <el-select filterable clearable style="width: 140px" class="filter-item" v-model="listQuery.isBB" placeholder="是否本部">
                <el-option v-for="item in isBBList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button class="filter-item" type="primary" size="small" v-waves icon="el-icon-search" @click="search">搜索</el-button>
            <el-button class="filter-item" type="primary" size="small" v-waves icon="el-icon-edit" @click="recalculate" id='resetjs'>重新计算</el-button>
            <el-button class="filter-item" size="small" v-waves icon="el-icon-refresh" @click="reset">重置</el-button>
            <div class="btn_right">
                <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning" v-waves icon="el-icon-upload" @click="exportExcel">导出</el-button>
            </div>
        </div>
        <div id="reportDiv">
            <el-table :data="repairCostData" border highlight-current-row style="width: 100%;max-height:740px;" ref="moviesTable" :span-method="arraySpanMethod" :height="tableHeight">
                <el-table-column align="center" :label="this.listQuery.yeardate + '年通用设备折旧修理费月报（本部七矿） ---' + this.listQuery.isdate + '月份'" >
                    <el-table-column align="right" :label="listQuery.date">
                        <el-table-column type="index" width="50px" align="center" label="序号"></el-table-column>
                        <el-table-column width="150px" align="center" label="设备中类">
                            <template slot-scope="scope">
                                <span>{{scope.row.middleName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="矿处单位">
                            <el-table-column width="150px" align="center" v-for="(item, index) in colunmName" :key="index" :label="item">
                                <template slot-scope="scope">
                                    <span>{{scope.row.depositList[index].value}}</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column width="150px" align="center" label="小计">
                            <template slot-scope="scope">
                                <span>{{scope.row.totalFee}}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-table style="width: 100%;" border fit highlight-current-row>
                <el-table-column align="left"  label="备注：以上中类汇总含新投入设备管理费用">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { require_get, require_post } from '@/assets/pubJS'
import $ from 'jquery'
const token = sessionStorage.getItem('token')
const isBBList = [
  {
    label: '是',
    value: '1'
  }
]
export default {
  name: 'repairCost',
  directives: {
    waves
  },
  data() {
    return {
      tableHeight: document.body.clientHeight - 230,
      listQuery: {
        date: '',
        isBB: '',
        isdate: '',
        yeardate: ''
      },
      colunmName: [],
      repairCostData: [],
      isBBList,
      temp: {
        exp: ''
      }
    }
  },
  mounted() {
    // $('#resetjs').css('display', 'none')
    this.sfoutdate()
  },
  watch: {
    'listQuery.date': function(newValue, oldValue) {
      if (this.listQuery.date) {
        this.listQuery.isdate = this.listQuery.date.split('-')[1]
        this.listQuery.yeardate = this.listQuery.date.split('-')[0]
        if (this.listQuery.isdate.substring(0, 1) === '0') {
          this.listQuery.isdate = this.listQuery.isdate.substring(1, 2)
        } else {
          this.listQuery.isdate = this.listQuery.date.split('-')[1]
        }
      } else if (this.listQuery.date === '' || this.listQuery.date === null) {
        this.listQuery.isdate = ''
        this.listQuery.yeardate = ''
      }
    }
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
    exportExcel() {
      const _this = this
      var params = _this.repairCostData
      if (_this.repairCostData.length === 0) {
        _this.$notify({
          title: '系统提示',
          message: '导出报表不能为空',
          type: 'warning',
          duration: 2000
        })
      } else {
        require_post('/v1/elFeePositionT', {
          token: token,
          authorityCode: 1
        }, params, function(res) {
          if (res.data.status === 200) {
            /* generate workbook object from table */
            var wb = XLSX.utils.table_to_book(document.querySelector('#reportDiv'))
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
              FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '综机折旧修理费月报.xlsx')
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
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === this.repairCostData.length - 1) {
        if (columnIndex === 1) {
          return [1, 2]
        } else if (columnIndex === 0) {
          return [0, 0]
        }
      }
    },
    // 搜索调用的方法
    search() {
      const _this = this
      _this.colunmName = []
      _this.repairCostData = []
      require_get('/v1/elFeePositionT', {
        token: token,
        authorityCode: 1
      }, {
        exportAtStr: _this.listQuery.date,
        poStatus: _this.listQuery.isBB
      }, function(res) {
        if (res.data.status === 200) {
          var result = res.data.data
          if (result) {
            for (let i = 0; i < result[0].depositList.length; i++) {
              _this.colunmName.push(result[0].depositList[i].key)
            }
            var heji = {}
            for (let j = 0; j < result.length; j++) {
              if (result[j].middleCode === '0000') {
                heji = result[j]
                result.splice(j, 1)
              }
            }
            result.push(heji)
            _this.repairCostData = result
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
          message: '系统错误',
          type: 'error',
          duration: 2000
        })
      })
    },
    // 重新计算
    recalculate() {
      const _this = this
      _this.colunmName = []
      _this.repairCostData = []
      var params = {
        exportAtStr: _this.listQuery.date,
        poStatus: _this.listQuery.isBB
      }
      require_get('/v1/elFeePositionT/refresh', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        if (res.data.status === 200) {
          var result = res.data.data
          if (result) {
            for (let i = 0; i < result[0].depositList.length; i++) {
              _this.colunmName.push(result[0].depositList[i].key)
            }
            var heji = {}
            for (let j = 0; j < result.length; j++) {
              if (result[j].middleCode === '0000') {
                heji = result[j]
                result.splice(j, 1)
              }
            }
            result.push(heji)
            _this.repairCostData = result
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
    // 重置调用的方法
    reset() {
      this.listQuery.date = ''
      this.listQuery.isBB = ''
      this.repairCostData = []
    }
  }
}
</script>

<style>
.el-table__empty-block{
  min-height: 0;
}
.btn_right {
    float: right;
}
.reportTitle {
    font-size: 16px
}
.el-input--small .el-input__inner {
  height: 22px;
  line-height: 22px;
}
.expDiv {
    border: 1px solid #ebeef5;
    height: 55px;
    border-top: none;
}
.el-textarea__inner {
    border: none !important;
    width: 99%;
}
</style>


