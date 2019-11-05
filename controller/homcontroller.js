const User = require('../model/signup');

exports.getuser=(req, res)=> {
  User.find({}, (error, data) => {
      if (error) { res.json(error) }
      res.json(data)
  })
  }