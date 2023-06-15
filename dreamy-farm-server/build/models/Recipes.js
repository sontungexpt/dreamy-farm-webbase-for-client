"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var Recipe = new Schema({
  name: {
    type: String,
    "default": ''
  },
  image: {
    type: String,
    "default": ''
  },
  description: {
    type: String,
    "default": ''
  },
  totalTime: {
    type: String,
    "default": ''
  },
  steps: {
    type: Array,
    "default": [{
      step: {
        type: String,
        "default": ''
      }
    }]
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('Recipe', Recipe);
exports["default"] = _default;