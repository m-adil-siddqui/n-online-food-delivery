"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

//multiple upload file gallery
exports.galleryUploadFile = function (file_path, file_limit) {
  try {
    var storage = _multer["default"].diskStorage({
      destination: function () {
        var _destination = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, file, cb) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  cb(null, _path["default"].join(__dirname, file_path));

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

    var filterFile = function filterFile(req, file, cb) {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
      } else {
        cb(new Error('Gallery image must be png, jpg, or jpeg'));
        return;
      }
    };

    var uploadedFile = (0, _multer["default"])({
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5
      },
      fileFilter: filterFile
    }).array('images', file_limit);
    return uploadedFile;
  } catch (err) {
    console.log(err.message);
  }
}; //single file upload


exports.uploadFile = function (file_path) {
  try {
    var storage = _multer["default"].diskStorage({
      destination: function () {
        var _destination2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, file, cb) {
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  cb(null, _path["default"].join(__dirname, "../../../public/" + file_path));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function destination(_x4, _x5, _x6) {
          return _destination2.apply(this, arguments);
        }

        return destination;
      }() // filename: function (req, file, cb) {
      //   let extension = path.extname(file.originalname);
      //   let basename  = path.basename(file.originalname,extension);
      //   let fileName = basename+'_'+Date.now() + extension;
      //   file.originalname = fileName;
      //   cb(null, fileName)
      // }

    }); // const filterFile = (req, file, cb) => {
    //   if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'
    //     || file.mimetype === 'image/jpg'){
    //     cb(null, true);
    //   }
    //   else{
    //       cb(new Error('Gallery image must be png, jpg, or jpeg'))
    //     return;
    //     }
    //   }


    var uploadedFile = (0, _multer["default"])({
      storage: storage // limits:{
      //    fileSize: 1024 * 1024 * 5
      // },
      // fileFilter:filterFile

    }).single('image');
    return uploadedFile;
  } catch (err) {
    console.log(err.message);
  }
};