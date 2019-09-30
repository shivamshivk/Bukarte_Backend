const express = require('express');
const router = express.Router();
const multer = require('multer');
const bannerController = require('../controller/bannerController')


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

router.get('/getAllBanners',bannerController.getAllBanners);
router.post('/getBannerByID',bannerController.getBannerByID);
router.post('/add_a_banner',upload.single('bannerImage'),bannerController.add_a_banner);
router.delete('/delete_a_banner/:bannerID',bannerController.delete_a_banner);

module.exports = router;