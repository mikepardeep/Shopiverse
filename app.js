//import package 
const express = require ('express');
const path = require('path');

//import the routes
const authRoutes = require('./routes/auth.routes');

//initalize the express
const app = express();


//set the options for ejs
app.set('view engine', 'ejs');
    //location of the view folder
app.set("views", path.join(__dirname, 'views'));


//add a middleware for incoming request from routes
app.use(authRoutes);



//listen to the port
app.listen(3000);