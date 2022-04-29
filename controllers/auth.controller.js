
//function to run for signup route in auth.routes.js
function getSignup(req,res){
    res.render('customer/auth/signup');
}

//function to run for login route in auth.routes.js
function getLogin(req,res){
    //..
}

//export object 
module.exports = {
    getSignup: getSignup,
    getLogin: getLogin
}