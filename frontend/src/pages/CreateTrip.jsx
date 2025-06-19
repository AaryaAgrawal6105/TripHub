// src/pages/CreateTrip.jsx
import React, { useState } from "react";
import { axiosInstance } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateTrip = () => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/trips", trip);
      toast.success("Trip created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error creating trip:", err);
      toast.error("Failed to create trip");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Create a New Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Trip Name"
          value={trip.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={trip.destination}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="date"
          name="startDate"
          value={trip.startDate}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={trip.endDate}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Trip
        </button>
      </form>
    </div>
  );
};

export default CreateTrip;
