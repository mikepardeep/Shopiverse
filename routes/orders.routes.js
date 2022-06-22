//file to create route for orders

//require the express package
const express = require('express');

//import auth controller
const ordersController = require('../controllers/orders.controller');

//setting up the router
const router = express.Router();

//post route
router.post('/', ordersController.addOrder);

//get route
router.get('/', ordersController.getOrders);

//export the router available global
module.exports = router;