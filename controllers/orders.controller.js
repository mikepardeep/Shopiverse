//add order function

//import oder models
const Order = require('../models/order.model')
//import user models
const User = require('../models/user.model')

//import stripe payment
const stripe = require('stripe')('sk_test_51LFKQ6JTkEOTF98q75RbcLkU3TDSqBgi9nR0AeuDDkkNLf6lAKEgItxwBC0aqMCtpQAMeapP51wIIy4OyyttHoOC00zCEPoTCY');


//get Order
async function getOrders(req, res, next) {
    try {
      const orders = await Order.findAllForUser(res.locals.uid);

      res.render('customer/orders/all-orders', {
        orders: orders,
      });
    } catch (error) {
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
        next(error);
        return;
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

    //logic for stripe

    //create session for stripe checkout
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data : {
            currency: 'RM',
            product_data: {
              name: 'Dummy'
            },
            unit_amount_decimal : 10.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `localhost:3000/orders/success`,
      cancel_url: `localhost:3000/orders/cancel`,
    });
  
    res.redirect(303, session.url);

    // //redirect to order page
    // res.redirect('/orders');

}

function getSuccess(req,res){
  res.render('customer/orders/success')
}

function getFailure(req,res){
  res.render('customer/orders/failure')
}


module.exports = {
    addOrder:addOrder,
    getOrders:getOrders,
    getSuccess: getSuccess,
    getFailure: getFailure
}