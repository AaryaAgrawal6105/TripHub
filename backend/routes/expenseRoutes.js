const express = require('express');
const router = express.Router();
const {
  addExpense,
  getExpenses,
  deleteExpense,
  settleUp,
  getSummary
} = require('../controllers/expenseController');
const auth = require('../middleware/authMiddleware');

router.post('/:tripId', auth, addExpense);
router.get('/:tripId', auth, getExpenses);
router.delete('/:expenseId', auth, deleteExpense);
router.post('/settle/:tripId', auth, settleUp);
router.get('/summary/:tripId', auth, getSummary);

module.exports = router;
