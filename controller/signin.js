const userdata = require('../model/user');
var jwt=require('jsonwebtoken');
const blacklistdata = require('../model/blackList');

exports.userSignin = (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
      userdata.findOne({email:email})
      .then(user =>{
        if(!user){
              res.status(401).json({
              error:'User does not matched with this Email'
          });
        }
        else if(password!=user.password){
          debugger
          res.status(422).json({
          error:'password is not matched.'
        })
        }
        else{
        loadedUser = user;
        const token = jwt.sign(
        {
          email: loadedUser.email,
          role:loadedUser.role,
          userId:loadedUser._id.toString(),
        },'secret',{expiresIn: '2h'})
        return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email,
          role:loadedUser.role ,message:'login sucessfully.'
        })  
        }
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 422;
        } 
      }); 
    }

  exports.uservalidate =(function(req, res){
    const  token =req.headers.authorization
    blacklistdata.find({token},function(err,data){
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
      } 
      catch (err) {
        err.statusCode = 422;
        throw err;
      }
      if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
      }
      req.userId = decodedToken.userId;
  })

