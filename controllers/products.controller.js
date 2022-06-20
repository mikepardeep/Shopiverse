const Product = require('../models/product.model');

//get all products
async function getAllProducts(req,res,next){
    try {
        //get the product data
        const products = await Product.findAll();

        //render the product page
        res.render('customer/products/all-products', { products: products});
    } catch(error){
        next(error);
    } 
}

//function to get product details
async function getProductDetails(req,res,next){
    try {
        const product = await Product.findById(req.params.id);
        res.render('customer/products/product-details', {product: product})
    } catch(error){
        next(error);
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductDetails: getProductDetails
}