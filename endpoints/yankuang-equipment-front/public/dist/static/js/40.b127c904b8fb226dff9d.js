webpackJsonp([40],{"8tXv":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("cAgV"),s=a("ZjsX"),n=a("lbHh"),i=a.n(n),r=a("lDdF"),o=a.n(r),c=a("uXZL"),u=a.n(c),d=i.a.get("token"),f=[{label:"设备管理中心",value:"设备管理中心"},{label:"收费凭证",value:"收费凭证"},{label:"使用单位存根",value:"使用单位存根"}],v={name:"repairCost",directives:{waves:l.a},data:function(){return{listQuery:{date:"",stubUnit:""},tableData:[],stubUnitList:f}},created:function(){this.getList()},methods:{exportExcel:function(){var e=u.a.utils.table_to_book(document.querySelector("#ig")),t=u.a.write(e,{bookType:"xlsx",bookSST:!0,type:"array"});try{o.a.saveAs(new Blob([t],{type:"application/octet-stream"}),"设备使用交接单（收据凭证）.xlsx")}catch(e){console.log(e,t)}return t},getList:function(){var e=this;Object(s.d)("/v1/zjSbUse/findByUseDate",{token:d,authorityCode:1},{jsonString:{useAt:"2018-08-31",stubUnit:"收据凭证",isUse:"1"},page:1,size:5},function(t){200===t.data.status?(e.tableData=t.data.data.list,console.log(e.tableData)):e.$notify.info({title:"系统提示",message:t.data.msg})})},search:function(){},reset:function(){this.listQuery.date="",this.listQuery.stubUnit=""}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{type:"date","value-format":"yyyy-MM-dd",format:"yyyy-MM-dd",placeholder:"选择年"},model:{value:e.listQuery.date,callback:function(t){e.$set(e.listQuery,"date",t)},expression:"listQuery.date"}}),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{filterable:"",clearable:"",placeholder:"存根单位"},model:{value:e.listQuery.stubUnit,callback:function(t){e.$set(e.listQuery,"stubUnit",t)},expression:"listQuery.stubUnit"}},e._l(e.stubUnitList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{size:"small",icon:"el-icon-refresh"},on:{click:e.reset}},[e._v("重置")]),e._v(" "),a("div",{staticClass:"btn_right"},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"warning",icon:"el-icon-upload"},on:{click:e.exportExcel}},[e._v("导出")])],1)],1),e._v(" "),a("div",{attrs:{id:"ig"}},[a("el-table",{ref:"moviesTable",staticStyle:{width:"97%","max-height":"740px",float:"left"},attrs:{data:e.tableData,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"综机设备使用交接单"}},[a("el-table-column",{attrs:{align:"right",label:"2018-08-21"}},[a("el-table-column",{attrs:{type:"index",width:"50px",align:"center",label:"序号"}}),e._v(" "),a("el-table-column",{attrs:{width:"180px",align:"center",label:"使用单位(矿)"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.equipmentEffect))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"工作地点(工作面)"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.departmentName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"设备名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.equName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"设备型号"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.equipmentModel))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"数量"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.equipmentNum))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"技术识别号"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.techCode))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"归属公司"}},[a("el-table-column",{attrs:{align:"center",label:"1180煤业"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("span",{directives:[{name:"show",rawName:"v-show",value:"1180"===e.row.comp,expression:"scope.row.comp === '1180'"}],staticClass:"el-icon-check"})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"1730东华"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("span",{directives:[{name:"show",rawName:"v-show",value:"1730"===e.row.comp,expression:"scope.row.comp === '1730'"}],staticClass:"el-icon-check"})]}}])})],1),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"是否新设备"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("span",{directives:[{name:"show",rawName:"v-show",value:1===e.row.isNew,expression:"scope.row.isNew === 1"}],staticClass:"el-icon-check"})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.remark))])]}}])})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"rightTit"},[e._v(e._s(e.listQuery.stubUnit))]),e._v(" "),e._m(0)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticStyle:{float:"left","font-size":"14px"}},[t("p",[this._v("注：交接日期即设备开始收费日期。签订此表即表示双方认同此收费日期。")])])}]};var b=a("VU/8")(v,p,!1,function(e){a("K9K7")},null,null);t.default=b.exports},"9dmy":function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.btn_right {\r\n    float: right;\n}\n.rightTit {\r\n    width: 15px;\r\n    float: left;\r\n    padding: 5px;\r\n    font-size: 14px;\r\n    color: #666;\n}\r\n",""])},K9K7:function(e,t,a){var l=a("9dmy");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("rjj0")("f3c2996e",l,!0)}});