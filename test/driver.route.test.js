var should = require('should');
var request  = require('supertest');

var Driver = require('../models/Driver');

var app = require('../app');



//Testing GET API Call
describe('GET /api/driver/', function () {
  it('respond with json',function (done) {
    request(app)
      .get('/api/driver/')
      .set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err,res) {
        if(err)
          return done(err);
        done();
      });
  });
});


//Testing POST API Call
var driver = new Driver();
driver.username = "saman";
driver.password = "12345";

describe('POST /api/driver/',function () {
  it('succefully added driver object',function (done) {
    request(app)
      .post('/api/driver/')
      .send(driver)
      .set('Accept','application/json')
      .expect('Content-Type', /json/)
      .end(function (err,res) {
        if(err)
          return done(err);
        done();
      });
  })
})


