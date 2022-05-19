
//import package
const multer = require('multer');
const uuid = require('uuid').v4;


//initiate the multer function (set the storage function)
const upload = multer({

    //destnation the file name
    storage: multer.diskStorage({
        destination: 'product-data/images',
        filename: function (req,file,cb) {
            cb(null, uuid() + '-' + file.originalname);
        }
    })
});

//add single file method to upload object (add the filename need to look for this file function)
const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;


