//File to generate flash error by sending and retrieving data to and fro session


//retrieving the flash data
function getSessionData(req){
    //get the req.session flashdata
    const sessionData = req.session.flashData;
    
    //clear the sessions
    req.session.flashData = null;

    //return the session
    return sessionData;
}

//to send data to session
function flashDataToSession(req,data,action) {

    //access the session and store it
    req.session.flashData = data;

    //save the session
    req.session.save(action)
}

//exports to module
module.exports = {
    getSessionData:getSessionData,
    flashDataToSession:flashDataToSession
}