
//import password hashing (bcrypt)
const bcrypt = require('bcryptjs');


//import database
const db = require('../data/database');


//create user class to store user data and logics
class User {
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

    async signup() {

        // store password hashing logic
        const hashedPassword = await bcrypt.hash(this.password, 12)


        //create a user collection and insert to database
        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address
        })
    }
}

//exports the user class to be available globallys
module.exports = User;