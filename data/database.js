//import the mongodb package
const mongodb = require('mongodb');

//Create a a Mongo Client
const MongoClient = mongodb.MongoClient;

//declare a database variable to store value
let database;

//function to connect to database
async function connectToDatabase(){
    //connect the Mongo Client to localhost
    const client = await MongoClient.connect('mongodb://localhost:27017');
    
    //Create a database in MongoDB
    database = client.db('online-shop');
}

//Function to check if we have database yet
function getDb(){
    if (!database) {
        //pass error message if dont have database yet
        throw new Error('You must connect first!');
    }
    return database;
}


//exports the functions to available globally
module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
};