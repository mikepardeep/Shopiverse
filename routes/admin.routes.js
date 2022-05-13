//file to create route for base 

//require the express package
const express = require('express');

//require the admin controller
const adminController = require("../controllers/admin.controller");


//setting up the router
const router = express.Router();

//create a get route for admin/products (set the /admin at app.js)
router.get('/products', adminController.getProducts);


//create a get route for admin/products (set the /admin at app.js)
router.get('/products/new', adminController.getNewProducts);


module.exports = router;