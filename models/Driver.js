var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var BusDriver = new Schema({
    username: String,
    password: String,
    agency: String,
    bus_details:{type:Schema.Types.ObjectId, ref: 'Bus'}
});

var DriverModel = mongoose.model('Driver', BusDriver);

module.exports = DriverModel;
