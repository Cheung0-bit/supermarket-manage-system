"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPowerList = getPowerList;
exports.getPowerListByRole = getPowerListByRole;
exports.setPower = setPower;
exports.savePower = savePower;
exports.remove = remove;
exports.changeStatus = changeStatus;

var _request = _interopRequireDefault(require("@/utils/request"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getPowerList(params) {
  return (0, _request["default"])({
    url: '/power/queryAll',
    method: 'get',
    params: params
  });
}

function getPowerListByRole(roleId) {
  return (0, _request["default"])({
    url: "/power/queryByRole/".concat(roleId),
    method: 'get'
  });
}

function setPower(data) {
  return (0, _request["default"])({
    url: '/power/setPower',
    method: 'post',
    data: _qs["default"].stringify(data)
  });
}

function savePower(form) {
  return (0, _request["default"])({
    url: '/power/addPower',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: form
  });
}

function remove(powerId) {
  return (0, _request["default"])({
    url: "/power/deletePower/".concat(powerId),
    method: 'delete'
  });
}

function changeStatus(params) {
  return (0, _request["default"])({
    url: '/power/updateEnable',
    method: 'put',
    data: _qs["default"].stringify(params)
  });
}