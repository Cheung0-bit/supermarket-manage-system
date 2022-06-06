import request from '@/utils/request'
import qs from 'qs'

export function getList(params) {
  return request({
    url: '/role/queryAll',
    method: 'get',
    params
  })
}

export function saveRole(form) {
  return request({
    url: '/role/addRole',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: form
  })
}

export function remove(roleId) {
  return request({
    url: `/role/deleteRole/${roleId}`,
    method: 'delete'
  })
}

export function changeStatus(params) {
  return request({
    url: '/role/updateEnable',
    method: 'put',
    data: qs.stringify(params)
  })
}

export function savePermissons(params) {
  return request({
    url: '/role/savePermisson',
    method: 'post',
    params
  })
}