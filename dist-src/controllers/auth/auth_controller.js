"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = _interopRequireDefault(require("../../models"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
Register User
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/
exports.registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _user, _token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _user = new _models["default"].User();
            _user.full_name = req.body.full_name;
            _user.email = req.body.email;
            _user.password = _user.hashPassword(req.body.password);

            _user.save();

            _token = _jsonwebtoken["default"].sign({
              id: _user._id,
              email: _user.email
            }, "sldfsd0fas9df809as8f", {
              expiresIn: "1h"
            });
            return _context.abrupt("return", res.status(200).json({
              'token': _token
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              error: "ERROR: ".concat(_context.t0.message)
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _user, _token, data;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models["default"].User.findOne({
              'email': req.body.email
            });

          case 3:
            _user = _context2.sent;
            console.log(_user);

            if (_user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(422).json({
              "message": "Login credentials is wrong.",
              "_error": true
            }));

          case 7:
            if (!_bcrypt["default"].compareSync(req.body.password, _user.password)) {
              _context2.next = 13;
              break;
            }

            _token = _jsonwebtoken["default"].sign({
              id: _user._id,
              email: _user.email
            }, "sldfsd0fas9df809as8f", {
              expiresIn: "1h"
            });
            data = {
              "token": _token,
              "user": _user
            };
            return _context2.abrupt("return", res.status(200).json({
              "message": "Logged in successfully",
              "data": data,
              "_error": false
            }));

          case 13:
            return _context2.abrupt("return", res.status(422).json({
              "message": "Login credentials is wrong.",
              "_error": true
            }));

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              "message": _context2.t0.message,
              "_error": true
            }));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.userDetails = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _user;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models["default"].User.findById(req.payload.id);

          case 2:
            _user = _context3.sent;
            return _context3.abrupt("return", res.json({
              "user": _user
            }));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
Store user profile
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/


exports.store_profile = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _user;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models["default"].User.findById(req.query.uid);

          case 3:
            _user = _context4.sent;
            _user.fname = req.body.fname;
            _user.lname = req.body.lname;
            _user.phone_number = req.body.phone;
            _user.address = req.body.address;
            _user.is_profile_complete = true;

            _user.save();

            return _context4.abrupt("return", res.status(200).json({
              "_message": "User profile successfully created.",
              "_error": false
            }));

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).json({
              "message": _context4.t0.message,
              "_error": true
            }));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
EDIT USER PROFILE FOR MOBILE API
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/


exports.editProfile = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _user, img;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _models["default"].User.findById(req.body.id);

          case 3:
            _user = _context5.sent;
            img = "/images/user/" + req.file.originalname;
            console.log(img);
            _user.full_name = req.body.full_name;
            _user.email = req.body.email;
            _user.phone_number = req.body.phone;
            _user.thumbnail = img;
            _user.dob = req.body.dob;
            _user.is_profile_complete = true;

            _user.save();

            return _context5.abrupt("return", res.status(200).json({
              user: _user,
              _error: false
            }));

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](0);
            console.log("ERROR -----: ".concat(_context5.t0.message));
            return _context5.abrupt("return", res.status(500).json({
              "message": _context5.t0.message,
              "_error": true
            }));

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 16]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.google_social_auth = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var _token;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            req.session.user = req.user;
            _token = _jsonwebtoken["default"].sign({
              id: req.user._id,
              email: req.user.email
            }, "sldfsd0fas9df809as8f", {
              expiresIn: "1h"
            });
            return _context6.abrupt("return", res.status(200).json({
              "message": "Logged in successfully",
              "token": _token,
              "_error": false
            }));

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.store_google_user = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var _user, _token;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _models["default"].User.findOne({
              social_id: req.body.id
            });

          case 3:
            _user = _context7.sent;

            if (_user) {
              _context7.next = 8;
              break;
            }

            _context7.next = 7;
            return new _models["default"].User({
              social_id: req.body.id,
              fname: req.body.fullname,
              email: req.body.email,
              thumbnail: req.body.photo
            }).save();

          case 7:
            _user = _context7.sent;

          case 8:
            _token = _jsonwebtoken["default"].sign({
              id: _user._id,
              email: _user.email
            }, "sldfsd0fas9df809as8f", {
              expiresIn: "1h"
            });
            return _context7.abrupt("return", res.status(200).json({
              "_error": false,
              "is_profile_complete": _user.is_profile_complete,
              "token": _token,
              "message": "Info for social user is successfully stored"
            }));

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.status(500).json({
              "_error": true,
              "message": _context7.t0.message
            }));

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 12]]);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();