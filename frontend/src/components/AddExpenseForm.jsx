import React, { useState } from 'react';
import { axiosInstance } from '../api';
import { toast } from 'react-toastify';

export default function AddExpenseForm({ tripId, members, onAdded }) {
  const [form, setForm] = useState({ title: '', amount: '', paidBy: '', sharedWith: [] });

  const handleCheckbox = (id) => {
    setForm(f => ({
      ...f,
      sharedWith: f.sharedWith.includes(id)
        ? f.sharedWith.filter(uid => uid !== id)
        : [...f.sharedWith, id]
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.paidBy || form.sharedWith.length === 0) {
      toast.error('Fill all fields');
      return;
    }
    try {
      await axiosInstance.post(`/api/expenses/${tripId}`, form);
      toast.success('Expense added');
      setForm({ title: '', amount: '', paidBy: '', sharedWith: [] });
      onAdded();
    } catch {
      toast.error('Error adding expense');
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <input placeholder="Title" value={form.title}
        onChange={e => setForm({...form, title: e.target.value})}
        className="border p-2 w-full mb-2" />
      <input type="number" placeholder="Amount" value={form.amount}
        onChange={e => setForm({...form, amount: e.target.value})}
        className="border p-2 w-full mb-2" />
      <select value={form.paidBy}
        onChange={e => setForm({...form, paidBy: e.target.value})}
        className="border p-2 w-full mb-2">
        <option value="">Paid By</option>
        {members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
      </select>
      <div className="mb-2">
        <span className="text-sm">Shared With:</span>
        {members.map(m => (
          <label key={m._id} className="block text-sm">
            <input type="checkbox" checked={form.sharedWith.includes(m._id)}
              onChange={() => handleCheckbox(m._id)} />
            <span className="ml-2">{m.name}</span>
          </label>
        ))}
      </div>
      <button type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
