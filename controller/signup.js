const userData = require('../model/user');
const Usermail = require('../model/invitation');
const nodemailer = require ('nodemailer');

exports.register=function(req,res){
  const { email, password, role,username,phone,gender } = req.body
  const User = new userData({ email, password,username,phone,gender,role: role || "basic" });
    User.save(function(err,data){
        if(err){
            res.status(422).send(err)
        }
        else{
          return res.status(200).json({
            message:'login sucessfully'
          })
        }
    })
}


exports.getallregister=function(req,res){
  userData.find({}, (err, data) => { 
    if(err){
      res.status(422).send(err)
    }
    else{
      res.status(200).json(data);     
    }  
  })
}



exports.invitinguser= function(req, res){
  debugger
    const reg_email=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      if(reg_email.test(req.body.email)){
        var Requestuser = new Usermail(req.body);
        console.log("invitation is confirm");
        Requestuser.save(function(err, data){
          if(err)
            res.send(err.message);
            res.json(data);
          var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
              user: 'pnarayanaostb1@gmail.com',
              pass: 'Pari@253'
            }
          });
          var mailOptions = {
            from: 'pnarayanaostb1@gmail.com',
            to: data.email,  
            subject: 'Acknowledge for inviting user',
            html: `<p><h3>Hi we are inviting you to create  your account <br/>Click here to</h1> <a href="http://localhost:3000/signupuser?id:${data.id}" ><h1>Register</h1></a> </p> `    
          };
          console.log(data)
          transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
              return console.log(error.message);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        })
      }
      else {
        res.send('Email is invalid');
      }
    };

exports.getalluserinvitation=function(req,res){
    Usermail.find({}, (err, data) => { 
      if(err){
        res.status(422).send(err)
      }
      else{
        res.status(200).json(data);     
      }  
    })
}



