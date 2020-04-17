
const faker = require('faker');
const jwt = require('jsonwebtoken');
const {internet} = faker;
const config = require('../../config/environment');
const {User} = require('../../model/index');

const userEmail = internet.email();

let authToken = '';
const authorizeRequest = () => {
  if (!authToken) {
    authToken = jwt.sign({}, config.jwt_secret_key);
  }
  return authToken;
};

const createUser = async (data) => {
  const userObj = {
    username: 'parinitha',
    email: userEmail,
    phoneNumber: '222-111-2222',
    gender: 'male',
    role: 'user',
    password: 'Pari@253',
    events: [{
      name: 'ffd',
      date: '12-march-2019',
      time: '12-march-2019',
      place: 'abc',
    }],
  };
  try {
    return await User.create({ ...userObj, ...data });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUser,
  authorizeRequest,
};
