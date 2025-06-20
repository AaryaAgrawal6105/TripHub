const Expense = require('../models/Expense');
const Trip = require('../models/Trip');

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, paidBy, splitAmounts } = req.body;
    const { tripId } = req.params;

    const expense = await Expense.create({
      trip: tripId,
      title,
      amount,
      paidBy,
      splitAmounts,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const { tripId } = req.params;
    const expenses = await Expense.find({ trip: tripId })
      .populate('paidBy', 'name')
      .populate('splitAmounts.user', 'name');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { title, amount, paidBy, splitAmounts } = req.body;
    const { expenseId } = req.params;

    const updated = await Expense.findByIdAndUpdate(
      expenseId,
      { title, amount, paidBy, splitAmounts },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.expenseId);
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.settleUp = async (req, res) => {
  try {
    const { tripId } = req.params;
    await Expense.deleteMany({ trip: tripId });
    res.json({ msg: 'All expenses settled!' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
