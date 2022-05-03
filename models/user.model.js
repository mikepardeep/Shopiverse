//Create an users specification 



//import password hashing (bcrypt)
const bcrypt = require('bcryptjs');


//import database
const db = require('../data/database');


//create user class to store user data and logics
class User {

    //store all the users data
    constructor(email,password,fullname, street,postal, city){
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city:city
        };

    }

    //get the user data with email in database
    getUserWithSameEmail(){
        //querrying email for the particular user in the database
        return db.getDb().collection('users').findOne({ email:this.email });
    }

    //check whether email data already exist in database
    async existAlready(){
        const existingUser =  await this.getUserWithSameEmail();
        if(existingUser){
            return true;
        }
        return false;
    }

    //parses the user signup data to the database 
    async signup() {

        // store password hashing logic
        const hashedPassword = await bcrypt.hash(this.password, 12)


        //insert users data to database
        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address
        })

    }


    //checking for matching password of login
    hasMatchingPassword(hashedPassword){
        //use bcrypt to compare the hashed password with unhashed password
        return bcrypt.compare(this.password, hashedPassword)
    }
}

//exports the user class to be available globallys
module.exports = User;