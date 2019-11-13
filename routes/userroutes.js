const express = require ('express')

const router = express.Router();
 
const signupController = require('../controller/signupcontroller');

const signinController = require('../controller/signincontroller');

const homecontroller = require('../controller/homecontroller');


var { validate, RevokedCallback }=require('../Midleware/isAuth')


router.post('/signup',signupController.signup);

router.post('/signin',signinController.userSignin);

router.get('/getuserall', validate,homecontroller.getuser );

router.get('/getuserlogout', validate, RevokedCallback);

router.get('/validateuser',validate,signinController.validateuser);

router.delete('/logout', signinController.logout);

router.post('/posteventlist',validate,homecontroller.eventlist);

router.get('/geteventlists',validate,homecontroller.geteventuesr);

router.get('/updateeventlists',validate,homecontroller.updateeventlist);


module.exports=router;