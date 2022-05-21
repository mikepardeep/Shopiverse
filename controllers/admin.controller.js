//import the Product Model
const Product = require('../models/product.model')

//get the admin get product
async function getProducts(req,res, next){
    try {
        const products = await Product.findAll();
        res.render('admin/products/all-products', {products:products});

    } catch(error) {
        next(error);
        return;
    }
   
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


   try {
        await product.save();
        res.redirect('/admin/products');
   } catch(error) {
        next(error);
        return;
   }

 
   
}


module.exports = {
    getProducts: getProducts,
    getNewProducts: getNewProducts,
    createNewProduct: createNewProduct
}