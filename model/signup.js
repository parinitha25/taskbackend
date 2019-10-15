var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:{
    type:String,
    validate: {
        validator: function(v) {
          return /^[A-Za-z]{4,8}$/.test(v);
        },
        message: props => `${props.value} is not a valid username!`
      },
      required: [true, 'User name required']
    },
  email: {
    type: String,
    validate: {
        validator: function(v) {
          return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      required: [true, 'User email required']
    },
  password: {
    type: String,
    validate: {
        validator: function(v) {
          return /^[A-Za-z0-9@]{4,8}$/.test(v);
        },
        message: props => `${props.value} is not a valid password!`
      },
      required: [true, 'User password required']
    },
  phone: {
    type: String,
    validate: {
        validator: function(v) {
          return /^[0-9]{3}-\d{3}-\d{4}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: [true, 'User phone number required']
  },
  gender: {
    type: String,
    enum: [male,female,others],
  } 
});

module.exports = mongoose.model('UserInfo', UserSchema);