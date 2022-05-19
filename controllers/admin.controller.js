const res = require("express/lib/response");

//get the admin get product
function getProducts(req,res){
    res.render('admin/products/all-products');
}

//get the admin new product
function getNewProducts(req, res){
    res.render('admin/products/new-product');
}


//submitting a new product
function createNewProduct(req,res){
    console.log(req.body);
    console.log(req.file);

    res.redirect('/admin/products');
}


module.exports = {
    getProducts: getProducts,
    getNewProducts: getNewProducts,
    createNewProduct: createNewProduct
}