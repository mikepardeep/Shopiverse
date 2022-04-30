
//function to run for signup route in auth.routes.js to render ejs
function getSignup(req,res){
    res.render('customer/auth/signup');
}

//function to execute when user signup 
function signup(req,res){

}


//function to run for login route in auth.routes.js
function getLogin(req,res){
    //..
}

//export object 
module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup:signup
}