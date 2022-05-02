//import the user.model
const User = require('../models/user.model');


//import the Util
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');


//function to run for signup route in auth.routes.js to render ejs
function getSignup(req,res){
    
    //get the session data that posted
    let sessionData = sessionFlash.getSessionData(req);

    //checking the session
    if (!sessionData){
        //default data
        sessionData = {
            email: '',
            confirmEmail: '',
            password: '',
            fullname: '',
            street: '',
            postal: '',
            city: '',
        };
    }

    //render the signup file
    res.render('customer/auth/signup', {inputData: sessionData});
}

//function to execute when user signup 
async function signup(req,res,next){

    //store entered Data object
    const enteredData = {
        email: req.body.email,
        confirmEmail: req.body['confirm-email'],
        password: req.body.password,
        fullname: req.body.fullname,
        street: req.body.street,
        postal: req.body.postal,
        city: req.body.city
    };

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
        //session flash error 
        sessionFlash.flashDataToSession(
            req,
            {
            errorMessage: 
            'Please check your email input.Password must be atleast 6 character long and postal code must be 5 characters long',
            //Show entered Data
            ...enteredData,
        
            },
            function(){
                res.redirect('/signup')
        })

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

        if(existAlready)
        {   
            //flash error data
            sessionFlash.flashDataToSession(req,{
                errorMessage: 'User Exist already! Try Log In again',
                ...enteredData,
            }, function(){
                res.redirect('/signup')
            })
      
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

    //get the session data
    let sessionData = sessionFlash.getSessionData(req);

    //check the session
    if (!sessionData){
        //default value
        sessionData = {
            email: '',
            password: ''
        };
    }


   //render the login file
   res.render('customer/auth/login', {inputData: sessionData});
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
   
    //session error message
    const sessionErrorData = {
        errorMessage:  'Invalid credentials - please double-check your email and password',
        email: user.email,
        password: user.password
    };

    //check whether new user in the database or not
    if (!existingUser){
        //flashing error message
        sessionFlash.flashDataToSession(req,sessionErrorData , function(){
            res.redirect('/login');
        })

        return;
    }

    //pass the matching password function on the user for checking and pass the existing user password
    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);


    //checking the password 
    if (!passwordIsCorrect){

        //flashing error data
        sessionFlash.flashDataToSession(req,sessionErrorData , function(){
            res.redirect('/login');
        })
        return

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