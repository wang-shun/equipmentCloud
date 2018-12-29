<template >
  <div class='app-container'>
    <div class="filter-container">
        <el-date-picker v-model="listQuery.date" type="month" placeholder="选择年月" value-format="yyyy-MM" format="yyyy-MM" style="width: 140px;" class="filter-item" ></el-date-picker>
        <el-select filterable clearable style="width: 140px" class="filter-item" v-model="listQuery.isdw" placeholder="选择矿处单位">
          <el-option v-for="item in positionList" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
        <el-button class="filter-item" type="primary" size="small"  icon="el-icon-search" @click="search">搜索</el-button>
        <el-button class="filter-item" size="small"  icon="el-icon-refresh" @click="reset">重置</el-button>
        <div class="btn_right" style="float:right;">
            <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning"  icon="el-icon-upload" @click="exportExcel">导出</el-button>
        </div>
    </div>
    <div id='reportDiv'>
    <el-table :data="leasetable"  border fit highlight-current-row
        style="width: 100%;max-height:740px;" ref="moviesTable" @row-click="handleCurrentChange" class="tb-edit" :height="tableHeight">
      <el-table-column align="center" label="矿处通用机电租赁费用明细表">
        <el-table-column  align="center" label="矿处单位" width='150px'>
          <template slot-scope="scope">
            <span >{{scope.row.positionName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="设备中类" width='150px'>
          <template slot-scope="scope">
            <span>{{scope.row.middleTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="设备小类" width='150px'>
          <template slot-scope="scope">
            <span>{{scope.row.smallTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备识别码" width='150px'>
          <template slot-scope="scope">
            <span>{{scope.row.equipmentCode}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="技术标识号"  width='150px'>
          <template slot-scope="scope">
            <span>{{scope.row.techCode}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="规格型号" width='150px'>
          <template slot-scope="scope">
            <span>{{scope.row.modelName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="功能位置" width='150px'>
          <template slot-scope="scope">
            <span>{{scope.row.effectName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="租赁结算天数" width='150px'>
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.elDays" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> 
            <span>{{scope.row.elDays}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="租赁价格" width='150px'>
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.costA1" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
            <span>{{scope.row.costA1}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="调整金额" width='150px'>
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.costA3" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
            <span>{{scope.row.costA3}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="合计" width='150px'>
          <template slot-scope="scope">
            <span>{{scope.row.totalFee}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" width='150px'>
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.remarks" placeholder="请输入内容" ></el-input>
            <span>{{scope.row.remarks}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
// import waves from '@/directive/waves' // 水波纹指令
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { require_get, require_post } from '@/assets/pubJS'
const id = sessionStorage.getItem('id')
const token = sessionStorage.getItem('token')
const positionList = JSON.parse(sessionStorage.getItem('dwList'))
console.log(positionList)
export default {
  name: 'listofleasing',
  data() {
    return {
      tableHeight: document.body.clientHeight - 230,
      listQuery: {
        date: '',
        isdw: ''
      },
      positionList,
      id: id,
      leasetable: [] // 报表列表
    }
  },
  created() {
  },
  methods: {
    search() {
      const _this = this
      _this.leasetable = []
      require_get('/v1/elFeeDetailT', {
        token: token,
        authorityCode: 1
      }, {
        positionCode: _this.listQuery.isdw,
        exportAtStr: _this.listQuery.date
      }, function(res) {
        if (res.data.status === 200) {
          var result = res.data.data
          if (result) {
            _this.leasetable = result
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
      this.leasetable = []
    },
    exportExcel() {
      const _this = this
      for (let i = 0; i < _this.leasetable.length; i++) {
        _this.leasetable[i].createBy = parseFloat(_this.id)
      }
      for (let i = 0; i < _this.leasetable.length; i++) {
        _this.leasetable[i].costA1 = parseFloat(_this.leasetable[i].costA1)
      }
      for (let i = 0; i < _this.leasetable.length; i++) {
        _this.leasetable[i].costA3 = parseFloat(_this.leasetable[i].costA3)
      }
      for (let i = 0; i < _this.leasetable.length; i++) {
        _this.leasetable[i].elDays = parseFloat(_this.leasetable[i].elDays)
      }
      var params = _this.leasetable
      if (_this.leasetable.length === 0) {
        _this.$notify({
          title: '系统提示',
          message: '导出报表不能为空',
          type: 'warning',
          duration: 2000
        })
      } else {
        require_post('/v1/elFeeDetailT', {
          token: token,
          authorityCode: 1
        }, params, function(res) {
          console.log(res)
          if (res.data.status === 200) {
            /* generate workbook object from table */
            var wb = XLSX.utils.table_to_book(document.querySelector('#reportDiv'))
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
              FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '矿处通用机电租赁费用明细表.xlsx')
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
    handleEdit(index, row) {
      var reg = /^(.*\..{3}).*$/
      for (let i = 0; i < this.leasetable.length; i++) {
        this.leasetable[i].totalFee = Number(String(parseFloat(this.leasetable[i].elDays * this.leasetable[i].costA1) + parseFloat(this.leasetable[i].costA3)).replace(reg, '$1'))
      }
    },
    handleCurrentChange(row, event, column) {
      console.log(row, event, column, event.currentTarget)
    }
  }
}
</script>
<style>
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
