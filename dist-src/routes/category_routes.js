"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _category_controller = require("../controllers/category_controller");

var _function = require("../common/helpers/function");

var router = _express["default"].Router();

router.route('/').get(_category_controller.index).post((0, _function.uploadFile)("../../../public/images/category"), _category_controller.store);
router.route('/:id').get(_category_controller.show).put(_category_controller.update)["delete"](_category_controller.destory);
var _default = router;
exports["default"] = _default;