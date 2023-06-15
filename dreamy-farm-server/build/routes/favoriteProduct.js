"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _FavoriteProductController = _interopRequireDefault(require("../controllers/FavoriteProductController"));
var _UserMiddlewares = require("../middlewares/UserMiddlewares");
var _useMiddlewares = _interopRequireDefault(require("../utils/useMiddlewares"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var favoriteProductController = new _FavoriteProductController["default"]();
var middlewares = {
  '/get': [_UserMiddlewares.checkIsUser, _UserMiddlewares.checkUserInfo],
  '/update': [_UserMiddlewares.checkIsUser, _UserMiddlewares.checkUserInfo]
};
(0, _useMiddlewares["default"])(router, middlewares);
router.put('/update', favoriteProductController.update);
router.post('/get', favoriteProductController.get);
var _default = router;
exports["default"] = _default;