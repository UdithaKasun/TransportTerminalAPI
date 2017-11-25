var router = require('express').Router();
var mongoose = require('mongoose');
var Ride = mongoose.model('Ride');
var auth = require('../auth');

//Add new ride to the database
router.post('/', auth.optional, function (req, res, next) {
    var ride = new Ride(req.body.ride);
    return ride.save().then(function () {
        return res.json({ status: "Ride saved successfully" });
    });
});

//Get All Rides Details from DB
router.get('/', auth.optional, function (req, res, next) {
    Ride.find({})
    .then(function (ride) {
      if (!ride) { return res.sendStatus(404); }
      return res.json({
        ride: ride
      });
    }).catch(next);
  });

  module.exports = router;