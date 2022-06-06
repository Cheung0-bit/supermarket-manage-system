/*
 * @Description: 信息校验工具
 * @Author: cheung0
 * @Date: 2022-04-30 14:39:53
 */
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 校验用户名,必须是5-32位
 * @param {string} str
 * @returns {Boolean}
 */
export function isvalidUsername(str) {
  var reg = /^[0-9A-Za-z]{3,32}$/;
  return reg.test(str)
}

/**
 * 校验密码
 * @param {string} str 
 */
export function isvalidPassword(str) {
  if ("" == str || str.length < 5 || str.length > 32) {
    return false;
  } else {
    return true;
  }
}

/**
 * 校验验证码
 * @param {string} str 
 * @returns 
 */
export function isvalidCaptcha(str) {
  var reg = /^[0-9A-Za-z]{4}$/;
  if (!reg.test(str)) {
    return false;
  } else {
    return true;
  }
}