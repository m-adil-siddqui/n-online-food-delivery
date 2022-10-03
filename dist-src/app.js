"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

var _multer = _interopRequireDefault(require("multer"));

// var createError = require('http-errors');
// const upload = multer();
// import passport from 'passport';
// import google from "config/google-passport"
// import session from "express-session"
var storage = _multer["default"].diskStorage({
  destination: function () {
    var _destination = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, file, cb) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              cb(null, _path["default"].join(__dirname, "../public/images/user/"));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function destination(_x, _x2, _x3) {
      return _destination.apply(this, arguments);
    }

    return destination;
  }(),
  filename: function filename(req, file, cb) {
    var extension = _path["default"].extname(file.originalname);

    var basename = _path["default"].basename(file.originalname, extension);

    var fileName = basename + '_' + Date.now() + extension;
    file.originalname = fileName;
    cb(null, fileName);
  }
});

var uploadedFile = (0, _multer["default"])({
  storage: storage
});
var app = (0, _express["default"])(); // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); // for parsing application/xwww-form-urlencoded

app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // for parsing application/json

app.use(_bodyParser["default"].json()); // for parsing multipart/form-data

app.use(uploadedFile.single('image'));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
/**
 * Adding headers to our requests.
 */

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Length, multipart/form-data");
  next();
}); // app.use(session({
//   resave: false, // don't save session if unmodified
//   saveUninitialized: false, // don't create session until something stored
//   secret: 'shhhh, very secret'
// }));
// app.use(passport.initialize()) // init passport on every route call
// app.use(passport.session())    //allow passport to use "express-session"

app.use('/api', _routes["default"]);
app.use('/api/auth', _auth_routes["default"]);
app.use('/api/category', _category_routes["default"]);
app.use('/api/product', _product_routes["default"]); // let showlogs = (req, res, next) => {
//     console.log(`\n req.session.passport -------> `)
//     console.log(req.session.passport)
//     console.log(`\n req.user -------> `) 
//     console.log(req.user) 
//     console.log("\n Session and Cookie")
//     console.log(`req.session.id -------> ${req.session.id}`) 
//     console.log(`req.session.cookie -------> `) 
//     console.log(req.session.cookie) 
//     console.log("===========================================\n")
//     next()
// }
// app.use(showlogs)
// catch 404 and forward to error handler

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