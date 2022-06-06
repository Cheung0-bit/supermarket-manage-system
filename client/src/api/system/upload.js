import request from '@/utils/request'

export function imgUpload(formData) {
  return request({
    url: '/upload/image',
    method: 'post',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    formData,
  })
}