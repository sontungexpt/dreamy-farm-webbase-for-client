"use strict";

var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _methodOverride = _interopRequireDefault(require("method-override"));
var _cors = _interopRequireDefault(require("cors"));
var _configs = _interopRequireDefault(require("./configs"));
var _routes = _interopRequireDefault(require("./routes"));
var _database = _interopRequireDefault(require("./configs/database"));
var _initial = require("./utils/initial");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var PORT = process.env.PORT || _configs["default"].PORT;
app.use(_express["default"]["static"]('public'));
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('combined'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _methodOverride["default"])('_method'));
_database["default"].connect();
(0, _initial.initialProducts)();
(0, _initial.initialRecipes)();
(0, _routes["default"])(app);
app.listen(PORT, function () {
  console.log("Server listening on ".concat(PORT));
});