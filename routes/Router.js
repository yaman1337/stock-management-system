const express = require('express');
const router = express.Router();
const Transactions = require('../models/Transactions');

// get all data 
router.get('/api/all', async(req, res) => {
    try {
        const allData = await Transactions.find();
        if (allData.length == 0) {
            return res.status(200).json({ error: "No data" });
        };
        res.status(200).json({ data: allData })
    } catch (err) {
        console.log(err);
    };
});

// add a new data
router.post('/api/add', async(req, res) => {
    try {
        const { date, name, unit, cost, transactionType } = req.body;
        total = cost * unit;

        if (transactionType == "Buy" || transactionType == "Sell") {
            const newData = new Transactions({ date, name, unit, cost, transactionType, total });

            const data = await newData.save();

            if (!data) {
                return res.status(422).json({ error: "Something went wrong." })
            }
            res.status(201).json({ message: "Successfully added new data." });
        } else {
            return res.status(422).json({ error: `Error transcation type ${transactionType}` })
        }

    } catch (err) {
        console.log(err);
    };
});

// delete a record
router.delete('/api/delete/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deleteData = await Transactions.findById(id);
        deleteData.delete()
            .then(() => res.status(200).json({ message: "Successfully deleted." }))
            .catch(err => console.log(err.message));
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;