var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var TravelCard = require('./TravelCard');

var tourCardSchema = TravelCard.DBSchema.extend({
    card_expiry_date:Date
} , {  discriminatorKey : '_type' });

module.exports = mongoose.model('TourTravelCard',tourCardSchema,'transport_tour_card');