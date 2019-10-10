const express = require ('express')

const router = express.Router();
 
const signupController = require('../controller/signupcontroller');

const signinController = require('../controller/signincontroller');


router.post('/signup',signupController.signup);

router.get('/signup',signupController.getallsignin);

router.post('/signin',signinController.userSignin);

module.exports=router;