
const UserData = require('../model/signup');
const Eventuser=require('../model/home');

debugger
exports.signup=function(req,res){
    var User=new UserData(req.body);
    User.save(function(err,data){
        console.log('ddhgf')
        if(err)
        res.send(err);
        res.json(data);
    })
}
exports.getallsignin = function(req, res) {
    UserData.find({}, function(err, data) {
      if (err)
        res.send(err);
        res.json(data);
    });
};




