
const UserData = require('../model/signup');

exports.userSignin = function(req,res){
  UserData.find({email: req.body.email}, function(err, data){
    console.log(req.body)
    if(data != null && data != ''){
      if(req.body.password == data[0].password){
          res.json({user:'Login Sucessfully'})
        }else{
          res.json({user:'Password does not matched'})
         
        }
    } else{
    
      res.json({user:'User does not matched with this Email'})
    }
  });
};

// var bcrypt = require('bcryptjs');

// exports.userSignin = (req,res,next) =>{
//   debugger
// const email = req.body.email;
// const password = req.body.password;
// let loadedUser;
// UserData.findOne({email: email})
// .then(user =>{
//   debugger
//   if(!user){
//     const error = new Error('A user with this email could not be found.');
//     error.statusCode = 401;
//     throw error;
//   }
//   loadedUser = user;
//   return bcrypt.compare(password,user.password);
// })
// .then(isEqual =>{
//   debugger
//   if(!isEqual){
//     const error = new Error('wrong password.');
//     error.statusCode = 401;
//     throw error;
//   }
// })
// .catch(err => {
//   debugger
//   if (!err.statusCode) {
//     const send=new Send('login sucessfully')
//     err.statusCode = 500;
//   }
//   next(err);
// }); 
// }


