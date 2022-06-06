"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetRouter = resetRouter;
exports["default"] = exports.constantRoutes = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _layout = _interopRequireDefault(require("@/layout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]); // 引入整体布局


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
var constantRoutes = [{
  path: '/redirect',
  component: _layout["default"],
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/redirect/index'));
      });
    }
  }]
}, {
  path: '/login',
  name: 'login',
  meta: {
    title: 'login'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/login/index'));
    });
  },
  hidden: true
}, {
  path: '/404',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/404'));
    });
  },
  hidden: true
}, {
  path: '/',
  component: _layout["default"],
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'dashboard',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/dashboard/index'));
      });
    },
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      affix: true
    }
  }]
}, {
  path: '/account',
  component: _layout["default"],
  hidden: true,
  redirect: 'noredirect',
  children: [{
    path: 'profile',
    name: '个人资料',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/account/profile.vue'));
      });
    },
    meta: {
      title: '个人资料'
    }
  }]
}];
exports.constantRoutes = constantRoutes;

var createRouter = function createRouter() {
  return new _vueRouter["default"]({
    mode: 'hash',
    // 关闭hash模式 去除URL中的锚点
    scrollBehavior: function scrollBehavior() {
      return {
        y: 0
      };
    },
    routes: constantRoutes
  });
};

var router = createRouter();

function resetRouter() {
  var newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

var _default = router;
exports["default"] = _default;