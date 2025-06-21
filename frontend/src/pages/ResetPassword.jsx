import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '@/api';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');

  const handleReset = async () => {
    try {
      await axiosInstance.post(`/auth/reset-password/${token}`, { newPassword });
      toast.success("Password reset successful");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Reset failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Reset Password</h2>
      <input
        type="password"
        className="w-full border p-2 rounded mb-4"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        onClick={handleReset}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Reset Password
      </button>
    </div>
  );
}
