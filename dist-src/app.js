"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

var _auth_routes = _interopRequireDefault(require("./routes/auth/auth_routes"));

var _category_routes = _interopRequireDefault(require("./routes/category_routes"));

var _product_routes = _interopRequireDefault(require("./routes/product_routes"));

var _cors = _interopRequireDefault(require("cors"));

var _passport = _interopRequireDefault(require("passport"));

var _googlePassport = _interopRequireDefault(require("./config/google-passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

// var createError = require('http-errors');
var app = (0, _express["default"])(); // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.use((0, _expressSession["default"])({
  resave: false,
  // don't save session if unmodified
  saveUninitialized: false,
  // don't create session until something stored
  secret: 'shhhh, very secret'
}));
app.use(_passport["default"].initialize()); // init passport on every route call

app.use(_passport["default"].session()); //allow passport to use "express-session"

app.use('/api', _routes["default"]);
app.use('/api/auth', _auth_routes["default"]);
app.use('/api/category', _category_routes["default"]);
app.use('/api/product', _product_routes["default"]);

var showlogs = function showlogs(req, res, next) {
  console.log("\n req.session.passport -------> ");
  console.log(req.session.passport);
  console.log("\n req.user -------> ");
  console.log(req.user);
  console.log("\n Session and Cookie");
  console.log("req.session.id -------> ".concat(req.session.id));
  console.log("req.session.cookie -------> ");
  console.log(req.session.cookie);
  console.log("===========================================\n");
  next();
};

app.use(showlogs); // catch 404 and forward to error handler

app.use(function (req, res, next) {// next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page
  // res.status(err.status || 500);
  // res.render('error')

  return res.status(err.status || 500).json({
    "status": 500,
    "error": err.message
  });
});
var _default = app;
exports["default"] = _default;