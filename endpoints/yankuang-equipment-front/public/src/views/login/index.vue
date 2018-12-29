<template>
  <div class="login-container">

    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">

      <div class="title-container">
        <img src="./images/logoone.png" alt="" style="width:30%;">
        <h3 class="title">{{$t('login.title')}}</h3>
      </div>

      <el-form-item prop='username'>
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" :placeholder="$t('login.username')"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          :placeholder="$t('login.password')" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-checkbox v-model="checked">记住用户名</el-checkbox>
      <br>
      <br>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading='loading' @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>

      <!-- <div class="tips">
        <span>{{$t('login.username')}} : admin</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div>
      <div class="tips">
        <span style="margin-right:18px;">{{$t('login.username')}} : editor</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div> -->

      <!-- <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button> -->
    </el-form>

    <!-- <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{$t('login.thirdpartyTips')}}
      <br/>
      <br/>
      <br/>
      <social-sign />
    </el-dialog> -->

  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
import { require_post } from '@/assets/pubJS'
const Base64 = require('js-base64').Base64
import Cookies from 'js-cookie'
export default {
  components: { LangSelect, SocialSign },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // var patten = /^[a-zA-Z]\w{3,15}$/ig
      var patten = /^[a-zA-Z0-9]{4,20}$/
      if (!patten.test(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      szposition: [],
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      checked: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      const _this = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          require_post('/v1/users/login', { }, { account: this.loginForm.username, password: this.loginForm.password }, function(res) {
            if (res.data.status === 200) {
              _this.loading = false
              var keyList = res.data.data
              var keyListtoken = Base64.decode(keyList)
              sessionStorage.setItem('name', JSON.parse(keyListtoken).name)
              sessionStorage.setItem('id', JSON.parse(keyListtoken).id)
              sessionStorage.setItem('code', JSON.parse(keyListtoken).code)
              sessionStorage.setItem('deptId', JSON.parse(keyListtoken).deptId)
              sessionStorage.setItem('deptCode', JSON.parse(keyListtoken).deptCode)
              sessionStorage.setItem('deptName', JSON.parse(keyListtoken).deptName)
              Cookies.set('token', JSON.parse(keyListtoken).token)
              _this.$store.commit('set_navList', JSON.parse(keyListtoken).authoritys)
              var str = JSON.stringify(JSON.parse(keyListtoken).authoritys)
              sessionStorage.setItem('navList', str)
              sessionStorage.setItem('token', JSON.parse(keyListtoken).token)
              console.log(sessionStorage.getItem('token'))
              _this.$router.push({ path: '/' })
            } else {
              _this.loading = false
              _this.$notify({
                title: '系统提示',
                message: res.data.msg,
                type: 'warning',
                duration: 2000
              })
            }
          }, function(err) {
            console.log(err)
            _this.loading = false
            _this.$notify({
              title: '系统提示',
              message: '服务器错误，请联系管理员',
              type: 'error',
              duration: 2000
            })
          })
        } else {
          _this.loading = false
          return false
        }
      })
    },
    afterQRScan() {
    }
  },
  created() {
  },
  destroyed() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #283443 inset !important;
        -webkit-text-fill-color: rgba(255,255,255,1) !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    .el-checkbox{
      margin-left: 10px;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
