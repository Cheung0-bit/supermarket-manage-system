/*
 * @Description: 标题处理工具
 * @Author: cheung0
 * @Date: 2022-04-30 14:39:53
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} | ${title}`
  }
  return `${title}`
}
