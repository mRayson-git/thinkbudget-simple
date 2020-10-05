const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BudgetSchema = schema({
    userEmail: {type: String, required: true},
    budgetCategories: {type: [], required: true }
});

const Budget = module.exports = mongoose.model("Budget", BudgetSchema);
//GET request
module.exports.getBudgets = function (callback, limit){
    Budget.find(callback).limit(limit);
}

module.exports.getBudgetByName = function(userEmail, callback) {
    Budget.findOne({ 'userEmail': userEmail }, callback);
}

//POST request
module.exports.addBudget = function(budget, callback) {
    console.log(budget);
    Budget.create(budget, callback);
}

//PUT request
module.exports.updateBudget = function(userEmail, budget, callback) {
    Budget.updateOne({"userEmail": userEmail}, budget, callback);
}
