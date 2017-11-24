var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var passengerSchema = new Schema({
    passenger_email : String,
    passenger_name:String,
    passenger_phone_number :String,
    passenger_card : {
        type : Schema.Types.ObjectId,
        ref : 'TravelCard',
        asVirtual: "prop"
    }
});

// register plugin 
var populateExtended = require("mongoose-populate-extended")(mongoose);
passengerSchema.plugin(populateExtended);

module.exports = mongoose.model('Passenger',passengerSchema,'transport_Passenger');

