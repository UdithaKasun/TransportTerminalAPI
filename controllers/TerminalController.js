var mongoose = require('mongoose');
var Passenger = mongoose.model('Passenger');
var TravelCard = mongoose.model('TravelCard');

var terminalController = {};

//Register New Card in the System
terminalController.createNewCard = function (details) {
    return cardCreationPromise = new Promise((resolve, reject) => {
        if (details.card.card_type == "REGULAR") {
            var regularCard = {};
            regularCard.card_holder = savedPassenger._id;
            regularCard.card_balance = 0.00;
            regularCard.card_issued_date = new Date();
            regularCard.card_type == "REGULAR";
            var regularCardDetails = new TravelCard(regularCard);
            regularCardDetails.save().then(function (savedCard) {
                details.passenger.passenger_card = savedCard._id;
                var passenger = new Passenger(details.passenger);
                passenger.save().then(function (savedPassenger) {
                    resolve({ status : "COMPLETE" , operation : "PASSENGER_CREATED"});
                }).catch(function(error) {
                    reject({ status : "FAILED" , operation : "PASSENGER_CREATION_FAILED"});
                });
            }).catch(function(error) {
                reject({ status : "PARTIAL" , operation : "PASSENGER_CREATED"});
            });
        }
        else if (details.card.card_type == "TOUR") {
            console.log("Its Tour");
            var expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7);

            var tourCard = {};
            tourCard.card_balance = 0.00;
            tourCard.card_type = "TOUR";
            tourCard.card_issued_date = new Date();
            tourCard.card_expiry_date = new Date(expiryDate);
            var tourCardDetails = new TravelCard(tourCard);
            tourCardDetails.save().then(function (savedCard) {
                details.passenger.passenger_card = savedCard._id;
                var passenger = new Passenger(details.passenger);
                passenger.save().then(function (savedPassenger) {
                    resolve({ status : "COMPLETE" , operation : "PASSENGER_CREATED"});
                }).catch(function(error) {
                    reject({ status : "FAILED" , operation : "PASSENGER_CREATION_FAILED"});
                });
            }).catch(function(error) {
                reject({ status : "PARTIAL" , operation : "PASSENGER_CREATED"});
            });
        }

       

    });
}

terminalController.checkBalance = function (cardId) {
    return cardBalancePromise = new Promise((resolve, reject) => {
        TravelCard.findById(cardId,function(cardDetails){
            resolve({status : "SUCCESS" , balance : cardDetails.card_balance});
        })
        .catch(function(error) {
            reject({ status : "FAILED" });
        });
    });
}

module.exports = terminalController;