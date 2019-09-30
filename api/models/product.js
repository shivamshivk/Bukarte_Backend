const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product_name : {type:String, required:true},
    product_d_price : {type:Number,required:true},
    product_o_price : {type:Number,required:true },
    productImage : {type:String,required:true},
    author_name : {type:String,required:true},
    category_name : {type:String,required:true},
    category_id : {type:String, required:true},
    prod_desc : {type:String,required:true},
});

module.exports = mongoose.model('Product',productSchema);