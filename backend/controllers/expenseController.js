const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, paidBy, splitAmounts } = req.body;
    const { tripId } = req.params;

    const expense = await Expense.create({
      trip: tripId,
      title,
      amount,
      paidBy,
      splitAmounts
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
    await Expense.deleteMany({ trip: req.params.tripId });
    res.json({ msg: 'All expenses settled!' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// In getSummary controller
exports.getSummary = async (req, res) => {
  try {
    const { tripId } = req.params;
    const expenses = await Expense.find({ trip: tripId });

    const balanceMap = {}; // userId => { spent, owes }

    expenses.forEach(exp => {
      const paidBy = exp.paidBy.toString();
      if (!balanceMap[paidBy]) balanceMap[paidBy] = { spent: 0, owes: 0 };
      balanceMap[paidBy].spent += exp.amount;

      exp.splitAmounts.forEach(s => {
        const uid = s.user.toString();
        if (!balanceMap[uid]) balanceMap[uid] = { spent: 0, owes: 0 };
        balanceMap[uid].owes += s.amount;
      });
    });

    const balances = [];
    for (const uid in balanceMap) {
      const { spent, owes } = balanceMap[uid];
      balances.push({ user: uid, net: spent - owes });
    }

    // Simplify debts using greedy algorithm
    balances.sort((a, b) => a.net - b.net);
    let i = 0, j = balances.length - 1;
    const transactions = [];

    while (i < j) {
      const debit = -balances[i].net;
      const credit = balances[j].net;
      const settledAmount = Math.min(debit, credit);

      if (settledAmount > 0) {
        transactions.push({
          from: balances[i].user,
          to: balances[j].user,
          amount: settledAmount
        });

        balances[i].net += settledAmount;
        balances[j].net -= settledAmount;
      }

      if (balances[i].net === 0) i++;
      if (balances[j].net === 0) j--;
    }

    res.json({ balances: balanceMap, transactions });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


exports.updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { title, amount, paidBy, splitAmounts } = req.body;

    const updated = await Expense.findByIdAndUpdate(
      expenseId,
      { title, amount, paidBy, splitAmounts },
      { new: true }
    ).populate('paidBy', 'name')
     .populate('splitAmounts.user', 'name');

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

