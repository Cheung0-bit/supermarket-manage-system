/*
 * @Description: 用户接口
 * @Author: cheung0
 * @Date: 2022-04-30 14:39:53
 */
import request from '@/utils/request';
import qs from 'qs';

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: qs.stringify({
      username: data.username,
      password: data.password,
    }),
  });
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/user/account',
    method: 'get',
  });
}

// 登出
export function logout(token) {
  return request({
    url: '/logout',
    method: 'post',
  });
}

/**
 * 修改密码
 * @param {string} params
 * @returns
 */
export function updatePwd(params) {
  return request({
    url: '/user/updatePassword',
    method: 'put',
    data: qs.stringify(params),
  });
}

export function getQrcodeStatus(params) {
  return request({
    url: '/account/qrcode/getRet',
    method: 'get',
    params,
  });
}