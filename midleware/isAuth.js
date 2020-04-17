const Jwt = require('jsonwebtoken');
const blacklistdata = require('../model/blackList');

const validate = function (req, res, next) {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = Jwt.verify(token, 'secret');
  }
  catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
}

const revokedCallback = function (req, res) {
  blacklistdata.find({ token: req.headers.authorization }, function (err, data) {
    if (!data) {
      return res.status(200).json({
        message: 'User logged in sucessfully'
      })
    }
    else if (data.length > 0) {
      return res.status(401).json({
        error: 'User logged out already'
      });
    }
    else {
      return res.status(401).json({
        error: 'User logged out sucessfully'
      });
    }
  })
}

module.exports = { validate, revokedCallback };
