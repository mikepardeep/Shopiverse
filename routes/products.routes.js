//require the express package
const express = require('express');

//setting up the router
const router = express.Router();

//create a get route for products
router.get('/products', function(req,res){
    res.render('customer/products/all-products');
});

module.exports = router;