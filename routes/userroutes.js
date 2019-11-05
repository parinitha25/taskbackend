const express = require ('express')

const router = express.Router();
 
const signupController = require('../controller/signupcontroller');

const signinController = require('../controller/signincontroller');

const homecontroller = require('../controller/homcontroller');

var { validate, RevokedCallback }=require('../Midleware/isAuth')


router.post('/signup',signupController.signup);

router.post('/signin',signinController.userSignin);

router.get('/getuser', validate, RevokedCallback);

router.get('/getuserall', validate,homecontroller.getuser );

router.get('/validateuser',validate,signinController.validateuser);


router.delete('/logout', signinController.logout);


module.exports=router;