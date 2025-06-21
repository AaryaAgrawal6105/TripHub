import React, { useState } from 'react';
import { axiosInstance } from '@/api';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      await axiosInstance.post('/auth/forgot-password', { email });
      toast.success("Reset link sent to email");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error sending email");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Forgot Password</h2>
      <input
        type="email"
        className="w-full border p-2 rounded mb-4"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Send Reset Link
      </button>
    </div>
  );
}
