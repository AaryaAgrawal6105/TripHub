// File: src/pages/JoinTrip.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/api";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";

const JoinTrip = () => {
  const { id: tripId } = useParams();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrip = async () => {
    try {
      const res = await axiosInstance.get("/trips");
      const myTrip = res.data.find((t) => t._id === tripId);
      if (myTrip) setTrip(myTrip);
    } catch (err) {
      toast.error("Failed to load trip info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  const handleJoin = async () => {
    try {
      const res = await axiosInstance.post(`/trips/${tripId}/join`);
      toast.success("Successfully joined trip");
      navigate(`/trip/${tripId}`);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to join trip");
    }
  };

  if (!authUser) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-800">
          Please log in to accept the trip invite
        </h2>
      </div>
    );
  }

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!trip) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-red-600">Trip not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Invitation to Join Trip
        </h2>
        <p className="mb-2">
          <strong>Trip:</strong> {trip.name}
        </p>
        <p className="mb-4">
          <strong>Destination:</strong> {trip.destination}
        </p>
        <button
          onClick={handleJoin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Join Trip
        </button>
      </div>
    </div>
  );
};

export default JoinTrip;
