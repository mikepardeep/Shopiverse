//website base(root) routes 

//require the express package
const express = require('express');

//setting up the router
const router = express.Router();

//create a get route for products
router.get('/', function(req,res){

    //redirect to products route page
    res.redirect('/products');
});

module.exports = router;