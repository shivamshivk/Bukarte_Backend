const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category_id : mongoose.Schema.Types.ObjectId,
    catgeory_name : {type:String, required:true}
});

module.exports = mongoose.model('Category',categorySchema);