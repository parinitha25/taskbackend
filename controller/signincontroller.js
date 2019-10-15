
const UserData = require('../model/signup');

exports.userSignin = function(req,res){
  UserData.find({email: req.body.email}, function(err, data){
    console.log(req.body)
    if(data != null && data != ''){
      if(req.body.password == data[0].password){
          res.status(200).json({
            message:'Login Sucessfully'
        });
        }else{
          res.status(404).json({
            error:'Password does not matched'
        });   
        }
        }else{
         res.status(404).json({
          error:'User does not matched with this Email'
    });
    }
  });
};


