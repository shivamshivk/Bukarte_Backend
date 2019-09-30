const Category = require('../models/category');
const mongoose = require('mongoose');

exports.get_All_Category = (req,res,next) =>{

    Category.find()
    .select('category_id category_name')
    .exec()
    .then( doc =>{
        if(doc.length>=1){
            res.status(200).json({
                categories : doc
            });
        }else{
            res.status(404).json({
                message: 'No Category Found'
            });
        }

    }).catch(err=>{
        res.status(500).json({
            message : 'Something Wrong',
            error : err.message
        });
    });
    
}; 


exports.getCatgeoryByID = (req,res,next) =>{

    Category.find({'_id':req.body.category_id})
    .select('category_id category_name')
    .exec()
    .then(result =>{
        if(result){
            res.status(200).json({
                productCategory:result
            });
        }else{
            res.status(404).json({
                message : 'Category Not Found'
            });
        }
    }).catch(err =>{
        res.status(500).json({
            error : err.message
        });
    });
};


exports.add_A_category = (req,res,next) =>{

    const category = new Category({
        category_id : new mongoose.Types.ObjectId(),
        category_name : req.body.category_name
    });

    category.save().then(result =>{

        res.status(201).json({
            message: 'Category Added',
            result : result
        });

    }).catch(err=>{
        res.status(500).json({
            message : 'Something Wrong !!',
            error : err.message
        });
    });

};


exports.update_a_catgeory = (req,res,next)=>{
    
    const id = req.params.categoryID;
    const updateOns = {};
    for (const ons of req.body){
        updateOns[ons.propName] = ons.value;
    }

    Category.update({_id:id},{$set: updateOns })
    .exec()
    .then(result =>{
        if(result){
            res.status(201).json(res.body);
            console.log(res.body);
        }else{
            res.status(404).json({
                status: '404',
                message: 'No Category found to update for the given ID'
            });
        }

    })
    .catch(err =>{
        res.status(500).json({
            error :err.message
        })
    });
}


exports.delete_a_category = (req,res,next)=>{

    Category.remove({_id:req.params.categoryID})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:'Category deleted'
        });
    }).catch(err =>{
        res.status(500).json({
            error : err.message
        });
    });
 
}
