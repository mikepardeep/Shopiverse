//import package 
const express = require ('express');
const path = require('path');

//import the routes
const authRoutes = require('./routes/auth.routes');

//import the database 
const db = require('./data/database')


//initalize the express
const app = express();


//set the options for ejs
app.set('view engine', 'ejs');
    //location of the views folder
app.set("views", path.join(__dirname, 'views'));

//static file for public folder
app.use(express.static('public'));


//add a middleware for incoming request from routes
app.use(authRoutes);

//listen to the port only if connection made to the database.
db.connectToDatabase().then(function(){
    //listen to the port
    app.listen(3000);
}).catch(function(error){
    console.log('failed to connect to the database')
    console.log(error);
});

