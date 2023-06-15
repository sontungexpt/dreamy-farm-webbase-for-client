"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.ObjectId;
var FavoriteProduct = new Schema({
  user: {
    type: ObjectId,
    ref: 'UserInfo'
  },
  product: {
    type: ObjectId,
    ref: 'Product'
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('FavoriteProduct', FavoriteProduct);
exports["default"] = _default;