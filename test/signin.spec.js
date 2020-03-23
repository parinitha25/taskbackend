
const request = require('supertest')
const app = require('../server')

const dbHandler=require("../model/index")


describe("POST/user", () => {
  
beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

  let data = {
    username:'parinita',
    email:'parinitha123@gmail.com',
    password:'Pari@123',
    gender:'female',
    phone:'123-333-3333',
    role:'user'
  };


  describe('Create', () => {
  it('Should save user to database',  done => {
    request(app).post('/signup')
    .send(data)
     expect(200);
     expect("parinitha123@gmail.com").toEqual(data.email);
      console.log(data)
      done();
      
  })
  })

  it('should get the data',  async done => {
     request(app)
     .get('/signupall')
     expect(200);
     expect("parinitha123@gmail.com").toEqual(data.email);
     done();
 })

})