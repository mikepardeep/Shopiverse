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
router.get('/', ordersController.getOrders); // /orders

//payment success and failure route
router.get('/success', ordersController.getSuccess);

router.get('/failure', ordersController.getFailure);

//export the router available global
module.exports = router;