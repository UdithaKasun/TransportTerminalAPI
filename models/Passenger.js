var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var passengerSchema = new Schema({
    passenger_email : String,
    passenger_name:String,
    passenger_phone_number :String,
    passenger_card : {
        kind : String,
        card_details : {type : Schema.Types.ObjectId, refPath: 'passenger_card.kind'}
    }
},{collection : "Passengers"});

module.exports = mongoose.model('Passenger',passengerSchema,'transport_Passenger');

