import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api';
import { useParams } from 'react-router-dom';

export default function TripExpenses() {
  const { tripId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [form, setForm] = useState({ description: '', amount: '', paidBy: '', splits: [] });
  const [settleSummary, setSettleSummary] = useState([]);

  const fetchExpenses = async () => {
    const res = await axiosInstance.get(`/expenses/${tripId}`);
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleEdit = (expense) => {
    setEditingExpense(expense._id);
    setForm({
      description: expense.description,
      amount: expense.amount,
      paidBy: expense.paidBy._id,
      splits: expense.splits.map(s => ({ user: s.user._id, share: s.share })),
    });
  };

  const handleUpdate = async () => {
    await axiosInstance.put(`/expenses/${editingExpense}`, form);
    fetchExpenses();
    setEditingExpense(null);
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  const handleSettleUp = async () => {
    const res = await axiosInstance.post(`/expenses/settle/${tripId}`);
    setSettleSummary(res.data.summary);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Expenses</h2>
      {expenses.map(exp => (
        <div key={exp._id} className="border p-3 rounded mb-2 bg-white shadow-sm">
          <p><strong>{exp.description}</strong> - ₹{exp.amount} <span className="text-sm text-gray-500">Paid by {exp.paidBy.name}</span></p>
          <ul className="text-sm text-gray-700 ml-4">
            {exp.splits.map((s, i) => <li key={i}>{s.user.name} owes ₹{s.share}</li>)}
          </ul>
          <div className="mt-2 flex gap-2">
            <button onClick={() => handleEdit(exp)} className="text-blue-500 text-sm">Edit</button>
            <button onClick={() => handleDelete(exp._id)} className="text-red-500 text-sm">Delete</button>
          </div>
        </div>
      ))}

      {editingExpense && (
        <div className="p-4 border rounded bg-gray-50 mt-4">
          <input
            className="border p-2 w-full mb-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="border p-2 w-full mb-2"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          {/* Add dropdowns for paidBy and splits as needed */}
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-1 rounded">Update</button>
        </div>
      )}

      <button
        onClick={handleSettleUp}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Settle Up
      </button>

      {settleSummary.length > 0 && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-2">Settlement Summary</h3>
          <ul>
            {settleSummary.map((s, i) => (
              <li key={i}>
                User: {s.user} → Balance: ₹{s.balance}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
