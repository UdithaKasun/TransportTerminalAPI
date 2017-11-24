var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var TravelCard = require('./TravelCard');

var regularTravelCardSchema = TravelCard.DBSchema.extend({

},{collection : "RegularCard"});

module.exports = mongoose.model('RegularTravelCard',regularTravelCardSchema,'transport_regular_card');

