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

async function getUpdateProduct(req,res,next) {

    try {
        const product = await Product.findById(req.params.id);
        res.render('admin/products/update-product', { product: product })
    } catch (erorr){
        next(error);
    }
}

async function updateProduct(req,res, next){

    //create a new Product object
    const product = new Product({
        ...req.body,
        _id : req.params.id
    });

    //checking whether the file exist
    if(req.file){
        //replace the old image with the new one
        product.replaceImage(req.file.filename);
    }

    //save the product
    try {
        await product.save();
    } catch(error) {
        next(error);
        return;
    }
    
    //redirect
    res.redirect('/admin/products');
}


module.exports = {
    getProducts: getProducts,
    getNewProducts: getNewProducts,
    createNewProduct: createNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct

}