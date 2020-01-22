const express = require ('express')

const router = express.Router();
 
const signup = require('../controller/signup');

const signin = require('../controller/signin');

const events = require('../controller/events');

// const user = require('../seeder/user');

var { validate, revokedCallback }=require('../midleware/isAuth')

router.post('/signup',signup.register);

router.post('/signin',signin.userSignin);

// router.post('/user',user.UsersSeeder);

router.get('/getalluser', validate,signup.getallregister);

router.post('/userlogout', validate, revokedCallback);

router.get('/validateuser',validate,signin.uservalidate);

router.delete('/logout', events.logout);

router.post('/posteventlist',events.userlist);

router.get('/geteventlist',validate,events.geteventuesr);

router.put('/updateeventlist/:id',validate,events.updateeventlist);

router.delete('/deleteeventlist/:id',events.deleteeventlist);


module.exports=router;