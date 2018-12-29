<template>
    <div class="app-container">
        <div class="filter-container">
            <el-date-picker v-model="listQuery.date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 140px;" class="filter-item" placeholder="选择交接日期"></el-date-picker>
            <!-- <el-select clearable style="width: 140px" class="filter-item" v-model="listQuery.stubUnit" placeholder="存根单位">
                <el-option v-for="item in stubUnitList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
            <el-button class="filter-item" type="primary" size="small" v-waves icon="el-icon-search" @click="search">搜索</el-button>
            <el-button class="filter-item" size="small" v-waves icon="el-icon-refresh" @click="reset">重置</el-button>
            <div class="btn_right">
                <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning" v-waves icon="el-icon-upload" @click="exportExcel">导出</el-button>
            </div>
        </div>
        <div id="edg">
            <el-table :data="tableData" border fit highlight-current-row style="width:97%;max-height:740px;float:left;" ref="moviesTable">
                <el-table-column align="center" label="综机设备停用交接单">
                    <el-table-column align="right" label="2018-08-21">
                        <el-table-column type="index" width="50px" align="center" label="序号"></el-table-column>
                        <el-table-column width="180px" align="center" label="使用单位(矿)">
                            <template slot-scope="scope">
                                <span>{{scope.row.equipmentEffect}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="工作地点(工作面)">
                            <template slot-scope="scope">
                                <span>{{scope.row.departmentName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="设备名称">
                            <template slot-scope="scope">
                                <span>{{scope.row.equName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="设备型号">
                            <template slot-scope="scope">
                                <span>{{scope.row.equipmentModel}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="数量">
                            <template slot-scope="scope">
                                <span>{{scope.row.equipmentNum}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="技术识别号">
                            <template slot-scope="scope">
                                <span>{{scope.row.techCode}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="归属公司">
                            <el-table-column align="center" label="1180煤业">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.comp === '1180'" class="el-icon-check"></span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="1730东华">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.comp === '1730'" class="el-icon-check">{{scope.row.donghua}}</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column align="center" label="备注">
                            <template slot-scope="scope">
                                <span>{{scope.row.remark}}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-table :data="zhu" :span-method="objectSpanMethod" border fit highlight-current-row style="width:97%;max-height:740px;float:left;" ref="moviesTable">
                <el-table-column>
                    <template slot-scope="scope">
                        <span>{{scope.row.msg}}</span>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { require_get } from '@/assets/pubJS'
import Cookies from 'js-cookie'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
const token = Cookies.get('token')

const stubUnitList = [
  {
    label: '设备管理中心',
    value: '设备管理中心'
  }, {
    label: '收费凭证',
    value: '收费凭证'
  }
]
export default {
  name: 'repairCost',
  directives: {
    waves
  },
  data() {
    return {
      zhu: [{
        msg: '注：交接日期即设备开始收费日期。签订此表即表示双方认同此收费日期。'
      }],
      listQuery: {
        date: '',
        stubUnit: ''
      },
      tableData: [],
      stubUnitList
    }
  },
  created() {
    this.getList()
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //   if (columnIndex === 0) { // 合并表格第一列的最后两行
      //     if (rowIndex === this.zhu.length - 2) { // 倒数第二行
      //       return [2, 1]
      //     } else if (rowIndex === this.zhu.length - 1) { // 最后一行
      //       return [0, 0]
      //     }
      //   }
      if (rowIndex === this.zhu.length - 1) { // 合并表格最后一行的2 3 4列
        if (columnIndex === 0) {
          return [1, 10]
        } else if (columnIndex === 2 || columnIndex === 4) {
          return [0, 0]
        }
      }
    },
    exportExcel() {
      /* 从表生成工作簿对象*/
      const wb = XLSX.utils.table_to_book(document.querySelector('#edg'))
      /* 获取二进制字符串作为输出 */
      const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备停用交接单（停缴凭证）.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') { '' }
        console.log(e, wbout)
      }
      return wbout
    },
    // 搜索调用的方法
    search() {
    },
    // 重置调用的方法
    reset() {
      this.getList()
    },
    getList() {
      const params = {
        jsonString: { 'useAt': '2018-08-31', 'stubUnit': '停缴凭证', 'isUse': '2' },
        page: 1,
        size: 5
      }
      require_get('/v1/zjSbUse/findByUseDate', { token: token, authorityCode: 1 }, params, (res) => {
        // console.log(res)
        if (res.data.status === 200) {
          this.tableData = res.data.data.list
        } else {
          this.$notify.info({
            title: '系统提示',
            message: res.data.msg
          })
        }
      })
    }
  }
}
</script>

<style>
.btn_right {
    float: right;
}
.rightTit {
    width: 15px;
    float: left;
    padding: 5px;
    font-size: 14px;
    color: #666;
}
</style>


