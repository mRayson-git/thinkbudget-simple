const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const transaction = require('../../models/transaction');

//Return a json array of all the category budgets set
router.get('/', (req, res) => {
    console.log('transaction API hit');
    transaction.getTransactions((err, result) => {
        if(err) {
            res.json({ success: false, msg:'Could not retrieve budgets' });
        } else {
            res.json({ success: true, msg: result });
        }
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    transaction.addTransaction(req.body, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json(result);
        }
    });
});

router.get('/:category', (req, res) => {
    transaction.getTransactionByTimeAndName(req.params.category,req.query.year, req.query.month, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json(result);
        }
    });
});

module.exports = router;