//function to update cart prices

async function updateCartPrices(req,res,next) {

    //cart
    const cart = res.locals.cart;

    await cart.updatePrices();

    next();
}

//module exports
module.exports = updateCartPrices;