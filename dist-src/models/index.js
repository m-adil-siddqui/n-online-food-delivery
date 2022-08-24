"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.conDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("./user"));

var _category = _interopRequireDefault(require("./category"));

var _product = _interopRequireDefault(require("./product"));

require('dotenv').config();

var conDb = function conDb() {
  // const db_uri = `mongodb+srv://rbx-adee-011:insert4455@flutter-node-api0.nhqw2.mongodb.net/
  // flutter-node-api011?retryWrites=true&w=majority`;
  var db_uri = "mongodb+srv://onlinefooddelivery:insert 4455@cluster0.yjclf.mongodb.net/onlinefooddelivery?retryWrites=true&w=majority"; // return mongoose.connect("mongodb://localhost:27017/flutter_auth");

  return _mongoose["default"].connect(db_uri, {
    useNewUrlParser: true // useCreateIndex:true,
    // useUnifiedTopology:true,
    // useFindAndModify:false

  });
};

exports.conDb = conDb;
var models = {
  User: _user["default"],
  Category: _category["default"],
  Product: _product["default"]
};
var _default = models;
exports["default"] = _default;