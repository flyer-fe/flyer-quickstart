<template>
  <div class="stage">
    <div class="header">{{#router}}{{#if_eq ui "sina-ui"}}
      <x-menu
        theme="dark"
        mode="horizontal"
        router
        style="border-radius: 0;">
        <x-menu-logo index="http://xxx.com.cn">
          <img class="logo" :src="logoSrc">
        </x-menu-logo>
        <!-- 导航菜单项 -->
        <!-- <x-menu-item index="/dynamic/dynamic">测试</x-menu-item> -->
      </x-menu>{{/if_eq}}{{#if_eq ui "element-ui"}}
      <el-menu
        theme="dark"
        mode="horizontal"
        router
        style="border-radius: 0;">
        <!-- 导航菜单项 -->
        <el-menu-item index="/index">测试</el-menu-item>
      </el-menu>{{/if_eq}}{{/router}}
      <!-- 右上角用户信息，惯用布局，你懂的 -->
      <!-- <div class="user">
        <span style="padding-left: 14px;">{{userName}}</span>
        <a href="javascript:;" @click="toHome">退出</a>
      </div> -->
    </div>

    <!-- 主体部分，内容将会塞进这里 -->
    <section class="main" ref="main">{{#router}}
      <router-view class="view"></router-view>{{/router}}
    </section>
  </div>
</template>

<script>{{#router}}{{#if_eq ui "sina-ui"}}
  import XMenuLogo from 'components/menu-logo'
  import XMenu from 'components/menu'
  import XMenuItem from 'components/menu-item'{{/if_eq}}{{/router}}

  export default {
    name: 'app',
    computed: {
    },

    watch: {
      {{#router}}
      '$route': {
        immediate: true,
        handler (to, from) {
          // this.activePath = to.path
        }
      }{{/router}}
    },

    methods: {
    },

    mounted () {
    },

    created () {
    },

    components: {
      {{#router}}{{#if_eq ui "sina-ui"}}
      XMenu,
      XMenuLogo,
      XMenuItem{{/if_eq}}{{/router}}
    },

    data () {
      return {
        {{#if_eq ui "sina-ui"}}
        logoSrc: require('assets/logo.png'){{/if_eq}}
      }
    }
  }
</script>

<style>{{#if_eq ui "sina-ui"}}
  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }
  ::-webkit-scrollbar-track-piece {
    background: transparent;
    background: #deebf5
  }
  ::-webkit-scrollbar-thumb {
    background: #a6cfef;
    border-radius: 3px;
    border: 1px solid #94c7ee;
  }
  html, body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    height: 100%;
  }
  html{
    transition: scroll 0.5s;
  }
  body{
    width: 100%;
    overflow: auto;
    /*overflow: hidden;*/
  }
  dl,dt,dd,ul,li{
    margin:0;
    padding:0;
  }
  ul li {
    list-style: none;
  }
  i {
    font-style: normal;
  }
  
  /* 头部 */
  .header {
    position: relative;
  }
  .logo {
    padding-top: 6px;
    width: 35px;
    height: 35px;
    display: inline-block;
  }
  .user {
    position: absolute;
    top: 18px;
    right: 30px;
    color: #fff;
    font: 400 14px/20px Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  }
  .user a:link, .user a:visited {
    margin: 0 0 0 10px;
    text-decoration: none;
    color:#5DAAEC;
  }
  .user a:hover{
    color: #fff;
  }
  .header .x-menu--horizontal .x-menu-item, .header .x-menu--horizontal .x-menu-logo {
    height: 50px;
    padding: 0 16px;
    line-height: 46px;
  }
  .header .x-menu--horizontal .x-menu-logo {
    padding: 0;
    margin: 0 100px 0 30px;
  }
  .header .x-menu-item {
    font-size: 14px;
  }
  .header .x-menu--dark .x-menu-item {
    color: #fff;
  }
  .header .x-menu--dark .x-menu-item.is-active {
    color: #6CB5F4;
  }
  .header .x-badge__content {
    background: #FF9532;
    border: 0;
  }

  /*主体部分*/
  .main {
    z-index: 1;
    /*margin-left: 250px;*/
    padding: 10px 10px 10px 20px;
  }
  .view {
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .pages-container {

  }{{/if_eq}}
</style>
