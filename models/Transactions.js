const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        default: new Date()
    },
    name: {
        type: String,
        required: true
    },

    transactionType: {
        type: String,
        required: true
    },
    unit: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Transactions', transactionSchema);