
//get the admin get product
function getProducts(req,res){
    res.render('admin/products/all-products');
}

//get the admin new product
function getNewProducts(req, res){
    res.render('admin/products/new-product');
}


//submitting a new product
function createNewProduct(){

}


module.exports = {
    getProducts: getProducts,
    getNewProducts: getNewProducts,
    createNewProduct: createNewProduct
}