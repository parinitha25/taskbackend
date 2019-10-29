
const UserData = require('../model/signup');
var jwt=require('jsonwebtoken');
var isAuth=require('../Midleware/isAuth');
var bcrypt = require('bcrypt');
var Response = require('../response');
const BlacklistData = require('../model/blacklist');

exports.userSignin = (req,res,next) =>{
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  UserData.findOne({email: email})
  .then(user =>{
    if(!user){
        res.status(401).json({
          error:'User does not matched with this Email'
      });
    }
    loadedUser = user;
    return bcrypt.compare(password,user.password);
  })
  .then(isEqual =>{
    if(!isEqual){
      res.status(401).json({
        error:'password is not matched.'
      });
    }
    const token = jwt.sign(
    {
      email: loadedUser.email,
      userId:loadedUser._id.toString(),
    },'secret',{expiresIn: '2h'})
    return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email 
      ,message:'login sucessfully.'
    })  
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    } 
      next(err);
  }); 
}

exports.getAllSignin = (isAuth,function(req, res) {
  console.log("hello  signin")
  debugger
  UserData.find({token:req.headers.authorization}, function(err, data) {
   if (err)
     res.send(err);
     res.json(data); 
  });
});

exports.logout = (function(req, res) {
  BlacklistData.create({token:req.headers.authorization}, function(err, data) {
   if (err)
     res.send(err);
     res.json(data); 
  });
});


 



