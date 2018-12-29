<template>
    <div class="app-container">
        <div class="filter-container">
            <el-date-picker v-model="listQuery.date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 140px;" class="filter-item" placeholder="选择年"></el-date-picker>
            <el-select filterable clearable style="width: 140px" class="filter-item" v-model="listQuery.stubUnit" placeholder="存根单位">
                <el-option v-for="item in stubUnitList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button class="filter-item" type="primary" size="small" v-waves icon="el-icon-search" @click="search">搜索</el-button>
            <el-button class="filter-item" size="small" v-waves icon="el-icon-refresh" @click="reset">重置</el-button>
            <div class="btn_right">
                <el-button class="filter-item" size="small" style="margin-left: 10px;" type="warning" v-waves icon="el-icon-upload" @click="exportExcel">导出</el-button>
            </div>
        </div>
        <div id="ig">
            <el-table :data="tableData" border fit highlight-current-row style="width:97%;max-height:740px;float:left;" ref="moviesTable">
                <el-table-column align="center" label="综机设备使用交接单">
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
                                    <span v-show="scope.row.comp === '1730'" class="el-icon-check"></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column align="center" label="是否新设备">
                            <template slot-scope="scope">
                                <span v-show="scope.row.isNew === 1" class="el-icon-check"></span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="备注">
                            <template slot-scope="scope">
                                <span>{{scope.row.remark}}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <div class="rightTit">{{listQuery.stubUnit}}</div>
        <div style="float:left;font-size: 14px;">
            <p>注：交接日期即设备开始收费日期。签订此表即表示双方认同此收费日期。</p>
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
  }, {
    label: '使用单位存根',
    value: '使用单位存根'
  }
]
export default {
  name: 'repairCost',
  directives: {
    waves
  },
  data() {
    return {
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
    exportExcel() {
      /* 从表生成工作簿对象*/
      const wb = XLSX.utils.table_to_book(document.querySelector('#ig'))
      /* 获取二进制字符串作为输出 */
      const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备使用交接单（使用单位存根）.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') { '' }
        console.log(e, wbout)
      }
      return wbout
    },
    getList() {
      const params = {
        jsonString: { 'useAt': '2018-08-31', 'stubUnit': '使用单位存根', 'isUse': '1' },
        page: 1,
        size: 5
      }
      require_get('/v1/zjSbUse/findByUseDate', { token: token, authorityCode: 1 }, params, (res) => {
        // console.log(res)
        if (res.data.status === 200) {
          this.tableData = res.data.data.list
          console.log(this.tableData)
        } else {
          this.$notify.info({
            title: '系统提示',
            message: res.data.msg
          })
        }
      })
    },
    // 搜索调用的方法
    search() {
    },
    // 重置调用的方法
    reset() {
      this.listQuery.date = ''
      this.listQuery.stubUnit = ''
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


