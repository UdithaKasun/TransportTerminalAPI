var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var regularTravelCardSchema = new Schema({
    card_holder : [{type: Schema.Types.ObjectId, ref: 'Passenger'}],
    card_id : String,
    card_balance : Number,
    card_issued_date:String
});

module.exports = mongoose.model('RegularTravelCard',regularTravelCardSchema,'transport_regular_card');

