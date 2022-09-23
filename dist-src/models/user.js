"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var userSchema = new _mongoose["default"].Schema({
  social_id: {
    type: String
  },
  full_name: {
    type: String
  },
  phone_number: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  thumbnail: {
    type: String
  },
  dob: {
    type: String
  },
  is_profile_complete: {
    type: Boolean,
    "default": false
  }
});

userSchema.methods.hashPassword = function (password) {
  return _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(10));
};

userSchema.methods.comparePassword = function (password, hashPassword) {
  return _bcrypt["default"].compareSync(password, hashPassword);
};

userSchema.plugin(_mongooseTimestamp["default"], {
  'createdAt': 'created_at',
  'updatedAt': 'updated_at'
});

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;