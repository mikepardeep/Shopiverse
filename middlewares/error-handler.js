//create a handle error function

function handleErrors(error,req,res,next){
    //set the status for error and render error page
    res.status(500).render('shared/500');
}

//export the modue so that it available globally
module.exports = handleErrors;