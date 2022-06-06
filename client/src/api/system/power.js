import request from '@/utils/request'
import qs from 'qs'

export function getPowerList(params) {
  return request({
    url: '/power/queryAll',
    method: 'get',
    params
  })
}

export function getPowerListByRole(roleId) {
  return request({
    url: `/power/queryByRole/${roleId}`,
    method: 'get'
  })
}

export function setPower(data) {
  return request({
    url: '/power/setPower',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function savePower(form) {
  return request({
    url: '/power/addPower',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: form
  })
}

export function remove(powerId) {
  return request({
    url: `/power/deletePower/${powerId}`,
    method: 'delete'
  })
}

export function changeStatus(params) {
  return request({
    url: '/power/updateEnable',
    method: 'put',
    data: qs.stringify(params)
  })
}
