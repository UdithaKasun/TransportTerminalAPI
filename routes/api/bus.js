var router = require('express').Router();
var mongoose = require('mongoose');
var Bus = mongoose.model('Bus');
var auth = require('../auth');

//Add new bus details to the database
router.post('/', auth.optional, function (req, res, next) {
    var bus = new Bus(req.body.bus);
    return bus.save().then(function () {
        return res.json({ status: "Bus details saved successfully" });
    });
});

//Get All Bus Details from DB
router.get('/', auth.optional, function (req, res, next) {
    Bus.find({})
    .then(function (bus) {
      if (!bus) { return res.sendStatus(404); }
      return res.json({
        bus: bus
      });
    }).catch(next);
  });

  //Check username and password
  router.post('/authenticate', function(req, res) {
  
    // find the driver
    Driver.findOne({
      username: req.body.username
    }, function(err, user) {
  
      if (err) throw err;
  
      if (!user) {
        res.json({ login_status: false, message: 'Authentication failed. Driver not found.' });
      } else if (user) {
  
        // check if password matches
        if (user.password != req.body.password) {
          res.json({ login_status: false, message: 'Authentication failed. Wrong password.' });
        } else {
  
          // return the information including token as JSON
          res.json({
            login_status: true,
            bus_number: user.bus_number,
            agency: user.agency,
            contact: user.contact,
            route_number: user.route_number,
            start_location: user.start_location,
            end_location : user.end_location,
            journey_cost : user.journey_cost

          });
        }   
  
      }
  
    });
  });


  module.exports = router;