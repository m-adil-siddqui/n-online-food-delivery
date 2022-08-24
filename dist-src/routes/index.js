"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index_controller = require("../controllers/index_controller");

var router = _express["default"].Router();

/* GET home page. */
router.get('/home', _index_controller.index);
router.get('/test', function (req, res) {
  return res.send('hello');
}); // ..stuff below

var _default = router;
exports["default"] = _default;