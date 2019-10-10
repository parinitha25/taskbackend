
const UserData = require('../model/signup');
var bcrypt = require('bcryptjs');


exports.signup=function(req,res){
    var User=new UserData(req.body);
    console.log(req.body)
    User.save(function(err,data){
        if(err)
        res.send(err);
        res.json(data);
    })
}
exports.getallsignin = function(req, res) {
    UserData.find({}, function(err, task) {
      if (err)
        res.send(err);
        res.json(task);
    });
  };