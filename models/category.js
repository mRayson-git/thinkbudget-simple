const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CategorySchema = schema({
    catName: { type: String, required: true, unique: true }
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.getCategories = function(callback, limit) {
    Category.find({},null,{sort: {catName: 1}},callback).limit(limit);
}

module.exports.addCategory = function(category, callback) {
    Category.create(category, callback);
}

module.exports.getCategoryByName = function(catName, callback) {
    Category.findOne({ "catName": catName }, callback);
}

