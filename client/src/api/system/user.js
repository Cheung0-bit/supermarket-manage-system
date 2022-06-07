/*
 * @Description:
 * @Author: cheung0
 * @Date: 2022-06-05 17:22:40
 */
import request from '@/utils/request';
import qs from 'qs';

export function getList(params) {
  return request({
    url: '/user/queryAll',
    method: 'post',
    params,
  });
}

export function saveUser(params) {
  return request({
    url: '/user/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export function remove(userId) {
  return request({
    url: `/user/delete/${userId}`,
    method: 'delete',
  });
}

export function setRole(params) {
  return request({
    url: '/user/setRole',
    method: 'post',
    data: qs.stringify(params),
  });
}

export function changeStatus(params) {
  return request({
    url: '/user/updateEnable',
    method: 'put',
    data: qs.stringify(params),
  });
}

export function resetPassword(userId) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    params: {
      userId,
    },
  });
}
