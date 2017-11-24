var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var passengerSchema = new Schema({
    passenger_email : String,
    passenger_name:String,
    passenger_phone_number :String,
    passenger_card : {
        type : Schema.Types.ObjectId, ref: 'TravelCard'
    }
});

module.exports = mongoose.model('Passenger',passengerSchema,'transport_Passenger');

