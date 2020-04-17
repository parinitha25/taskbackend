
const dbHandler = require("../model/index");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
const { authorizeRequest, createUser } = require('./factory/user.factory');
const { expect } = chai;
const authToken = authorizeRequest();

describe('POST', async () => {

  beforeEach(async () => await dbHandler.connect());

  afterEach(async () => await dbHandler.clearDatabase());

  afterEach(async () => await dbHandler.closeDatabase());

  describe('GET', () => {

    it('Should get the events', async () => {
      try {
        const user = await createUser({});
        const res = await chai.request(server)
          .get('/geteventss')
          .set('Authorization', authToken);
        expect(res.statusCode).to.equal(200);
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should post the events', async () => {
      try {
        const user = await createUser({});
        const postuserObj = {
          events: [{
            name: 'parinitha',
            place: 'pandavapura',
          }],
        };
        const res = await chai.request(server)
          .post(`/postevent/${user.id}`)
          .set('Authorization', authToken)
          .send(postuserObj);
        expect(res.statusCode).to.equal(200);
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should updates the events', async () => {
      try {
        const user = await createUser({});
        const updateuserObj = {
          events: [{
            name: 'anusha',
            place: 'mysore',
          }],
        };
        const res = await chai.request(server)
          .put(`/updateevent/${user.id}`)
          .set('Authorization', authToken)
          .send(updateuserObj);
        expect(res.statusCode).to.equal(200);
      }
      catch (error) {
        throw new Error(error);
      }
    });

    it('Should delete the events', async () => {
      try {
        const user = await createUser({});
        const res = await chai.request(server)
          .delete(`/deleteevent/${user.id}/${user.id}`)
          .set('Authorization', authToken)
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('user list deleted sucessfully');
      }
      catch (error) {
        throw new Error(error);
      }
    });
  })
})