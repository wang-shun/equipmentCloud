<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <!-- <el-menu
          router
          :show-timeout="200"
          :default-active="$route.path"
          :collapse="isCollapse"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
        >
        <template v-for="item in forNavList" >
          <el-submenu :index="item.url"  v-if="item.childList.length!=0 && item.type == 1" :key='item.a'>
            <template slot="title"><img :src='item.icon' style="margin-right:11px;"/>{{item.name}}</template>
            <div v-for='sunchild in item.childList' :key='sunchild.a' class='abc'>
              <el-submenu  :index="sunchild.url" v-if="sunchild.childList.length!=0 && sunchild.type == 1" :key='sunchild.a' style="background-color:gray !important;">
                <template slot="title" style="padding-left:55px !important;">{{sunchild.name}}</template>
                  <el-menu-item v-for="itemChild in sunchild.childList" :index="itemChild.url" :key="itemChild.b" style="padding-left:37px !important;">
                　　{{itemChild.name}}
              　　</el-menu-item>
              </el-submenu>
              <el-menu-item v-if="sunchild.childList.length==0 && sunchild.type == 1" :index="sunchild.url" style="padding-left:10px !important;">
            　　{{sunchild.name}}
          　　</el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item :index="item.url" v-if="item.childList.length==0 && item.type == 1" :key='item.a' style:active="padding-left:13px;" >
            <img :src="item.icon" style="margin-right:11px !important;"/>{{item.name}}
        　</el-menu-item>
        </template>
    </el-menu> -->
    <el-menu
          router
          :show-timeout="200"
          :default-active="$route.path"
          :collapse="isCollapse"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          :select='abc($route.path)'
        >
        <template v-for="item in forNavList">
          <el-submenu :index="item.url"  v-if="item.childList.length!=0 && item.type == 1" :key='item.a'>
            <template slot="title"><img :src='item.icon' style="margin-right:11px;"/>{{item.name}}</template>
            <div v-for='sunchild in item.childList' :key='sunchild.a' class='abc'>
              <el-submenu  :index="sunchild.url" v-if="sunchild.childList.length!=0 && sunchild.type == 1 && sunchild.childList[0].type!=2" :key='sunchild.a' style="background-color:gray !important;">
                <template slot="title" style="padding-left:55px !important;">{{sunchild.name}}</template>
                  <el-menu-item v-for="itemChild in sunchild.childList" :index="itemChild.url" :key="itemChild.b" style="padding-left:37px !important;">
                　　{{itemChild.name}}
              　　</el-menu-item>
              </el-submenu>
              <el-menu-item v-if="(sunchild.childList.length==0 || sunchild.childList[0].type==2) && sunchild.type == 1" :index="sunchild.url" style="padding-left:10px !important;">
            　　{{sunchild.name}}
          　　</el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item :index="item.url" v-if="(item.childList.length == 0 || item.childList[0].type==2) && item.type == 1" :key='item.a' style:active="padding-left:13px;" >
            <img :src="item.icon" style="margin-right:11px !important;"/>{{item.name}}
        　</el-menu-item>
        </template>
    </el-menu>
</el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  created() {
    this.navList = this.$store.state.navList
    this.navLists = JSON.parse(sessionStorage.getItem('navList'))
    // console.log(this.navLists, 'navlist1111')
    for (let i = 0; i < this.navLists.length; i++) {
      this.sortByKey(this.navLists[i].childList, 'sorting')
    }
    this.forNavList = this.sortByKey(this.navLists, 'sorting')
  },
  data() {
    return {
      navList: [],
      navLists: []
    }
  },
  methods: {
    sortByKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key]
        var y = b[key]
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
      })
    },
    abc(index) {
      // console.log(index, '1237192734120471238478')
      sessionStorage.setItem('index', index)
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

