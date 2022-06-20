//import product model
const Product = require('../models/product.model')

//getCart function
function getCart(req,res){
    console.log(res.render('customer/cart/cart'))
    res.render('customer/cart/cart');
}

//add cart item function
async function addCartItem(req,res, next) {
    let product;

    //find product by ID
    try {
        product = await Product.findById(req.body.productId);
    } catch(error) {
        next(error)
        return;
    }

    const cart = res.locals.cart;

    //add item to the cart session
    cart.addItem(product);
    req.session.cart = cart;

    //send a json response
    res.status(201).json({
        //send back data
        message: 'Cart Updated',
        newTotalItems : cart.totalQuantity
    });

    return;
}


//export the module
module.exports = {
    addCartItem: addCartItem,
    getCart: getCart
};