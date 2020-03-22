const mongoose = require('mongoose');
const Ads = require('../models/ads');

exports.adsGetAll = (req,res,next)=>{
    Ads.find()
    .exec()
    .then(doc =>{
        if(doc.length>=1){
            res.status(200).json({
                ads:doc
            });
        }else{
            res.status(200).json({
                message: 'No Ads Found'
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    })
}


exports.addAds = (req,res,next) =>{

    const ad = new Ads({
        lat : req.body.lat,
        lang : req.body.lang
    });

    ad.save()
    .then(result => {
        res.status(201).json({
            message:'Ad Placed Successfully'
        });
    })
    .catch(err =>{
        res.status(500).json({
            error :err.message
        })
    });

}
