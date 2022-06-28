//add order function

//import stripe payment
const stripe = require('stripe')('sk_test_51LFKQ6JTkEOTF98q75RbcLkU3TDSqBgi9nR0AeuDDkkNLf6lAKEgItxwBC0aqMCtpQAMeapP51wIIy4OyyttHoOC00zCEPoTCY');


//import oder models
const Order = require('../models/order.model')
//import user models
const User = require('../models/user.model')



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
      line_items: cart.items.map(function(item) {
        return {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data : {
              currency: 'myr',
              product_data: {
                name: item.product.title
              },
              unit_amount: +item.product.price.toFixed(2) * 100
            },
            quantity: item.quantity,
        }
      }),
      mode: 'payment',
      success_url: `http://localhost:3000/orders/success`,
      cancel_url: `http://localhost:3000/orders/failure`,
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