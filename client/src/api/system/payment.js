/*
 * @Description:
 * @Author: cheung0
 * @Date: 2022-06-05 17:22:40
 */
import request from '@/utils/request';

export function getList(params) {
  return request({
    url: '/payment/queryAll',
    method: 'post',
    params,
  });
}

export function remove(paymentId) {
  return request({
    url: `/payment/delete/${paymentId}`,
    method: 'delete',
  });
}
