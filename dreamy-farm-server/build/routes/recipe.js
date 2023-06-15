"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _RecipeController = _interopRequireDefault(require("../controllers/RecipeController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var recipeController = new _RecipeController["default"]();
router.post('/add', recipeController.addRecipe);
router.get('/detail/:slug', recipeController.show);
router.get('/', recipeController.getRecipes);
var _default = router;
exports["default"] = _default;