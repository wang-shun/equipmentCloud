webpackJsonp([96],{"8u5s":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("cAgV"),i=a("ZjsX"),n=sessionStorage.getItem("token"),r={name:"percentofpass",directives:{waves:s.a},data:function(){var t=function(t,e,a){""!==e&&null!==e&&!1===/^\d{1,6}(\.\d{1,2})?$/.test(e)?a(new Error("请输入最长6位整数，2位小数")):a()};return{temp:{sjhfEnd:"",sjhfStart:""},rules:{sjhfStart:[{validator:t}],sjhfEnd:[{validator:t}]},authorityCodebutton:[],authorityCodePage:""}},created:function(){var t=sessionStorage.getItem("index");this.buttonlist=Object(i.b)(t),this.authorityCodebutton=this.buttonlist[0],this.authorityCodePage=this.buttonlist[1],this.search()},methods:{handleCreate:function(){var t=this;this.$refs.dataForm.validate(function(e){if(e){var a=t,s={sjhfStart:a.temp.sjhfStart,sjhfEnd:a.temp.sjhfEnd,type:"hf2"};Object(i.g)("/v1/spmsjhfconfig/update",{token:n,authorityCode:1},s,function(t){200===t.data.status?(a.$notify({title:"系统提示",message:"范围修改成功",type:"success",duration:3e3}),a.search()):a.$notify({title:"系统提示",message:t.data.msg,type:"error",duration:3e3})},function(t){a.listLoading=!1,console.log(t),a.$notify({title:"系统提示",message:"系统错误",type:"error",duration:3e3})})}})},search:function(){var t=this;Object(i.d)("/v1/spmsjhfconfig/find",{token:n,authorityCode:1},{q_type:"hf2"},function(e){if(200===e.data.status){var a=e.data.data;t.temp.sjhfStart=a.sjhfStart,t.temp.sjhfEnd=a.sjhfEnd}else t.$notify({title:"系统提示",message:e.data.msg,type:"error",duration:3e3})},function(e){t.listLoading=!1,console.log(e),t.$notify({title:"系统提示",message:"系统错误",type:"error",duration:3e3})})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"margin-top":"10px"}},[a("p",{staticStyle:{"margin-left":"20px",color:"gray","font-size":"14px"}},[t._v("修改二号煤合格率灰分范围：")]),t._v(" "),a("div",{staticStyle:{float:"left"}},[a("el-form",{ref:"dataForm",staticClass:"form",staticStyle:{"max-height":"550px",overflow:"auto"},attrs:{rules:t.rules,"status-icon":"",model:t.temp,"label-position":"right","label-width":"130px"}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"实际灰分最低值:",prop:"sjhfStart"}},[a("el-input",{attrs:{maxlength:50},model:{value:t.temp.sjhfStart,callback:function(e){t.$set(t.temp,"sjhfStart",e)},expression:"temp.sjhfStart"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"实际灰分最高值:",prop:"sjhfEnd"}},[a("el-input",{attrs:{maxlength:50},model:{value:t.temp.sjhfEnd,callback:function(e){t.$set(t.temp,"sjhfEnd",e)},expression:"temp.sjhfEnd"}})],1)],1)],1)],1),t._v(" "),t._l(t.authorityCodebutton,function(e){return a("div",{key:e.a,staticStyle:{float:"left","margin-left":"10px"}},["更新"===e.name?a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small",icon:"el-icon-circle-plus-outline"},on:{click:t.handleCreate}},[t._v("更新")]):t._e()],1)})],2)},staticRenderFns:[]},l=a("VU/8")(r,o,!1,null,null,null);e.default=l.exports}});