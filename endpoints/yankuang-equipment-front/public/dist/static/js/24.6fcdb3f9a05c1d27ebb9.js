webpackJsonp([24],{"/hgt":function(t,e,l){var a=l("oJai");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);l("rjj0")("d3801b18",a,!0)},"3Yyx":function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l("cAgV"),n=l("lDdF"),s=l.n(n),i=l("uXZL"),r=l.n(i),o=l("ZjsX"),c=sessionStorage.getItem("token"),u=[{code:"套一",name:"套一"},{code:"套二",name:"套二"},{code:"套三",name:"套三"}],d=JSON.parse(sessionStorage.getItem("dwbbList")),f=d.reduce(function(t,e){return t[e.code]=e.name,t},{}),b={directives:{waves:a.a},filters:{},data:function(){return{tbList:u,reportdate:"",name:"",tableHeight:document.body.clientHeight-245,unitLists:d,listQuery:{date:"",istb:"",isdwname:"",datename:"",deptCode:""},isloading:!1,temp:{},dataList:[]}},created:function(){},methods:{search:function(){var t=this;t.isloading=!0,t.dataList=[];var e={jsonString:{reportDateString:this.listQuery.date,deptCode:this.listQuery.deptCode,setOff:this.listQuery.istb}};Object(o.d)("/v1/spm/findTotalKind",{token:c,authorityCode:1},e,function(e){if(console.log(e),200===e.data.status){t.isloading=!1;var l=e.data.data;t.dataList=l}else t.isloading=!1,t.$notify({title:"系统提示",message:e.data.msg,type:"warning",duration:2e3})},function(e){t.isloading=!1,console.log(e),t.$notify({title:"系统提示",message:"报表查询失败",type:"warning",duration:2e3})})},reset:function(){this.listQuery.date="",this.listQuery.istb="",this.listQuery.isdwname="",this.listQuery.datename="",this.dataList=[]},exportExcel:function(){var t=r.a.utils.table_to_book(document.querySelector("#reportDiv")),e=r.a.write(t,{bookType:"xlsx",bookSST:!0,type:"array"});try{s.a.saveAs(new Blob([e],{type:"application/octet-stream"}),"商品煤累计分品种报表.xlsx")}catch(t){"undefined"!=typeof console&&console.log(t,e)}}},watch:{"listQuery.date":function(t,e){this.listQuery.date?(this.listQuery.datename=this.listQuery.date,this.listQuery.datename=this.listQuery.datename.replace("-","年").replace("-","月")+"日"):this.listQuery.datename=""},"listQuery.deptCode":function(t,e){this.listQuery.isdwname=f[this.listQuery.deptCode],void 0===this.listQuery.isdwname&&(this.listQuery.isdwname="")}}},g={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"app-container"},[l("div",{staticClass:"filter-container"},[l("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd",size:"mini",format:"yyyy-MM-dd"},model:{value:t.listQuery.date,callback:function(e){t.$set(t.listQuery,"date",e)},expression:"listQuery.date"}}),t._v(" "),l("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{clearable:"",placeholder:"选择套别",size:"mini"},model:{value:t.listQuery.istb,callback:function(e){t.$set(t.listQuery,"istb",e)},expression:"listQuery.istb"}},t._l(t.tbList,function(t){return l("el-option",{key:t.code,attrs:{label:t.name,value:t.code}})})),t._v(" "),l("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{clearable:"",placeholder:"请选择单位",size:"mini"},model:{value:t.listQuery.deptCode,callback:function(e){t.$set(t.listQuery,"deptCode",e)},expression:"listQuery.deptCode"}},t._l(t.unitLists,function(t){return l("el-option",{key:t.code,attrs:{label:t.name,value:t.code}})})),t._v(" "),l("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"mini",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),l("el-button",{staticClass:"filter-item",attrs:{size:"mini",icon:"el-icon-refresh"},on:{click:t.reset}},[t._v("重置")]),t._v(" "),l("div",{staticClass:"btn_right",staticStyle:{float:"right"}},[l("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{size:"mini",type:"warning",icon:"el-icon-upload"},on:{click:t.exportExcel}},[t._v("导出")])],1)],1),t._v(" "),l("div",{staticClass:"content",attrs:{id:"reportDiv"}},[l("el-table",{staticStyle:{width:"100%"},attrs:{border:"",fit:"","highlight-current-row":""}},[l("el-table-column",{attrs:{align:"center",label:"商品煤质量"}},[l("el-table-column",{attrs:{align:"left",label:"单位："+this.listQuery.isdwname}}),t._v(" "),l("el-table-column",{attrs:{align:"right",label:this.listQuery.datename}})],1)],1),t._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isloading,expression:"isloading"}],ref:"moviesTable",staticClass:"tb-edit",staticStyle:{width:"100%","max-height":"740px"},attrs:{data:t.dataList,border:"",fit:"","highlight-current-row":"",height:t.tableHeight}},[l("el-table-column",{attrs:{align:"center",label:"",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.name))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"原煤"}},[l("el-table-column",{attrs:{align:"center",label:"灰分"}},[l("el-table-column",{attrs:{align:"center",label:"实际(%)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.hf))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"灰分量(t)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.hfl))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"原煤产量(t)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.rxl))])]}}])})],1),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"含矸率"}},[l("el-table-column",{attrs:{align:"center",label:"实际(%)"},scopedSlots:t._u([{key:"default",fn:function(t){return[l("span",{attrs:{align:"center"}})]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"矸石量(t)"},scopedSlots:t._u([{key:"default",fn:function(t){return[l("span",{attrs:{align:"center"}})]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"计矸产量(t)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.jgcl))])]}}])})],1)],1),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"商品煤"}},[l("el-table-column",{attrs:{align:"center",label:"实际销售量(t)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.sellThrough))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"灰分"}},[l("el-table-column",{attrs:{align:"center",label:"计划(%)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.ashPlan))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"实际(%)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.ashPractice))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"灰分量(t)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.ashCount))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"计算灰分的销售量(t)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.ashSales))])]}}])})],1),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"全水分"}},[l("el-table-column",{attrs:{align:"center",label:"水分(%)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.dew))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"水分量(%)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.dewCount))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"计算水分的销售量(t)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.calculateSales))])]}}])})],1)],1),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"应用基低位发热量（MJ/kg）"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.calorificValue))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"硫分St,d(%)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.sulfurContent))])]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"块煤限下率(%)"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{attrs:{align:"center"}},[t._v(t._s(e.row.lumpCoal))])]}}])})],1),t._v(" "),l("el-table",{staticStyle:{width:"100%"},attrs:{border:"",fit:"","highlight-current-row":"",data:t.dataList}},[l("el-table-column",{attrs:{align:"left",label:"单位负责人:"}}),t._v(" "),l("el-table-column",{attrs:{align:"left",label:"审核人:"}}),t._v(" "),l("el-table-column",{attrs:{align:"left",label:"制表人："}}),t._v(" "),l("el-table-column",{attrs:{align:"left",label:"报出日期:"}})],1)],1)])},staticRenderFns:[]};var p=l("VU/8")(b,g,!1,function(t){l("/hgt")},null,null);e.default=p.exports},oJai:function(t,e,l){(t.exports=l("FZ+f")(!1)).push([t.i,"\n.el-table__empty-block{\r\n    min-height: 0;\n}\n.btn_right {\r\n    float: right;\n}\n.el-table--medium td, .el-table--medium th {\r\n    padding: 3px 0 !important;\n}\r\n",""])}});