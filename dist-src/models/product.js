"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _mongooseSlugGenerator = _interopRequireDefault(require("mongoose-slug-generator"));

_mongoose["default"].plugin(_mongooseSlugGenerator["default"]);

var productSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    slug: "title"
  },
  tagline: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  category_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Category'
  },
  images: [],
  price: {
    type: Number
  },
  discount: {
    type: Number
  }
});
productSchema.plugin(_mongooseTimestamp["default"], {
  'createdAt': 'created_at',
  'updatedAt': 'updated_at'
});

var Product = _mongoose["default"].model('Product', productSchema);

var _default = Product;
exports["default"] = _default;