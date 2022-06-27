//create cart class
const Product = require('./product.model')

class Cart {
    constructor(items = [] , totalQuantity = 0, totalPrice = 0) {
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;

    }

    //update price function
    async updatePrices() {

        //products ID
        const productIds = this.items.map( function (item) {
            return item.product.id;
        })

        const products = await Product.findMultiple(productIds);

        //deletecart items
        const deletableCartItemProductIds = [];

        //for loop
        for (const cartItem of this.items) {
            const product = products.find(function(prod) {
                return prod.id === cartItem.product.id;
            });

            if (!product) {
                deletableCartItemProductIds.push(cartItem.product.id);
                continue;
            }

            cartItem.product = product;
            cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
        }

        if(deletableCartItemProductIds.length > 0) {
            this.items = this.items.filter(function(item) {
                return productIds.indexOf(item.product.id) < 0;
            });
        }

        //re-calculate cart tools
        this.totalPrice = 0;
        this.totalQuantity = 0;

        for (const item of this.items) {
            this.totalQuantity = this.totalQuantity + item.quantity;
            this.totalPrice = this.totalPrice + item.totalPrice;
        }
    }


    //create add item function
    addItem(product) {
        //create cart item object
        const cartItem = {
            product: product,
            quantity: 1,
            totalPrice: product.price
        }


        //loop the item
        for (let i = 0; i < this.items.length; i++){
            const item = this.items[i]

            //check the item
            if (item.product.id === product.id) {
                cartItem.quantity = +item.quantity + 1;
                cartItem.totalPrice = item.totalPrice + product.price;
                this.items[i] = cartItem;

                this.totalQuantity = this.totalQuantity + 1;
                this.totalPrice = this.totalPrice + product.price

                return;
            }
        }

        //push the cart items and increase the quantity and total price 
        this.items.push(cartItem)
        this.totalQuantity = this.totalQuantity + 1;
        this.totalPrice += product.price;
    }

    //update item
    updateItem(productId, newQuantity) {

        //loop the item
        for (let i = 0; i < this.items.length; i++){
            const item = this.items[i]

            //check the item
            if (item.product.id === productId && newQuantity > 0) {
                const cartItem = {...item};
                const quantityChange = newQuantity - item.quantity;
                cartItem.quantity = newQuantity;
                cartItem.totalPrice = newQuantity * item.product.price;
                this.items[i] = cartItem;

                this.totalQuantity = this.totalQuantity + quantityChange;
                this.totalPrice += quantityChange * item.product.price

                return { updatedItemPrice: cartItem.totalPrice};

            } else if (item.product.id === productId && newQuantity <=0){
                //number of items to remove
                this.items.splice(i, 1);
                this.totalQuantity = this.totalQuantity - item.quantity;
                this.totalPrice -= item.totalPrice;
                return { updatedItemPrice: 0 };
            }
        }

        //
        if (newQuantity > 0) {

        }
    }
}

module.exports = Cart;