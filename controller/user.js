const userData = require('../model/user');
const blacklistdata = require('../model/blackList');


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

  exports.postevent=(req, res) =>{
    const { id } = req.params;
    const { name, place} = req.body;
    userData.findOneAndUpdate({ '_id':id }, { $push: { "events":{ name,place} } },{new:true},(err, data)=> {
        if(err){
            res.status(422).send(err)
        }
        else{
            res.status(200).json(data);  
        }  
      })
  }

  exports.getallevents=function(req,res){
    userData.find({}, (err, data) => { 
      if(err){
        res.status(422).send(err)
      }
      else{
        res.status(200).json(data);     
      }  
    })
  }
      