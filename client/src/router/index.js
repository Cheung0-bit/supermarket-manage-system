/*
 * @Description: 
 * @Author: cheung0
 * @Date: 2022-04-30 14:39:53
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入整体布局
import Layout from '@/layout'

/**
 * 要点: sub-menu仅在子路由长度大于一时才出现
 *
 * hidden: true                   如果设置为true，则导航栏将不会在侧边栏中显示（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 * redirect: noRedirect           如果设置的noRedirect不会在面包屑中重定向
 * name:'router-name'             该名称由<keep-alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（您可以设置多个角色）
    title: 'title'               侧栏和面包屑的名称显示（建议集）
    icon: 'svg-name'             侧边栏中的图标节目
    breadcrumb: false            如果设置为false，则该项目将隐藏在面包屑中（默认为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantroutes
 * 所有角色都可访问的没有权限要求的基本页面
 */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'login'
    },
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/account',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [{
      path: 'profile',
      name: '个人资料',
      component: () => import('@/views/account/profile.vue'),
      meta: {
        title: '个人资料'
      }
    }]
  },
]

const createRouter = () => new Router({
  mode: 'hash', // 关闭hash模式 去除URL中的锚点
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router