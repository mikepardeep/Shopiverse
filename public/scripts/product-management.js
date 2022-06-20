
//targeting the delete button
const deleteProductButtonElements = document.querySelectorAll('.product-item button');

//function to delete product
async function deleteProduct(event) {

    //target the button value
    const buttonElement = event.target;
    const productId = buttonElement.dataset.productid;
    const csrfToken = buttonElement.dataset.csrf;

    //fetch the data to send DELETE request post
    const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
        method: 'DELETE'
    });

 

    //check the response was ok
    if (!response.ok) {
        alert('Something went wrong!');
        return;
    }

    //target the parent element of the button to delete
    buttonElement.parentElement.parentElement.parentElement.parentElement.remove();


}


//loop through the button element
for (const deleteProductButtonElement of deleteProductButtonElements) {
    deleteProductButtonElement.addEventListener('click', deleteProduct);
}