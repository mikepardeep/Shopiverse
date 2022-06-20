//file to generate error handling page and logicality

//create a handle error function
function handleErrors(error,req,res,next){
    //render 404 error page
    if (error.code == 404) {
        return res.status(404).render('shared/404');
    }

    //set the status for error and render error page
    res.status(500).render('shared/500');
}

//export the modue so that it available globally
module.exports = handleErrors;