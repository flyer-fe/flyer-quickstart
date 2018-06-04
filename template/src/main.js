{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}{{#router}}
import router from './router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}{{/router}}
Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}{{#if_eq ui "element-ui"}}
import Loading from 'components/loading'
Vue.use(Loading){{/if_eq}}

// 初始化产品线和权限
// let initData = () => {
//   return {}
// }

// 初始化应用视口
// let initView = () => {
//   return new Promise((resolve, reject) => {
//     resolve()
//   })
// }

// 登录一下
let login = () => {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

/* eslint-disable no-new */
login()
  .then(() => {
    new Vue({
      el: '#app',
      {{#router}}
      router,
      {{/router}}
      {{#if_eq build "runtime"}}
      render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
      {{/if_eq}}
      {{#if_eq build "standalone"}}
      template: '<App/>',
      components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
      {{/if_eq}}
    })
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
