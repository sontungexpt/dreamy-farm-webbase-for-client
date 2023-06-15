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
var ObjectId = Schema.ObjectId;
var Product = new Schema({
  order: [{
    type: ObjectId,
    ref: 'Order',
    "default": null
  }],
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    "default": ''
  },
  //category: fruit, vegetable, herb_aromatic, frozen, meat_seafood, dairy_egg
  category: {
    type: String,
    required: true
  },
  types: {
    type: Array,
    "default": [{
      name: '',
      price: 0
    }]
  },
  // the number of products sold
  sold: {
    type: Number,
    "default": 0
  },
  // the number of products in stock
  inventory: {
    type: Number,
    "default": 0
  },
  // status: stock, out-of-stock, incoming
  status: {
    type: String,
    "default": 'stock'
  },
  description: {
    type: String,
    "default": ''
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  }
}, {
  timestamps: true
});
Product.index({
  slug: 1
});
var _default = _mongoose["default"].model('Product', Product);
exports["default"] = _default;