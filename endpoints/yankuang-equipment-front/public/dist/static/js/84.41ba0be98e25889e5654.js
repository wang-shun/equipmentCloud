webpackJsonp([84],{D4Lx:function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,"\n.highcharts-credits{\r\n  fill: rgba(0, 0,0,0) !important;\n}\n.coal-header{\r\n  padding: 1rem 0;\r\n  text-align: center;\r\n  letter-spacing: 1.5rem;\r\n  color: rgba(0, 0,0,0.65)\n}\n.color-b{\r\n  padding: 10px 3rem;\r\n  color: rgba(0, 0,0,0.65)\n}\r\n",""])},RqYN:function(t,e,r){var a=r("D4Lx");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r("rjj0")("0fa05671",a,!0)},UeaD:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("mvHQ"),i=r.n(a),n=r("cAgV"),o=r("504h"),s=r.n(o),l=r("VVDx"),c=r.n(l),p=r("ZjsX"),u=r("7t+N"),d=r.n(u);c()(s.a);var y=s.a.getOptions().exporting.buttons.contextButton.menuItems,f=sessionStorage.getItem("token"),v={directives:{waves:n.a},mounted:function(){var t=new Date;this.currentYear=t.getFullYear(),this.listQuery.year=i()(this.currentYear),this.getdata()},data:function(){return{id:"test",data1:[],currentYear:null,listQuery:{year:null},pie:{chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,type:"pie"},title:{text:""},tooltip:{pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b>"},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,format:"<b>{point.name}</b>: {point.percentage:.1f} %"},showInLegend:!0}},navigation:{buttonOptions:{theme:{style:{color:"#fff"},fill:"#e6a23c",states:{hover:{fill:"#ebb563"}}}}},series:[{}],exporting:{buttons:{contextButton:{enabled:!1},exportButton:{text:"导出",menuItems:[y[0],y[1],y[2],y[3],y[4],y[5]]},printButton:{text:"打印",onclick:function(){this.print()}}}}},bar:{chart:{type:"column"},title:{text:""},xAxis:{categories:[],title:{text:"商品煤品种"},labels:{rotation:-45}},yAxis:{min:0,title:{text:"销量",align:"high"},labels:{overflow:"justify"}},tooltip:{valueSuffix:"吨"},legend:{enabled:!1},plotOptions:{bar:{dataLabels:{enabled:!0,allowOverlap:!0}}},navigation:{buttonOptions:{theme:{style:{color:"#fff"},fill:"#e6a23c",states:{hover:{fill:"#ebb563"}}}}},series:[{name:"商品煤",data:[107,31,635,203,2]}],exporting:{buttons:{contextButton:{enabled:!1},exportButton:{text:"导出",menuItems:[y[0],y[1],y[2],y[3],y[4],y[5]]},printButton:{text:"打印",onclick:function(){this.print()}}}}}}},methods:{search:function(){this.getdata()},reset:function(){this.listQuery.year=""},exportExcel:function(){d()("#reportDiv").highcharts().exportChart({exportFormat:"PNG"})},getdata:function(){var t=this,e=s.a,r={q_year:t.listQuery.year||t.currentYear};Object(p.d)("/v1/spmxstz/listSpmLxXslTrendByYear",{token:f,authorityCode:1},r,function(r){if(200===r.data.status){var a=r.data.data,i=[],n=[],o=[];0!==a.length&&a.forEach(function(t){var e={};e.name=t.xVal,e.y=t.yVal,i.push(e),n.push(t.xVal),o.push(t.yVal)}),t.pie.series[0].name="商品煤",t.pie.series[0].colorByPoint=!0,t.pie.series[0].data=i,t.pie.title.text=(t.listQuery.year||t.currentYear)+" 商品煤分流向销售量占比饼分图",t.pie.exporting.filename=(t.listQuery.year||t.currentYear)+" 商品煤分流向销售量占比饼分图",t.bar.series[0].data=o,t.bar.xAxis.categories=n,t.bar.title.text=(t.listQuery.year||t.currentYear)+" 商品煤分流向销售量对比饼状图",t.bar.exporting.filename=(t.listQuery.year||t.currentYear)+" 商品煤分流向销售量对比饼状图",e.chart(t.id,t.pie),e.chart("bar",t.bar)}else t.$notify({title:"系统提示",message:r.data.msg,type:"error",duration:3e3})},function(e){t.listLoading=!1,console.log(e),t.$notify({title:"系统提示",message:"系统错误",type:"error",duration:3e3})})}}},h={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("div",[r("div",{staticStyle:{float:"left"}},[r("el-date-picker",{staticStyle:{width:"250px"},attrs:{type:"year",placeholder:"请选择年度","value-format":"yyyy",format:"yyyy",size:"mini"},model:{value:t.listQuery.year,callback:function(e){t.$set(t.listQuery,"year",e)},expression:"listQuery.year"}})],1),t._v(" "),r("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"8px"},attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),r("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"8px"},attrs:{icon:"el-icon-refresh",size:"mini"},on:{click:t.reset}},[t._v("重置")]),t._v(" "),r("div",{staticStyle:{float:"right"}})],1),t._v(" "),r("el-row",{attrs:{gutter:32,id:"reportDiv"}},[r("el-col",{attrs:{span:24}},[r("h1",{staticClass:"coal-header"},[t._v("商品煤质量")])]),t._v(" "),r("el-col",{attrs:{span:12}},[r("div",[r("div",{attrs:{id:t.id,option:t.pie}})])]),t._v(" "),r("el-col",{attrs:{span:12}},[r("div",[r("div",{attrs:{id:"bar",option:t.bar}})])])],1)],1)},staticRenderFns:[]};var m=r("VU/8")(v,h,!1,function(t){r("RqYN")},null,null);e.default=m.exports}});