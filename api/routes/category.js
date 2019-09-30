const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController')

router.get('/getAllCategories',categoryController.get_All_Category);
router.post('/getCatgeoryByID',categoryController.getCatgeoryByID);
router.post('/add_a_category',categoryController.add_A_category); 
router.patch('/update_a_category/:categoryID',categoryController.update_a_catgeory);
router.delete('/delete_a_category/:categoryID',categoryController.delete_a_category);

module.exports = router;