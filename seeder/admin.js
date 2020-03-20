
const User = require('../model/user');


const data =
  { 
    username : "parinitha",
    email:"pnarayanaostb1@gmail.com",
    password: 'Pari@253',
    gender:"female",
    phone:"123-333-3333",
    role:'admin'
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


   // "test": "echo \"Error: no test specified\" && exit 1",