webpackJsonp([77],{"3AFL":function(e,t,a){var l=a("EUKF");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("rjj0")("16c3634c",l,!0)},EUKF:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.el-table__empty-block{\r\n    min-height: 0;\n}\n.btn_right {\r\n    float: right;\n}\n.el-table--medium td, .el-table--medium th {\r\n    padding: 3px 0 !important;\n}\r\n",""])},wAFK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("mvHQ"),n=a.n(l),s=a("cAgV"),i=a("lDdF"),r=a.n(i),o=a("uXZL"),c=a.n(o),d=a("ZjsX"),u=sessionStorage.getItem("token"),p=sessionStorage.getItem("id"),f=[{code:"套一",name:"套一"},{code:"套二",name:"套二"},{code:"套三",name:"套三"}],h=JSON.parse(sessionStorage.getItem("dwbbList")),_=h.reduce(function(e,t){return e[t.code]=t.name,e},{}),m={directives:{waves:s.a},filters:{},data:function(){return{tbList:f,reportdate:"",name:"",tableHeight:document.body.clientHeight-245,unitLists:h,listQuery:{date:"",istb:"",isdwname:"",datename:"",deptCode:""},temp:{},dataList:[],col:["煤样编号|mybh","单位|dw","品种|pz","批号|ph","Mt","Mad","Ad","Vd","Vdaf","焦渣特性|crc","St,d|std","Had","Qgr,ad|qgrad","Qgr,d(MJ/kg)|mj","Qnet,ar(cal/g)|cal"],checkboxGroup:[],selectedCol:{},elBtnType:"primary",elBtnContent:"自定义表头"}},created:function(){var e=localStorage.getItem("analysis"+p)?localStorage.getItem("analysis"+p):"[]";this.checkboxGroup=JSON.parse(e),this.hideCol()},methods:{search:function(){var e=this;e.dataList=[];var t={jsonString:{departmentCode:this.listQuery.deptCode,analysisDate:this.listQuery.date}};Object(d.d)("/v1/spmhyanalyse",{token:u,authorityCode:1},t,function(t){if(200===t.data.status){var a=null===t.data.data?null:t.data.data.list;null!==a?e.dataList=a:(e.dataList=[],e.$notify({title:"系统提示",message:"搜索结果为空",type:"info",duration:3e3}))}else e.$notify({title:"系统提示",message:t.data.msg,type:"warning",duration:2e3})},function(t){console.log(t),e.$notify({title:"系统提示",message:"报表查询失败",type:"warning",duration:2e3})})},reset:function(){this.listQuery.date="",this.listQuery.deptCode="",this.dataList=[]},hideCol:function(){var e=this;this.selectedCol={},this.checkboxGroup.forEach(function(t){var a=t.indexOf("|")>0?t.split("|")[1]:t;e.selectedCol[a]=!0})},changeType:function(){this.elBtnType="success",this.elBtnContent="保存设置"},saveSettings:function(){this.elBtnType="primary",this.elBtnContent="自定义表头",localStorage.setItem("analysis"+p,n()(this.checkboxGroup))},exportExcel:function(){var e=c.a.utils.table_to_book(document.querySelector("#reportDiv")),t=c.a.write(e,{bookType:"xlsx",bookSST:!0,type:"array"});try{r.a.saveAs(new Blob([t],{type:"application/octet-stream"}),"煤质分析结果报告表.xlsx")}catch(e){"undefined"!=typeof console&&console.log(e,t)}}},watch:{"listQuery.date":function(e,t){this.listQuery.date?(this.listQuery.datename=this.listQuery.date,this.listQuery.datename=this.listQuery.datename.replace("-","年").replace("-","月")+"日"):this.listQuery.datename=""},"listQuery.deptCode":function(e,t){this.listQuery.isdwname=_[this.listQuery.deptCode],void 0===this.listQuery.isdwname&&(this.listQuery.isdwname="")}}},y={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd",size:"mini",format:"yyyy-MM-dd"},model:{value:e.listQuery.date,callback:function(t){e.$set(e.listQuery,"date",t)},expression:"listQuery.date"}}),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{clearable:"",placeholder:"请选择单位",size:"mini"},model:{value:e.listQuery.deptCode,callback:function(t){e.$set(e.listQuery,"deptCode",t)},expression:"listQuery.deptCode"}},e._l(e.unitLists,function(e){return a("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})})),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"mini",icon:"el-icon-search"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{size:"mini",icon:"el-icon-refresh"},on:{click:e.reset}},[e._v("重置")]),e._v(" "),a("el-popover",{staticClass:"filter-item",attrs:{placement:"bottom",trigger:"click"},on:{"after-enter":e.changeType,"after-leave":e.saveSettings}},[a("el-checkbox-group",{staticStyle:{padding:"10px"},attrs:{size:"mini"},on:{change:e.hideCol},model:{value:e.checkboxGroup,callback:function(t){e.checkboxGroup=t},expression:"checkboxGroup"}},e._l(e.col,function(t){return a("el-checkbox-button",{key:t,attrs:{label:t}},[e._v(e._s(t.indexOf("|")>0?t.split("|")[0]:t))])})),e._v(" "),a("el-button",{staticStyle:{"margin-left":"8px","min-width":"92px"},attrs:{slot:"reference",type:e.elBtnType,size:"mini"},slot:"reference"},[e._v(e._s(e.elBtnContent))])],1),e._v(" "),a("div",{staticClass:"btn_right",staticStyle:{float:"right"}},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{size:"mini",type:"warning",icon:"el-icon-upload"},on:{click:e.exportExcel}},[e._v("导出")])],1)],1),e._v(" "),a("div",{staticClass:"content",attrs:{id:"reportDiv"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"煤质分析结果报告表"}},[a("el-table-column",{attrs:{align:"right",label:"报出日期："+this.listQuery.datename}})],1)],1),e._v(" "),a("el-table",{ref:"moviesTable",staticClass:"tb-edit",staticStyle:{width:"100%","max-height":"740px"},attrs:{data:e.dataList,border:"",fit:"","highlight-current-row":"",height:e.tableHeight}},[e.selectedCol.mybh?e._e():a("el-table-column",{attrs:{align:"center",label:"煤样编号",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.sampleCode))])]}}])}),e._v(" "),e.selectedCol.dw?e._e():a("el-table-column",{attrs:{align:"center",label:"单位",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.departmentName))])]}}])}),e._v(" "),e.selectedCol.pz?e._e():a("el-table-column",{attrs:{align:"center",label:"品种",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.spmName))])]}}])}),e._v(" "),e.selectedCol.ph?e._e():a("el-table-column",{attrs:{align:"center",label:"批号",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.batchCode))])]}}])}),e._v(" "),e.selectedCol.Mt?e._e():a("el-table-column",{attrs:{align:"center",label:"Mt%",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.mt))])]}}])}),e._v(" "),e.selectedCol.Mad?e._e():a("el-table-column",{attrs:{align:"center",label:"Mad%",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.mad))])]}}])}),e._v(" "),e.selectedCol.Ad?e._e():a("el-table-column",{attrs:{align:"center",label:"Ad%",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.ad))])]}}])}),e._v(" "),e.selectedCol.Vd?e._e():a("el-table-column",{attrs:{align:"center",label:"Vd%",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.vd))])]}}])}),e._v(" "),e.selectedCol.Vdaf?e._e():a("el-table-column",{attrs:{align:"center",label:"Vdaf%",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.vdaf))])]}}])}),e._v(" "),e.selectedCol.crc?e._e():a("el-table-column",{attrs:{align:"center",label:"焦渣特性1-8",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.deptName))])]}}])}),e._v(" "),e.selectedCol.std?e._e():a("el-table-column",{attrs:{align:"center",label:"St,d%",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.std))])]}}])}),e._v(" "),e.selectedCol.Had?e._e():a("el-table-column",{attrs:{align:"center",label:"Had%",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.had))])]}}])}),e._v(" "),e.selectedCol.qgrad?e._e():a("el-table-column",{attrs:{align:"center",label:"Qgr,ad",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.qgrad))])]}}])}),e._v(" "),e.selectedCol.mj?e._e():a("el-table-column",{attrs:{align:"center",label:"Qgr,d MJ/kg",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.qgrd))])]}}])}),e._v(" "),e.selectedCol.cal?e._e():a("el-table-column",{attrs:{align:"center",label:"Qnetar cal/g",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{align:"center"}},[e._v(e._s(t.row.qnetar))])]}}])})],1)],1)])},staticRenderFns:[]};var g=a("VU/8")(m,y,!1,function(e){a("3AFL")},null,null);t.default=g.exports}});