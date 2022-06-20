//file to create route for products 

//require the express package
const express = require('express');

//import the product controller
const productsController = require('../controllers/products.controller');

//setting up the router
const router = express.Router();

//create a get route for products
router.get('/products', productsController.getAllProducts);

//create a get route for product id
router.get('/products/:id', productsController.getProductDetails);

module.exports = router;