const Transaction = require('../models/Transaction');

// @desc    Get all transactions for the logged-in user
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({user: req.user.id});

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        res.status(500).json({success: false, error: 'Servor Error'});        
    }
};
// @desc    Add a transaction
// @route   POST /api/transactions
// @access  Private
exports.addTransaction = async (req, res) => {
  try {
    // Add the user ID from (req.user) to the body
    req.body.user = req.user.id;

    const transaction = await Transaction.create(req.body);

    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};