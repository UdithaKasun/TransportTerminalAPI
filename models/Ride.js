var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var Ride = new Schema({
    token_id : String,
    bus_id : String,
    distance : Double,
    cost : Double,
    ride_status : String,
    start_location : String,
    end_location : String
});

var RideModel = mongoose.model('Ride', Ride);

module.exports = RideModel;
