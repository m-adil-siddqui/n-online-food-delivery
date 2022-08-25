import multer from "multer";
import path from "path";

//multiple upload file gallery
exports.galleryUploadFile = (file_path, file_limit) => {
    try{
        
      var storage = multer.diskStorage({
      destination: async function (req, file, cb) {
        cb(null,path.join(__dirname, file_path))
      },
  
      filename: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        let basename  = path.basename(file.originalname,extension);
        let fileName = basename+'_'+Date.now() + extension;
        file.originalname = fileName;
        cb(null, fileName)
      }
    })
    
      const filterFile = (req, file, cb) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'
          || file.mimetype === 'image/jpg'){
          cb(null, true);
        }
        else{
            cb(new Error('Gallery image must be png, jpg, or jpeg'))
          return;
          }
        }
  
      let uploadedFile = multer({
        storage:storage,
        limits:{
           fileSize: 1024 * 1024 * 5
        },
        fileFilter:filterFile
    }).array('images',file_limit);
      return uploadedFile;
    }catch(err){
      console.log(err.message)
    }  
  }



  //single file upload
  exports.uploadFile = (file_path) => {
    try{
        
      var storage = multer.diskStorage({
      destination: async function (req, file, cb) {
        cb(null,path.join(__dirname, file_path))
      },
  
      filename: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        let basename  = path.basename(file.originalname,extension);
        let fileName = basename+'_'+Date.now() + extension;
        file.originalname = fileName;
        cb(null, fileName)
      }
    })
    
      const filterFile = (req, file, cb) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'
          || file.mimetype === 'image/jpg'){
          cb(null, true);
        }
        else{
            cb(new Error('Gallery image must be png, jpg, or jpeg'))
          return;
          }
        }
  
      let uploadedFile = multer({
        storage:storage,
        limits:{
           fileSize: 1024 * 1024 * 5
        },
        fileFilter:filterFile
    }).single('image');
      return uploadedFile;
    }catch(err){
      console.log(err.message)
    }  
  }
