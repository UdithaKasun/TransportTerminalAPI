var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    ticket_holder : [{type: Schema.Types.ObjectId, ref: 'Passenger'}],
    ticket_id : String,
    ticket_amount : Number
});

module.exports = mongoose.model('Ticket',ticketSchema,'transport_Ticket');

