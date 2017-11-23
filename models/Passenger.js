var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var passengerSchema = new Schema({
    passenger_email : String,
    passenger_name:String,
    passenger_phone_number :String
});

module.exports = mongoose.model('Passenger',passengerSchema,'transport_Passenger');

