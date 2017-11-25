var should = require('should');
var request  = require('supertest');

var Passenger = require('../models/Passenger');

var app = require('../app');



//Testing GET API Call
describe('GET /api/terminal/passengers/', function () {
  it('respond with json',function (done) {
    request(app)
      .get('/api/terminal/passengers/')
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
var passenger = new Passenger();
passenger.passenger_name = "Andrew Fernando";

describe('POST /api/terminal/card/',function () {
  it('succefully added card object',function (done) {
    request(app)
      .post('/api/terminal/card/')
      .send(passenger)
      .set('Accept','application/json')
      .expect('Content-Type', /json/)
      .end(function (err,res) {
        if(err)
          return done(err);
        done();
      });
  })
})


