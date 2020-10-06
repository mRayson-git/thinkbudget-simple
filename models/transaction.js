const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TransRecordSchema = schema({
    userEmail: {type: String, required: true},
    transactionDate: {type: String, required: true},
    transactionAmount: {type: Number, required: true},
    transactionCategory: {type: String, required: true}
});

const TransRecord = module.exports = mongoose.model("TransRecord", TransRecordSchema);

module.exports.getTransactions = function(userEmail, callback, limit){
    TransRecord.find({ "userEmail": userEmail },callback).limit(limit);
}

module.exports.addTransaction = function(transaction, callback) {
    TransRecord.create(transaction, callback);
}

module.exports.getTransactionByTimeAndName = function (category, year, month, callback) {
    console.log("Searching for: " + category + " year: " + year + " month: " + month)
    TransRecord.find({ "category": category, "date": { "$regex": year + '-' + month } }, callback);
}