//import the user.model
const User = require('../models/user.model');

//import the Util
const authUtil = require('../util/authentication');
const validation = require('../util/validation');

//function to run for signup route in auth.routes.js to render ejs
function getSignup(req,res){
    //render the signup file
    res.render('customer/auth/signup');
}

//function to execute when user signup 
async function signup(req,res,next){

    //check the entered credentials
    if(!validation.userDetailsAreValid(
        req.body.email, 
        req.body.password, 
        req.body.fullname,
        req.body.street, 
        req.body.postal, 
        req.body.city
        ) || !validation.emailIsConfirmed(req.body.email,req.body['confirm-email'])
    ){
        res.redirect('/signup');
        return;
    }

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
    try {
         //check the user exist already
        const existAlready = await user.existAlready();
        console.log(existAlready);

        if(existAlready){
            res.redirect('/signup')
            return;
        }

        await user.signup();
    } catch(error) {
        next(error); //error handling middleware will be activated
        return;
    }

    //redirect the user to login page once registed
    res.redirect('/login');
}

//function to run for login route in auth.routes.js
function getLogin(req,res){

   //render the login file
   res.render('customer/auth/login');
}

//function to execute when user login
async function login(req,res,next){

    //parses the user data for login
    const user= new User(req.body.email, req.body.password);

    //define existing variable to be available globally
    let existingUser;

    //get existing user data and store it
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch(error) {
        next(error);
        return;
    }
   

    //check whether new user in the database or not
    if (!existingUser){
        res.redirect('/login');
        return;
    }

    //pass the matching password function on the user for checking and pass the existing user password
    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);


    //checking the password 
    if (!passwordIsCorrect){
        res.redirect('/login');
        return;
    }

    //----if come pass until this code, this means, the password and email is correct----//

    //initiate the successful user session
    authUtil.createUserSession(req, existingUser,function(){
        //redirect to starting page
        res.redirect('/');
    });


}

//logout functionalities
function logout(req,res){
    authUtil.destroyUserAuthSession(req)
    res.redirect('/login');
}


//export object 
module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup:signup,
    login:login,
    logout:logout
}