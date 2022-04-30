//import the user.model
const User = require('../models/user.model');


//function to run for signup route in auth.routes.js to render ejs
function getSignup(req,res){
    //render the signup file
    res.render('customer/auth/signup');
}

//function to execute when user signup 
async function signup(req,res){

    //initalize the user model and pass the argument
    const user = new User(
        req.body.email, 
        req.body.password, 
        req.body.fullname, 
        req.body.street, 
        req.body.postal, 
        req.body.city
    );

    //call the signup on user object
    await user.signup();

    //redirect the user to login page once registed
    res.redirect('/login');
}

//function to run for login route in auth.routes.js
function getLogin(req,res){
   //render the login file
   res.render('customer/auth/login');
}

//export object 
module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup:signup
}