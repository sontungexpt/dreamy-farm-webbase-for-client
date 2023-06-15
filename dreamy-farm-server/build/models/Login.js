"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var Login = new Schema({
  email: {
    type: String,
    "default": ''
  },
  password: {
    type: String,
    "default": ''
  },
  loginAt: {
    type: Date,
    "default": Date.now
  },
  logoutAt: {
    type: Date,
    "default": Date.now
  },
  action: {
    type: String,
    "default": 'System'
  }
}, {
  collection: 'Login'
});

// login.index({ first: 1, last: -1 }) Nơi đánh index
var _default = _mongoose["default"].model('Login', Login);
exports["default"] = _default;