var transaction = require('./Transaction');

var travelCard = {
    card_type : String,
    card_balance : Number,
    card_issued_date:Date,
    card_expiry_date:Date,
    card_transactions : [transaction]
};

module.exports = travelCard;
