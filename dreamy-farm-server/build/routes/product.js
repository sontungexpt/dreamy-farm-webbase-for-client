"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _ProductController = _interopRequireDefault(require("../controllers/ProductController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var productController = new _ProductController["default"]();

// router.get('/vegetables', productController.vegetables);

// router.get('/herbs-aromatics', productController.herbs_aromatics);

// router.get('/frozens', productController.frozens);

// router.get('/meats-seafoods', productController.meats_seafoods);

// router.get('/dairy-eggs', productController.dairy_eggs);

// router.get('/fruits', productController.fruits);

router.post('/create', productController.create);
router.get('/detail/:slug', productController.show);
router.get('/:category', productController.getProductAtCategory);
var _default = router;
exports["default"] = _default;