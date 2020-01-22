const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/Users', {
  useCreateIndex: true, 
  useNewUrlParser: true,
});


module.exports = db;