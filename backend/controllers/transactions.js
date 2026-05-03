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
// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
exports.updateTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if(!transaction){
      return res.status(404).json({ success: false, error: 'No transaction found' });
    }
    //ensure user owns the transactions 
    if(transaction.user.toString() !== req.user.id){
      return res.status(401).json({success: false, error: 'Not authorized'});
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({ success: true, data: transaction });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });    
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ success: false, error: 'No transaction found' });
    }

    // Make sure user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    await transaction.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};