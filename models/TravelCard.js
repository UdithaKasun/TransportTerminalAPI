var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var travelCard = new Schema({
    card_type : String,
    card_balance : Number,
    card_issued_date:Date,
    card_expiry_date:Date
});

var CardModel = mongoose.model('TravelCard', travelCard);

module.exports = CardModel;
