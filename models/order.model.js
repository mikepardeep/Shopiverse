//class Order

//import mongodb
const mongodb = require('mongodb');

//import db
const db = require("../data/database");

class Order {

    // Status => pending, fulfilled, cancelled
    constructor(cart, userData, status = 'pending',date, orderId ) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-US', {
                weekday:'short',
                day: 'numeric',
                month:'long',
                year: 'numeric',
            });
        };
        this.id = orderId; 
    }

    //transform ordr documents
    static transformOrderDocument(orderDoc){
        //create order object
        return new Order(
            orderDoc.productData,
            orderDoc.userData,
            orderDoc.status,
            orderDoc.date,
            orderDoc._id
        );
    }

    //map all the orders
    static transformOrderDocument(orderDocs){
        return orderDocs.map(this.transformOrderDocument);
    }


    //find all function (admin)
    static async findAll(){

        //order db
        const order = await db
            .getDb()
            .collection('orders')
            .find()
            .sort({_id: -1})
            .toArray();

        return this.transformOrderDocument(orders);
    }

    //findAllforusers (user)
    static async findAllForUser(userId){
        const uid = new mongodb.ObjectId(userId);

        const orders = await db
            .getDb()
            .collection('orders')
            .find({'userData._id ': uid})
            .sort({_id: -1})
            .toArray();

        return this.transformOrderDocument(orders);
    }

    //find by ID
    static async findById(orderId){
        const order = await db
            .getDb()
            .collection('orders')
            .findOne({ _id: new mongodb.ObjectId(orderId)})

        return this.transformOrderDocument(order);
    }



    //save tp database
    save() {
        //checking for Id
        if(this.id){
            //updating
            const orderId = new mongodb.ObjectId(this.id);
            return db
                .getDb()
                .collection('orders')
                .updateOne({ _id: orderId}, {$set : { status: this.status }});


        } else {
            //create new order
            const orderDocument = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),
                status: this.status
            };

            //query the database
            return db.getDb().collection('orders').insertOne(orderDocument)
        }
    }
}


module.exports = Order;