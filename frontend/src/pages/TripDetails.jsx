// src/pages/TripDetails.jsx
import React, { useEffect } from "react";
import { useTripStore } from "@/store/useTripStore";
import { useParams } from "react-router-dom";
import TodoList from "@/components/TodoList";

const TripDetails = () => {
  const { tripId } = useParams();
  const trip = useTripStore((state) => state.trip);
  const fetchTripById = useTripStore((state) => state.fetchTripById);

  useEffect(() => {
    if (!trip || trip._id !== tripId) {
      fetchTripById(tripId);
    }
  }, [tripId]);

  if (!trip) {
    return (
      <div className="text-center mt-20 text-gray-600 font-medium">
        Loading trip details...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{trip.name}</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <p><strong className="text-gray-700">Destination:</strong> {trip.destination}</p>
        <p><strong className="text-gray-700">Dates:</strong> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
        <p><strong className="text-gray-700">Members:</strong> {trip.members?.length || 1}</p>
        <TodoList tripId={trip._id} />
      </div>
    </div>
  );
};

export default TripDetails;
