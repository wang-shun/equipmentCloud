webpackJsonp([33],{UalQ:function(t,e,i){var a=i("t9Ud");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("5648f75a",a,!0)},lPLs:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("mvHQ"),s=i.n(a),o=i("cAgV"),l=i("ZjsX"),n=i("oQWa"),r=i("7t+N"),c=i.n(r),d=sessionStorage.getItem("token"),u={name:"complexTable",directives:{waves:o.a},components:{treeTableForTc:n.a},data:function(){return{istianjia:!1,tableHeight:document.body.clientHeight-240,data:[],datas:[],datafordep:[],columna:[{text:"权限名称",value:"name",width:250}],columns:[{text:"部门名称",value:"name",width:250}],setDisabled:!1,isDetail:!1,comtreeList:!1,rolename:"",deptreeList:!1,currentPage:1,pageSize:15,isUpdate:!0,tableKey:0,list:null,total:null,listLoading:!0,listQuery:{page:1,limit:20,importance:void 0,title:"",type:"",sort:"+id"},props:{label:"name",children:"zones"},count:1,roleDatas:[],companyList:[{value:"中心",label:"中心"},{value:"矿处",label:"矿处"}],departmentList:[{value:"综合科",label:"综合科"},{value:"综机科",label:"综机科"}],selectlistRow:[],statusOptions2:["管理员权限","科长权限"],showReviewer:!1,temp:{deptCode:"",jurRole:"",id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"",status1:"",depname:"",code:"",rolename:""},jurtemp:{rolename:"",code:"",authorityCodes:[]},dialogFormVisible:!1,dialogStatus:"",textMap:{create:"添加角色",update:"编辑角色",info:"角色详细"},dialogPvVisible:!1,pvData:[],rules:{depname:[{required:!0,message:"请输入所在部门"}],rolename:[{required:!0,message:"请输入角色名称"}]},downloadLoading:!1,buttonlist:[],authorityCodebutton:[],authorityCodePage:""}},filters:{statusFilter:function(t){return{published:"success",draft:"info",deleted:"danger"}[t]}},created:function(){var t=sessionStorage.getItem("index");this.buttonlist=Object(l.b)(t),this.authorityCodebutton=this.buttonlist[0],this.authorityCodePage=this.buttonlist[1],this.getList(this.currentPage,this.pageSize),this.getJurList(),this.getdepList()},methods:{upder:function(){this.comtreeList=!0},closeder:function(){this.comtreeList=!1,this.getdepList()},choosecompany:function(){0!==this.listData.length&&1===this.listData.length?(this.temp.depname=this.listData[0].name,this.temp.code=this.listData[0].code,this.comtreeList=!1):this.$notify({title:"系统提示",message:"请选择一条数据进行添加！",type:"warning",duration:2e3})},chooseDer:function(){if(0===this.listData.length)this.$notify({title:"系统提示",message:"请选择一条数据进行添加！",type:"warning",duration:2e3});else{for(var t="",e=[],i=0;i<this.listData.length;i++)if(t+=this.listData[i].name+"   ",e.push(this.listData[i].code),0!==this.listData[i].childList.length)for(var a=0;a<this.listData[i].childList.length;a++)if(t+=this.listData[i].childList[a].name+"   ",e.push(this.listData[i].childList[a].code),0!==this.listData[i].childList[a].childList.length)for(var s=0;s<this.listData[i].childList[a].childList.length;s++)if(t+=this.listData[i].childList[a].childList[s].name+"   ",e.push(this.listData[i].childList[a].childList[s].code),0!==this.listData[i].childList[a].childList[s].childList.length)for(var o=0;o<this.listData[i].childList[a].childList[s].childList.length;o++)t+=this.listData[i].childList[a].childList[s].childList[o].name+"   ",e.push(this.listData[i].childList[a].childList[s].childList[o].code);this.jurtemp.rolename=t,this.jurtemp.authorityCodes=e,this.deptreeList=!1}},changeGetdata:function(t){this.listData=t},getList:function(t,e){var i=this;i.listLoading=!0;var a={name:i.listQuery.title,page:t,size:e};Object(l.d)("/v1/roles",{token:d,authorityCode:1},a,function(t){200===t.status?(i.roleDatas=t.data.data.list,i.total=t.data.data.total,i.listLoading=!1):i.$notify({title:"系统错误",message:t.data.msg,type:"warning",duration:2e3})},function(t){console.log(t),i.$notify({title:"系统提示",message:"系统错误",type:"error",duration:2e3})})},getJurList:function(){var t=this;Object(l.d)("/v1/acls/tree",{token:d,authorityCode:1},{},function(e){if(200===e.data.status){var i=e.data.data;t.data=i,t.datas=i,console.log(t.data)}else t.$notify({title:"系统提示",message:e.data.msg,type:"error",duration:3e3})},function(e){console.log(e),t.$notify({title:"系统错误",message:"请求错误",type:"error",duration:2e3})})},selectRow:function(t){this.selectlistRow=t,console.log(t)},getdepList:function(){var t=this;Object(l.d)("/v1/depts/tree",{token:d,authorityCode:1},{},function(e){if(console.log(e),200===e.data.status){var i=e.data.data;t.datafordep=i}else t.$notify({title:"系统提示",message:e.data.msg,type:"error",duration:3e3})},function(e){console.log(e),t.$notify({title:"系统提示",message:"系统错误",type:"error",duration:2e3})})},delData:function(){var t=this;t.selectlistRow?function(){for(var e=[],i=0;i<t.selectlistRow.length;i++)e.push(t.selectlistRow[i].code);if(0!==t.selectlistRow.length)for(var a=t.selectlistRow.length,o=0;o<a;o++)t.$confirm("确认要删除么?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){c.a.ajax({url:l.a+"/v1/roles",method:"delete",headers:{token:d,authorityCode:1,"Content-Type":"application/json; charset=utf-8"},dataType:"json",data:s()({codes:e}),success:function(e){200===e.status&&t.getList(t.currentPage,t.pageSize)}})}).catch(function(){t.$notify({title:"系统提示",message:"已取消删除",type:"info",duration:2e3})});else t.$notify({title:"系统提示",message:"请选择一条或多条数据进行删除操作！",type:"warning",duration:2e3})}():t.$notify({title:"系统提示",message:"请选择一条或多条数据进行删除操作！",type:"warning",duration:2e3})},authorization:function(){this.selectlistRow?0!==this.selectlistRow.length&&1===this.selectlistRow.length?this.dialogPvVisible=!0:this.$notify({title:"系统提示",message:"请选择一个角色进行授权",type:"error",duration:2e3}):this.$notify({title:"系统提示",message:"请选择一个角色进行授权",type:"warning",duration:2e3})},createData:function(){var t=this,e={name:this.temp.rolename,deptCode:this.temp.code,remark:this.temp.remark};this.$refs.roleDatas.validate(function(i){if(i){t.istianjia=!0;var a=t;Object(l.f)("/v1/roles",{token:d,authorityCode:1},e,function(t){200===t.data.status?(a.dialogFormVisible=!1,a.istianjia=!1,a.getList(a.currentPage,a.pageSize),a.$notify({title:"成功",message:"创建成功",type:"success",duration:3e3})):(a.istianjia=!1,a.$notify({title:"失败",message:"创建失败",type:"error",duration:3e3}))},function(t){a.listLoading=!1,a.istianjia=!1,console.log(t),a.$notify({title:"系统提示",message:"系统错误",type:"error",duration:3e3})})}})},handleCreate:function(){var t=this;this.resetTemp(),this.isUpdate=!0,this.setDisabled=!1,this.dialogStatus="create",this.dialogFormVisible=!0,this.isDetail=!1,this.$nextTick(function(){t.$refs.roleDatas.clearValidate()})},handleUpdate:function(t){var e=this;this.isUpdate=!0,this.setDisabled=!1,this.dialogStatus="update",this.dialogFormVisible=!0,this.isDetail=!1,this.getRole(t.code),this.$nextTick(function(){e.$refs.roleDatas.clearValidate()})},handleInfo:function(t){this.isUpdate=!1,this.setDisabled=!0,this.dialogStatus="info",this.dialogFormVisible=!0,this.isDetail=!0,this.getRole(t.code)},getRole:function(t){var e=this;e.dialogFormVisible=!0,Object(l.d)("/v1/roles/"+t,{token:d,authorityCode:1},{},function(t){if(console.log(t),200===t.data.status){var i=t.data.data;e.temp.depname=i.deptName,e.temp.rolename=i.name,e.temp.jurRole=i.jurRole,e.temp.remark=i.remark,e.temp.deptCode=i.deptCode}},function(t){console.log(t),e.$notify({title:"系统提示",message:"查询失败",type:"error",duration:2e3})})},edit:function(){var t=this;t.selectlistRow|0!==t.selectlistRow.length&&1===t.selectlistRow.length?(t.handleUpdate(t.selectlistRow[0]),t.dialogStatus="update",t.codeShowYN=!0,t.isUpdate=!0,t.setDisabled=!1,t.dialogFormVisible=!0,t.$nextTick(function(){t.$refs.roleDatas.clearValidate()})):t.$notify({title:"系统提示",message:"请选择一条数据进行编辑",type:"warning",duration:2e3})},handleFilter:function(){this.getList(this.currentPage,this.pageSize)},handleSizeChange:function(t){this.getList(this.currentPage,t)},handleCurrentChange:function(t){this.getList(t,this.pageSize)},handleModifyStatus:function(t,e){this.$message({message:"操作成功",type:"success"}),t.status=e},resetTemp:function(){this.temp={deptCode:"",jurRole:"",id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"",status1:"",depname:"",code:"",rolename:""}},addrole:function(){var t=this,e={roleCode:t.selectlistRow[0].code,authorityCodes:t.jurtemp.authorityCodes};t.$refs.roleDatas.validate(function(i){i&&Object(l.f)("/v1/roles/acls",{token:d,authorityCode:1},e,function(e){console.log(e),200===e.data.status?(t.$notify({title:"系统提示",message:"角色授权成功",type:"success",duration:2e3}),t.dialogPvVisible=!1):t.$notify({title:"系统提示",message:"角色授权失败",type:"warning",duration:2e3})},function(e){console.log(e),t.$notify({title:"系统提示",message:"系统错误",type:"error",duration:2e3})})})},updateData:function(){var t=this;""===t.temp.code&&(t.temp.code=t.temp.deptCode);var e={name:t.temp.rolename,code:t.selectlistRow[0].code,remark:t.temp.remark,deptCode:t.temp.deptCode,deptCodeNew:t.temp.code};this.$refs.roleDatas.validate(function(i){i&&Object(l.g)("/v1/roles",{token:d,authorityCode:1},e,function(e){200===e.data.status?(t.dialogFormVisible=!1,t.$notify({title:"系统提示",message:"更新成功",type:"success",duration:2e3}),t.getList(t.currentPage,t.pageSize)):(t.dialogFormVisible=!1,t.$notify({title:"系统提示",message:"更新失败",type:"warning",duration:2e3}))},function(e){console.log(e),t.$notify({title:"系统提示",message:"系统错误",type:"error",duration:2e3})})})}}},p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"角色名称"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.handleFilter(e)}},model:{value:t.listQuery.title,callback:function(e){t.$set(t.listQuery,"title",e)},expression:"listQuery.title"}}),t._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),t._l(t.authorityCodebutton,function(e){return i("div",{key:e.a,staticClass:"btn_right"},["添加"===e.name?i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"primary",icon:"el-icon-circle-plus-outline"},on:{click:t.handleCreate}},[t._v(t._s(e.name))]):t._e(),t._v(" "),"编辑"===e.name?i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"primary",icon:"el-icon-edit"},on:{click:function(e){t.edit()}}},[t._v(t._s(e.name))]):t._e(),t._v(" "),"删除"===e.name?i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"danger",icon:"el-icon-delete"},on:{click:function(e){e.preventDefault(),t.delData()}}},[t._v(t._s(e.name))]):t._e()],1)})],2),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,ref:"moviesTable",staticStyle:{width:"100%"},attrs:{data:t.roleDatas,border:"",fit:"","highlight-current-row":"",height:t.tableHeight},on:{"selection-change":t.selectRow}},[i("el-table-column",{attrs:{type:"selection",width:"35"}}),t._v(" "),i("el-table-column",{attrs:{width:"150px",align:"center",label:"角色名称",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticClass:"link-type",on:{click:function(i){t.handleInfo(e.row)}}},[t._v(t._s(e.row.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"150px",align:"center",label:"所在部门"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.deptName))])]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"150px",align:"center",label:"创建人"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.createBy))])]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"180px",align:"center",label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.createAt))])]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"480px",align:"center",label:"角色描述"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.remark))])]}}])})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible,width:"480px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"roleDatas",staticStyle:{"margin-left":"15px"},attrs:{rules:t.rules,model:t.temp,"label-position":"right","label-width":"120px",disabled:t.setDisabled}},[i("el-form-item",{attrs:{required:"",label:"所在部门",prop:"depname"}},[i("el-input",{staticStyle:{width:"250px"},on:{focus:t.upder},model:{value:t.temp.depname,callback:function(e){t.$set(t.temp,"depname",e)},expression:"temp.depname"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"角色名称",required:"",prop:"rolename"}},[i("el-input",{staticStyle:{width:"250px"},model:{value:t.temp.rolename,callback:function(e){t.$set(t.temp,"rolename",e)},expression:"temp.rolename"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"备注"}},[i("el-input",{staticStyle:{width:"250px"},attrs:{type:"textarea",placeholder:"请输入角色描述"},model:{value:t.temp.remark,callback:function(e){t.$set(t.temp,"remark",e)},expression:"temp.remark"}})],1)],1),t._v(" "),t.isUpdate?i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v(t._s(t.$t("table.cancel")))]),t._v(" "),"create"==t.dialogStatus?i("el-button",{attrs:{type:"primary",loading:t.istianjia},on:{click:t.createData}},[t._v(t._s(t.$t("table.confirm")))]):i("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v(t._s(t.$t("table.confirm")))])],1):t._e()],1),t._v(" "),i("el-dialog",{attrs:{title:"角色授权",visible:t.dialogPvVisible,width:"480px"},on:{"update:visible":function(e){t.dialogPvVisible=e}}},[i("el-form",{ref:"roleDatas",staticStyle:{"margin-left":"15px"},attrs:{rules:t.rules,model:t.temp,"label-position":"right","label-width":"120px","show-overflow-tooltip":!0}},[i("el-form-item",{attrs:{label:"权限",required:""}},[i("el-input",{staticStyle:{width:"250px"},attrs:{type:"textarea"},on:{focus:function(e){t.deptreeList=!0}},model:{value:t.jurtemp.rolename,callback:function(e){t.$set(t.jurtemp,"rolename",e)},expression:"jurtemp.rolename"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogPvVisible=!1}}},[t._v(t._s(t.$t("table.cancel")))]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.addrole}},[t._v(t._s(t.$t("table.confirm")))])],1)],1),t._v(" "),i("el-dialog",{staticStyle:{"margin-left":"100px"},attrs:{visible:t.deptreeList,width:"480px"},on:{"update:visible":function(e){t.deptreeList=e}}},[i("treeTableForTc",{attrs:{data:t.datas,columns:t.columna,border:""},on:{getClickedType:t.changeGetdata}}),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.deptreeList=!1}}},[t._v(t._s(t.$t("table.cancel")))]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.chooseDer}},[t._v(t._s(t.$t("table.confirm")))])],1)],1),t._v(" "),i("el-dialog",{staticStyle:{"margin-left":"100px"},attrs:{visible:t.comtreeList,width:"480px"},on:{"update:visible":function(e){t.comtreeList=e}}},[i("treeTableForTc",{attrs:{data:t.datafordep,columns:t.columns,border:""},on:{getClickedType:t.changeGetdata}}),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.closeder}},[t._v(t._s(t.$t("table.cancel")))]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.choosecompany}},[t._v(t._s(t.$t("table.confirm")))])],1)],1),t._v(" "),i("div",{staticClass:"block"},[i("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[15,30,45,60,75,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var m=i("VU/8")(u,p,!1,function(t){i("UalQ")},null,null);e.default=m.exports},t9Ud:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.btn_right{\n  float: right;\n}\n.icon_grant {\n  background: url('/src/images/icon/icon_grantAuth.png') no-repeat;\n  display: inline-block;\n  width: 12px;\n  height: 12px;\n  margin-right: 5px;\n  font-weight: bold;\n}\n",""])}});