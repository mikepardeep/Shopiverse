//import the mongodb package
const mongodb = require('mongodb');

//import the database
const db = require("../data/database");

//Create a product model to product details
class Product {
    
    constructor(productData){
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image;
        this.updateImageData();
        if (productData._id){
            this.id = productData._id.toString();
        }
        
    }

    //fetch the product by id
    static async findById(productId){
        let prodId;
  
        //try and catch error 
        try {
            prodId = new mongodb.ObjectId(productId);
            console.log(prodId);

        } catch(error) {
            error.code = 404;
            throw error;
        }

        const product = await db.getDb().collection('products').findOne({_id: prodId });

        //error handling
        if (!product) {
            const error = new Error('Could not find product with provided id');
            error.code = 404;
            throw error;
        }


        return new Product(product);
    }

    //Fetch all the product document
    static async findAll(){
        const products = await db.getDb().collection('products').find().toArray();

        return products.map(function(productDocument) {
            return new Product(productDocument);
        });
    }

    //update the image Data
    updateImageData(){
        this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/products/assets/images/${this.image}`;
    }

    //method to save the product.
    async save(){
        const productData = {

            //store product data to be inserted into the database
                //dont store the dynamic value into the database
            title:this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        };


        //check the existence of id
        if (this.id) {
            //create new objectId
            const productId = new mongodb.ObjectId(this.id)

            //check not have image data to not update not defined
            if (!this.image){
                delete productData.image;
            }

            //update on database
            await db.getDb().collection('products').updateOne(
                {_id: productId}, 
                {
                    $set: productData
                }
            );

        } else {

            //insert the database
            await db.getDb().collection('products').insertOne(productData);
        }                   
    }

    //new method to replace image
    async replaceImage(newImage) {
        this.image = newImage;
        this.updateImageData();
    }

    //method to delete the product
    remove() {
        const productId = new mongodb.ObjectId(this.id);
        return db.getDb().collection('products').deleteOne({_id: productId});
    }
}

module.exports = Product;