<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <left-menu></left-menu>
      </el-col>
      <el-col :span="20">
        <div style="margin-top:50px;padding-left: 20px;"></div>
        <router-view></router-view>
      </el-col>
    </el-row>


    <vue-progress-bar></vue-progress-bar>

  </div>
</template>

<script>
    import Header from './components/Header.vue'
    import LeftMenu from './components/LeftMenu.vue'

    export default {
        components: {
            appHeader: Header,
            leftMenu:LeftMenu
        },
        created () {
            this.$Progress.start()
        },
        mounted () {
            this.$Progress.finish()
        }
    }
</script>
<style>

  @import url('https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css');
  body{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .el-menu{
    border-right: none;
  }

  .audition{
    padding-top: 40px;
    width: 80%;
    margin: 0 auto;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #eee;
  }
</style>
