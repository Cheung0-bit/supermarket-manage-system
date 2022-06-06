/**
 * Cookie处理工具
 * Key --- jwt
 * Value --- metric-xxx
 */
const TokenKey = 'jwt';

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}
