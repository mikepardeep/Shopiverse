//file to create route for base 

//require the express package
const express = require('express');

//require the admin controller
const adminController = require("../controllers/admin.controller");

//import image middleware
const imageUploadMiddlewares = require('../middlewares/image-upload');


//setting up the router
const router = express.Router();

//create a get route for admin/products (set the /admin at app.js)
router.get('/products', adminController.getProducts);


//create a get route for admin/products (set the /admin at app.js)
router.get('/products/new', adminController.getNewProducts);


//Create a post route for imageupload
router.post('/products',imageUploadMiddlewares, adminController.createNewProduct) 


module.exports = router;