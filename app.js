//import package 
const express = require ('express');

//import the routes
const authRoutes = require('./routes/auth.routes');

//initalize the express
const app = express();

//add a middleware for income request
app.use(authRoutes);

//listen to the port
app.listen(3000);