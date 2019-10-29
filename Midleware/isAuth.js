const Jwt = require('jsonwebtoken');
const BlacklistData = require('../model/blacklist');
var mongoose = require('mongoose');
const ejwt = require('express-jwt');
const expressJwt = require('express-jwt');


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
  } catch (err) {
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

const RevokedCallback = function (req, res) {
  debugger
  BlacklistData.find({ token: req.headers.authorization }, function (err, data) {
    if (err) {
      return res.status(401).json({
        
      })
      // res.json(data); 
    }
    else if(data.length>0) {
      return res.status(401).json({
        error: 'User logged out already'
      });
    } 
    else {
      return res.status(200).json({
        message:'login sucessfully'
      }); 
     
    }
 })

}

function jwt() {
    return expressJwt({secret: 'secret' }).unless({
        path: [
            // public routes that don't require authentication
            '/signup','/signin','/logout'
        ]
    });
}
module.exports = { validate, RevokedCallback, jwt };
