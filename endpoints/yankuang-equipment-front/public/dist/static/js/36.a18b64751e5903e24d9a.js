webpackJsonp([36],{"/Ata":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.el-table__empty-block{\r\n    min-height: 0;\n}\n.btn_right {\r\n    float: right;\n}\n.el-table--medium td, .el-table--medium th {\r\n    padding: 3px 0 !important;\n}\r\n",""])},"9fsO":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("cAgV"),n=a("lDdF"),i=a.n(n),s=a("uXZL"),r=a.n(s),o=a("ZjsX"),c=sessionStorage.getItem("token"),d=[{code:"套一",name:"套一"},{code:"套二",name:"套二"},{code:"套三",name:"套三"}],u=JSON.parse(sessionStorage.getItem("dwbbList")),g=u.reduce(function(t,e){return t[e.code]=e.name,t},{}),h={directives:{waves:l.a},filters:{},data:function(){return{tbList:d,reportdate:"",name:"",tableHeight:document.body.clientHeight-280,unitLists:u,listQuery:{date:"",istb:"",isdwname:"",datename:"",deptCode:""},temp:{},dataList:[],total:null,currentPage:1,pageSize:15}},created:function(){},methods:{handleSizeChange:function(t){this.search(this.currentPage,t)},handleCurrentChange:function(t){this.search(t,this.pageSize)},getList:function(t,e){var a=this;a.dataList=[];var l={jsonString:{sendUnitsCode:this.listQuery.deptCode,analysisDate:this.listQuery.date,pageNum:t,pageSize:e}};Object(o.d)("/v1/hyinspectreport",{token:c,authorityCode:1},l,function(t){if(console.log(t),200===t.data.status)if(t.data.data){a.total=t.data.data.total;var e=null===t.data.data?null:t.data.data.list;null!==e?a.dataList=e:(a.dataList=[],a.$notify({title:"系统提示",message:"搜索结果为空",type:"info",duration:3e3}))}else a.$notify({title:"系统提示",message:t.data.msg,type:"warning",duration:2e3});else a.$notify({title:"系统提示",message:t.data.msg,type:"warning",duration:2e3})},function(t){console.log(t),a.$notify({title:"系统提示",message:"报表查询失败",type:"warning",duration:2e3})})},search:function(){this.getList(this.currentPage,this.pageSize)},reset:function(){this.listQuery.date="",this.listQuery.deptCode="",this.total=null,this.dataList=[]},exportExcel:function(){var t=r.a.utils.table_to_book(document.querySelector("#reportDiv")),e=r.a.write(t,{bookType:"xlsx",bookSST:!0,type:"array"});try{i.a.saveAs(new Blob([e],{type:"application/octet-stream"}),"煤质分析结果报告表.xlsx")}catch(t){"undefined"!=typeof console&&console.log(t,e)}}},watch:{"listQuery.date":function(t,e){this.listQuery.date?(this.listQuery.datename=this.listQuery.date,this.listQuery.datename=this.listQuery.datename.replace("-","年").replace("-","月")+"日"):this.listQuery.datename=""},"listQuery.deptCode":function(t,e){this.listQuery.isdwname=g[this.listQuery.deptCode],void 0===this.listQuery.isdwname&&(this.listQuery.isdwname="")}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd",size:"mini",format:"yyyy-MM-dd"},model:{value:t.listQuery.date,callback:function(e){t.$set(t.listQuery,"date",e)},expression:"listQuery.date"}}),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{clearable:"",placeholder:"请选择送样单位",size:"mini"},model:{value:t.listQuery.deptCode,callback:function(e){t.$set(t.listQuery,"deptCode",e)},expression:"listQuery.deptCode"}},t._l(t.unitLists,function(t){return a("el-option",{key:t.code,attrs:{label:t.name,value:t.code}})})),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"mini",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{size:"mini",icon:"el-icon-refresh"},on:{click:t.reset}},[t._v("重置")]),t._v(" "),a("div",{staticClass:"btn_right",staticStyle:{float:"right"}},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{size:"mini",type:"warning",icon:"el-icon-upload"},on:{click:t.exportExcel}},[t._v("导出")])],1)],1),t._v(" "),a("div",{staticClass:"content",attrs:{id:"reportDiv"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"媒质化验室检验报告"}},[a("el-table-column",{attrs:{align:"left",label:"送样单位:"+this.listQuery.isdwname}}),t._v(" "),a("el-table-column",{attrs:{align:"right",label:this.listQuery.datename}})],1)],1),t._v(" "),a("el-table",{ref:"moviesTable",staticClass:"tb-edit",staticStyle:{width:"100%","max-height":"740px"},attrs:{data:t.dataList,border:"",fit:"","highlight-current-row":"",height:t.tableHeight}},[a("el-table-column",{attrs:{align:"center",label:"序号",width:"150",type:"index"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"来样名称",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{attrs:{align:"center"}},[t._v(t._s(e.row.sampleName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"来样编号",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{attrs:{align:"center"}},[t._v(t._s(e.row.sampleCode))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"全水Mt(%)",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{attrs:{align:"center"}},[t._v(t._s(e.row.mt))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"分析水Mad(%)",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{attrs:{align:"center"}},[t._v(t._s(e.row.mad))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"灰分Ad(%)",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{attrs:{align:"center"}},[t._v(t._s(e.row.ad))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"全硫St,d(%)",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{attrs:{align:"center"}},[t._v(t._s(e.row.std))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"粘结指数GR.I",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{attrs:{align:"center"}},[t._v(t._s(e.row.gri))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"发热量",width:"100"}},[a("el-table-column",{attrs:{align:"center",label:"Qgr,d(MJ/Kg)",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{attrs:{align:"center"}},[t._v(t._s(e.row.qgrd))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"Qnet,ar(cal/g)",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{attrs:{align:"center"}},[t._v(t._s(e.row.qnetar))])]}}])})],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"right",label:"批准:"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"审核人:"}}),t._v(" "),a("el-table-column",{attrs:{align:"left",label:"制表人："}})],1)],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[15,30,45,60,75,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},staticRenderFns:[]};var f=a("VU/8")(h,p,!1,function(t){a("Hxb4")},null,null);e.default=f.exports},Hxb4:function(t,e,a){var l=a("/Ata");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("rjj0")("c390fcf8",l,!0)}});