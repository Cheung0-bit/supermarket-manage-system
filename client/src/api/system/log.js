import request from '@/utils/request';

export function getLogintList(params) {
  return request({
    url: '/log/queryAllLogin',
    method: 'post',
    params,
  });
}

export function getExceptionList(params) {
  return request({
    url: '/log/queryAllException',
    method: 'post',
    params,
  });
}

export function getOperateList(params) {
  return request({
    url: '/log/queryAllOperate',
    method: 'post',
    params,
  });
}

export function deleteLog(logId) {
  return request({
    url: `/log/delete/${logId}`,
    method: 'delete',
  });
}
