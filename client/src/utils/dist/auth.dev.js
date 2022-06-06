"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = getToken;
exports.setToken = setToken;
exports.removeToken = removeToken;

/**
 * Cookie处理工具
 * Key --- jwt
 * Value --- metric-xxx
 */
var TokenKey = 'jwt';

function getToken() {
  return sessionStorage.getItem(TokenKey);
}

function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);
}

function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}