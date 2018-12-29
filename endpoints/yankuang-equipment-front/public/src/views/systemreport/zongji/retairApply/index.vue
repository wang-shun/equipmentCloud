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
                <el-table-column align="center" :label="'综机设备停用交接单(' + listQuery.stubUnit + ')'">
                    <el-table-column align="right" :label="listQuery.date">
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
                                    <span v-if="scope.row.comp === '1180'">{{scope.row.comp}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="1730东华">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.comp === '1730'">{{scope.row.comp}}</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column align="center" label="是否新设备">
                            <template slot-scope="scope">
                                <span v-if="scope.row.isNew === 1">是</span>
                                <span v-if="scope.row.isNew !== 1">否</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="备注">
                            <template slot-scope="scope">
                                <el-input v-on:blur="changeCount" size="small" v-if="sss" v-model="scope.row.remark" placeholder="请输入内容" ></el-input>
                                <span align="center" v-if="ddd" @click="show">{{scope.row.remark}}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-table :data="zhu" border fit highlight-current-row style="width:97%;max-height:740px;float:left;" ref="moviesTable">
                <el-table-column style="width: 100%">
                    <template slot-scope="scope">
                        <span>{{scope.row.remark}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="qianming" border fit highlight-current-row style="width:97%;max-height:740px;float:left;" ref="moviesTable">
                <el-table-column style="width: 20%" lable="">
                    <template slot-scope="scope">
                        <span>{{scope.row.jingbanren1}}</span>
                    </template>
                </el-table-column>
                <el-table-column style="width: 7%" lable="">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column style="width: 7%" lable="">
                    <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column style="width: 7%" lable="">
                    <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column style="width: 1%" lable="">
                    <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column style="width: 20%" lable="">
                    <template slot-scope="scope">
                        <span>{{scope.row.jingbanren2}}</span>
                    </template>
                </el-table-column>
                <el-table-column style="width: 7%" lable="">
                    <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column style="width: 7%" lable="">
                    <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column style="width: 7%" lable="">
                    <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column style="width: 1%" lable="">
                    <template slot-scope="scope"> </template>
                </el-table-column>
            </el-table>
        </div>


        <!-- <el-dialog :data="zhu" width="800px" title="注" :visible.sync="equipmentDialog" append-to-body>
            <el-form>
                <el-form-item slot-scope="scope">
                    <el-input type="textarea" v-model="scope.row.remark" :autosize="{ minRows: 2, maxRows: 2}" style="width:98.5%;" :maxlength="200">
                    </el-input>
                </el-form-item>
            </el-form>
        </el-dialog> -->
    </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { require_get, require_post } from '@/assets/pubJS'
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
      equipmentDialog: false,
      sss: false,
      ddd: true,
      zhu: [{
        remark: '注:1、石拉乌素、龙凤矿本月直接收取上半年全部租赁费、全部入1180账号。'
      }],
      qianming: [{
        jingbanren1: '管理中心经办人：',
        jingbanren2: '使用单位经办人：'
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
    this.getList(this.listQuery.date, this.listQuery.stubUnit)
  },
  methods: {
    // zhushi() {
    //   this.equipmentDialog = true
    //   console.log(this.zhu)
    // },
    show() {
      this.sss = true
      this.ddd = false
    },
    changeCount() {
      this.sss = false
      this.ddd = true
    },
    exportExcel() {
      var params = {
        handover: this.listQuery.date,
        zjSbUseItems: this.tableData
      }
      require_post('/v1/zjSbUse/saveZjSbUse', { token: token, authorityCode: 1 }, params, (res) => {
        console.log(res)
        this.getList(this.listQuery.date, this.listQuery.stubUnit)
        if (res.data.status === 200) {
          var ssss = this.listQuery.stubUnit
          /* 从表生成工作簿对象*/
          const wb = XLSX.utils.table_to_book(document.querySelector('#ig'))
          /* 获取二进制字符串作为输出 */
          const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
          try {
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备使用交接单（' + ssss + '）.xlsx')
          } catch (e) {
            if (typeof console !== 'undefined') { '' }
            console.log(e, wbout)
          }
          return wbout
        } else {
          this.$notify.info({
            title: '系统提示',
            message: res.data.msg
          })
        }
      })
    },
    getList(date, stubUnit) {
      const params = {
        jsonString: { 'useAt': date, 'stubUnit': stubUnit, 'isUse': '1' },
        page: 1,
        size: 5
      }
      require_get('/v1/zjSbUse/findByUseDate', { token: token, authorityCode: 1 }, params, (res) => {
        console.log(token)
        console.log(res)
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
      this.getList(this.listQuery.date, this.listQuery.stubUnit)
    },
    // 重置调用的方法
    reset() {
      this.listQuery.date = ''
      this.listQuery.stubUnit = ''
      this.tableData = ''
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


