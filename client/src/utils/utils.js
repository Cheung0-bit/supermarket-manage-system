/*
 * @Description: 获取全局API
 * @Author: cheung0
 * @Date: 2022-04-30 14:39:53
 */
const apiUrl = process.env.VUE_APP_BASE_API
export function getApiUrl() {
  return apiUrl
}
