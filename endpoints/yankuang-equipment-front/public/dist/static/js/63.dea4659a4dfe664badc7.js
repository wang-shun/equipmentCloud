webpackJsonp([63],{"4HVm":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("mvHQ"),r=i.n(a),n=i("cAgV"),s=i("504h"),o=i.n(s),l=i("VVDx"),c=i.n(l),u=i("ZjsX"),d=i("7t+N"),y=i.n(d);c()(o.a);var p=o.a.getOptions().exporting.buttons.contextButton.menuItems,f=sessionStorage.getItem("token"),m={directives:{waves:n.a},mounted:function(){var t=(new Date).getFullYear();this.listQuery.year=r()(t),this.getdata()},data:function(){return{id:"test",data1:[],listQuery:{year:null},bar:{chart:{type:"line"},title:{text:"商品煤全水分年度趋势图"},subtitle:{text:""},xAxis:{categories:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},yAxis:{title:{text:"水分%"}},plotOptions:{line:{dataLabels:{enabled:!0},enableMouseTracking:!1},spline:{marker:{radius:4,lineColor:"#666666",lineWidth:1}}},tooltip:{crosshairs:!0,shared:!0},credits:{enabled:!1},navigation:{buttonOptions:{theme:{style:{color:"#fff"},fill:"#e6a23c",states:{hover:{fill:"#ebb563"}}}}},exporting:{buttons:{contextButton:{enabled:!1},exportButton:{text:"导出",menuItems:[p[0],p[1],p[2],p[3],p[4],p[5]]},printButton:{text:"打印",onclick:function(){this.print()}}}},series:[{name:"",data:[]}]}}},methods:{search:function(){this.getdata()},reset:function(){this.listQuery.year=""},exportExcel:function(){y()("#reportDiv").highcharts().exportChart({exportFormat:"PNG"})},getdata:function(){var t=this,e={q_year:t.listQuery.year,q_type:"sf"};Object(u.d)("/v1/spmxstz/listSpmTrendByYear",{token:f,authorityCode:1},e,function(e){if(console.log(e),200===e.data.status){for(var i=e.data.data,a=[],r=[],n=0;n<i.length;n++)a.push(i[n].yVal),r.push(i[n].xVal);t.bar.series[0].name="商品煤全水分",t.bar.series[0].data=a,t.bar.xAxis.categories=r,o.a.chart(t.id,t.bar)}else t.$notify({title:"系统提示",message:e.data.msg,type:"error",duration:3e3})},function(e){t.listLoading=!1,console.log(e),t.$notify({title:"系统提示",message:"系统错误",type:"error",duration:3e3})})},printContent:function(){var t=document.getElementById("reportDiv").innerHTML,e=document.body.innerHTML;document.body.innerHTML=t,window.print(),document.body.innerHTML=e}}},v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",[i("div",{staticStyle:{float:"left"}},[i("el-date-picker",{staticStyle:{width:"250px"},attrs:{type:"year",placeholder:"请选择年度","value-format":"yyyy",format:"yyyy",size:"mini"},model:{value:t.listQuery.year,callback:function(e){t.$set(t.listQuery,"year",e)},expression:"listQuery.year"}})],1),t._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"8px"},attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"8px"},attrs:{icon:"el-icon-refresh",size:"mini"},on:{click:t.reset}},[t._v("重置")]),t._v(" "),i("div",{staticStyle:{float:"right"}})],1),t._v(" "),i("div",{attrs:{id:"reportDiv"}},[i("div",{attrs:{id:t.id,option:t.bar}})])])},staticRenderFns:[]};var h=i("VU/8")(m,v,!1,function(t){i("zTS/")},null,null);e.default=h.exports},yCGV:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.highcharts-credits{\r\n  fill: rgba(0, 0,0,0) !important;\n}\r\n",""])},"zTS/":function(t,e,i){var a=i("yCGV");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("20e14c38",a,!0)}});