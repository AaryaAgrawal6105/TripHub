const express = require('express');
const router = express.Router();
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  settleUp
} = require('../controllers/expenseController');

const auth = require('../middleware/authMiddleware');

router.post('/:tripId', auth, addExpense);
router.get('/:tripId', auth, getExpenses);
router.put('/:expenseId', auth, updateExpense);
router.delete('/:expenseId', auth, deleteExpense);
router.post('/settle/:tripId', auth, settleUp);

module.exports = router;
