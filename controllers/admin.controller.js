//import the Product Model
const Product = require('../models/product.model')

//get the admin get product
function getProducts(req,res){
    res.render('admin/products/all-products');
}

//get the admin new product
function getNewProducts(req, res){
    res.render('admin/products/new-product');
}


//submitting a new product
async function createNewProduct(req,res, next){
   
   const product = new Product({
       ...req.body, 
       image: req.file.filename
   });
   console.log(product);

   console.log(product.save());
   
   try {
        await product.save();
   } catch(error) {
        next(error);
        return;
   }

   res.redirect('/admin/products');
   
}


module.exports = {
    getProducts: getProducts,
    getNewProducts: getNewProducts,
    createNewProduct: createNewProduct
}