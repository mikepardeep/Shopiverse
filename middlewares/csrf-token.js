//File to generate csrf token security for the website



//create function to add csrf token
function addCsrfToken(req,res,next){

    //set variable that available to all views ejs
    res.locals.csrfToken = req.csrfToken();

    //able to reach next middlewares or routes
    next();
}

//export the custom middleware
module.exports = addCsrfToken; 