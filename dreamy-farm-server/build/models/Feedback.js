"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.ObjectId;
var Feedback = new Schema({
  user: {
    type: ObjectId,
    ref: 'UserInfo'
  },
  content: {
    type: String,
    "default": ''
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('Feedback', Feedback);
exports["default"] = _default;