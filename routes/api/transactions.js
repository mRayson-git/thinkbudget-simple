const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const transaction = require('../../models/transaction');

// GET
router.get('/:userEmail', (req, res) => {
    console.log('transaction API hit');
    transaction.getTransactions(req.params.userEmail, (err, transactions) => {
        if (err) throw err;
        else {
            res.json(transactions);
        }
    });
});



// POST
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