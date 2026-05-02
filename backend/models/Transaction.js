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
    user: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User',
        required: true,
        index: true // this is so mongodb can find the ID faster
    },
    createdAt: {
        type: Date,
        default: Date.now
    },


},{timestamps: true});
module.exports = mongoose.model('Transaction', TransactionSchema);