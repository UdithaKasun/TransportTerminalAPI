var mongoose = require('mongoose');
var Passenger = mongoose.model('Passenger');

var terminalController = {};

//Register New Card in the System
terminalController.createNewCard = function (details) {
    return cardCreationPromise = new Promise((resolve, reject) => {
        if (details.passenger_card.card_type == "REGULAR") {
            details.passenger_card.card_balance = 0.00;
            details.passenger_card.card_issued_date = new Date();
            details.passenger_card.card_transactions = [];
        }
        else if(details.passenger_card.card_type == "TOUR"){
            var expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7);
            details.passenger_card.card_balance = 0.00;
            details.passenger_card.card_issued_date = new Date();
            details.passenger_card.card_expiry_date = new Date(expiryDate);
            details.passenger_card.card_transactions = [];
        }

        var passenger = new Passenger(details);
        passenger.save().then(function (savedPassenger) {
            resolve({ status : "COMPLETE" , operation : "PASSENGER_CREATED"});
        }).catch(function(error) {
            reject({ status : "FAILED" , operation : "PASSENGER_CREATION_FAILED"});
        });
    });
}

terminalController.getCardDetails = function (cardId) {
    return cardDetailsPromise = new Promise((resolve, reject) => {
        Passenger.findById(cardId).then(function(result){
            var card_Details = {};
            card_Details.passenger_name = result.passenger_name;
            card_Details.payment_details = result.passenger_payment_details;
            card_Details.card_details = result.passenger_card;
            resolve({status : "SUCCESS" , cardDetails : card_Details});
        })
        .catch(function(error) {
            reject({ status : "FAILED" });
        });
    });
}

terminalController.checkBalance = function (cardId) {
    return cardBalanceCheckPromise = new Promise((resolve, reject) => {
        Passenger.findById(cardId).then(function(result){
            resolve({status : "SUCCESS" , balance : result.passenger_card.card_balance});
        })
        .catch(function(error) {
            reject({ status : "FAILED" });
        });
    });
}

terminalController.getPassengerDetails = function (passengerId) {
    return getPassengerPromise = new Promise((resolve, reject) => {
        Passenger.findById(passengerId).then(function(result){
            console.log(result);
            resolve({status : "SUCCESS" , passenger : result});
        })
        .catch(function(error) {
            reject({ status : "FAILED" });
        });
    });
}

var transactionDetails = {
    transaction_id : String,
    transaction_date : Date,
    transaction_amount : Number,
    transaction_method : Object,
    transaction_status : String
};


terminalController.topUpCard = function (cardId,amount,method) {
    return cardTopupPromise = new Promise((resolve, reject) => {
        Passenger.findById(cardId).then(function(result){
            var transaction = {};
            transaction.transaction_date = new Date();
            transaction.transaction_amount = amount;
            transaction.transaction_method = method;
            transaction.transaction_status = "COMPLETED";
            result.passenger_card.card_transactions.push(transaction);
            result.passenger_card.card_balance += amount;
            result.save()
            .then(function (drug) {
                resolve({status : "SUCCESS" });
            }).catch(function(error) {
                reject({ status : "FAILED" });
            });
        })
        .catch(function(error) {
            reject({ status : "FAILED" });
        });
    });
}

module.exports = terminalController;