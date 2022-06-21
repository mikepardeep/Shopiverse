//file to create route for user authentication


//require the express package
const express = require('express');

//import auth controller
const cartController = require('../controllers/cart.controller');

//setting up the router
const router = express.Router();

//get route for individual cart
router.get('/', cartController.getCart);

//post route for individual cart
router.post('/items', cartController.addCartItem);

//Path route (update data) Put to replace data

router.patch('/items', cartController.updateCartItem);

//export the router available global
module.exports = router;