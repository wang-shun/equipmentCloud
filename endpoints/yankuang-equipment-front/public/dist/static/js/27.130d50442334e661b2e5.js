webpackJsonp([27],{"9yuB":function(t,s,a){var e=a("RsiR");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);a("rjj0")("89f69212",e,!0)},JrOB:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("ZjsX"),r={name:"report_ty",directives:{},data:function(){return{authorityCodebutton:[]}},created:function(){var t=sessionStorage.getItem("index");this.buttonlist=Object(e.b)(t),this.authorityCodebutton=this.buttonlist[0]},computed:{},methods:{},filters:{}},i={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"app-container"},t._l(t.authorityCodebutton,function(s){return a("div",{key:s.code},[a("el-col",{attrs:{sm:12,md:8,lg:8}},["综机折旧修理费汇总表"===s.name?a("router-link",{attrs:{to:"/gather"}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{staticStyle:{float:"left"},attrs:{src:"/static/images/icon/chargesTotal.png"}}),t._v(" "),a("span",{staticClass:"reportName"},[t._v(t._s(s.name))])])]):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:12,md:8,lg:8}},["综机折旧修理费报表"===s.name?a("router-link",{attrs:{to:"/repair"}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{staticStyle:{float:"left"},attrs:{src:"/static/images/icon/repairCost.png"}}),t._v(" "),a("span",{staticClass:"reportName"},[t._v(t._s(s.name))])])]):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:12,md:8,lg:8}},["东华重工有限公司综机折旧修理费表"===s.name?a("router-link",{attrs:{to:"/ydhRepair"}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{staticStyle:{float:"left"},attrs:{src:"/static/images/icon/repairCost.png"}}),t._v(" "),a("span",{staticClass:"reportName"},[t._v(t._s(s.name))])])]):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:12,md:8,lg:8}},["综掘面综机设备使用清单"===s.name?a("router-link",{attrs:{to:"/zjmEquipment"}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{staticStyle:{float:"left"},attrs:{src:"/static/images/icon/useList.png"}}),t._v(" "),a("span",{staticClass:"reportName"},[t._v(t._s(s.name))])])]):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:12,md:8,lg:8}},["综机折旧修理费月报（汇总）全年汇总"===s.name?a("router-link",{attrs:{to:"/depreciationYear"}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{staticStyle:{float:"left"},attrs:{src:"/static/images/icon/chargesTotal.png"}}),t._v(" "),a("span",{staticClass:"reportName"},[t._v(t._s(s.name))])])]):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:12,md:8,lg:8}},["综机折旧修理费月报（汇总）月度明细"===s.name?a("router-link",{attrs:{to:"/depreciationMonth"}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{staticStyle:{float:"left"},attrs:{src:"/static/images/icon/chargesDetail.png"}}),t._v(" "),a("span",{staticClass:"reportName"},[t._v(t._s(s.name))])])]):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:12,md:8,lg:8}},["综机折旧修理费月报"===s.name?a("router-link",{attrs:{to:"/monthReport"}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{staticStyle:{float:"left"},attrs:{src:"/static/images/icon/tyMonthReport.png"}}),t._v(" "),a("span",{staticClass:"reportName"},[t._v(t._s(s.name))])])]):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:12,md:8,lg:8}},["设备新度系数调节费清单"===s.name?a("router-link",{attrs:{to:"/newDegree"}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{staticStyle:{float:"left"},attrs:{src:"/static/images/icon/coefficient.png"}}),t._v(" "),a("span",{staticClass:"reportName"},[t._v(t._s(s.name))])])]):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:12,md:8,lg:8}},["设备非正常损失赔偿费表"===s.name?a("router-link",{attrs:{to:"/abnormalLosses"}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{staticStyle:{float:"left"},attrs:{src:"/static/images/icon/loss.png"}}),t._v(" "),a("span",{staticClass:"reportName"},[t._v(t._s(s.name))])])]):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:12,md:8,lg:8}},["综机设备使用交接单"===s.name?a("router-link",{attrs:{to:"/useApply"}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{staticStyle:{float:"left"},attrs:{src:"/static/images/icon/useApply.png"}}),t._v(" "),a("span",{staticClass:"reportName"},[t._v(t._s(s.name))])])]):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:12,md:8,lg:8}},["综机设备停用交接单"===s.name?a("router-link",{attrs:{to:"/retairApply"}},[a("div",{staticClass:"grid-content bg-purple"},[a("img",{staticStyle:{float:"left",margin:"5px"},attrs:{src:"/static/images/icon/retairApply.png"}}),t._v(" "),a("span",{staticClass:"reportName"},[t._v(t._s(s.name))])])]):t._e()],1)],1)}))},staticRenderFns:[]};var n=a("VU/8")(r,i,!1,function(t){a("9yuB")},null,null);s.default=n.exports},RsiR:function(t,s,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.el-col {\r\n  margin-bottom: 0 !important;\n}\n.reportName {\r\n  float: left;    \r\n  margin: 20px 5px;\r\n  cursor: pointer;\n}\n.commonTit {\r\n  border-left: 4px solid rgba(22, 155, 213, 1);\r\n  padding-left: 5px;\r\n  margin: 10px 0 15px 0;\n}\r\n",""])}});