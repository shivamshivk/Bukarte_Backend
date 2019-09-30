const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product_name : {type :String,required:true},
    productImage :{type:String,required:true},
    product_price : {type :Number,required:true},
    product_quantity : {type : String,required:true},
    product_mrp : {type:String,required:true}
});

module.exports = mongoose.model('Cart',cartSchema);