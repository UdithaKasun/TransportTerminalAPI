var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var CardDetails = require('./TravelCard');
var PaymentDetails = require('./PaymentDetails');

var passengerSchema = new Schema({
    passenger_email : String,
    passenger_name:String,
    passenger_nic:String,
    passenger_phone_number :String,
    passenger_card : CardDetails,
    passenger_payment_details : PaymentDetails
});

module.exports = mongoose.model('Passenger',passengerSchema,'transport_Passenger');

