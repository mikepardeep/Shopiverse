//import package 
const express = require ('express');
const path = require('path');
const csrf = require('csurf');

//import the routes
const authRoutes = require('./routes/auth.routes');

//import the database 
const db = require('./data/database')

//import the csrf middlewares
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');

//error handling middleware
const errorHandlerMiddleware = require('./middlewares/error-handler');

//initalize the express
const app = express();


//set the options for ejs
app.set('view engine', 'ejs');
    //location of the views folder
app.set("views", path.join(__dirname, 'views'));


//static file for public folder
app.use(express.static('public'));

//to parses incoming request based on body-parser (ejs form) req.body
app.use(express.urlencoded({extended: false}));

//add a middleware for incoming request from routes
app.use(authRoutes);


//security csrf token on incoming request
app.use(csrf());

//use the security csrf middleware on incoming request
app.use(addCsrfTokenMiddleware)

//error handling middleware for incoming request
app.use(errorHandlerMiddleware);

//listen to the port only if connection made to the database.
db.connectToDatabase().then(function(){

    //listen to the port
    app.listen(3000);
}).catch(function(error){
    console.log('failed to connect to the database')
    console.log(error);
});

