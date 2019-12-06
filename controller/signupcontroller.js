const UserData = require('../model/signup');


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
    console.log('signin')
    UserData.find({}, function(err, data) {
      if (err)
        res.send(err);
        res.json(data);
    });
};




