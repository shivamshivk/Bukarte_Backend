const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    bannerImage : {type:String,required:true}
});

module.exports = mongoose.model('Banner',bannerSchema);