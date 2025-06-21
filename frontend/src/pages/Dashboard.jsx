import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/api";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTripStore } from "@/store/useTripStore";
import TripAIAssistant from "@/components/TripAIAssistant";

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  const setTrip = useTripStore((state) => state.setTrip);

  const fetchTrips = async () => {
    try {
      const res = await axiosInstance.get("/trips");
      setTrips(res.data);
    } catch (err) {
      console.error("Error fetching trips:", err);
      toast.error("Failed to load trips");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleCardClick = (trip) => {
    setTrip(trip);
    navigate(`/trip/${trip._id}`);
  };

  
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Your Trips</h1>
        <button
          onClick={() => navigate("/create-trip")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow"
        >
          <FaPlus />
          Create Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <p className="text-gray-500">No trips yet. Create your first one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip._id}
              onClick={() => handleCardClick(trip)}
              className="cursor-pointer bg-white border rounded-lg shadow hover:shadow-md transition-all p-4"
            >
              <h3 className="text-xl font-semibold text-gray-800">{trip.name}</h3>
              <p className="text-sm text-gray-600">
                Destination: {trip.destination}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(trip.startDate).toLocaleDateString()} -{" "}
                {new Date(trip.endDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Welcome to TripHub 🌍</h1>
      <TripAIAssistant />
    </div>

    </div>
  );
};

export default Dashboard;