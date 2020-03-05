const UserData = require('../model/user');

  /*-----------update------*/
  exports.updateevent=(req, res)=>{
    const { id } = req.params;
    const { name,place} = req.body;
    UserData.updateOne({'events._id': id},{ $set: {"events.$": { _id:id, name,place}}},{new:true}, (err, data) => {
        if(err){
          res.status(422).send(err)
        }
        else{
          res.status(200).json({
            data
          })
        }  
    })
  }
    /*--------delete------*/
  exports.deleteevent = (req,res)=>{
    const { id, id1 } = req.params;
    UserData.updateOne( {'_id': id},{ $pull: { "events" : { _id: id1} } } ,(err, data) => {
      if(err){
          res.status(422).send(err)
      }
      else{
        return res.status(200).json({
        message:'user list deleted sucessfully'
        })  
      }
    })  
  }


 