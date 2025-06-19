const Expense = require('../models/Expense');
const Trip = require('../models/Trip');

exports.addExpense = async (req, res) => {
  const { description, amount, paidBy, splits } = req.body;
  const expense = new Expense({ tripId: req.params.tripId, description, amount, paidBy, splits });
  await expense.save();
  res.status(201).json(expense);
};

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ tripId: req.params.tripId }).populate('paidBy').populate('splits.user');
  res.json(expenses);
};

exports.updateExpense = async (req, res) => {
  const { description, amount, paidBy, splits } = req.body;
  const expense = await Expense.findById(req.params.expenseId);
  if (!expense) return res.status(404).json({ msg: 'Expense not found' });

  expense.description = description;
  expense.amount = amount;
  expense.paidBy = paidBy;
  expense.splits = splits;
  await expense.save();
  res.json(expense);
};

exports.deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.expenseId);
  if (!expense) return res.status(404).json({ msg: 'Expense not found' });

  await expense.deleteOne();
  res.json({ msg: 'Expense deleted successfully' });
};

exports.settleUp = async (req, res) => {
  const expenses = await Expense.find({ tripId: req.params.tripId });
  const balances = {};

  expenses.forEach(exp => {
    const payer = exp.paidBy.toString();
    balances[payer] = (balances[payer] || 0) + exp.amount;

    exp.splits.forEach(s => {
      balances[s.user.toString()] = (balances[s.user.toString()] || 0) - s.share;
    });
  });

  const summary = Object.entries(balances).map(([user, balance]) => ({ user, balance }));
  res.json({ summary });
};
