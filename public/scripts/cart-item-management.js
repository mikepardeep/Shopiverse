//target cart item update form
const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');

//cart total price
const cartTotalPriceElement = document.getElementById('cart-total-price');


//update cart badge
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');


//updatecart item
async function updateCartItem(event){

    //prevent default
    event.preventDefault();

    //target form
    const form = event.target;


    //product Id and csrf token form
    const productId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const quantity = form.firstElementChild.value;


    //fetch items
    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'PATCH',
            body: JSON.stringify({
                productId: productId,
                quantity: quantity,
                _csrf: csrfToken
            }),
            headers: {
                'Content-Type':'application/json'
            }
        }) 
    } catch(error){
        alert('Something went wrong')
        return;
    }

    //check for response
    if (!response.ok){
        alert('Something went wrong');
        return;
    }

    //response Data
    const responseData = await response.json();

    //if quantity to 0 remove the form
    if (responseData.updatedCartData.updatedItemPrice === 0) {
        form.parentElement.parentElement.remove();
        
    } else {
        //target total price element
        const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price');

        //update cart item
        cartItemTotalPriceElement.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);
    }

    
    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

    for(const cartBadgeElement of cartBadgeElements) {
        cartBadgeElement.textContent = responseData.updatedCartData.newTotalQuantity;

    }

}


//loop through the element
for (const formElement of cartItemUpdateFormElements){
    formElement.addEventListener('submit', updateCartItem)
}
