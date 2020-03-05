const express = require ('express')

const router = express.Router();
 
const signup = require('../controller/signup');

const signin = require('../controller/signin');

const user= require('../controller/user');

const events = require('../controller/events');

var { validate, revokedCallback }=require('../midleware/isAuth')

router.post('/signup',signup.register);

router.post('/signin',signin.userSignin);

router.post('/userlogout', validate, revokedCallback);

router.get('/validateuser',validate,signin.uservalidate);

router.delete('/logout', user.logout);

router.post('/postevent/:id',validate,user.postevent);

router.get('/getevents',validate,user.getallevents);

router.put('/updateevent/:id',events.updateevent);

router.delete('/deleteevent/:id/:id1',validate,events.deleteevent);

router.post('/postusermail',signup.invitinguser);

router.get('/getusermail',signup.getalluserinvitation);

module.exports=router;