//import cart model
const Cart = require("../models/cart.model")

//initialize cart
function initalizeCart(req,res,next){
    let cart;

    //check for user sesion cart
    if(!req.session.cart){

        //create new cart object
        cart = new Cart()
    } else {
        //sessionCart
        const sessionCart = req.session.cart;

        //already created cart
        cart = new Cart(
            sessionCart.items,
            sessionCart.totalQuantity,
            sessionCart.totalPrice  
        );
    }

    res.locals.cart = cart;

    next();
}

module.exports = initalizeCart;