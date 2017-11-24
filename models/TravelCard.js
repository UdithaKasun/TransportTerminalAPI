var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var travelCard = new Schema({
    card_balance : Number,
    card_issued_date:Date
},{ collection : 'components', discriminatorKey : '_type' });

var CardModel = mongoose.model('TravelCard', travelCard);

var card = {};
card.DBSchema = travelCard;
card.DBModel = CardModel;

module.exports = card;
