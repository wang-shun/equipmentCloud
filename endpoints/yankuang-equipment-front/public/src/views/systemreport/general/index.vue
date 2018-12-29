<template>
  <div class="app-container">
    <div v-for='item in authorityCodebutton' :key='item.code'>
      <el-col :span="12">
        <router-link v-if="item.name === '通用设备折旧修理费月报（跨矿）'" to="/repairCostMonth">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/tyMonthReport.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="12">
        <router-link v-if="item.name === '矿处通用租赁机电费用明细表'" to="/electromechanical">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/chargesDetail.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="12">
        <router-link v-if="item.name === '矿处通用机电租赁费用汇总表'" to='/listofcollectfees'>
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/chargesTotal.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="12">
        <router-link v-if="item.name === '通用设备折旧修理费确认单'" to='/repairbillconfirmation'>
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/confirm.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
    </div>
  </div>
</template>

<script>
import { require_get, controllbutton } from '@/assets/pubJS'
const token = sessionStorage.getItem('token')
export default {
  name: 'report_ty',
  directives: {
  },
  data() {
    return {
      buttonlist: [],
      authorityCodebutton: [],
      authorityCodePage: ''
    }
  },
  created() {
    const url = sessionStorage.getItem('index')
    this.buttonlist = controllbutton(url)
    this.authorityCodebutton = this.buttonlist[0]
    this.authorityCodePage = this.buttonlist[1]
    this.getdw()
  },
  computed: {
  },
  methods: {
    getdw() {
      // 获取所在位置
      require_get('/v1/elplan', {
        token: token,
        authorityCode: 1
      }, {
        page: 1,
        size: 100,
        type: 21
      }, function(res) {
        var data = []
        if (res.data.status === 200) {
          var result = res.data.data.list
          for (let i = 0; i < result.length; i++) {
            var obj = {}
            obj.code = result[i].code
            obj.name = result[i].name
            data[i] = obj
          }
          sessionStorage.setItem('dwList', JSON.stringify(data))
        }
      })
    }
  },
  filters: {
  }
}
</script>
<style>
.el-col {
  margin-bottom: 0 !important;
}
.reportName {
  float: left;
  margin: 20px 5px;
}
</style>


