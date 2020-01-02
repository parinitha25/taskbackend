// const User = require('../model/signup');
const Eventuser=require('../model/home');

// exports.getuser=(req, res)=> {
//   User.find({}, (error, data) => {
//       if (error) { res.json(error) }
//       res.json(data)
//   })
//   }

  exports.eventlist =(req, res) =>{
    var User=new Eventuser(req.body);
    User.save(function(err, data) {
      console.log('hh')
      if (err)
        res.send(err);
        res.json(data); 
     });
   };

   exports.geteventuesr=(req, res)=> {
    Eventuser.find({}, (error, data) => {
        if (error) { res.json(error) }
        res.json(data)
    })
    }

    //update
    exports.updateeventlist=(req, res)=>{
      console.log("update")
      Eventuser.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, data) => {
          if (error) { res.json(error) }
          res.json(data)
      })
  }
  //delete
  exports.deleteeventlist = (req,res)=>{ 
    console.log("delete")
    // const  token =req.headers.authorization
    Eventuser.deleteOne({_id: req.params.id }, (error, data) => {
      if (error) 
      { 
        res.json(error) 
      }
      else{
        return res.status(200).json({
          messagedelete:'sucessfully deleted'
        })
      }
    })
  
  }

