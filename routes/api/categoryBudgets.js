const { json } = require('express');
const express = require('express');
const router = express.Router();
const budget = require('../../models/budget');

//Return a json array of all the category budgets set
router.get('/', (req, res) => {
    budget.getBudgets((err, result) => {
        if(err) {
            res.json({ success: false, msg:'Could not retrieve budgets' });
        } else {
            res.json({ success: true, msg: result });
        }
    });
});

router.post('/', (req, res) => {
    budget.addBudget(req.body, (err, result) => {
        if (err) {
            res.json({ success: false, msg: 'Could not save budget, missing values?' });
        } else {
            res.json({ success: true, msg: 'Budget successfully added' });
        }
    });
});

router.get('/:year', (req, res) => {
    budget.getBudgetsByTimeFrame(req.params.year, req.query.month, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json(result);
        }
    });
});

module.exports = router;