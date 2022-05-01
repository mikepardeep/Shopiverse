//check the authentication status of the user

function checkAuthStatus (req,res,next){
    //get the session uid to check whether authenticate user
    const uid = req.session.uid;

    //check for authentication
    if (!uid){

        //if not authenticate, just pass to next function logic
        return next();
    }

    //store user id and status
    res.locals.uid = uid;
    res.locals.isAuth = true;


    next();


}

module.exports = checkAuthStatus;