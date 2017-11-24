var mongoose = require('mongoose');
var Passenger = mongoose.model('Passenger');

var terminalController = {};

//Register New Card in the System
terminalController.createNewCard = function (details) {
    return cardCreationPromise = new Promise((resolve, reject) => {
        if (details.passenger_card.card_type == "REGULAR") {
            details.passenger_card.card_balance = 0.00;
            details.passenger_card.card_issued_date = new Date();
        }
        else if(details.passenger_card.card_type == "TOUR"){
            var expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7);
            details.passenger_card.card_balance = 0.00;
            details.passenger_card.card_issued_date = new Date();
            details.passenger_card.card_expiry_date = new Date(expiryDate);
        }

        var passenger = new Passenger(details);
        passenger.save().then(function (savedPassenger) {
            resolve({ status : "COMPLETE" , operation : "PASSENGER_CREATED"});
        }).catch(function(error) {
            reject({ status : "FAILED" , operation : "PASSENGER_CREATION_FAILED"});
        });
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