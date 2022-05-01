
//create a user session
function createUserSession(req,user,action){
    //store a data to the session in database to indicates user
    req.session.uid = user._id.toString();

    //save the session
    req.session.save(action);
}

module.exports = {
    createUserSession: createUserSession
};