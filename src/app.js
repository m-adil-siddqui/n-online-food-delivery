// var createError = require('http-errors');
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from "body-parser";
import indexRouter from 'routes/index';
import authRouter from "routes/auth/auth_routes";
import catRouter from "routes/category_routes";
import productRouter from "routes/product_routes";
import cors from "cors";
import multer from 'multer';
// const upload = multer();
// import passport from 'passport';
// import google from "config/google-passport"
// import session from "express-session"


const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null,path.join(__dirname, "../public/images/user/"))
  },

  filename: function (req, file, cb) {
    let extension = path.extname(file.originalname);
    let basename  = path.basename(file.originalname,extension);
    let fileName = basename+'_'+Date.now() + extension;
    file.originalname = fileName;
    cb(null, fileName)
  }
})

  let uploadedFile = multer({
    storage:storage,
  })

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');



app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/json
app.use(bodyParser.json())

// for parsing multipart/form-data
app.use(uploadedFile.single('image')); 

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

/**
 * Adding headers to our requests.
 */
 app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Length, multipart/form-data");

  next();
});
// app.use(session({
//   resave: false, // don't save session if unmodified
//   saveUninitialized: false, // don't create session until something stored
//   secret: 'shhhh, very secret'
// }));

// app.use(passport.initialize()) // init passport on every route call
// app.use(passport.session())    //allow passport to use "express-session"


app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/category', catRouter);
app.use('/api/product', productRouter);


// let showlogs = (req, res, next) => {

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
app.use(function(req, res, next) {
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error')
  return res.status(err.status || 500).json({"status": 500, "error":err.message})
});

export default app;


