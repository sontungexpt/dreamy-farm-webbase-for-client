"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var slug = require('mongoose-slug-updater');
_mongoose["default"].plugin(slug);
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
  // the total time to make the dish
  totalTime: {
    type: String,
    "default": ''
  },
  ingredients: {
    type: Array,
    "default": [{
      type: String,
      "default": ''
    }]
  },
  steps: {
    type: Array,
    "default": [{
      type: String,
      "default": ''
    }]
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  }
}, {
  timestamps: true
});
Recipe.index({
  name: 'slug'
});
var _default = _mongoose["default"].model('Recipe', Recipe);
exports["default"] = _default;