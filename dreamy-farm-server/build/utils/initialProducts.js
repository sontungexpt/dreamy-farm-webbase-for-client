"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Product = _interopRequireDefault(require("../models/Product"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function initialProducts() {
  new _Product["default"]({
    name: 'Product 1',
    price: 10,
    category: 'fruit',
    types: [{
      name: '100g',
      price: 100
    }, {
      name: '200g',
      price: 200
    }],
    description: 'Description 1'
  }).save();
  new _Product["default"]({
    name: 'Product 2',
    category: 'fruit',
    types: [{
      name: '100g',
      price: 100
    }, {
      name: '200g',
      price: 200
    }],
    price: 20,
    description: 'Description 2'
  }).save();
  new _Product["default"]({
    name: 'Product 3',
    category: 'fruit',
    types: [{
      name: '100g',
      price: 100
    }, {
      name: '200g',
      price: 200
    }],
    price: 30,
    description: 'Description 3'
  }).save();
  new _Product["default"]({
    name: 'Product 4',
    category: 'fruit',
    types: [{
      name: '100g',
      price: 100
    }, {
      name: '200g',
      price: 200
    }, {
      name: '400g',
      price: 400
    }, {
      name: '500g',
      price: 500
    }],
    price: 40,
    description: 'Description 4'
  }).save();
  new _Product["default"]({
    types: [{
      name: '100g',
      price: 100
    }, {
      name: '200g',
      price: 200
    }],
    name: 'Product 5',
    price: 50,
    category: 'fruit',
    description: 'Description 5'
  }).save();
}
var _default = initialProducts;
exports["default"] = _default;