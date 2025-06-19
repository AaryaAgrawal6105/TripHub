const express = require('express');
const router = express.Router();
const { addExpense, getTripExpenses } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:tripId', authMiddleware, addExpense);
router.get('/:tripId', authMiddleware, getTripExpenses);

module.exports = router;
