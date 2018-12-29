<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <!-- <breadcrumb class="breadcrumb-container"></breadcrumb> -->
    <div class="logot"><span class="logo" style=" background-image: url('../static/images/logo.png');"></span><span class="logoName"> 设备共享管理平台</span></div>
    <!-- 用户部分 -->
    <div class="right-menu">
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->

      <!-- <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip> -->
      <!-- <lang-select class="international right-menu-item"></lang-select> -->
      <!-- <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip> -->

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <span>{{username}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <!-- <a target='_blank' href="">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </a> -->
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import { require_post } from '@/assets/pubJS'
const token = sessionStorage.getItem('token')

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  data() {
    return {
      username: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  created() {
    var username = sessionStorage.getItem('name')
    this.username = username
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      const _this = this
      require_post('/v1/users/loginOut', {}, {
        token: token,
        authorityCode: 1
      }, function(res) {
        if (res.data.status === 200) {
          _this.$router.push({ path: '/login' })
          _this.$store.state.tagsView.visitedViews = []
          sessionStorage.setItem('token', '')
          sessionStorage.setItem('positonList', '')
          sessionStorage.setItem('name', '')
          sessionStorage.setItem('id', '')
          sessionStorage.setItem('code', '')
          sessionStorage.setItem('deptId', '')
          sessionStorage.setItem('deptCode', '')
          sessionStorage.setItem('deptName', '')
        } else {
          _this.$notify({
            title: '系统提示',
            message: '退出失败，请重新退出',
            type: 'fail',
            duration: 2000
          })
        }
      }, function(err) {
        console.log(err)
        _this.$notify({
          title: '系统提示',
          message: '系统错误',
          type: 'fail',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    // line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .logot{
    float: left;
    margin-left: 23px;
    line-height: 50px;
    padding-top: 5px;
    .logo{
      display: inline-block;
      // background-image: url('../src/images/logo.png');
      background-size: cover;
      background-repeat: no-repeat;
      width: 105px;
      height: 34px;
      margin-bottom: -5px;
      // margin-right: 30px;
    }
    .logoName{
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      position: relative;
      bottom: 6px;
      left: 15px;
    }
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
