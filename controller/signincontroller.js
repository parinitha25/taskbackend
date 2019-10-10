
const UserData = require('../model/signup');

exports.userSignin = function(req,res){
  UserData.find({email: req.body.email}, function(err, data){
    if(data != null && data != ''){
      if(req.body.password == data[0].password){
          // res.status(200).json(data);
          res.send("Login Succesfully");
        }else{
          res.send("Password does not matched");
        }
    } else{
      res.send("User does not exists");
    }
  });
};