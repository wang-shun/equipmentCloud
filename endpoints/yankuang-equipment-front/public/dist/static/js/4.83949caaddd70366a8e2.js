webpackJsonp([4],{B2DU:function(n,t,e){var o=e("lghA");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("rjj0")("5b106f58",o,!0)},PbBS:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n.social-signup-container[data-v-3b0e1e21] {\n  margin: 20px 0;\n}\n.social-signup-container .sign-btn[data-v-3b0e1e21] {\n    display: inline-block;\n    cursor: pointer;\n}\n.social-signup-container .icon[data-v-3b0e1e21] {\n    color: #fff;\n    font-size: 30px;\n    margin-top: 6px;\n}\n.social-signup-container .wx-svg-container[data-v-3b0e1e21],\n  .social-signup-container .qq-svg-container[data-v-3b0e1e21] {\n    display: inline-block;\n    width: 40px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    padding-top: 1px;\n    border-radius: 4px;\n    margin-bottom: 20px;\n    margin-right: 5px;\n}\n.social-signup-container .wx-svg-container[data-v-3b0e1e21] {\n    background-color: #8dc349;\n}\n.social-signup-container .qq-svg-container[data-v-3b0e1e21] {\n    background-color: #6BA2D6;\n    margin-left: 50px;\n}\n",""])},S2ZB:function(n,t,e){n.exports=e.p+"static/img/logoone.917164d.png"},"T+/8":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("mvHQ"),i=e.n(o),r=e("wAeJ");function a(n,t,e,o){var i=void 0!==window.screenLeft?window.screenLeft:screen.left,r=void 0!==window.screenTop?window.screenTop:screen.top,a=(window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width)/2-e/2+i,s=(window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height)/2-o/2+r,c=window.open(n,t,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width="+e+", height="+o+", top="+s+", left="+a);window.focus&&c.focus()}var s={name:"social-signin",methods:{wechatHandleClick:function(n){this.$store.commit("SET_AUTH_TYPE",n);a("https://open.weixin.qq.com/connect/qrconnect?appid=xxxxx&redirect_uri="+encodeURIComponent("xxx/redirect?redirect="+window.location.origin+"/authredirect")+"&response_type=code&scope=snsapi_login#wechat_redirect",n,540,540)},tencentHandleClick:function(n){this.$store.commit("SET_AUTH_TYPE",n);a("https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=xxxxx&redirect_uri="+encodeURIComponent("xxx/redirect?redirect="+window.location.origin+"/authredirect"),n,540,540)}}},c={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"social-signup-container"},[e("div",{staticClass:"sign-btn",on:{click:function(t){n.wechatHandleClick("wechat")}}},[e("span",{staticClass:"wx-svg-container"},[e("svg-icon",{staticClass:"icon",attrs:{"icon-class":"wechat"}})],1),n._v(" 微信\n  ")]),n._v(" "),e("div",{staticClass:"sign-btn",on:{click:function(t){n.tencentHandleClick("tencent")}}},[e("span",{staticClass:"qq-svg-container"},[e("svg-icon",{staticClass:"icon",attrs:{"icon-class":"qq"}})],1),n._v(" QQ\n  ")])])},staticRenderFns:[]};var l=e("VU/8")(s,c,!1,function(n){e("sEjN")},"data-v-3b0e1e21",null).exports,d=e("ZjsX"),p=e("lbHh"),u=e.n(p),g=e("xrTZ").Base64,f={components:{LangSelect:r.a,SocialSign:l},name:"login",data:function(){return{szposition:[],loginForm:{username:"",password:""},loginRules:{username:[{required:!0,trigger:"blur",validator:function(n,t,e){/^[a-zA-Z0-9]{4,20}$/.test(t)?e():e(new Error("请输入正确的用户名"))}}],password:[{required:!0,trigger:"blur",validator:function(n,t,e){t.length<6?e(new Error("密码长度不能小于6位")):e()}}]},passwordType:"password",loading:!1,showDialog:!1,checked:!0}},methods:{showPwd:function(){"password"===this.passwordType?this.passwordType="":this.passwordType="password"},handleLogin:function(){var n=this,t=this;this.$refs.loginForm.validate(function(e){if(!e)return t.loading=!1,!1;n.loading=!0,Object(d.f)("/v1/users/login",{},{account:n.loginForm.username,password:n.loginForm.password},function(n){if(200===n.data.status){t.loading=!1;var e=n.data.data,o=g.decode(e);sessionStorage.setItem("name",JSON.parse(o).name),sessionStorage.setItem("id",JSON.parse(o).id),sessionStorage.setItem("code",JSON.parse(o).code),sessionStorage.setItem("deptId",JSON.parse(o).deptId),sessionStorage.setItem("deptCode",JSON.parse(o).deptCode),sessionStorage.setItem("deptName",JSON.parse(o).deptName),u.a.set("token",JSON.parse(o).token),t.$store.commit("set_navList",JSON.parse(o).authoritys);var r=i()(JSON.parse(o).authoritys);sessionStorage.setItem("navList",r),sessionStorage.setItem("token",JSON.parse(o).token),console.log(sessionStorage.getItem("token")),t.$router.push({path:"/"})}else t.loading=!1,t.$notify({title:"系统提示",message:n.data.msg,type:"warning",duration:2e3})},function(n){console.log(n),t.loading=!1,t.$notify({title:"系统提示",message:"服务器错误，请联系管理员",type:"error",duration:2e3})})})},afterQRScan:function(){}},created:function(){},destroyed:function(){}},h={render:function(){var n=this,t=n.$createElement,o=n._self._c||t;return o("div",{staticClass:"login-container"},[o("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{autoComplete:"on",model:n.loginForm,rules:n.loginRules,"label-position":"left"}},[o("div",{staticClass:"title-container"},[o("img",{staticStyle:{width:"30%"},attrs:{src:e("S2ZB"),alt:""}}),n._v(" "),o("h3",{staticClass:"title"},[n._v(n._s(n.$t("login.title")))])]),n._v(" "),o("el-form-item",{attrs:{prop:"username"}},[o("span",{staticClass:"svg-container svg-container_login"},[o("svg-icon",{attrs:{"icon-class":"user"}})],1),n._v(" "),o("el-input",{attrs:{name:"username",type:"text",autoComplete:"on",placeholder:n.$t("login.username")},model:{value:n.loginForm.username,callback:function(t){n.$set(n.loginForm,"username",t)},expression:"loginForm.username"}})],1),n._v(" "),o("el-form-item",{attrs:{prop:"password"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"password"}})],1),n._v(" "),o("el-input",{attrs:{name:"password",type:n.passwordType,autoComplete:"on",placeholder:n.$t("login.password")},nativeOn:{keyup:function(t){if(!("button"in t)&&n._k(t.keyCode,"enter",13,t.key))return null;n.handleLogin(t)}},model:{value:n.loginForm.password,callback:function(t){n.$set(n.loginForm,"password",t)},expression:"loginForm.password"}}),n._v(" "),o("span",{staticClass:"show-pwd",on:{click:n.showPwd}},[o("svg-icon",{attrs:{"icon-class":"eye"}})],1)],1),n._v(" "),o("el-checkbox",{model:{value:n.checked,callback:function(t){n.checked=t},expression:"checked"}},[n._v("记住用户名")]),n._v(" "),o("br"),n._v(" "),o("br"),n._v(" "),o("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{type:"primary",loading:n.loading},nativeOn:{click:function(t){t.preventDefault(),n.handleLogin(t)}}},[n._v(n._s(n.$t("login.logIn")))])],1)],1)},staticRenderFns:[]};var m=e("VU/8")(f,h,!1,function(n){e("wnir"),e("B2DU")},"data-v-46a89c12",null);t.default=m.exports},kU5n:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"/* reset element-ui css */\n.login-container .el-input {\n  display: inline-block;\n  height: 47px;\n  width: 85%;\n}\n.login-container .el-input input {\n    background: transparent;\n    border: 0px;\n    -webkit-appearance: none;\n    border-radius: 0px;\n    padding: 12px 5px 12px 15px;\n    color: #eee;\n    height: 47px;\n}\n.login-container .el-input input:-webkit-autofill {\n      -webkit-box-shadow: 0 0 0px 1000px #283443 inset !important;\n      -webkit-text-fill-color: white !important;\n}\n.login-container .el-form-item {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  color: #454545;\n}\n",""])},lghA:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n.login-container[data-v-46a89c12] {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  background-color: #2d3a4b;\n}\n.login-container .login-form[data-v-46a89c12] {\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 520px;\n    padding: 35px 35px 15px 35px;\n    margin: 120px auto;\n}\n.login-container .login-form .el-checkbox[data-v-46a89c12] {\n      margin-left: 10px;\n}\n.login-container .tips[data-v-46a89c12] {\n    font-size: 14px;\n    color: #fff;\n    margin-bottom: 10px;\n}\n.login-container .tips span[data-v-46a89c12]:first-of-type {\n      margin-right: 16px;\n}\n.login-container .svg-container[data-v-46a89c12] {\n    padding: 6px 5px 6px 15px;\n    color: #889aa4;\n    vertical-align: middle;\n    width: 30px;\n    display: inline-block;\n}\n.login-container .svg-container_login[data-v-46a89c12] {\n      font-size: 20px;\n}\n.login-container .title-container[data-v-46a89c12] {\n    position: relative;\n}\n.login-container .title-container .title[data-v-46a89c12] {\n      font-size: 26px;\n      font-weight: 400;\n      color: #eee;\n      margin: 0px auto 40px auto;\n      text-align: center;\n      font-weight: bold;\n}\n.login-container .title-container .set-language[data-v-46a89c12] {\n      color: #fff;\n      position: absolute;\n      top: 5px;\n      right: 0px;\n}\n.login-container .show-pwd[data-v-46a89c12] {\n    position: absolute;\n    right: 10px;\n    top: 7px;\n    font-size: 16px;\n    color: #889aa4;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.login-container .thirdparty-button[data-v-46a89c12] {\n    position: absolute;\n    right: 35px;\n    bottom: 28px;\n}\n",""])},sEjN:function(n,t,e){var o=e("PbBS");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("rjj0")("142dc86d",o,!0)},wnir:function(n,t,e){var o=e("kU5n");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("rjj0")("18aa00c0",o,!0)},xrTZ:function(n,t,e){(function(o){var i;!function(t,e){n.exports=e(t)}("undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==o?o:this,function(o){"use strict";var r,a=o.Base64;if(void 0!==n&&n.exports)if("undefined"!=typeof navigator&&"ReactNative"==navigator.product);else try{r=e("EuP9").Buffer}catch(n){}var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=function(n){for(var t={},e=0,o=n.length;e<o;e++)t[n.charAt(e)]=e;return t}(s),l=String.fromCharCode,d=function(n){if(n.length<2)return(t=n.charCodeAt(0))<128?n:t<2048?l(192|t>>>6)+l(128|63&t):l(224|t>>>12&15)+l(128|t>>>6&63)+l(128|63&t);var t=65536+1024*(n.charCodeAt(0)-55296)+(n.charCodeAt(1)-56320);return l(240|t>>>18&7)+l(128|t>>>12&63)+l(128|t>>>6&63)+l(128|63&t)},p=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,u=function(n){return n.replace(p,d)},g=function(n){var t=[0,2,1][n.length%3],e=n.charCodeAt(0)<<16|(n.length>1?n.charCodeAt(1):0)<<8|(n.length>2?n.charCodeAt(2):0);return[s.charAt(e>>>18),s.charAt(e>>>12&63),t>=2?"=":s.charAt(e>>>6&63),t>=1?"=":s.charAt(63&e)].join("")},f=o.btoa?function(n){return o.btoa(n)}:function(n){return n.replace(/[\s\S]{1,3}/g,g)},h=r?r.from&&Uint8Array&&r.from!==Uint8Array.from?function(n){return(n.constructor===r.constructor?n:r.from(n)).toString("base64")}:function(n){return(n.constructor===r.constructor?n:new r(n)).toString("base64")}:function(n){return f(u(n))},m=function(n,t){return t?h(String(n)).replace(/[+\/]/g,function(n){return"+"==n?"-":"_"}).replace(/=/g,""):h(String(n))},v=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),x=function(n){switch(n.length){case 4:var t=((7&n.charCodeAt(0))<<18|(63&n.charCodeAt(1))<<12|(63&n.charCodeAt(2))<<6|63&n.charCodeAt(3))-65536;return l(55296+(t>>>10))+l(56320+(1023&t));case 3:return l((15&n.charCodeAt(0))<<12|(63&n.charCodeAt(1))<<6|63&n.charCodeAt(2));default:return l((31&n.charCodeAt(0))<<6|63&n.charCodeAt(1))}},w=function(n){return n.replace(v,x)},b=function(n){var t=n.length,e=t%4,o=(t>0?c[n.charAt(0)]<<18:0)|(t>1?c[n.charAt(1)]<<12:0)|(t>2?c[n.charAt(2)]<<6:0)|(t>3?c[n.charAt(3)]:0),i=[l(o>>>16),l(o>>>8&255),l(255&o)];return i.length-=[0,0,2,1][e],i.join("")},y=o.atob?function(n){return o.atob(n)}:function(n){return n.replace(/[\s\S]{1,4}/g,b)},S=r?r.from&&Uint8Array&&r.from!==Uint8Array.from?function(n){return(n.constructor===r.constructor?n:r.from(n,"base64")).toString()}:function(n){return(n.constructor===r.constructor?n:new r(n,"base64")).toString()}:function(n){return w(y(n))},C=function(n){return S(String(n).replace(/[-_]/g,function(n){return"-"==n?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};if(o.Base64={VERSION:"2.4.8",atob:y,btoa:f,fromBase64:C,toBase64:m,utob:u,encode:m,encodeURI:function(n){return m(n,!0)},btou:w,decode:C,noConflict:function(){var n=o.Base64;return o.Base64=a,n}},"function"==typeof Object.defineProperty){var k=function(n){return{value:n,enumerable:!1,writable:!0,configurable:!0}};o.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",k(function(){return C(this)})),Object.defineProperty(String.prototype,"toBase64",k(function(n){return m(this,n)})),Object.defineProperty(String.prototype,"toBase64URI",k(function(){return m(this,!0)}))}}return o.Meteor&&(Base64=o.Base64),void 0!==n&&n.exports?n.exports.Base64=o.Base64:void 0===(i=function(){return o.Base64}.apply(t,[]))||(n.exports=i),{Base64:o.Base64}})}).call(t,e("DuR2"))}});