import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api';
import { useParams } from 'react-router-dom';

export default function TripExpenses() {
  const { tripId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', paidBy: '', splitAmounts: [] });

  const fetchExpenses = async () => {
    const res = await axiosInstance.get(`/expenses/${tripId}`);
    setExpenses(res.data);
  };

  const fetchTrip = async () => {
    const res = await axiosInstance.get(`/trips/${tripId}`);
    setMembers(res.data.members);
  };

  useEffect(() => {
    fetchExpenses();
    fetchTrip();
  }, []);

  const handleAddExpense = async () => {
    await axiosInstance.post(`/expenses/${tripId}`, form);
    fetchExpenses();
    setForm({ title: '', amount: '', paidBy: '', splitAmounts: [] });
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  const handleSplitChange = (index, field, value) => {
    const updated = [...form.splitAmounts];
    updated[index][field] = value;
    setForm({ ...form, splitAmounts: updated });
  };

  const addSplit = () => {
    setForm({ ...form, splitAmounts: [...form.splitAmounts, { user: '', amount: '' }] });
  };

  const removeSplit = (index) => {
    const updated = [...form.splitAmounts];
    updated.splice(index, 1);
    setForm({ ...form, splitAmounts: updated });
  };

  const handleSettle = async () => {
    await axiosInstance.post(`/expenses/settle/${tripId}`);
    fetchExpenses();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Trip Expenses</h2>

      {/* Add Expense Form */}
      <div className="bg-white shadow p-4 rounded mb-6 space-y-3">
        <input
          placeholder="Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 w-full"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          value={form.paidBy}
          onChange={(e) => setForm({ ...form, paidBy: e.target.value })}
        >
          <option value="">Paid By</option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>{m.name}</option>
          ))}
        </select>

        <div>
          <h4 className="font-semibold mt-2">Split With:</h4>
          {form.splitAmounts.map((s, i) => (
            <div key={i} className="flex gap-2 my-2">
              <select
                className="border p-2 w-1/2"
                value={s.user}
                onChange={(e) => handleSplitChange(i, 'user', e.target.value)}
              >
                <option value="">Member</option>
                {members.map((m) => (
                  <option key={m._id} value={m._id}>{m.name}</option>
                ))}
              </select>
              <input
                type="number"
                className="border p-2 w-1/3"
                placeholder="Amount"
                value={s.amount}
                onChange={(e) => handleSplitChange(i, 'amount', e.target.value)}
              />
              <button onClick={() => removeSplit(i)} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={addSplit} className="text-blue-600 text-sm">+ Add Split</button>
        </div>

        <button onClick={handleAddExpense} className="bg-blue-600 text-white px-4 py-2 rounded">Add Expense</button>
        <button onClick={handleSettle} className="bg-red-600 text-white px-4 py-2 rounded">Settle All</button>
      </div>

      {/* Expense List */}
      {expenses.map((e) => (
        <div key={e._id} className="bg-gray-100 rounded p-3 mb-3 shadow">
          <h4 className="font-bold">{e.title} - ₹{e.amount}</h4>
          <p className="text-sm text-gray-700">Paid by: {e.paidBy.name}</p>
          <ul className="text-sm mt-2">
            {e.splitAmounts.map((s, i) => (
              <li key={i}>{s.user.name} owes ₹{s.amount}</li>
            ))}
          </ul>
          <button onClick={() => handleDelete(e._id)} className="text-red-500 mt-1 text-sm">Delete</button>
        </div>
      ))}
    </div>
  );
}
