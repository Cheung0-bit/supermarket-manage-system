/*
 * @Description: 路由守卫---权限集中配置
 * @Author: cheung0
 * @Date: 2022-04-30 14:39:53
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // 加载进度条
import 'nprogress/nprogress.css' // 加载进度条样式
import {
  getToken
} from '@/utils/auth' // Token处理工具类
import getPageTitle from '@/utils/get-page-title' // 获取页面标题工具类
import i18n from '@/lang' // 国际化

NProgress.configure({
  showSpinner: false
}) // 进度条配置

const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // set page title,如果不使用国际化,to.meta.title
  document.title = getPageTitle(to.meta.title)

  // 确人用户是否已经登录
  const hasToken = getToken()

  if (hasToken) {
    // 有Token
    if (to.path === '/login') {
      // 已登陆 跳转主页
      next({
        path: '/'
      })
      NProgress.done() 
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          const userInfo = await store.dispatch('user/getInfo')
          router.addRoutes(userInfo.routes)
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
} else {
  // 无Token
  if (whiteList.indexOf(to.path) !== -1) {
    // 路由白名单
    next()
  } else {
    // 无权限则重定向
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
}
})

router.afterEach(() => {
  NProgress.done()
})