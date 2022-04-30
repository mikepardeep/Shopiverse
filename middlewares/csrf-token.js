//create function to add csrf token
function addCsrfToken(req,res,next){

    //set variable that available to all views ejs
    res.locals.addCsrfToken = req.csrfToken();

    //able to reach next middlewares or routes
    next();
}

//export the custom middleware
module.exports = addCsrfToken; 