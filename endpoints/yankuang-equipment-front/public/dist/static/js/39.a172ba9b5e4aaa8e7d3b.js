webpackJsonp([39],{"9ZC/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("mvHQ"),n=a.n(r),i=a("cAgV"),s=a("504h"),o=a.n(s),l=a("VVDx"),c=a.n(l),u=a("ZjsX"),d=a("7t+N"),p=a.n(d);c()(o.a);var y=o.a.getOptions().exporting.buttons.contextButton.menuItems,f=sessionStorage.getItem("token");o.a.setOptions({lang:{contextButtonTitle:"图表导出菜单",downloadJPEG:"导出 JPEG 图片",downloadPDF:"导出 PDF 文件",downloadPNG:"导出 PNG 文件",downloadSVG:"导出 SVG 文件",printChart:"导出图表"}});var v={directives:{waves:i.a},mounted:function(){var t=new Date;this.currentYear=t.getFullYear(),this.listQuery.year=n()(this.currentYear),this.getdata()},data:function(){return{id:"test",data1:[],currentYear:null,listQuery:{year:null},bar:{chart:{type:"column"},title:{text:" 商品煤累计销售量分单位对比柱状图"},xAxis:{categories:[],title:{text:"矿别"}},yAxis:{min:0,title:{text:"商品煤销售量",align:"high"},labels:{overflow:"justify"}},tooltip:{valueSuffix:"吨"},plotOptions:{bar:{dataLabels:{enabled:!0,allowOverlap:!0}}},navigation:{buttonOptions:{theme:{style:{color:"#fff"},fill:"#e6a23c",states:{hover:{fill:"#ebb563"}}}}},series:[{name:"商品煤",data:[107,31,635,203,2]}],exporting:{buttons:{contextButton:{enabled:!1},exportButton:{text:"导出",menuItems:[y[0],y[1],y[2],y[3],y[4],y[5]]},printButton:{text:"打印",onclick:function(){this.print()}}}}}}},methods:{search:function(){this.getdata()},reset:function(){this.listQuery.year=""},exportExcel:function(){p()("#reportDiv").highcharts().exportChart({exportFormat:"PNG"})},getdata:function(){var t=this,e=o.a,a={q_year:t.listQuery.year||t.currentYear,q_type:"hf"};Object(u.d)("/v1/spmxstz/listSpmDeptXslTrendByYear",{token:f,authorityCode:1},a,function(a){if(200===a.data.status){var r=a.data.data,n=[],i=[];0!==r.length&&r.forEach(function(t){n.push(t.xVal),i.push(t.yVal)}),t.bar.series[0].data=i,t.bar.xAxis.categories=n,t.bar.exporting.filename=(t.listQuery.year||t.currentYear)+" 商品煤分品种销售量对比饼状图",e.chart("bar",t.bar)}else t.$notify({title:"系统提示",message:a.data.msg,type:"error",duration:3e3})},function(e){t.listLoading=!1,console.log(e),t.$notify({title:"系统提示",message:"系统错误",type:"error",duration:3e3})})}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",[a("div",{staticStyle:{float:"left"}},[a("el-date-picker",{staticStyle:{width:"250px"},attrs:{type:"year",placeholder:"请选择年度","value-format":"yyyy",format:"yyyy",size:"mini"},model:{value:t.listQuery.year,callback:function(e){t.$set(t.listQuery,"year",e)},expression:"listQuery.year"}})],1),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"8px"},attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"8px"},attrs:{icon:"el-icon-refresh",size:"mini"},on:{click:t.reset}},[t._v("重置")]),t._v(" "),a("div",{staticStyle:{float:"right"}})],1),t._v(" "),a("el-row",{attrs:{id:"reportDiv"}},[a("el-col",{attrs:{span:24}},[a("h1",{staticClass:"coal-header"},[t._v("商品煤质量")])]),t._v(" "),a("el-col",{attrs:{span:24}},[a("div",[a("div",{attrs:{id:"bar",option:t.bar}})])])],1)],1)},staticRenderFns:[]};var m=a("VU/8")(v,h,!1,function(t){a("TujE")},null,null);e.default=m.exports},TujE:function(t,e,a){var r=a("daLQ");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("2e470e66",r,!0)},daLQ:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.highcharts-credits{\r\n  fill: rgba(0, 0,0,0) !important;\n}\n.coal-header{\r\n  padding: 1rem 0;\r\n  text-align: center;\r\n  letter-spacing: 1.5rem;\r\n  color: rgba(0, 0,0,0.65)\n}\n.color-b{\r\n  padding: 10px 3rem;\r\n  color: rgba(0, 0,0,0.65)\n}\n.sds{\r\n  color: #a4edba\n}\r\n",""])}});