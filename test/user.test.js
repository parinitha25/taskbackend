
const faker = require('faker');
const dbHandler = require("../model/index");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
const { internet } = faker;
const { authorizeRequest, createUser } = require('./factory/user.factory');
const { expect } = chai;
const authToken = authorizeRequest();

describe('POST', async () => {

  beforeEach(async () => await dbHandler.connect());

  afterEach(async () => await dbHandler.clearDatabase());

  afterEach(async () => await dbHandler.closeDatabase());

  describe('POST', () => {

    it('Should save user', async () => {
      try {
        const userObj = {
          username: 'parinitha',
          email: internet.email(),
          phoneNumber: '123-333-3331',
          gender: 'male',
          role: 'user',
          password: "Pari@253",
        };
        const res = await chai.request(server)
          .post('/signup')
          .send(userObj);
        expect(res.body.message).to.equal('register sucessfully');
        expect(res.statusCode).to.equal(200);
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should return error for invalid email', async () => {
      try {
        const userObj = {
          username: 'parinitha',
          email: internet.email(),
          phoneNumber: '232-556-6666',
          gender: 'male',
          role: 'user',
          password: '',
        };
        const res = await chai.request(server)
          .post('/signup')
          .send(userObj);
        expect(res.body.error).to.equal('register not sucessfull, give some correct inputs');
        expect(res.statusCode).to.equal(422);
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should user login successfully', async () => {
      try {
        const userRes = await createUser();
        const userObj = {
          email: userRes.email,
          password: userRes.password,
        };
        const res = await chai.request(server)
          .post('/signin')
          .send(userObj);
        expect(res.body.message).to.equal('login sucessfully.');
        expect(res.statusCode).to.equal(200);
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should show error for invalid credentials', async () => {
      try {
        const userObj = {
          email: internet.email(),
          password: 'password',
        };
        const res = await chai.request(server)
          .post('/signin')
          .send(userObj);
        expect(res.body.error).to.equal('User does not matched with this Email and password');
        expect(res.statusCode).to.equal(401);
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should validate the users', async () => {
      try {
        const user = await createUser({});
        const res = await chai.request(server)
          .get(`/validateuser`)
          .set('Authorization', authToken)
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('login sucessfully');
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should validate the users not set the token', async () => {
      try {
        const user = await createUser({});
        const res = await chai.request(server)
          .get(`/validateuser`)
        expect(res.statusCode).to.equal(401);
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should get the details for validate the users', async () => {
      try {
        const user = await createUser({});
        const res = await chai.request(server)
          .get(`/getusermail`)
        expect(res.statusCode).to.equal(200);
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should validate the users for post the data', async () => {
      try {
        const userObj = {
          email: internet.email(),
          password: internet.password(),
        };
        const res = await chai.request(server)
          .post('/postusermail')
          .send(userObj);
        expect(res.statusCode).to.equal(200);
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should validate the users giving invalid email', async () => {
      try {
        const userObj = {
          email: 'parinitha123gmail.com',
        };
        const res = await chai.request(server)
          .post(`/postusermail`)
          .send(userObj);
        expect(res.statusCode).to.equal(401);
        expect(res.body.error).to.equal('Email is invalid');
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should user logout', async () => {
      try {
        const res = await chai.request(server)
          .delete('/logout')
        expect(res.statusCode).to.equal(200);
      }
      catch (error) {
        throw new Error(error);
      }
    });
  })
})