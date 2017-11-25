var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var Passenger = mongoose.model('Passenger');
var User = mongoose.model('User');
var auth = require('../auth');
var terminalController = require('../../controllers/TerminalController');

//Getting all drugs from the database

router.get('/passengers', auth.optional, function (req, res, next) {
    Passenger.find({})
        .then(function (passengers) {
            return res.json({
                passengers: passengers
            });
        }).catch(next);
});

//Add a new Card to Database
router.post('/card', auth.optional, function (req, res, next) {
    var cardCreationPromise = terminalController.createNewCard(req.body);
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

module.exports = router;