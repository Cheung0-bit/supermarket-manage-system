/*
 * @Description:
 * @Author: cheung0
 * @Date: 2022-06-05 17:22:40
 */
import request from '@/utils/request';

export function getList(params) {
  return request({
    url: '/feedback/queryAll',
    method: 'post',
    params,
  });
}

export function remove(feedbackId) {
  return request({
    url: `/feedback/delete/${feedbackId}`,
    method: 'delete',
  });
}
export function reply(params) {
  return request({
    url: '/feedback/reply',
    method: 'put',
    params,
  });
}
