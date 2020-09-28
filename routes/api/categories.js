const { Console } = require('console');
const express = require('express');
const router = express.Router();
const Category = require('../../models/category');

router.get('/', (req, res) => {
    //console.log('Category API hit');
    Category.getCategories((err, result) => {
        if(err) {
            res.json({ success: false, msg: err });
        } else {
            res.json(result);
        }
    });
});

router.get('/:catName', (req, res) => {
    //console.log('Category API hit');
    Category.getCategoryByName(req.params.catName, (err, result) => {
        if(err || result === null) {
            res.json({ success: false, msg: 'No category by that name' });
        } else {
            res.json({ success: true, msg: result });
        }
    });
});

router.post('/', (req,res) => {
    //console.log('Category API hit');
    cat = {
        catName: req.body.catName
    }
    Category.addCategory(req.body, (err, result) => {
        if(err) {
            res.json({ success: false, msg: 'Validation failed, none unique name / empty field?' });
        } else {
            res.json({ success: true, msg: `${cat.catName} has been saved to the database` });
        }
    });
});

module.exports = router;