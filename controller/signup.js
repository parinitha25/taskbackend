const userdata = require('../model/user');

exports.register=function(req,res){
    var User=new userdata(req.body);
    console.log(req.body)
    User.save(function(err,data){
        if(err){
            res.status(422).send(err)
        }
        else{
            res.status(200).json(data);
        } 
    })
}

exports.getallregister = function(req, res) {
    userdata.find({}, function(err, data) {
        if(err){
            res.status(422).send(err)
        }
        else{
            res.status(200).json(data);
        } 
    });
  }; 





