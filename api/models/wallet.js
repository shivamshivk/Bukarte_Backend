const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    transaction_id : mongoose.Schema.Types.ObjectId,
    transaction_type : {type:String, required:true},
    transaction_amount : {type:String,required:true}, 
    transaction_status : {type:String, required:true} 
});

module.exports = mongoose.model('Wallet',walletSchema);