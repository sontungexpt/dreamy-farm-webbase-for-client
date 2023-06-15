"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.ObjectId;
var UserInfo = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255
  },
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  sex: {
    type: String,
    "default": '',
    maxlength: 255
  },
  addreses: {
    type: Array,
    validate: {
      validator: function validator(array) {
        return array.every(function (v) {
          var addressValidated = typeof v.address === 'string';
          var phoneNumberValidated = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/.test(v.phoneNumber) || v.phoneNumber === '';
          var addressActiveValidated = typeof v.active === 'boolean';
          return addressValidated && phoneNumberValidated && addressActiveValidated;
        });
      },
      message: function message(props) {
        for (var i = 0; i < props.value.length; i++) {
          var addressValidated = typeof props.value[i].address === 'string';
          if (!addressValidated) return "".concat(props.value[i].address, " is not a valid address!");
          var phoneNumberValidated = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/.test(props.value[i].phoneNumber) || props.value[i].phoneNumber === '';
          if (!phoneNumberValidated) return "".concat(props.value[i].phoneNumber, " is not a valid phone number!");
          var addressActiveValidated = typeof props.value[i].active === 'boolean';
          if (!addressActiveValidated) return "".concat(props.value[i].active, " is not a valid active!");
        }
      }
    },
    "default": []
  },
  avatar: {
    type: String,
    "default": ''
  }
});
UserInfo.index({
  email: 1
});
var _default = _mongoose["default"].model('UserInfo', UserInfo);
exports["default"] = _default;