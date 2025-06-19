const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  const { title, amount, paidBy, sharedWith } = req.body;
  const { tripId } = req.params;

  const splitAmount = amount / sharedWith.length;
  const splitAmounts = sharedWith.map(userId => ({
    user: userId,
    amount: splitAmount
  }));

  const expense = new Expense({
    trip: tripId,
    title,
    amount,
    paidBy,
    sharedWith,
    splitAmounts
  });

  await expense.save();
  res.status(201).json({ msg: "Expense added successfully", expense });
};

exports.getTripExpenses = async (req, res) => {
  const { tripId } = req.params;

  const expenses = await Expense.find({ trip: tripId })
    .populate('paidBy', 'name')
    .populate('sharedWith', 'name')
    .populate('splitAmounts.user', 'name');

  res.json(expenses);
};
