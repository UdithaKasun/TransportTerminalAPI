var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var tourCardSchema = new Schema({
    card_holder : [{type: Schema.Types.ObjectId, ref: 'Passenger'}],
    card_id : String,
    card_balance : Number,
    card_issued_date:String,
    card_expiry_date:String
});

module.exports = mongoose.model('TourTravelCard',tourCardSchema,'transport_tour_card');