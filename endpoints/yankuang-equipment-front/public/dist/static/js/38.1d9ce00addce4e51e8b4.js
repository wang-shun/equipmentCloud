webpackJsonp([38],{"1BQD":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=[{value:"1",label:"101-南矿"},{value:"2",label:"102-南矿"},{value:"3",label:"103-南矿"}],n={directives:{waves:l("cAgV").a},data:function(){return{tableHeight:document.body.clientHeight-205,proposeComList:a,listLoading:!1,currentPage:1,pageSize:15,total:1,dates:"",listQuery:{proposeCom:""},examineFrom:!1,edit:!1,examines:!1,equipmentDialog:!1,eleList:[],dialogStatus_eq:"",textMap_eq:{create:"编辑",update:"审核"},eqColumn:{}}},methods:{addData:function(){this.equipmentDialog=!0,this.examineList=this.selectlistRow,this.examines=!0,this.edit=!1},updateEq:function(){},delData:function(){this.selectlistRow&&0!==this.selectlistRow.length&&1===this.selectlistRow.length?"1"===this.selectlistRow[0].planStatus?this.$confirm("确认删除该条数据吗？删除后不可恢复！","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){}):this.$notify.info({title:"系统提示",message:"该条数据已经进行审核，不允许删除！",type:"warning",duration:3e3}):this.$notify.info({title:"系统提示",message:"请选择一条数据进行删除！",type:"warning",duration:3e3})},examine:function(){this.selectlistRow&&0!==this.selectlistRow.length&&1===this.selectlistRow.length?"1"===this.selectlistRow[0].planStatus?(this.equipmentDialog=!0,this.examineList=this.selectlistRow,this.edit=!0,this.examines=!1):this.$notify.info({title:"系统提示",message:"该条数据已经进行审核，不允许再审核！",type:"warning",duration:3e3}):this.$notify.info({title:"系统提示",message:"请选择一条数据进行审核！",type:"warning",duration:3e3})},examinePass:function(){},examineUnPass:function(){},Report:function(){this.selectlistRow&&0!==this.selectlistRow.length&&1===this.selectlistRow.length?"3"===this.selectlistRow[0].planStatus?this.$confirm("确认上报该条数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){}):"1"===this.selectlistRow[0].planStatus?this.$notify.info({title:"系统提示",message:"该条数据还未审核！",type:"warning",duration:3e3}):"2"===this.selectlistRow[0].planStatus?this.$notify.info({title:"系统提示",message:"该条数据审核未通过！",type:"warning",duration:3e3}):this.$notify.info({title:"系统提示",message:"该条数据已经上报！",type:"warning",duration:3e3}):this.$notify.info({title:"系统提示",message:"请选择一条数据进行上报！",type:"warning",duration:3e3})},search:function(){},reset:function(){},selectRow:function(e){this.selectlistRow=e},handleSizeChange:function(e){},handleCurrentChange:function(e){}}},i={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"app-container"},[l("div",{staticClass:"filter-container"},[l("div",{},[l("div",{staticStyle:{float:"left"}},[l("el-select",{staticClass:"filter-item",attrs:{placeholder:"提出单位",label:"提出单位",size:"mini"},model:{value:e.listQuery.proposeCom,callback:function(t){e.$set(e.listQuery,"proposeCom",t)},expression:"listQuery.proposeCom"}},e._l(e.proposeComList,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),l("el-date-picker",{staticStyle:{width:"200px"},attrs:{type:"date","value-format":"yyyy-MM-dd",format:"yyyy-MM-dd",placeholder:"选择日期",size:"mini"},model:{value:e.dates,callback:function(t){e.dates=t},expression:"dates"}}),e._v(" "),l("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",size:"mini",icon:"el-icon-search"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),l("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{size:"mini",icon:"el-icon-refresh"},on:{click:e.reset}},[e._v("重置")])],1),e._v(" "),l("div",{staticStyle:{float:"right"}},[l("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(t){t.preventDefault(),e.addData(t)}}},[e._v("编辑")]),e._v(" "),l("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-question"},on:{click:e.examine}},[e._v("审核")]),e._v(" "),l("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-circle-check"},on:{click:e.Report}},[e._v("上报")]),e._v(" "),l("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:e.delData}},[e._v("删除")])],1)])]),e._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"moviesTable",staticStyle:{width:"100%"},attrs:{data:e.eleList,stripe:"",border:"",fit:"","highlight-current-row":"",height:e.tableHeight},on:{"selection-change":e.selectRow}},[l("el-table-column",{attrs:{type:"selection",width:"35"}}),e._v(" "),l("el-table-column",{attrs:{width:"50",align:"center",label:"序号"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticClass:"link-type",on:{click:function(l){e.handleInfo(t.row)}}},[e._v(e._s(t.row.planYear))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"100",align:"center",label:"矿别"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{directives:[{name:"show",rawName:"v-show",value:e.show=!0,expression:"show = true"}]},[e._v(e._s(t.row.planPosition))]),e._v(" "),l("span",[e._v(e._s(t.row.planPositionName))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"100",align:"center",label:"编号"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.planCreatorName))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"100",align:"center",label:"品种"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.planStatus))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"100",align:"center",label:"矿数量"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.planOpinion))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"100",align:"center",label:"电厂数量"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"240",align:"center",label:"Mt全水分（%）"}},[l("el-table-column",{attrs:{width:"80",align:"center",label:"电厂"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"80",align:"center",label:"矿报"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"80",align:"center",label:"分样"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])})],1),e._v(" "),l("el-table-column",{attrs:{width:"240",align:"center",label:"Qnet，ar（kcal/kg）"}},[l("el-table-column",{attrs:{width:"80",align:"center",label:"电厂"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"80",align:"center",label:"矿报"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"80",align:"center",label:"分样"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])})],1),e._v(" "),l("el-table-column",{attrs:{width:"240",align:"center",label:"St，d（%）"}},[l("el-table-column",{attrs:{width:"80",align:"center",label:"电厂"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"80",align:"center",label:"矿报"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"80",align:"center",label:"分样"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])})],1),e._v(" "),l("el-table-column",{attrs:{width:"100",align:"center",label:"超差处理"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"100",align:"center",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.updateTimeStr))])]}}])})],1),e._v(" "),l("div",{staticClass:"block"},[l("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-sizes":[15,30,45,60,75,100],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),l("el-dialog",{staticStyle:{"margin-top":"-3% !important"},attrs:{width:"80%",title:e.textMap_eq[e.dialogStatus_eq],visible:e.equipmentDialog,"append-to-body":""},on:{"update:visible":function(t){e.equipmentDialog=t}}},[l("el-form",{ref:"dataForm",staticClass:"form",staticStyle:{"max-height":"550px",overflow:"auto"},attrs:{rules:e.rules,"status-icon":"",model:e.temp,"label-position":"right","label-width":"130px",disabled:e.edit}},[l("el-form-item",{staticClass:"el-col el-col-12",attrs:{label:"品种"}},[l("el-select",{staticClass:"filter-item",attrs:{placeholder:"提出单位",label:"提出单位"},model:{value:e.listQuery.proposeCom,callback:function(t){e.$set(e.listQuery,"proposeCom",t)},expression:"listQuery.proposeCom"}},e._l(e.proposeComList,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-form-item",{staticClass:"el-col el-col-10",attrs:{label:"矿数量"}},[l("el-input",{staticStyle:{width:"250px"},attrs:{maxlength:8},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}})],1),e._v(" "),l("el-form-item",{staticClass:"el-col el-col-12",staticStyle:{"margin-top":"35px"},attrs:{label:"电厂数量"}},[l("el-input",{staticStyle:{width:"250px"},attrs:{maxlength:8},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}})],1),e._v(" "),l("el-form-item",{staticClass:"el-col el-col-12",attrs:{label:"Qnet，ar（kcal/kg）"}},[l("el-input",{staticStyle:{width:"250px","margin-top":"5px"},attrs:{placeholder:"电厂",maxlength:8},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}}),e._v(" "),l("el-input",{staticStyle:{width:"250px","margin-top":"5px"},attrs:{placeholder:"矿报",maxlength:8},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}}),e._v(" "),l("el-input",{staticStyle:{width:"250px","margin-top":"5px"},attrs:{placeholder:"分样",maxlength:8},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}})],1),e._v(" "),l("el-form-item",{staticClass:"el-col el-col-12",attrs:{label:"Qnet，ar（kcal/kg）"}},[l("el-input",{staticStyle:{width:"250px","margin-top":"5px"},attrs:{placeholder:"电厂",maxlength:8},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}}),e._v(" "),l("el-input",{staticStyle:{width:"250px","margin-top":"5px"},attrs:{placeholder:"矿报",maxlength:8},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}}),e._v(" "),l("el-input",{staticStyle:{width:"250px","margin-top":"5px"},attrs:{placeholder:"分样",maxlength:8},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}})],1),e._v(" "),l("el-form-item",{staticClass:"el-col el-col-12",attrs:{label:"St，d（%）"}},[l("el-input",{staticStyle:{width:"250px","margin-top":"5px"},attrs:{placeholder:"电厂",maxlength:8},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}}),e._v(" "),l("el-input",{staticStyle:{width:"250px","margin-top":"5px"},attrs:{placeholder:"矿报",maxlength:8},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}}),e._v(" "),l("el-input",{staticStyle:{width:"250px","margin-top":"5px"},attrs:{placeholder:"分样",maxlength:8},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}})],1),e._v(" "),l("el-form-item",{staticClass:"el-col el-col-21",attrs:{label:"备注"}},[l("el-input",{attrs:{type:"textarea"},model:{value:e.eqColumn.equipmentNum,callback:function(t){e.$set(e.eqColumn,"equipmentNum",t)},expression:"eqColumn.equipmentNum"}})],1),e._v(" "),l("div",{staticStyle:{clear:"both"}})],1),e._v(" "),l("el-form",[e.edit?l("el-form-item",{attrs:{label:"审核意见"}},[l("el-input",{attrs:{type:"textarea"},model:{value:e.listQuery.remark,callback:function(t){e.$set(e.listQuery,"remark",t)},expression:"listQuery.remark"}})],1):e._e()],1),e._v(" "),l("div",{staticStyle:{clear:"both"}}),e._v(" "),e.edit?l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"success"},on:{click:e.examinePass}},[e._v("通过")]),e._v(" "),l("el-button",{attrs:{type:"danger"},on:{click:e.examineUnPass}},[e._v("不通过")])],1):e._e(),e._v(" "),e.examines?l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.updateEq}},[e._v("确定")])],1):e._e(),e._v(" "),l("div",{staticStyle:{clear:"both"}})],1)],1)},staticRenderFns:[]};var s=l("VU/8")(n,i,!1,function(e){l("AwXf")},null,null);t.default=s.exports},AwXf:function(e,t,l){var a=l("IJfc");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);l("rjj0")("5ee48931",a,!0)},IJfc:function(e,t,l){(e.exports=l("FZ+f")(!1)).push([e.i,"\n.elecbtn {\r\n  float: right;\r\n  margin-right: 20px;\n}\n.electricCoal .el-dialog__body {\r\n  padding-left: 50px;\n}\r\n",""])}});