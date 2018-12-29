<template>
  <div class="app-container">
    <div v-for='item in authorityCodebutton' :key='item.code'>
      <el-col :sm="12" :md="8" :lg="8">
        <router-link v-if="item.name === '综机折旧修理费汇总表'" to="/gather">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/chargesTotal.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :sm="12" :md="8" :lg="8">
        <router-link v-if="item.name === '综机折旧修理费报表'" to="/repair">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/repairCost.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :sm="12" :md="8" :lg="8">
        <router-link v-if="item.name === '东华重工有限公司综机折旧修理费表'" to="/ydhRepair">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/repairCost.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :sm="12" :md="8" :lg="8">
        <router-link v-if="item.name === '综掘面综机设备使用清单'" to="/zjmEquipment">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/useList.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :sm="12" :md="8" :lg="8">
        <router-link v-if="item.name === '综机折旧修理费月报（汇总）全年汇总'" to="/depreciationYear">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/chargesTotal.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :sm="12" :md="8" :lg="8">
        <router-link v-if="item.name === '综机折旧修理费月报（汇总）月度明细'" to="/depreciationMonth">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/chargesDetail.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :sm="12" :md="8" :lg="8">
        <router-link v-if="item.name === '综机折旧修理费月报'" to="/monthReport">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/tyMonthReport.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :sm="12" :md="8" :lg="8">
        <router-link v-if="item.name === '设备新度系数调节费清单'" to="/newDegree">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/coefficient.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :sm="12" :md="8" :lg="8">
        <router-link v-if="item.name === '设备非正常损失赔偿费表'" to="/abnormalLosses">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/loss.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :sm="12" :md="8" :lg="8">
        <router-link v-if="item.name === '综机设备使用交接单'" to="/useApply">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/useApply.png" style="float:left;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :sm="12" :md="8" :lg="8">
        <router-link v-if="item.name === '综机设备停用交接单'" to="/retairApply">
          <div class="grid-content bg-purple">
            <img src="/static/images/icon/retairApply.png" style="float:left;margin:5px;"/>
            <span class="reportName">{{item.name}}</span>
          </div>
        </router-link>
      </el-col>
    </div>
  </div>
</template>

<script>

import { controllbutton } from '@/assets/pubJS'
export default {
  name: 'report_ty',
  directives: {
  },
  data() {
    return {
      authorityCodebutton: []
    }
  },
  created() {
    const url = sessionStorage.getItem('index')
    this.buttonlist = controllbutton(url)
    this.authorityCodebutton = this.buttonlist[0]
  },
  computed: {
  },
  methods: {
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
  cursor: pointer;
}
.commonTit {
  border-left: 4px solid rgba(22, 155, 213, 1);
  padding-left: 5px;
  margin: 10px 0 15px 0;
}
</style>


