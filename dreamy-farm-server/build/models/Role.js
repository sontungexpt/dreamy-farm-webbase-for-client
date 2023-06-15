"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ROLES = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var ROLES = ['user', 'admin', 'moderator'];
exports.ROLES = ROLES;
var Role = new Schema({
  name: String
});
var _default = _mongoose["default"].model('Role', Role);
exports["default"] = _default;