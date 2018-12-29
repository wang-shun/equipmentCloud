<template>
  <div class="dashboard-editor-container" >
    <div >
      <p style="font-size:50px;">科创出品，必属精品</p>
      <!-- <pan-thumb style="float: left" :image="avatar"> Your roles:
        <span class="pan-info-roles" :key='item' v-for="item in roles">{{item}}</span>
      </pan-thumb> -->
      <!-- <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"></github-corner> -->
      <!-- <div class="info-container">
        <span class="display_name">{{name}}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">hellow, world</span>
      </div> -->
    </div>
    <!-- <div >
      <img class="emptyGif" :src="emptyGif" >
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import GithubCorner from '@/components/GithubCorner'
import { require_get } from '@/assets/pubJS'
const token = sessionStorage.getItem('token')
export default {
  name: 'dashboard-editor',
  components: { PanThumb, GithubCorner },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  created() {
    // 获取所在位置
    const _this = this
    require_get('/v1/elplan', {
      token: token,
      authorityCode: 1
    }, {
      page: 1,
      size: 100,
      pCode: '',
      type: 3
    }, function(res) {
      var data = []
      if (res.data.status === 200) {
        var result = res.data.data.list
        for (let i = 0; i < result.length; i++) {
          var obj = {}
          obj.id = result[i].id
          obj.name = result[i].name
          data[i] = obj
        }
        _this.szposition = data
        sessionStorage.setItem('positonList', JSON.stringify(data))
      }
    }, function(err) {
      console.log(err)
    })
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 40%;
    height: 100%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    // background-color: #e3e3e3;
    // min-height: 100vh;
    height: 100%;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
