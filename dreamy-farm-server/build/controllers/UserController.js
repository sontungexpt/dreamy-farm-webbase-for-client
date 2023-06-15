'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _Feedback = _interopRequireDefault(require("../models/Feedback"));
var _User = _interopRequireDefault(require("../models/User"));
var _UserInfo = _interopRequireDefault(require("../models/UserInfo"));
var _checkParams = _interopRequireDefault(require("../utils/checkParams"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _configs = _interopRequireDefault(require("../configs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // import nodemailer from 'nodemailer';
var UserController = /*#__PURE__*/_createClass(function UserController() {
  _classCallCheck(this, UserController);
  _defineProperty(this, "forgotPassword", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  _defineProperty(this, "register", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
      var _req$body, name, email, password, encryptedPassword, oldUser;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
            _context2.next = 4;
            return _bcrypt["default"].hash(password, 10);
          case 4:
            encryptedPassword = _context2.sent;
            // check if email is existed
            oldUser = res.locals._user;
            if (!oldUser) {
              _context2.next = 8;
              break;
            }
            return _context2.abrupt("return", res.json({
              status: 'error',
              message: 'Email is existed'
            }));
          case 8:
            _context2.next = 10;
            return _User["default"].create({
              email: email,
              password: encryptedPassword
            });
          case 10:
            _context2.next = 12;
            return _UserInfo["default"].create({
              name: name,
              email: email
            });
          case 12:
            return _context2.abrupt("return", res.json({
              status: 'success',
              message: 'Register successfully'
            }));
          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            res.json({
              status: 'error',
              message: _context2.t0
            });
          case 18:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 15]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  _defineProperty(this, "login", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
      var user, password, token;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            user = res.locals._user;
            password = req.body.password; // if email is existed, check password
            _context3.next = 5;
            return _bcrypt["default"].compare(password, user.password);
          case 5:
            if (!_context3.sent) {
              _context3.next = 12;
              break;
            }
            token = _jsonwebtoken["default"].sign({
              email: user.email
            }, _configs["default"].JWT_SECRET, {
              expiresIn: '15m'
            });
            if (!res.status(201)) {
              _context3.next = 11;
              break;
            }
            return _context3.abrupt("return", res.json({
              status: 'success',
              message: 'Login successfully',
              data: token
            }));
          case 11:
            return _context3.abrupt("return", res.json({
              status: 'error',
              message: 'error'
            }));
          case 12:
            res.json({
              status: 'error',
              message: 'Invalid password'
            });
            _context3.next = 18;
            break;
          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](0);
            res.json({
              status: 'error',
              message: _context3.t0
            });
          case 18:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 15]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  //[GET] /user/infos
  _defineProperty(this, "getUserInfos", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
      var userInfo;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            try {
              userInfo = res.locals._userInfo;
              res.json({
                status: 'success',
                message: 'Get user data successfully',
                data: userInfo
              });
            } catch (error) {
              res.send({
                status: 'error',
                message: error.message,
                error: error
              });
            }
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
  //[POST] /user/feedback
  _defineProperty(this, "feedback", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
      var userInfo, content;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            userInfo = res.locals._userInfo;
            content = req.body.content;
            (0, _checkParams["default"])(req.body, 'content');
            _context5.next = 6;
            return _Feedback["default"].create({
              user: userInfo._id,
              content: content
            });
          case 6:
            res.json({
              status: 'success',
              message: 'Feedback successfully'
            });
            _context5.next = 12;
            break;
          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            res.json({
              status: 'error',
              message: _context5.t0.message,
              error: _context5.t0
            });
          case 12:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 9]]);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
  // [PUT] /user/profile
  _defineProperty(this, "updateProfile", /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
      var userInfo, _req$body2, name, sex;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            userInfo = res.locals._userInfo;
            _req$body2 = req.body, name = _req$body2.name, sex = _req$body2.sex;
            if (name) userInfo.name = name;
            if (sex) userInfo.sex = sex;
            _context6.next = 7;
            return userInfo.save();
          case 7:
            res.json({
              status: 'success',
              message: 'Update profile successfully',
              data: userInfo
            });
            _context6.next = 13;
            break;
          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](0);
            res.send({
              status: 'error',
              message: _context6.t0.message,
              error: _context6.t0
            });
          case 13:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 10]]);
    }));
    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
  // [PUT] /user/addAddress
  _defineProperty(this, "addAddress", /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
      var userInfo, _req$body3, phoneNumber, address, oldAddress;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            userInfo = res.locals._userInfo;
            _req$body3 = req.body, phoneNumber = _req$body3.phoneNumber, address = _req$body3.address;
            (0, _checkParams["default"])(req.body, 'phoneNumber', 'address');

            // check if address is existed
            oldAddress = userInfo.addreses.find(function (item) {
              return item.phoneNumber === phoneNumber && item.address === address;
            });
            if (!oldAddress) {
              _context7.next = 7;
              break;
            }
            return _context7.abrupt("return", res.json({
              status: 'error',
              message: 'Address is existed',
              data: userInfo.addreses
            }));
          case 7:
            if (!(userInfo.addreses.length === 12)) {
              _context7.next = 9;
              break;
            }
            return _context7.abrupt("return", res.json({
              status: 'warning',
              message: 'You can only add 12 addresses, please delete some address'
            }));
          case 9:
            // change active of old address
            userInfo.addreses = userInfo.addreses.map(function (item) {
              return _objectSpread(_objectSpread({}, item), {}, {
                active: false
              });
            });
            userInfo.addreses.push({
              phoneNumber: phoneNumber,
              address: address,
              active: true
            });
            userInfo.markModified('addreses');
            _context7.next = 14;
            return userInfo.save();
          case 14:
            res.json({
              status: 'success',
              message: 'Add address successfully',
              data: userInfo.addreses
            });
            _context7.next = 20;
            break;
          case 17:
            _context7.prev = 17;
            _context7.t0 = _context7["catch"](0);
            res.send({
              status: 'error',
              message: _context7.t0.message,
              error: _context7.t0
            });
          case 20:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 17]]);
    }));
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
  // [PUT] /user/updateAddress
  _defineProperty(this, "updateAddress", /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
      var userInfo, _req$body4, oldPhoneNumber, oldAddress, newPhoneNumber, newAddress, newActive, addressIndex, notChange;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            userInfo = res.locals._userInfo;
            _req$body4 = req.body, oldPhoneNumber = _req$body4.oldPhoneNumber, oldAddress = _req$body4.oldAddress, newPhoneNumber = _req$body4.newPhoneNumber, newAddress = _req$body4.newAddress, newActive = _req$body4.newActive;
            (0, _checkParams["default"])(req.body, 'oldPhoneNumber', 'oldAddress');

            // find address by phoneNumber and current address
            addressIndex = userInfo.addreses.findIndex(function (item) {
              return item.phoneNumber === oldPhoneNumber && item.address === oldAddress;
            }); // if address is not existed
            if (!(addressIndex === -1)) {
              _context8.next = 9;
              break;
            }
            return _context8.abrupt("return", res.json({
              status: 'error',
              message: 'Address is not existed'
            }));
          case 9:
            // change active of old address to false
            if (newActive) {
              userInfo.addreses = userInfo.addreses.map(function (item) {
                return _objectSpread(_objectSpread({}, item), {}, {
                  active: false
                });
              });
            }
            notChange = true;
            if (newAddress && newAddress !== oldAddress) {
              notChange = false;
            } else if (newPhoneNumber && newPhoneNumber !== oldPhoneNumber) {
              notChange = false;
            } else if (newActive && newActive !== userInfo.addreses[addressIndex].active) {
              notChange = false;
            }
            if (!notChange) {
              _context8.next = 14;
              break;
            }
            return _context8.abrupt("return", res.json({
              status: 'success',
              message: 'Nothing change'
            }));
          case 14:
            if (newAddress) userInfo.addreses[addressIndex].address = newAddress;
            if (newPhoneNumber) userInfo.addreses[addressIndex].phoneNumber = newPhoneNumber;
            if (newActive) userInfo.addreses[addressIndex].active = newActive;
            userInfo.markModified('addreses');
            _context8.next = 20;
            return userInfo.save();
          case 20:
            res.json({
              status: 'success',
              message: 'Update address successfully',
              data: userInfo.addreses
            });
          case 21:
            _context8.next = 26;
            break;
          case 23:
            _context8.prev = 23;
            _context8.t0 = _context8["catch"](0);
            res.send({
              status: 'error',
              message: _context8.t0.message,
              error: _context8.t0
            });
          case 26:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 23]]);
    }));
    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());
  // [PUT] /user/deleteAddress
  _defineProperty(this, "deleteAddress", /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
      var userInfo, _req$body5, phoneNumber, address, addressIndex, removeActive;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            userInfo = res.locals._userInfo;
            _req$body5 = req.body, phoneNumber = _req$body5.phoneNumber, address = _req$body5.address;
            (0, _checkParams["default"])(req.body, 'phoneNumber', 'address');

            // find address by phoneNumber and current address
            addressIndex = userInfo.addreses.findIndex(function (item) {
              return item.phoneNumber === phoneNumber && item.address === address;
            }); // if address is not existed
            if (!(addressIndex === -1)) {
              _context9.next = 9;
              break;
            }
            return _context9.abrupt("return", res.json({
              status: 'error',
              message: 'Address is not existed'
            }));
          case 9:
            removeActive = userInfo.addreses[addressIndex].active;
            userInfo.addreses.splice(addressIndex, 1);
            if (removeActive) {
              if (userInfo.addreses.length > 0) {
                userInfo.addreses[0].active = true;
              }
            }
            userInfo.markModified('addreses');
            _context9.next = 15;
            return userInfo.save();
          case 15:
            res.json({
              status: 'success',
              message: 'Delete address successfully',
              data: userInfo.addreses
            });
          case 16:
            _context9.next = 21;
            break;
          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9["catch"](0);
            res.send({
              status: 'error',
              message: _context9.t0.message,
              error: _context9.t0
            });
          case 21:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 18]]);
    }));
    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());
});
var _default = UserController;
exports["default"] = _default;