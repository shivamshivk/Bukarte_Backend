const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const usersController = require('../controller/userController');


router.get('/',usersController.get_all_users);

router.post('/signup',usersController.signUpUser);

router.login('/',usersController.loginUser);

router.get('/:userID',usersController.getUserByID);

router.patch('/:userID',usersController.updateUser);

router.delete('/:userID',usersController.deleteUser);

module.exports = router;