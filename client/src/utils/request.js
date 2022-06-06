/*
 * @Description: 网络请求工具
 * @Author: cheung0
 * @Date: 2022-04-30 14:39:53
 */
import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
import router from '@/router';

// 创建Axios全局实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + '/api',
  withCredentials: false, // 设置请求时带Cookies
  timeout: 25000, // 请求延迟
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 发送前
    var token = getToken();
    if (token) {
      config.headers['Authorization'] = token; // 让每个请求携带自定义token
    }
    return config;
  },
  error => {
    // 失败后
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code != 200) {
      Message({
        message: res.msg,
        type: 'error',
      });
      return Promise.reject(res);
    } else {
      return response;
    }
  },
  error => {
    // 失败后
    console.log(error); // for debug
    if (error.response.status === 401) {
      store.dispatch('user/logout').then(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.path,
          },
        });
      });
      return;
    } else if (error.response.status === 403) {
      Message({
        message: '权限不足',
        type: 'error',
        duration: 5 * 1000,
      });
    } else {
      Message({
        message: error,
        type: 'error',
        duration: 5 * 1000,
      });
    }
    return Promise.reject(error);
  },
);

export default service;
