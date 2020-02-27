
const User = require('../model/user');

const data =
  { 
    username : "admin",
    email:"admin2@gmail.com",
    password: 'Admin@12',
    gender:"male",
    phone:"123-333-3333",
    role:'Admin'
  }
      
const UserSeeder = () => { 
  var user=new User(data);    
    user.save(function(err,data){
      if(data) {
        console.log('data',data)
      }
      else {
        console.log(err);
      }
      process.exit();
    })
}

UserSeeder()
  