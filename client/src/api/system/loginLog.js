/*
 * @Description:
 * @Author: cheung0
 * @Date: 2022-06-05 17:22:40
 */
import request from '@/utils/request';

export function getList(params) {
  return request({
    url: '/loginLog/list',
    method: 'get',
    params,
  });
}

export function clear() {
  return request({
    url: '/loginLog',
    method: 'delete',
  });
}
