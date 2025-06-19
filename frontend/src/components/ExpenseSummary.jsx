import React from 'react';

export default function ExpenseSummary({ expenses, members }) {
  const balances = {};
  members.forEach(m => balances[m._id] = 0);

  expenses.forEach(exp => {
    exp.splitAmounts.forEach(split => {
      if (split.user._id !== exp.paidBy._id) {
        balances[split.user._id] -= split.amount;
        balances[exp.paidBy._id] += split.amount;
      }
    });
  });

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h3 className="font-bold mb-2">Balances</h3>
      {Object.entries(balances).map(([uid, amt]) => {
        const usr = members.find(m => m._id === uid);
        return (
          <div key={uid} className="text-sm">
            {usr.name}: {amt > 0 ? `is owed ₹${amt.toFixed(2)}` : `owes ₹${Math.abs(amt).toFixed(2)}`}
          </div>
        );
      })}
    </div>
  );
}
