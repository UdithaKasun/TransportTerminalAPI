var mongoose = require('mongoose');
var Passenger = mongoose.model('Passenger');
var RegularCard = mongoose.model('RegularTravelCard');


var terminalController = {};

//Register New Card in the System
terminalController.createNewCard = function(details){
    return cardCreationPromise = new Promise((resolve, reject) => {
        var passenger = new Passenger(details.passenger);
        passenger.save().then(function (savedPassenger) {
            console.log(savedPassenger);
            if(details.cardInfo.card_type = "R"){
            details.cardInfo.card_holder = savedPassenger._id;
              var regularCardDetails = new RegularCard(details.cardInfo);
              regularCardDetails.save().then(function () {
                  resolve();
              }).catch();
            }
          })
      });
}

module.exports = terminalController;