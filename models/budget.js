const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BudgetSchema = schema({
    date: { type: String, required: true },
    categoryName: { type: String, required: true },
    amount: { type: Number, required: true }
});

const Budget = module.exports = mongoose.model("Budget", BudgetSchema);

module.exports.getBudgets = function (callback, limit){
    Budget.find(callback).limit(limit);
}

module.exports.addBudget = function(budget, callback) {
    console.log(budget);
    Budget.create(budget, callback);
}

module.exports.getBudgetsByTimeFrame = function (year, month, callback){
    console.log(year + '-' + month)
    Budget.find({"date": { "$regex": year + '-' + month }  }, callback);
}