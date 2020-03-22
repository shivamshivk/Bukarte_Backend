const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    lat : {type:String,required:true,unique:true},
    lang : {type:String,required:true,unique:true},
});

module.exports = mongoose.model('Ad',adSchema);