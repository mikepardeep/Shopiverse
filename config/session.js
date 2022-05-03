//This file is to create a session and store it in mongodb database


//import the expressSession
const expressSession = require('express-session');

//import the mongodb session connect
const mongodbStore = require('connect-mongodb-session');


//function to create a session store
function createSessionStore() {
    //initalized the mongdob session
    const MongoDBStore = mongodbStore(expressSession);

    //create the object to pass the session data
    const store = new MongoDBStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    });

    return store;

}

//function to create configuration for session
function createSessionConfig(){
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            //what time in milisecond the cookie will be valid
            maxAge: 2 * 40 * 60 * 60 * 1000
        }
    }
}

module.exports = createSessionConfig;