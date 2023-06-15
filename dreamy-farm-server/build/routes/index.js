"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _product = _interopRequireDefault(require("./product"));
var _user = _interopRequireDefault(require("./user"));
var _site = _interopRequireDefault(require("./site"));
var _recipe = _interopRequireDefault(require("./recipe"));
var _order = _interopRequireDefault(require("./order"));
var _favoriteProduct = _interopRequireDefault(require("./favoriteProduct"));
var _UserMiddlewares = require("../middlewares/UserMiddlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function route(app) {
  app.use('/recipes', _recipe["default"]);
  app.use('/products', _product["default"]);
  app.use('/user/favoriteProducts', _UserMiddlewares.checkToken, _UserMiddlewares.checkUser, _favoriteProduct["default"]);
  app.use('/user', _UserMiddlewares.checkToken, _UserMiddlewares.checkUser, _user["default"]);
  app.use('/order', _UserMiddlewares.checkToken, _UserMiddlewares.checkUser, _order["default"]);
  app.use('/', _site["default"]);
}
var _default = route;
exports["default"] = _default;