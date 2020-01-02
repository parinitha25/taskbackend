const UserData = require('../model/signup');
var jwt=require('jsonwebtoken');
var bcrypt = require('bcrypt');
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

  exports.logout = (function(req, res) {
    BlacklistData.create({token:req.headers.authorization}, function(err, data) {
      if (err)
        res.send(err);
        res.json(data); 
      });
  });

  exports.validateuser =(function(req, res){
    const  token =req.headers.authorization
    BlacklistData.find({token},function(err,data){
      if (data.length>0) {
        return res.status(401).json({   
          error: 'your not able to access this page'
        })
      }
      else{
        return res.status(200).json({
          message:'login sucessfully'
        })
      }
    })
    const tokens = token;
    let decodedToken;
    try {
      decodedToken = jwt.verify(tokens, 'secret');
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
  })

