"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.getInfo = getInfo;
exports.logout = logout;
exports.updatePwd = updatePwd;
exports.getQrcodeStatus = getQrcodeStatus;

var _request = _interopRequireDefault(require("@/utils/request"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Description: 用户接口
 * @Author: cheung0
 * @Date: 2022-04-30 14:39:53
 */
// 登录
function login(data) {
  return (0, _request["default"])({
    url: '/login',
    method: 'post',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'text/plain'
    },
    data: _qs["default"].stringify({
      'username': data.username,
      'password': data.password,
      'captcha': data.captcha
    })
  });
} // 获取用户信息


function getInfo() {
  return (0, _request["default"])({
    url: '/user/account',
    method: 'get'
  });
} // 登出


function logout(token) {
  return (0, _request["default"])({
    url: '/logout',
    method: 'post'
  });
}
/**
 * 修改密码
 * @param {string} params 
 * @returns 
 */


function updatePwd(params) {
  return (0, _request["default"])({
    url: '/user/updatePassword',
    method: 'put',
    data: _qs["default"].stringify(params)
  });
}

function getQrcodeStatus(params) {
  return (0, _request["default"])({
    url: '/account/qrcode/getRet',
    method: 'get',
    params: params
  });
}