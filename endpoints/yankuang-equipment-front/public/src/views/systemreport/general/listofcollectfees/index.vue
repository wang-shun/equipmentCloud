<template>
  <div class='app-container'>
    <div class="filter-container">
      <el-date-picker v-model="listQuery.date" type="month" placeholder="选择年月" value-format="yyyy-MM" format="yyyy-MM" style="width: 140px;" class="filter-item" ></el-date-picker>
      <el-select filterable clearable style="width: 140px" class="filter-item" v-model="listQuery.isdw" placeholder="选择矿处单位">
        <el-option v-for="item in positionList" :key="item.code" :label="item.name" :value="item.code"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" size="small"  icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-edit" @click="recalculate" id='resetjs'>重新计算</el-button>
      <el-button class="filter-item" size="small"  icon="el-icon-refresh" @click="reset">重置</el-button>
      <div class="btn_right" style="float:right;">
        <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning"  icon="el-icon-upload" @click='exportExcel'>导出</el-button>
      </div>
    </div>
    <div id='reportDiv'>
        <el-table style="width: 100%;" border fit highlight-current-row>
          <el-table-column align="center"  label="矿处通用机电租赁费用汇总表">
              <el-table-column align="left"   :label= "'矿处单位：' + this.listQuery.isdwname" >
              </el-table-column>
              <el-table-column align="right"  :label= listQuery.datename >
              </el-table-column>
          </el-table-column>
        </el-table>
        <el-table :data="summarytable"  border fit highlight-current-row
        style="width: 100%;max-height:740px;" ref="moviesTable" class="tb-edit" @row-click="handleCurrentChange" :height="tableHeight">
            <el-table-column align="center" width="150px" label="设备名称（中类）">
              <template slot-scope="scope">
                    <span align="center">{{scope.row.middleName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="在籍数量" prop='enrollmentnum' width="150px">
              <template slot-scope="scope">
                    <span align="center">{{scope.row.equipmentNum}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="在用数量" prop='usenum' width="150px">
              <template slot-scope="scope">
                    <span align="center">{{scope.row.useNum}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="租赁费" prop='rent' width="150px">
              <template slot-scope="scope">
                    <span align="center">{{scope.row.costA1}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="费用调整" prop='costadjustment' width="150px">
              <template slot-scope="scope">
                    <span align="center">{{scope.row.costA3}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" width="150px" label="非正常损坏赔偿费" prop='damages' >
              <template slot-scope="scope" >
                    <el-input size="small" v-if="scope.row.middleName !== '合计'" v-model="scope.row.costA2" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
                    <span align="center" v-if="scope.row.middleName !== '合计'">{{scope.row.costA2}}</span>
                    <span align="center" v-else>{{scope.row.costA2 = summarythree}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="合计" width="160px" >
                <template slot-scope="scope">
                    <span align="center" v-if="scope.row.middleName !== '合计'">{{scope.row.totalFee}}</span>
                    <span align="center" v-else>{{scope.row.totalFee = sumSums}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="备注" width="150px">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.remarks" placeholder="请输入内容" ></el-input>
                    <span align="center">{{scope.row.remarks}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-table style="width: 100%;" border fit highlight-current-row>
              <el-table-column align="left"  :label="'制表：' + this.name">
              </el-table-column>
              <el-table-column align="left"   label= "审核:" >
              </el-table-column>
              <el-table-column align="left"  label= '矿方确认签字:' >
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
const name = sessionStorage.getItem('name')
const id = sessionStorage.getItem('id')
const positionList = JSON.parse(sessionStorage.getItem('dwList'))
const dwValue = positionList.reduce((acc, cur) => {
  acc[cur.code] = cur.name
  return acc
}, {})
export default {
  name: 'listofcollectfees',
  data() {
    return {
      tableHeight: document.body.clientHeight - 320,
      positionList,
      listQuery: {
        date: '',
        isdw: '',
        isdwname: '',
        datename: ''
      },
      name: name,
      id: id,
      sumSums: 0,
      summarythree: 0,
      summarytable: []
    }
  },
  mounted() {
    this.sfoutdate()
  },
  methods: {
    // 重新计算在规定时间内是否显示
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
        exportAtStr: _this.listQuery.date
      }
      require_get('/v1/elFeeMiddleT/refresh', {
        token: token,
        authorityCode: 1
      }, params, function(res) {
        if (res.data.status === 200) {
          var result = res.data.data
          if (result) {
            var heji = {}
            for (let j = 0; j < result.length; j++) {
              if (result[j].middleCode === '0000') {
                heji = result[j]
                result.splice(j, 1)
              }
            }
            result.unshift(heji)
            _this.summarytable = result
            _this.changeSun()
            _this.sumSum()
            _this.sumSumhj()
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
          type: 'warning',
          duration: 2000
        })
      })
    },
    // 导出表格
    exportExcel() {
      const _this = this
      for (let i = 0; i < _this.summarytable.length; i++) {
        _this.summarytable[i].costA2 = parseFloat(_this.summarytable[i].costA2)
      }
      for (let i = 0; i < _this.summarytable.length; i++) {
        _this.summarytable[i].createBy = parseFloat(_this.id)
      }
      var params = _this.summarytable
      if (_this.summarytable.length === 0) {
        _this.$notify({
          title: '系统提示',
          message: '导出报表不能为空',
          type: 'warning',
          duration: 2000
        })
      } else {
        require_post('/v1/elFeeMiddleT', {
          token: token,
          authorityCode: 1
        }, params, function(res) {
          if (res.data.status === 200) {
            /* generate workbook object from table */
            var wb = XLSX.utils.table_to_book(document.querySelector('#reportDiv'))
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
              FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '矿处通用机电租赁费用汇总表.xlsx')
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
            type: 'warning',
            duration: 2000
          })
        })
      }
    },
    // 数据横向加和，用add方法解决js自带加法bug
    changeSun() {
      var reg = /^(.*\..{3}).*$/
      for (let i = 0; i < this.summarytable.length; i++) {
        var abc = this.add(this.summarytable[i].costA1, this.summarytable[i].costA2, this.summarytable[i].costA3)
        this.summarytable[i].totalFee = Number(String(abc).replace(reg, '$1'))
      }
    },
    // 累加非正常损坏赔偿费
    sumSum() {
      this.summarythree = 0
      var reg = /^(.*\..{3}).*$/
      for (let i = 1; i < this.summarytable.length; i++) {
        this.summarythree += parseFloat(this.summarytable[i].costA2)
      }
      this.summarythree = Number(String(this.summarythree).replace(reg, '$1'))
      console.log(this.summarythree)
    },
    // 累加合计
    sumSumhj() {
      var reg = /^(.*\..{3}).*$/
      this.sumSums = 0
      for (let i = 1; i < this.summarytable.length; i++) {
        this.sumSums += parseFloat(this.summarytable[i].totalFee)
      }
      this.sumSums = Number(String(this.sumSums).replace(reg, '$1'))
    },
    // 加法计数方法
    add() {
      var args = arguments
      var d = 0
      var sum = 0
      for (var key in args) {
        var str = '' + args[key]
        if (str.indexOf('.') !== -1) {
          var temp = str.split('.')[1].length
          d = d < temp ? temp : d
        }
      }
      var m = Math.pow(10, d)
      for (var a in args) {
        sum += args[a] * m
      }
      return sum / m
    },
    // 搜索
    search() {
      const _this = this
      _this.summarytable = []
      require_get('/v1/elFeeMiddleT', {
        token: token,
        authorityCode: 1
      }, {
        positionCode: _this.listQuery.isdw,
        exportAtStr: _this.listQuery.date
      }, function(res) {
        console.log(res)
        if (res.data.status === 200) {
          var result = res.data.data
          if (result) {
            var heji = {}
            for (let j = 0; j < result.length; j++) {
              if (result[j].middleCode === '0000') {
                heji = result[j]
                result.splice(j, 1)
              }
            }
            result.unshift(heji)
            _this.summarytable = result
            _this.changeSun()
            _this.sumSum()
            _this.sumSumhj()
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
          type: 'warning',
          duration: 2000
        })
      })
    },
    // 重置
    reset() {
      this.listQuery.date = ''
      this.listQuery.isdw = ''
      this.listQuery.isdwname = ''
      this.summarytable = []
    },
    // input改变事件
    handleEdit(index, row) {
      console.log(index, row)
      // var regex = /([1-9]\d*\.?\d*)|(0\.\d*[1-9])/
      // if (regex.test(parseFloat(row.costA2)) === false) {
      //   $('#errup').show()
      // } else {
      //   $('#errup').hide()
      // }
      this.changeSun()
      this.sumSum()
      this.sumSumhj()
    },
    // 行点击时触发事件
    handleCurrentChange(row, event, column) {
    },
    // 合计计算方法
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        }
      })
      return sums
    }
  },
  filters: {
    stateFilter(state) {
      return dwValue[state]
    }
  },
  watch: {
    'listQuery.isdw': function(newValue, oldValue) {
      this.listQuery.isdwname = dwValue[this.listQuery.isdw]
      if (this.listQuery.isdwname === undefined) {
        this.listQuery.isdwname = ''
      }
    },
    'listQuery.date': function(newValue, oldValue) {
      if (this.listQuery.date) {
        this.listQuery.datename = this.listQuery.date
        this.listQuery.datename = this.listQuery.datename.replace('-', '年') + '月'
      } else {
        this.listQuery.datename = ''
      }
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
.tb-edit .current-row .el-input {
    display: block;
}
.el-input--small .el-input__inner {
  height: 22px;
  line-height: 22px;
}
.tb-edit .current-row .el-input+span {
    display: none
}
</style>

