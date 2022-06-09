/*
 * @Description:
 * @Author: cheung0
 * @Date: 2022-06-05 17:22:40
 */
import request from '@/utils/request';

export function getList(params) {
  return request({
    url: '/goods/queryAll',
    method: 'post',
    params,
  });
}

export function saveGoods(params) {
  return request({
    url: '/goods/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export function remove(goodsId) {
  return request({
    url: `/goods/delete/${goodsId}`,
    method: 'delete',
  });
}
