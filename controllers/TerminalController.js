var mongoose = require('mongoose');
var Passenger = mongoose.model('Passenger');
var RegularCard = mongoose.model('RegularTravelCard');
var TourCard = mongoose.model('TourTravelCard');

var terminalController = {};

//Register New Card in the System
terminalController.createNewCard = function (details) {
    return cardCreationPromise = new Promise((resolve, reject) => {
        var passenger = new Passenger(details.passenger);
        passenger.save().then(function (savedPassenger) {
            if (details.card.card_type = "REGULAR") {
                var regularCard = {};
                regularCard.card_holder = savedPassenger._id;
                regularCard.card_balance = 0.00;
                regularCard.card_issued_date = new Date();
                var regularCardDetails = new RegularCard(regularCard);
                regularCardDetails.save().then(function () {
                    resolve({ status : "COMPLETE" , operation : "CARD_CREATED"});
                }).catch(function(error) {
                    reject({ status : "PARTIAL" , operation : "PASSENGER_CREATED"});
                });
            }
            else if (details.card.card_type = "TOUR") {
                var expiryDate = new Date();
                expiryDate.setDate(result.getDate() + 7);

                var tourCard = {};
                tourCard.card_holder = savedPassenger._id;
                tourCard.card_balance = 0.00;
                tourCard.card_issued_date = new Date();
                tourCard.card_expiry_date = expiryDate;
                var tourCardDetails = new TourCard(tourCard);
                tourCardDetails.save().then(function () {
                    resolve({ status : "COMPLETE" , operation : "CARD_CREATED"});
                }).catch(function(error) {
                    reject({ status : "PARTIAL" , operation : "PASSENGER_CREATED"});
                });
            }
        }).catch(function(error) {
            reject({ status : "FAILED" , operation : "PASSENGER_CREATION_FAILED"});
        });

    });
}

terminalController.checkBalance = function (details) {
    return cardCreationPromise = new Promise((resolve, reject) => {
        var passenger = new Passenger(details.passenger);
        passenger.save().then(function (savedPassenger) {
            if (details.card.card_type = "REGULAR") {
                var regularCard = {};
                regularCard.card_holder = savedPassenger._id;
                regularCard.card_balance = 0.00;
                regularCard.card_issued_date = new Date();
                var regularCardDetails = new RegularCard(regularCard);
                regularCardDetails.save().then(function () {
                    resolve({ status : "COMPLETE" , operation : "CARD_CREATED"});
                }).catch(function(error) {
                    reject({ status : "PARTIAL" , operation : "PASSENGER_CREATED"});
                });
            }
            else if (details.card.card_type = "TOUR") {
                var expiryDate = new Date();
                expiryDate.setDate(result.getDate() + 7);

                var tourCard = {};
                tourCard.card_holder = savedPassenger._id;
                tourCard.card_balance = 0.00;
                tourCard.card_issued_date = new Date();
                tourCard.card_expiry_date = expiryDate;
                var tourCardDetails = new TourCard(tourCard);
                tourCardDetails.save().then(function () {
                    resolve({ status : "COMPLETE" , operation : "CARD_CREATED"});
                }).catch(function(error) {
                    reject({ status : "PARTIAL" , operation : "PASSENGER_CREATED"});
                });
            }
        }).catch(function(error) {
            reject({ status : "FAILED" , operation : "PASSENGER_CREATION_FAILED"});
        });

    });
}

module.exports = terminalController;