var router = require('express').Router();
var mongoose = require('mongoose');
var Driver = mongoose.model('Driver');
var auth = require('../auth');

//Add new driver to the database
router.post('/', auth.optional, function (req, res, next) {
    var driver = new Driver(req.body.driver);
    return driver.save().then(function () {
        return res.json({ status: "Driver saved successfully" });
    });
});

//Get All Driver Details from DB
router.get('/', auth.optional, function (req, res, next) {
    Driver.find({})
    .populate('bus_details')
    .then(function (driver) {
      if (!driver) { return res.sendStatus(404); }
      return res.json({
        driver: driver
      });
    }).catch(next);
  });

  //Check username and password
  router.post('/authenticate', function(req, res) {
  
    // find the driver
    Driver.findOne({
      username: req.body.username
    })
    .populate('bus_details')
    .then( function(user) {
  
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
            agency:user.agency,
            bus_details: user.bus_details

          });
        }   
  
      }
  
    });
  });


  module.exports = router;