webpackJsonp([36],{"2lAH":function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.btn_right{\r\n    float: right;\n}\n.filter-container .filter-item{\r\n  margin-bottom: 5px\n}\n.inputh .el-input__inner{\r\n    height: 22px;\r\n    line-height: 22px;\n}\r\n",""])},"6Wt8":function(t,e,n){var l=n("2lAH");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);n("rjj0")("3113b89e",l,!0)},K94S:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n("ZjsX"),a=n("lbHh"),o=n.n(a),s=n("lDdF"),r=n.n(s),u=n("uXZL"),i=n.n(u),c=o.a.get("token"),_={name:"gather",data:function(){return{equipmentDialog:!1,ddd:!0,sss:!1,showHeader:!1,jisuan:!1,firstSum:[],secondSum:[],totalNum:[],tableData1:[],tableData2:[],tableData3:[],zhu1:"",listId:"",zhu:[{remark:""}],listQuery:{date:"2018"}}},created:function(){this.getList(this.listQuery.date),this.times()},methods:{examineUnPass:function(){var t=this,e={remark:this.zhu1,id:this.listId};Object(l.g)("/v1/reportEquipmentZMonth/updateRemarkById",{token:c,authorityCode:1},e,function(e){200===e.data.status?(t.$notify.info({title:"系统提示",message:"修改成功!",type:"success"}),t.equipmentDialog=!1):t.$notify.info({title:"系统提示",message:e.data.msg,type:"error"})})},times:function(){var t=new Date;this.month=t.getMonth()+1,this.ss=this.month,t.getDate()>20&&t.getDate()<32&&(this.jisuan=!0)},newCalculation:function(){var t=this;Object(l.g)("/v1/reportEquipmentZMonth/ReCalReportEquipmentZMonth",{token:c,authorityCode:1},{},function(e){200===e.data.status?t.getList(t.listQuery.date):t.$notify.info({title:"系统提示",message:e.data.msg,type:"error"})})},getList:function(t){var e=this;Object(l.d)("/v1/reportEquipmentZMonth/findByYear/"+t,{token:c,authorityCode:1},{},function(t){if(200===t.data.status)if(null!==t.data.data.id){e.tableData1=t.data.data.list1,e.tableData2=t.data.data.list2,e.tableData3=t.data.data.list3;for(var n=t.data.data.remark,l=n.split("。"),a=[],o=0;o<l.length&&l[o].toString()+"。"!="。";o++){var s={};s.remark=l[o].toString()+"。",a[o]=s}e.zhu=a,e.zhu1=n,e.listId=t.data.data.id}else e.$notify.info({title:"系统提示",message:"查询结果为空！"});else e.$notify.info({title:"系统提示",message:t.data.msg})})},sousuo:function(){""!==this.listQuery.date?this.getList(this.listQuery.date):this.$notify.info({title:"系统提示",message:"查询年份不能为空！",type:"warning"})},chongzhi:function(){this.listQuery.date="",this.tableData1=[],this.tableData2=[],this.tableData3=[],this.zhu1="",this.zhu=[]},show:function(t){this.sss=!0,this.ddd=!1},changeCount:function(t){var e=this;if(this.sss=!1,this.ddd=!0,null!==t.id){var n={id:t.id,yearPlanVal:Number(t.yearPlanVal)};Object(l.g)("/v1/reportEquipmentZMonth/updateYearPlanValById",{token:c,authorityCode:1},n,function(t){e.getList(e.listQuery.date)})}else this.getList(this.listQuery.date),this.$notify.info({title:"系统提示",message:"小计和累计不允许更改！",type:"warning"})},exportExcel:function(){if(0!==this.tableData1.length){var t=i.a.utils.table_to_book(document.querySelector("#bbYear")),e=i.a.write(t,{bookType:"xlsx",bookSST:!0,type:"array"});try{r.a.saveAs(new Blob([e],{type:"application/octet-stream"}),this.listQuery.date+"综机折旧修理费月报（汇总）.xlsx")}catch(t){}return e}this.$notify.info({title:"系统提示",message:"列表为空，不能导出！",type:"warning"})}},mounted:function(){}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-date-picker",{staticStyle:{width:"200px"},attrs:{type:"year",placeholder:"选择年","value-format":"yyyy",format:"yyyy"},model:{value:t.listQuery.date,callback:function(e){t.$set(t.listQuery,"date",e)},expression:"listQuery.date"}}),t._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:t.sousuo}},[t._v("搜索")]),t._v(" "),n("el-button",{staticClass:"filter-item",attrs:{size:"small",icon:"el-icon-refresh"},on:{click:t.chongzhi}},[t._v("重置")]),t._v(" "),t.jisuan?n("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-sort"},on:{click:t.newCalculation}},[t._v("重新计算")]):t._e(),t._v(" "),n("div",{staticClass:"btn_right"},[n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"warning",icon:"el-icon-upload"},on:{click:t.exportExcel}},[t._v("导出")])],1)],1),t._v(" "),n("div",{attrs:{id:"bbYear"}},[n("el-table",{ref:"upTable",staticClass:"inputsun",staticStyle:{width:"100%","max-height":"740px"},attrs:{data:t.tableData1,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:t.listQuery.date+"综机折旧修理费月报（汇总）---"+t.month+"月份"}},[n("el-table-column",{attrs:{type:"index",width:"50px",align:"center",label:"序号"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"矿别"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.deptName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"年度计划指标（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return["小计"!==e.row.deptName?n("el-input",{attrs:{size:"small"},on:{blur:function(n){t.changeCount(e.row)}},model:{value:e.row.yearPlanVal,callback:function(n){t.$set(e.row,"yearPlanVal",n)},expression:"scope.row.yearPlanVal"}}):t._e(),t._v(" "),(e.row.deptName,n("span",{attrs:{align:"center"}},[t._v(t._s(e.row.yearPlanVal))]))]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"每月计划应收（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.monthPlanVal))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"1-12月应收（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.planVal))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"逐月累计收费金额（万元，不含税）"}},[n("el-table-column",{attrs:{align:"center",label:"1月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month01))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"2月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month02))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"3月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month03))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"4月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month04))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"5月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month05))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"6月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month06))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"7月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month07))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"8月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month08))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"9月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month09))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"10月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month10))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"11月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month11))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"12月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month12))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"合计"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.sumVal))])]}}])})],1),t._v(" "),n("el-table-column",{attrs:{width:"120px",align:"center",label:"合计-总计划（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.sumPlanVal))])]}}])})],1)],1),t._v(" "),n("el-table",{ref:"upTable",staticClass:"inputsun",staticStyle:{width:"100%","max-height":"740px"},attrs:{data:t.tableData2,"show-header":t.showHeader,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"2018综机折旧修理费月报（汇总）---6月份"}},[n("el-table-column",{attrs:{type:"index",width:"50px",align:"center",label:"序号"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"矿别"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.deptName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"年度计划指标（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return["小计"!==e.row.deptName?n("el-input",{attrs:{size:"small"},on:{blur:function(n){t.changeCount(e.row)}},model:{value:e.row.yearPlanVal,callback:function(n){t.$set(e.row,"yearPlanVal",n)},expression:"scope.row.yearPlanVal"}}):t._e(),t._v(" "),(e.row.deptName,n("span",{attrs:{align:"center"}},[t._v(t._s(e.row.yearPlanVal))]))]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"每月计划应收（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.monthPlanVal))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"1-12月应收（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.planVal))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"逐月累计收费金额（万元，不含税）"}},[n("el-table-column",{attrs:{align:"center",label:"1月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month01))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"2月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month02))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"3月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month03))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"4月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month04))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"5月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month05))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"6月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month06))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"7月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month07))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"8月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month08))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"9月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month09))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"10月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month10))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"11月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month11))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"12月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month12))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"合计"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.sumVal))])]}}])})],1),t._v(" "),n("el-table-column",{attrs:{width:"120px",align:"center",label:"合计-总计划（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.sumPlanVal))])]}}])})],1)],1),t._v(" "),n("el-table",{ref:"upTable",staticStyle:{width:"100%","max-height":"740px"},attrs:{data:t.tableData3,"show-header":t.showHeader,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"2018综机折旧修理费月报（汇总）---6月份"}},[n("el-table-column",{attrs:{type:"index",width:"50px",align:"center",label:"序号"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"矿别"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.deptName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"年度计划指标（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.yearPlanVal))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"每月计划应收（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.monthPlanVal))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"1-12月应收（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.planVal))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"逐月累计收费金额（万元，不含税）"}},[n("el-table-column",{attrs:{align:"center",label:"1月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month01))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"2月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month02))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"3月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month03))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"4月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month04))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"5月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month05))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"6月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month06))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"7月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month07))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"8月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month08))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"9月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month09))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"10月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month10))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"11月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month11))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"12月"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.month12))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"合计"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.sumVal))])]}}])})],1),t._v(" "),n("el-table-column",{attrs:{width:"120px",align:"center",label:"合计-总计划（万元）"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.sumPlanVal))])]}}])})],1)],1),t._v(" "),n("el-table",{ref:"downTable",staticStyle:{width:"100%","max-height":"740px","margin-top":"20px"},attrs:{data:t.zhu,"show-header":t.showHeader,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{on:{click:function(e){t.equipmentDialog=!0}}},[t._v(t._s(e.row.remark))])]}}])})],1)],1),t._v(" "),n("el-dialog",{attrs:{visible:t.equipmentDialog,width:"80%",title:"注"},on:{"update:visible":function(e){t.equipmentDialog=e}}},[n("el-form",{staticStyle:{"margin-top":"10px"}},[n("el-form-item",[n("el-input",{attrs:{type:"textarea",maxlength:200},model:{value:t.zhu1,callback:function(e){t.zhu1=e},expression:"zhu1"}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"success"},on:{click:function(e){t.equipmentDialog=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"danger"},on:{click:t.examineUnPass}},[t._v("确定")])],1)],1)],1)},staticRenderFns:[]};var d=n("VU/8")(_,f,!1,function(t){n("6Wt8")},null,null);e.default=d.exports}});