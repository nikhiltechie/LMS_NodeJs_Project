const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const authentication = require("../authentication/checksignin");

router.get('/',userController.getAddUserForm);

router.post('/add', userController.addUser);

router.get('/login',userController.getLoginUserForm);

router.post('/login',userController.loginUser);

router.get('/update',authentication.checkSignIn, userController.getUpdateForm);

router.post('/update',userController.updateUser);



module.exports = router;