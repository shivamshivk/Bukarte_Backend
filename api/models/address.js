const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    customer_name :{type:String,required:true},
    customer_phone :{type:Number,required:true,unique:true},
    address_1 : {type:String,required:true},
    address_2 : {type:String,},
    pin_code : {type:Number,required:true,unique:true},
    landmark : {type:String},
    city : {type : String,required:true},
    state : {type :String, required:true}
});

module.exports = mongoose.model('Address',userSchema);