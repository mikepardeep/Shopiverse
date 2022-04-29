const express = require('express');

//import auth controller
const authController = require('../controllers/auth.controller');

//setting up the router
const router = express.Router();

//get signup router
router.get('/signup', authController.getSignup)

//get login router
router.get('/login', authController.getLogin)

module.exports = router;