"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth2"));

var _models = _interopRequireDefault(require("../models"));

// The USER object is the "authenticated user" from the done() in authUser function.
// serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  
_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
}); // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
// deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.


_passport["default"].deserializeUser( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].User.findById(id);

          case 2:
            user = _context.sent;
            done(null, user);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

_passport["default"].use(new _passportGoogleOauth["default"]({
  clientID: '460555740632-ju1vfl67j2qo8495l8mokkiqoc0l3akf.apps.googleusercontent.com',
  clientSecret: 'Iu7vTL23BLYsawoShT3NWSOq',
  callbackURL: '/auth/google/redirect'
}, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(accessToken, refreshToken, profile, done) {
    var _user, _newUser;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models["default"].User.findOne({
              social_id: profile.id
            });

          case 2:
            _user = _context2.sent;

            if (!_user) {
              _context2.next = 7;
              break;
            }

            done(null, _user);
            _context2.next = 11;
            break;

          case 7:
            _context2.next = 9;
            return new _models["default"].User({
              social_id: profile.id,
              email: profile.email,
              fname: profile.name.givenName,
              lname: profile.name.familyName,
              thumbnail: profile.photos[0].value
            }).save();

          case 9:
            _newUser = _context2.sent;
            done(null, _newUser);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}()));