import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from 'recharts';
import { useParams } from 'react-router-dom';

export default function TripExpenses() {
  const { tripId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [members, setMembers] = useState([]);
  const [summary, setSummary] = useState({});
  const [form, setForm] = useState({
    title: '',
    amount: '',
    paidBy: '',
    splitType: 'equal',
    splitAmounts: []
  });

  const [editingId, setEditingId] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const fetchSummary = async () => {
    const res = await axiosInstance.get(`/expenses/summary/${tripId}`);
    setSummary(res.data.balances || {});
  };

  const fetchData = async () => {
    const [expRes, tripRes, summaryRes] = await Promise.all([
      axiosInstance.get(`/expenses/${tripId}`),
      axiosInstance.get(`/trips/${tripId}`),
      axiosInstance.get(`/expenses/summary/${tripId}`)
    ]);
    setExpenses(expRes.data);
    setMembers(tripRes.data.members);
    setSummary(summaryRes.data.balances);
    setTransactions(summaryRes.data.transactions);
  };

  useEffect(() => {
    fetchData();
    fetchSummary();
  }, []);

  const chartData = members.map((m) => ({
    name: m.name,
    spent: summary[m._id]?.spent || 0,
    owes: summary[m._id]?.owes || 0
  }));

  const handleSplitTypeChange = (type) => {
    if (type === 'equal' && form.amount && members.length) {
      const equalAmt = (Number(form.amount) / members.length).toFixed(2);
      const split = members.map(m => ({ user: m._id, amount: parseFloat(equalAmt) }));
      setForm(f => ({ ...f, splitType: type, splitAmounts: split }));
    }
    setForm(f => ({ ...f, splitType: type }));
  };

  const handleSplitChange = (index, field, value) => {
    const updated = [...form.splitAmounts];
    updated[index][field] = value;
    setForm({ ...form, splitAmounts: updated });
  };

  const populateEditForm = (expense) => {
    setForm({
      ...expense,
      splitAmounts: expense.splitAmounts.map(s => ({
        user: s.user._id || s.user,
        amount: s.amount
      })),
    });
    setEditingId(expense._id);
  };

  const handleEdit = async () => {
    await axiosInstance.put(`/expenses/${editingId}`, form);
    setForm({ title: '', amount: '', paidBy: '', splitType: 'equal', splitAmounts: [] });
    setEditingId(null);
    fetchData();
  };

  const addSplit = () => {
    setForm({ ...form, splitAmounts: [...form.splitAmounts, { user: '', amount: '' }] });
  };

  const removeSplit = (index) => {
    const updated = [...form.splitAmounts];
    updated.splice(index, 1);
    setForm({ ...form, splitAmounts: updated });
  };

  const handleAddExpense = async () => {
    await axiosInstance.post(`/expenses/${tripId}`, form);
    setForm({ title: '', amount: '', paidBy: '', splitType: 'equal', splitAmounts: [] });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/expenses/${id}`);
    fetchData();
  };

  const handleSettle = async () => {
    await axiosInstance.post(`/expenses/settle/${tripId}`);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Trip Expenses
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Track, Split & Settle Your Group Expenses
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Form and Expenses */}
          <div className="xl:col-span-2 space-y-8">
            {/* Add Expense Form */}
            <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? 'Edit Expense' : 'Add New Expense'}
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expense Title</label>
                  <input 
                    placeholder="e.g., Dinner at restaurant, Hotel booking..." 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                    value={form.title} 
                    onChange={e => setForm({ ...form, title: e.target.value })} 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (₹)</label>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      value={form.amount} 
                      onChange={e => setForm({ ...form, amount: e.target.value })} 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Paid By</label>
                    <select 
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      value={form.paidBy} 
                      onChange={e => setForm({ ...form, paidBy: e.target.value })}
                    >
                      <option value="">Select person...</option>
                      {members.map(m => (
                        <option key={m._id} value={m._id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Split Options</label>
                  <div className="flex gap-4 mb-4">
                    <button 
                      onClick={() => handleSplitTypeChange('equal')} 
                      className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5H9a2 2 0 00-2 2v12a4 4 0 004 4h6a2 2 0 002-2V7a2 2 0 00-2-2z" />
                      </svg>
                      <span>Split Equally</span>
                    </button>
                    <button 
                      onClick={addSplit} 
                      className="flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Custom Split</span>
                    </button>
                  </div>

                  {form.splitAmounts.map((s, i) => (
                    <div key={i} className="flex gap-3 mb-3 p-4 bg-gray-50 rounded-xl">
                      <select 
                        className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-200" 
                        value={s.user}
                        onChange={e => handleSplitChange(i, 'user', e.target.value)}
                      >
                        <option value="">Select person...</option>
                        {members.map(m => (
                          <option key={m._id} value={m._id}>{m.name}</option>
                        ))}
                      </select>
                      <input 
                        type="number" 
                        className="w-32 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-200" 
                        placeholder="Amount"
                        value={s.amount} 
                        onChange={e => handleSplitChange(i, 'amount', e.target.value)} 
                      />
                      <button 
                        onClick={() => removeSplit(i)} 
                        className="w-12 h-12 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  {editingId ? (
                    <button 
                      onClick={handleEdit} 
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button 
                      onClick={handleAddExpense} 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Add Expense
                    </button>
                  )}

                  <button 
                    onClick={handleSettle} 
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Settle All
                  </button>
                </div>
              </div>
            </div>

            {/* Expense List */}
            <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Recent Expenses</h2>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {expenses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <p className="text-gray-500">No expenses added yet</p>
                  </div>
                ) : (
                  expenses.map(e => (
                    <div key={e._id} className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{e.title}</h4>
                          <p className="text-2xl font-black text-emerald-600">₹{e.amount}</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => populateEditForm(e)} 
                            className="w-10 h-10 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-200 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(e._id)} 
                            className="w-10 h-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <span className="text-sm text-gray-600">Paid by: </span>
                        <span className="font-medium text-gray-900">{e.paidBy.name}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700 mb-2">Split details:</p>
                        {e.splitAmounts.map((s, i) => (
                          <div key={i} className="text-sm text-gray-600 flex justify-between">
                            <span>{s.user.name}</span>
                            <span className="font-medium">₹{s.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Summary and Chart */}
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Summary</h3>
              </div>
              
              <div className="space-y-4">
                {Object.entries(summary).map(([id, val]) => {
                  const user = members.find(m => m._id === id);
                  return (
                    <div key={id} className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{user?.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Spent:</span>
                          <span className="font-bold text-emerald-600 ml-2">₹{val.spent || 0}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Owes:</span>
                          <span className="font-bold text-red-600 ml-2">₹{val.owes || 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Settlement</h3>
              </div>

              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-600 font-semibold">All settled up!</p>
                  <p className="text-gray-500 text-sm">No pending transactions</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((t, i) => {
                    const from = members.find(m => m._id === t.from)?.name || 'Unknown';
                    const to = members.find(m => m._id === t.to)?.name || 'Unknown';
                    return (
                      <div key={i} className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                        <div className="text-sm">
                          <span className="font-semibold text-gray-900">{from}</span>
                          <span className="text-gray-600 mx-2">pays</span>
                          <span className="font-bold text-red-600">₹{t.amount.toFixed(2)}</span>
                          <span className="text-gray-600 mx-2">to</span>
                          <span className="font-semibold text-gray-900">{to}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Chart */}
            <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Expenses Chart</h3>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="spent" fill="#10b981" name="Spent" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="owes" fill="#ef4444" name="Owes" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


