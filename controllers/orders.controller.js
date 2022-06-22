//add order function

//import oder models
const Order = require('../models/order.model')

//import user models
const User = require('../models/user.model')

//get Order
async function getOrders(req,res){
    try {
        const orders = await Order.findAllForUser(res.locals.uid);
        res.render('customer/orders/all-orders' ,{
            orders: orders
        });
    } catch(error) {
        next(error);
    }
  
}

//add order function
async function addOrder(req,res, next) {
    //access the cart
    const cart = res.locals.cart;

    let userDocument;

    //user document
    try {
        userDocument = await User.findById(res.locals.uid)
    } catch(error){
        return next(error);
    }

    const order = new Order(cart, userDocument);

    //save the oder
    try {
        await order.save();
    } catch(error){
        next(error);
        return;
    }

    //clear the cart session
    req.session.cart = null;

    //redirect to order page
    res.redirect('/orders');


}

module.exports = {
    addOrder:addOrder,
    getOrders:getOrders
}