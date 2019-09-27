const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  UserSchema = new Schema({
  Uname:{
    type:String,
    required:'please Enter valid name'
  },
  Email: {
    type: String,
    required: 'Please Enter valid emailId'
  },
  Age: {
    type: String,
    required: 'Please Enter the age,minimum 18'
  }
});

module.exports = mongoose.model('UserInfo', UserSchema);