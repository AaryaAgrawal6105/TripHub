const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  title: String,
  amount: Number,
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  splitAmounts: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      amount: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
