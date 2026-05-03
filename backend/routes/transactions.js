const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactions');
const { protect } = require('../middleware/auth');

// This line protects EVERY route below it
router.use(protect);

router
  .route('/')
  .get(getTransactions)
  .post(addTransaction)

router
  .route('/:id')
  .put(updateTransaction)
  .delete(deleteTransaction)

module.exports = router;
