const eventuser=require('../model/event');
const blacklistdata = require('../model/blackList');

    exports.userlist=(req, res) =>{
      var user=new eventuser(req.body);
      user.save(function(err,data) {
        if(err){
          res.status(422).send(err)
        }
        else{
            return res.status(200).json({
            message:"new user created sucessfully"
          })
        }   
      });
    };

    exports.geteventuesr=(req, res)=> {
      eventuser.find({}, (err, data) => {
        if(err){
          res.status(422).send(err)
        }
        else{
          res.status(200).json(data);     
        }  
      })
    }
    /*------logout functionality-----*/
    exports.logout = (function(req, res) {
      blacklistdata.create({token:req.headers.authorization}, function(err, data) {
        if(err){
          res.status(422).send(err)
        } 
        else{
          res.status(200).json(data);
        }   
      });
    });
    /*-----------update------*/
    exports.updateeventlist=(req, res)=>{
      eventuser.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if(err){
          res.status(422).send(err)
        }
        else{
            return res.status(200).json({
            data,
            message:"user data updated sucessfully"
          })
        }  
      })
    }
    /*--------delete------*/
    exports.deleteeventlist = (req,res)=>{ 
      eventuser.deleteOne({_id: req.params.id }, (error, data) => {
        if (error) 
        { 
          res.status(422).send(err) 
        }
        else{
            return res.status(200).json({
            message:'user list deleted sucessfully'
          })
        }
      }) 
    }

