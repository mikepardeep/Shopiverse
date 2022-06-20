//protect routes

function protectRoutes(req,res,next){

    //check whether authenticated
    if(!res.locals.isAuth){
        return res.redirect('401');
    }

    //if route start with admin (protect admin page)
    if (req.path.startsWith('/admin') && !res.locals.isAdmin){
        return res.redirect('/403');
    }

    //proceed to next
    next();
}

module.exports = protectRoutes;