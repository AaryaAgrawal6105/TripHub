const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, deleteExpense, updateExpense, settleUp } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:tripId', authMiddleware, addExpense);
router.get('/:tripId', authMiddleware, getExpenses);
router.put('/:expenseId', authMiddleware, updateExpense);
router.delete('/:expenseId', authMiddleware, deleteExpense);
router.post('/settle/:tripId', authMiddleware, settleUp);

module.exports = router;
