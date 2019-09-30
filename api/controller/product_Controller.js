const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get_All_Products = (req,res,next)=>{
    Product.find()
    .select('_id product_name product_d_price product_o_price productImage author_name catgeory_id category_name prod_desc')
    .exec()
    .then(product =>{
        if(product.length>=1){
            res.status(200).json({
                status: '200',
                products : product
            });
        }else{
            res.status(404).json({
                status:404,
                message: 'No Products Found'
            });
        }
    }).catch(err =>{
        res.status(500).json({
            message:err.message
        });
    });
};

exports.getCategoryWiseProduct = (req,res,next)=>{

    Product.find({catgeory_id:req.params.categoryID})
    .exec()
    .then(products=>{
        if(products.length>=1){
            res.status(200).json({
                status:'200',
                products : products
            });   
        }else{
            res.status(404).json({
                status:'404',
                message: 'No Products Found for the given Category ID'
            });
        }
    }).catch(err=>{
        res.status(500).json({
            message: err.message
        });
    })
};

exports.get_Single_Product = (req,res,next)=>{

    Product.findById(req.params.productID)
    .exec()
    .then(product=>{
        if(product){
            res.status(200).json({
                status:200,
                product: product
            });
        }else{
            res.status(200).json({
                status:404,
                message: 'No Product Found for the ID given'
            });
        }
    }).catch(err=>{
        res.status(500).json({
            message: err.message
        });
    });
}




exports.add_a_Product = (req,res,next)=> {

    console.log(req.file);

    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        product_name : req.body.product_name,
        product_d_price : req.body.product_d_price,
        product_o_price : req.body.product_o_price,
        productImage : req.file.path,
        author_name : req.body.author_name,
        category_name : req.body.category_name,
        category_id : req.body.category_id,
        prod_desc : req.body.prod_desc
    });

    product.save().then( result =>{

        res.status(201).json({
            message : 'Product Added',
            result: result
        });

    }).catch(err =>{
        res.status(500).json({
            message : req.file.path
        }
     )
    });
    
};

exports.update_a_product = (req,res,next)=>{

    const id = req.params.productID;
    const updateOns = {};
    for (const ons of req.body){
        updateOns[ons.propName] = ons.value;
    }

    User.update({_id:id},{$set: updateOns })
    .exec()
    .then(result =>{
        if(result){
            const response = {
                status:'201',
                message : 'Product Updated ',
                result: result
            }
            res.status(200).json(response);
        }else{
            res.status(404).json({
                status: '404',
                message: 'No Product found to update for the given ID'
            });
        }

    })
    .catch(err =>{
        res.status(500).json({
            error :err.message
        })
    });
}

exports.delete_a_product = (req,res,next)=>{

    User.remove({_id:req.params.productID})
    .exec()
    .then(result =>{

        if(result){
            res.status(201).json({
                status:'201',
                message:'Product deleted'
            });
        }else{
            res.status(404).json({
                status:'404',
                message:'No Product Found to delete for the given ID'
            });      
        }
    })
    .catch(err =>{
        res.status(500).json({
            error : err.message
        });
    })

}