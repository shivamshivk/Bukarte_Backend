const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.get_all_users = (req,res,next)=>{
    User.find()
    .select('_id name email phone password')
    .exec()
    .then(doc =>{
        if(doc.length>=1){
            res.status(200).json({
                users:doc
            });
        }else{
            res.status(204).json({
                message: 'No Users Found'
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    })
};

exports.getUserByID = (req,res,next)=>{
    
    User.findById(req.params.userID)
    .select('name email phone password _id')
    .exec()
    .then(result =>{
        if(result){
            res.status(200).json({
                userDetails:result
            });
        }else{
            res.status(404).json({
                message : 'User NotFound'
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            error : err.message
        });
    });
};

exports.signUpUser = (req,res,next)=>{
    
    const user = new User({
        _id : new mongoose.Types.ObjectId,
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        password : req.body.password
    });
    
    user.save().then(result =>{
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                })
            }else{
                res.status(201).json({
                    message:'User Signed Up successfully',
                    result : result
                });
    
            }
        });

    }).catch(err =>{
        res.status(500).json({
            error : err.message
        });
    });
};

exports.loginUser = (req,res,next)=>{

    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            res.status(401).json({
                message :"Auth Failed"
            });
        }else{
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message :"Auth Failed"
                    });
                }

                if(result){

                    const token = jwt.sign(
                        {
                        email : user[0].email,
                        userID : user[0]._id
                        },process.env.JWT_KEY,{
                            expiresIn:'1h'
                        }
                    );

                    return res.status(200).json({
                        message :"Auth Success",
                        token :token
                    });
                }

                res.status(401).json({
                    message:'Auth Failed'
                });
            });
        }
    }).catch(err =>{
        res.status(500).json(
            {
                error:err.message
            }
        )
    });
};

exports.updateUser = (req,res,next)=>{
    const id = req.params.userID;
    const updateOns = {};
    for (const ons of req.body){
        updateOns[ons.propName] = ons.value;
    }

    User.update({_id:id},{$set: updateOns })
    .exec()
    .then(result =>{
        const response = {
            message : 'User Updated ',
            request : {
                type :'GET',
                url : 'http://localhost:3000/users/'+id
            }
        }
        res.status(200).json(response);
    })
    .catch(err =>{
        res.status(500).json({
            error :err
        })
    });
};

exports.deleteUser = (req,res,next)=>{

    User.remove({_id:req.params.userID})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:'Product deleted'
        });
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        });
    });

};
