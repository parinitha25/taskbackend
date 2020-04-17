var mongoose = require('mongoose');
var schema = mongoose.Schema;

var inviteSchema = new schema({
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    required: [true, 'User email required'],
  },
  role: {
    type: String,
    default: 'basic',
    enum: ["basic", "user", "admin"]
  }
});

module.exports = mongoose.model('invite', inviteSchema);
