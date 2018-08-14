/**
 * 全局router对象，用来管理路由配置
 * 2.0 vue-router 配置见https://github.com/vuejs/vue-router/blob/43183911dedfbb30ebacccf2d76ced74d998448a/examples/redirect/app.js#L13-L39
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component(resolve) {
        require(['./pages/index/index.vue'], resolve)
      },
      meta: {
        title: 'SPA 应用'
      }
    },
    {
      name: 'nofound',
      path: '/nofound',
      component(resolve) {
        require(['./pages/nofound.vue'], resolve)
      },
      meta: {
        title: 'NoFound'
      }
    },
    {
      path: '*',
      redirect: '/nofound'
    }
  ]
})

/**
 * 权限验证拦截器
 */
const authInterceptor = (router, redirect, next) => {
  if (router.auth) {
    // @TODO 判断权限，如果权限不通过，执行redirect
    // redirect('/')
  }
  // 通过，执行next()
  next()
}

/**
 * [backFill 设置在所有路由执行前执行]
 * @param  {[Object]}   route    [当前路由对象]
 * @param  {[Function]}   redirect [调用跳转至另一路由]
 * @param  {Function} next     [调用继续当前路由跳转]
 * 什么都不做，则取消当前跳转
 * @return {[type]}            [description]
 */
function backFill(route, redirect, next) {
  next()
}

/**
 * [设置在所有路由执行前执行]
 * @param  {[Object]}     route    [当前路由对象]
 * @param  {[Function]}   redirect [调用跳转至另一路由]
 * @param  {Function}     next     [调用继续当前路由跳转]
 * 什么都不做，则取消当前跳转 * @return {[type]}           [description]
 */
router.beforeEach((route, redirect, next) => {
  if (route.meta.needAuth) {
    authInterceptor(route, redirect, next)
  } else if (redirect.matched.some(m => m.meta.needConfirm) && !route.query.ignoreConfirm) {
    {{#if_eq ui "element-ui"}}
    MessageBox.confirm(
      '页面未保存，确定离开此页面吗?',
      '提示',
      {
        type: 'warning',
        cancelButtonText: '留在该页面',
        confirmButtonText: '确定离开'
      }
    )
      .then(() => {
        backFill(route, redirect, next)
      })
      .catch(() => {
        next(false)
      }){{else}}
      // 执行一些逻辑
      {{/if_eq}}
  } else {
    next()
  }
})

/**
 * [hideTopBar 设置在所有路由成功进入后执行的函数]
 * @param  {[type]}   [description]
 * @return {[type]}   [description]
 */
router.afterEach((route) => {
  // console.log(route.query)
  // 如果是needConfirm的页面，那么进入后要设置beforeunload
  if (route.meta.needConfirm) {
    // 不适用拦截的时候用这个
    window.onbeforeunload = function (event) {
      event.returnValue = '页面未保存，确定离开此页面吗？'
    }
  } else {
    window.onbeforeunload = null
  }
  // 如果有title，那么修改title, 否则用普通的项目title
  document.title = route.meta.title || 'SPA 应用'
})

export default router
