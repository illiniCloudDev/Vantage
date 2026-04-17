const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a description']
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('Transaction', TransactionSchema);