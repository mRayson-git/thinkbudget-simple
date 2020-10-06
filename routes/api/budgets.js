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
router.get('/:userEmail', (req, res) => {
    budget.getBudgetByName(req.params.userEmail, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json(result);
        }
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    budget.addBudget(req.body, (err, budget) => {
        if (err) {
            throw err;
        } else {
            res.json(budget);
        }
    });
});

router.put('/', (req, res) => {
    console.log(req.body);
    budget.updateBudget(req.body.userEmail, req.body, (err, budget) => {
        if (err) {
            throw err;
        } else {
            res.json(budget);
        }
    });
});



module.exports = router;