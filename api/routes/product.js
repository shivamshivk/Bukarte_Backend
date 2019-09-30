const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controller/product_Controller');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename : function(req,file,cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'jpg' || file.mimetype === 'jpeg' || file.mimetype === 'png'){
        cb(null,true);
    }else{
        cb(null,true);
    }
}

const upload = multer({storage :storage,
    limits: {
        fileSize :1024 * 1024 * 5
    },
    fileFilter:fileFilter
});

router.get('/getAllProducts',productController.get_All_Products);

router.post('/',upload.single('productImage'),productController.add_a_Product);

router.get('/getSingleProduct',productController.get_Single_Product);

router.get('/getCategoryWiseProduct/:categoryID',productController.get_Single_Product);

router.patch('/update_a_Product/:productID',productController.update_a_product);

router.delete('/delete_a_Product/:productID',productController.delete_a_product);

module.exports = router;