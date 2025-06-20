import React, { useState } from 'react';
import { axiosInstance } from '@/api';
import { toast } from 'react-toastify';
import { useTripStore } from '@/store/useTripStore';

export default function InviteForm() {
  const trip = useTripStore(state => state.trip);
  const [email, setEmail] = useState('');

  const handleInvite = async () => {
    if (!email || !trip) return;
    try {
      await axiosInstance.post('/email/invite', {
        tripId: trip._id,
        receiverEmail: email,
        _id: trip.createdBy._id, // sender ID
      });
      toast.success('Invite sent successfully!');
      setEmail('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send invite');
    }
  };

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Invite Friends</h3>
      <input
        type="email"
        placeholder="Enter email to invite"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={handleInvite}
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Send Invite
      </button>
    </div>
  );
}
