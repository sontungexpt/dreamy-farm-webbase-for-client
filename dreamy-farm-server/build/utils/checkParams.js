"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function checkParams(params) {
  for (var _len = arguments.length, requiredParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    requiredParams[_key - 1] = arguments[_key];
  }
  var missingParams = requiredParams.filter(function (param) {
    if (typeof param !== 'string') {
      throw new Error("Require ".concat(param, " must be a string"));
    }
    return !params[param];
  });
  if (missingParams.length > 0) {
    throw new Error("Missing required params: ".concat(missingParams.join(', ')));
  }
}
var _default = checkParams;
exports["default"] = _default;