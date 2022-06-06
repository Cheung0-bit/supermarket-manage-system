import request from '@/utils/request'
import qs from 'qs'

export function getList(params) {
  return request({
    url: '/user/queryAll',
    method: 'get',
    params
  })
}

export function saveUser(params) {
  return request({
    url: '/user/addUser',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}

export function remove(userId) {
  return request({
    url: `/user/deleteUser/${userId}`,
    method: 'delete'
  })
}

export function setRole(params) {
  return request({
    url: '/user/setRole',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function changeStatus(params) {
  return request({
    url: '/user/updateEnable',
    method: 'put',
    data: qs.stringify(params)
  })
}


export function resetPassword(userId) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    params: {
      userId
    }
  })
}