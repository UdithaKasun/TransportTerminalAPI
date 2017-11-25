var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var Passenger = mongoose.model('Passenger');
var User = mongoose.model('User');
var auth = require('../auth');
var terminalController = require('../../controllers/TerminalController');

//Getting all passengers from the database

router.get('/passengers', auth.optional, function (req, res, next) {
    Passenger.find({})
        .then(function (passengers) {
            return res.json({
                passengers: passengers
            });
        }).catch(next);
});

//Add a new Card to Database
router.post('/cards', auth.optional, function (req, res, next) {
    var cardCreationPromise = terminalController.createNewCard(req.body);
    cardCreationPromise.then(function (msg) {
        return res.json(msg);
    })
        .catch(err => {
            return res.json(err);
    });
});

//Reduce Amount Mobile Implementation
router.post('/cards/balance', auth.optional, function (req, res, next) {
    var cardCreationPromise = terminalController.reduceAmount(req.body.card_id,req.body.amount);
    cardCreationPromise.then(function (msg) {
        return res.json(msg);
    })
        .catch(err => {
            return res.json(err);
    });
});

//Get Card By Id
router.get('/cards/:id', auth.optional, function (req, res, next) {
    var passengerPromise = terminalController.getPassengerDetails(req.params.id);
    passengerPromise.then(function (msg) {
        return res.json(msg);
    })
        .catch(err => {
            return res.json(err);
    });
});

//Get Card Balance Only
router.get('/cards/:id/balance', auth.optional, function (req, res, next) {
    var passengerPromise = terminalController.checkBalance(req.params.id);
    passengerPromise.then(function (msg) {
        return res.json(msg);
    })
        .catch(err => {
            return res.json(err);
    });
});

//Top Up Card By Id
router.post('/cards/:id/topup', auth.optional, function (req, res, next) {
    var cardTopupPromise = terminalController.topUpCard(req.params.id,req.body.amount,req.body.method)
    cardTopupPromise.then(function (msg) {
        return res.json(msg);
    })
        .catch(err => {
            return res.json(err);
    });
});


 //get passenger details and travel card details for android app
 router.post('/passenger', function(req, res) {
    
      // find the passenger
      Passenger.findOne({
        _id: req.body.id
      })
      .populate('bus_details')
      .then( function(user) {
    
        if (!user) {
          res.json({ status: false, message: 'Passenger not found.' });
        } else {
    
            // if passenger found return the passenger and card information
            res.json({
              status: true,
              passenger_name : user.passenger_name,
              passenger_card : user.passenger_card.card_balance,
            });
          }   
      });
    });

module.exports = router;