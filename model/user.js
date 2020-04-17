var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userschema = new schema({
  username: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]{8,10}$/.test(v);
      },
      message: props => `${props.value} is not a valid username!`
    },
    required: [true, 'User name required']
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    required: [true, 'User email required'],
  },
  password: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/.test(v);
      },
      message: props => `${props.value} is not a valid password!`
    },
    required: [true, 'User password required']
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{3}-\d{3}-\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others']
  },
  role: {
    type: String,
    default: 'basic',
    enum: ["basic", "user", "admin"]
  },
  events: [{
    name: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now()
    },
    time: {
      type: Date,
      default: Date.now()
    },
    place: {
      type: String
    },
  }],
});
module.exports = mongoose.model('User', userschema);
