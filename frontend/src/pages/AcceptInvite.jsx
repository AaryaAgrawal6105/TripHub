import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/api';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/useAuthStore';

export default function AcceptInvite() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tripId = params.get('tripId');
  const inviterId = params.get('inviter');
  const authUser = useAuthStore((state) => state.authUser);

  useEffect(() => {
    const joinTrip = async () => {
      if (!authUser) {
        toast.error('Please log in to accept the trip invitation.');
        navigate('/login');
        return;
      }

      try {
        await axiosInstance.post('/email/join', { tripId });
        toast.success('Successfully joined the trip!');
        navigate(`/trip/${tripId}`);
      } catch (err) {
        console.error(err);
        toast.error('Could not join the trip');
      }
    };

    if (tripId) joinTrip();
  }, [tripId, navigate, authUser]);

  return <div className="text-center mt-20 text-lg">Joining Trip...</div>;
}