"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _product_controller = require("../controllers/product_controller");

var _function = require("../common/helpers/function");

var router = _express["default"].Router();

router.route('/').get(_product_controller.index).post((0, _function.galleryUploadFile)("../../../public/images/products", 4), _product_controller.store);
router.route('/:id').get(_product_controller.show);
router.route('/by-category/:id').get(_product_controller.productsByCategory);
var _default = router;
exports["default"] = _default;