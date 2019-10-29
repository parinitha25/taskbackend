const express = require ('express')

const router = express.Router();
 
const signupController = require('../controller/signupcontroller');

const signinController = require('../controller/signincontroller');

var { validate, RevokedCallback }=require('../Midleware/isAuth')


router.post('/signup',signupController.signup);

router.get('/signin', validate, RevokedCallback,signinController.getAllSignin);

router.post('/signin',signinController.userSignin);

router.delete('/logout', signinController.logout);


module.exports=router;