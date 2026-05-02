const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction } = require('../controllers/transactions');
const { protect } = require('../middleware/auth');

// This line protects EVERY route below it
router.use(protect);

router
  .route('/')
  .get(getTransactions)
  .post(addTransaction);

module.exports = router;