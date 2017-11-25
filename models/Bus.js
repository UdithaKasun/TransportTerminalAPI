var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var Bus = new Schema({
    bus_number: String,
    agency: String,
    contact: String,
    route_number : Number,
    start_location : String,
    end_location : String
});

var BusModel = mongoose.model('Bus', Bus);

module.exports = BusModel;
