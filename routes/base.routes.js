//file to create route for base 

//require the express package
const express = require('express');

//setting up the router
const router = express.Router();

//create a get route for products
router.get('/', function(req,res){

    //redirect to products route page
    res.redirect('/products');
});

//create a get route for 401 error page
router.get('/401', function(req,res){
    res.status(401).render('shared/401')
})

//create a get route for 403 error page
router.get('/403', function(req,res){
    res.status(403).render('shared/403')
})

module.exports = router;