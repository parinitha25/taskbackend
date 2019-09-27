const express = require ('express')

const router = express.Router();
 
const userController = require('../controller/usercontroller');

const User=require('../model/user');

router.post('/signup',userController.signup);

router.get('/signup',userController.getallsignin );

module.exports=router;