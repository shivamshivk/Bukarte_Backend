const Banner = require('../models/banner');
const mongoose = require('mongoose');

exports.getAllBanners = (req,res,next)=>{

    Banner.find()
    .exec()
    .then(result =>{
        
        if(result.length >=1 ){
            res.status(200).json({
                banners :result
            });
        }else{
            res.status(404).json({
                message : 'banners Not Found'
            });
        }
        
    }).catch(err =>{
        res.status(500).json({
            error : err.message
        });
    });
}

exports.getBannerByID = (req,res,next)=>{

    Banner.findById({'_id ': req.body.banner_id})
    .exec()
    .then(result =>{
        if(result){
            res.status(200).json({
                banner :result
            });
        }else{
            res.status(404).json({
                message : 'Banner Not Found'
            });
        }
    }).catch(err =>{
        res.status(500).json({
            error : err.message
        });        
    });

}

exports.add_a_banner = (req,res,next)=>{

    const banner = new Banner({
        _id : new mongoose.Types.ObjectId(),
        bannerImage : req.file.path
    });

    banner.save().then(result =>{
        res.status(201).json({
            message: 'Category Added',
            result : result
        });
    }).catch(err =>{
        res.status(201).json({
            error : err.message
        });
    });

}

exports.delete_a_banner = (req,res,next) =>{

    Banner.remove({'_id':req.params.bannerID})
    .exec()
    .then(result =>{
        res.status(201).json({
            message : 'Banner Deleted'
        });
    }).catch(err=>{
        res.status(500).json({
            message : err.message 
        });  
    });

}
