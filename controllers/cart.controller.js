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

}

//updateCartItem function
function updateCartItem(req,res){
    const cart = res.locals.cart;

    console.log(cart);

    //run update cart item function in cart variable.
    const updatedItemData = cart.updateItem(
        req.body.productId, 
        req.body.quantity
    );

    //add to the session
    req.session.cart = cart;

    //send the json request
    res.json({
        message: 'Item Updated!',
        updatedCartData : {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice,
        },
    })
}


//export the module
module.exports = {
    addCartItem: addCartItem,
    getCart: getCart,
    updateCartItem: updateCartItem
};