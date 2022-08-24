"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth_controller = require("../../controllers/auth/auth_controller");

var _auth_middleware = require("../../middlewares/auth_middleware");

var _passport = _interopRequireDefault(require("passport"));

var router = _express["default"].Router();

// router.post(`/register`, registerUser);
router.post("/login", _auth_controller.loginUser);
router.get("/user_details", _auth_middleware.auth, _auth_controller.userDetails);
router.post("/create/profile", _auth_middleware.auth, _auth_controller.store_profile);
router.route('/register').post(_auth_controller.registerUser); // router.route('/:id').get(show).put(update).delete(destory)
// google+ authentications

router.get("/google", _passport["default"].authenticate('google', {
  scope: ['email', 'profile']
}));
router.get("/google/redirect", _passport["default"].authenticate('google'), _auth_controller.google_social_auth); //store user details who is sign in with google

router.post('/store_social_user', _auth_controller.store_google_user);
var _default = router;
exports["default"] = _default;