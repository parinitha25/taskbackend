var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  username:{
    type:String,
    validate: {
        validator: function(v) {
          return /^[A-Za-z]{4,10}$/.test(v);
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
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/.test(v);
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
    enum: ['male','female','others']
  },
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('UserInfo', UserSchema);