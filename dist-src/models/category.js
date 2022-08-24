"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var categorySchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  image: {
    type: String
  } // user_id:{type:mongoose.Schema.Types.ObjectId, ref:'User'},

});
categorySchema.plugin(_mongooseTimestamp["default"], {
  'createdAt': 'created_at',
  'updatedAt': 'updated_at'
});

var Category = _mongoose["default"].model('Category', categorySchema);

var _default = Category;
exports["default"] = _default;