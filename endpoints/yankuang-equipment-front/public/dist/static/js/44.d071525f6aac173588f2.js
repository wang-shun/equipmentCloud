webpackJsonp([44],{"8lqQ":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.btn_right[data-v-1229daa5] {\n  float: right;\n}\n.filter-container .filter-item[data-v-1229daa5] {\n  margin-bottom: 5px;\n}\n",""])},PA9a:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("mvHQ"),r=a.n(l),i=a("ZjsX"),o=a("lbHh"),s=a.n(o),n=a("lDdF"),p=a.n(n),c=a("uXZL"),m=a.n(c),u=s.a.get("token"),h={name:"repair",data:function(){return{listQuery:{year:"",month:"",assetComp:""},applyCompanyList:[{name:"东华",assetComp:"1730"},{name:"煤业",assetComp:"1180"}],analyse:"",showHeader:!1,firstSum:[],secondSum:[],totalNum:[],tableData3:[],tableData:[],assetName:{},analyseTable:[{name:"分析："}],tempObj:{},tempObj2:{}}},methods:{objectSpanMethod:function(t){t.row,t.column;var e=t.rowIndex,a=t.columnIndex;if(e===this.tableData3.length-1){if(1===a)return[1,2];if(0===a)return[0,0]}},objectSpanMethod1:function(t){t.row,t.column;var e=t.rowIndex,a=t.columnIndex;if(e===this.tableData.length-1){if(1===a)return[1,2];if(0===a)return[0,0]}},objectSpanMethod2:function(t){t.row,t.column,t.rowIndex;var e=t.columnIndex;return 1===e?[1,2]:0===e?[0,0]:void 0},getAssetName:function(t){this.assetName=this.applyCompanyList.find(function(e){return e.assetComp===t})},search:function(){if(""===this.listQuery.assetComp||""===this.listQuery.year||""===this.listQuery.month)this.$notify({title:"系统提示",message:"请完整选择搜索条件！",type:"warning",duration:3e3});else{var t=this,e=this.listQuery.year,a=this.listQuery.month,l={};l.yearTime=e,l.monthTime=a,l.assetComp=this.listQuery.assetComp,Object(i.d)("/v1/zjZjRepairFee/findCostRepairList?jsonString="+r()(l),{token:u,authorityCode:1},{},function(e){if(200===e.data.status){var a=e.data.data;if(a&&0!==a.length){var l=t.tempObj,r=t.tempObj2,i=a.zjDepreciationCostReportItemSumHomes[0],o=a.zjDepreciationCostReportItemSumExternals[0];l.januaryRepairsCost=i.month01xiaoji,l.februaryRepairsCost=i.month02xiaoji,l.marchRepairsCost=i.month03xiaoji,l.aprilRepairsCost=i.month04xiaoji,l.mayRepairsCost=i.month05xiaoji,l.juneRepairsCost=i.month06xiaoji,l.julyRepairsCost=i.month07xiaoji,l.augustRepairsCost=i.month08xiaoji,l.sepRepairsCost=i.month09xiaoji,l.octRepairsCost=i.month10xiaoji,l.novRepairsCost=i.month11xiaoji,l.decRepairsCost=i.month12xiaoji,l.deptSum=i.moreDeptSum,l.deptName="小计",t.tableData3=a.zjDepreciationCostReportItemsHome,t.tableData3.push(l),r.januaryRepairsCost=o.month01xiaoji,r.februaryRepairsCost=o.month02xiaoji,r.marchRepairsCost=o.month03xiaoji,r.aprilRepairsCost=o.month04xiaoji,r.mayRepairsCost=o.month05xiaoji,r.juneRepairsCost=o.month06xiaoji,r.julyRepairsCost=o.month07xiaoji,r.augustRepairsCost=o.month08xiaoji,r.sepRepairsCost=o.month09xiaoji,r.octRepairsCost=o.month10xiaoji,r.novRepairsCost=o.month11xiaoji,r.decRepairsCost=o.month12xiaoji,r.deptSum=o.moreDeptSum,t.tableData=a.zjDepreciationCostReportItemsExternal,t.tableData.push(r),a.zjDepreciationCostReportItemAddUpSums[0].sumText="累计",t.totalNum=a.zjDepreciationCostReportItemAddUpSums}else t.tableData3=[],t.tableData=[],t.totalNum=[],t.$notify({title:"系统提示",message:"搜索结果为空",type:"info",duration:3e3})}else t.$notify({title:"错误",message:e.data.meta.message,type:"error",duration:3e3})})}},exportExcel:function(){var t=this;if(0!==this.tableData3.length||0!==this.tableData.length){var e=this,a=[],l=[];this.tableData3.forEach(function(e,l){l!==t.tableData3.length-1&&a.push(e)}),this.tableData.forEach(function(e,a){a!==t.tableData.length-1&&l.push(e)});var r={assetComp:this.listQuery.assetComp,reportName:this.listQuery.year+"年"+this.assetName.name+"综机折旧修理费月报---"+this.listQuery.month+"月",yearTime:this.listQuery.year,remark:this.analyse,zjDepreciationCostReportItemsHome:a,zjDepreciationCostReportItemsExternal:l};Object(i.f)("/v1/zjZjRepairFee/saveZjDeCost",{token:u,authorityCode:1},r,function(t){200===t.data.status?(e.excel(),e.$notify({title:"系统提示",message:"导出成功",type:"success",duration:3e3})):e.$notify({title:"错误",message:t.data.msg,type:"error",duration:3e3})})}else this.$notify({title:"提示",message:"数据为空，不可导出",type:"info",duration:3e3})},excel:function(){var t=m.a.utils.table_to_book(document.querySelector("#reportDiv")),e=m.a.write(t,{bookType:"xlsx",bookSST:!0,type:"array"});try{p.a.saveAs(new Blob([e],{type:"application/octet-stream"}),"综机折旧修理费报表.xlsx")}catch(t){"undefined"!=typeof console&&console.log(t,e)}return e},reset:function(){this.listQuery.year="",this.listQuery.month="",this.listQuery.assetComp="",this.tableData3=[],this.tableData=[]}},filters:{assetCompFilter:function(t){return"1180"===t?"煤业综机折旧修理费报表（1180）":"东华综机折旧修理费报表（1730）"}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-date-picker",{staticStyle:{width:"140px"},attrs:{type:"year",placeholder:"选择年","value-format":"yyyy",format:"yyyy"},model:{value:t.listQuery.year,callback:function(e){t.$set(t.listQuery,"year",e)},expression:"listQuery.year"}}),t._v(" "),a("el-date-picker",{staticStyle:{width:"140px"},attrs:{type:"month",placeholder:"选择月","value-format":"M",format:"M"},model:{value:t.listQuery.month,callback:function(e){t.$set(t.listQuery,"month",e)},expression:"listQuery.month"}}),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{filterable:"",clearable:"",placeholder:"选择单位"},on:{change:t.getAssetName},model:{value:t.listQuery.assetComp,callback:function(e){t.$set(t.listQuery,"assetComp",e)},expression:"listQuery.assetComp"}},t._l(t.applyCompanyList,function(t){return a("el-option",{key:t.assetComp,attrs:{label:t.name,value:t.assetComp}})})),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{size:"small",icon:"el-icon-refresh"},on:{click:t.reset}},[t._v("重置")]),t._v(" "),a("div",{staticClass:"btn_right"},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"warning",icon:"el-icon-upload"},on:{click:t.exportExcel}},[t._v("导出")])],1)],1),t._v(" "),a("div",{attrs:{id:"reportDiv"}},[a("el-table",{staticStyle:{width:"100%","max-height":"740px"},attrs:{data:t.tableData3,border:"",fit:"","highlight-current-row":"","span-method":t.objectSpanMethod}},[a("el-table-column",{attrs:{align:"center",label:(t.listQuery.year||"")+"年"+(t.assetName.name?t.assetName.name:"")+"综机折旧修理费月报---"+(t.listQuery.month||"")+"月份"}},[a("el-table-column",{attrs:{width:"50px",align:"center",type:"index",label:"序号"}}),t._v(" "),a("el-table-column",{attrs:{width:"120px",align:"center",prop:"deptName",label:"矿别"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"逐月累计收费金额（万元，不含税）"}},[a("el-table-column",{attrs:{width:"100px",align:"center",prop:"januaryRepairsCost",label:"1月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"februaryRepairsCost",label:"2月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"marchRepairsCost",label:"3月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"aprilRepairsCost",label:"4月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"mayRepairsCost",label:"5月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"juneRepairsCost",label:"6月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"julyRepairsCost",label:"7月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"augustRepairsCost",label:"8月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"sepRepairsCost",label:"9月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"octRepairsCost",label:"10月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"novRepairsCost",label:"11月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"decRepairsCost",label:"12月"}}),t._v(" "),a("el-table-column",{attrs:{width:"120px",align:"center",prop:"deptSum",label:"合计"}})],1)],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:t.tableData,"show-header":t.showHeader,border:"",fit:"","highlight-current-row":"","span-method":t.objectSpanMethod1}},[a("el-table-column",{attrs:{align:"center"}},[a("el-table-column",{attrs:{width:"50px",align:"center",type:"index",prop:"sumText"}}),t._v(" "),a("el-table-column",{attrs:{width:"120px",align:"center",prop:"deptName"}}),t._v(" "),a("el-table-column",{attrs:{align:"center"}},[a("el-table-column",{attrs:{width:"100px",align:"center",prop:"januaryRepairsCost",label:"1月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"februaryRepairsCost",label:"2月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"marchRepairsCost",label:"3月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"aprilRepairsCost",label:"4月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"mayRepairsCost",label:"5月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"juneRepairsCost",label:"6月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"julyRepairsCost",label:"7月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"augustRepairsCost",label:"8月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"sepRepairsCost",label:"9月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"octRepairsCost",label:"10月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"novRepairsCost",label:"11月"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"decRepairsCost",label:"12月"}}),t._v(" "),a("el-table-column",{attrs:{width:"120px",align:"center",prop:"deptSum",label:"合计"}})],1)],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.totalNum,"show-header":t.showHeader,border:"",fit:"","highlight-current-row":"","span-method":t.objectSpanMethod2}},[a("el-table-column",{attrs:{align:"center"}},[a("el-table-column",{attrs:{width:"50px",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"120px",align:"center",prop:"sumText"}}),t._v(" "),a("el-table-column",{attrs:{align:"center"}},[a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum01"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum02"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum03"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum04"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum05"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum06"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum07"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum08"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum09"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum10"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum11"}}),t._v(" "),a("el-table-column",{attrs:{width:"100px",align:"center",prop:"addUpSum12"}}),t._v(" "),a("el-table-column",{attrs:{width:"120px",align:"center",prop:"moreDeptAddUpSum"}})],1)],1)],1)],1)])},staticRenderFns:[]};var b=a("VU/8")(h,d,!1,function(t){a("vFyb")},"data-v-1229daa5",null);e.default=b.exports},vFyb:function(t,e,a){var l=a("8lqQ");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("rjj0")("1e125c38",l,!0)}});