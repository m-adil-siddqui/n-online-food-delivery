"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

exports.auth = function (req, res, next) {
  try {
    var _token = req.headers.authorization.split(" ")[1];

    _jsonwebtoken["default"].verify(_token, "sldfsd0fas9df809as8f");

    var _payload = _jsonwebtoken["default"].decode(_token);

    req.payload = _payload;
    next();
  } catch (e) {
    res.status(401).json({
      "statusCode": 401,
      "message": "Unauth­orized"
    });
  }
};