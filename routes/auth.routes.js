//require the express package
const express = require('express');
const { signup } = require('../controllers/auth.controller');

//import auth controller
const authController = require('../controllers/auth.controller');

//setting up the router
const router = express.Router();

//get signup router
router.get('/signup', authController.getSignup)

//post signup router
router.post('/signup',authController.signup)

//get login router
router.get('/login', authController.getLogin)

//export the router available global
module.exports = router;