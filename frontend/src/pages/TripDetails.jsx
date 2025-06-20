import React, { useEffect, useState } from "react";
import { useTripStore } from "@/store/useTripStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/api";
import { toast } from "react-toastify";

const TripDetails = () => {
  const trip = useTripStore((state) => state.trip);
  const { authUser } = useAuthStore();
  const [inviteEmail, setInviteEmail] = useState("");
  const navigate = useNavigate();

  if (!trip) {
    return (
      <div className="text-center mt-20 text-gray-600 font-medium">
        No trip selected. Please go back to Dashboard.
      </div>
    );
  }

  const sendInvite = async () => {
    try {
      if (!inviteEmail) return toast.error("Please enter email");
      await axiosInstance.post("/email/invite", {
        tripId: trip._id,
        receiverEmail: inviteEmail,
      });
      toast.success("Invite sent!");
      setInviteEmail("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Failed to send invite");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{trip.name}</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <p>
          <strong className="text-gray-700">Destination:</strong> {trip.destination}
        </p>
        <p>
          <strong className="text-gray-700">Dates:</strong>{" "}
          {new Date(trip.startDate).toLocaleDateString()} -{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>
        <p>
          <strong className="text-gray-700">Total Members:</strong>{" "}
          {trip.members?.length || 1}
        </p>

        {/* TODOS Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Todos:</h3>
          {trip.todos.length === 0 ? (
            <p className="text-sm text-gray-500">No tasks yet.</p>
          ) : (
            <ul className="list-disc list-inside">
              {trip.todos.map((todo, index) => (
                <li
                  key={index}
                  className={todo.done ? "line-through text-green-500" : "text-gray-800"}
                >
                  {todo.task}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Expenses Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate(`/trip/${trip._id}/expenses`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Manage Expenses 💰
          </button>
        </div>

        {/* Send Invite Form - Only if current user is creator */}
        {authUser && authUser._id === trip.createdBy && (
          <div className="mt-8 border-t pt-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Invite a Friend via Email:</h3>
            <div className="flex gap-2 items-center">
              <input
                type="email"
                className="border p-2 rounded w-full"
                placeholder="Enter email to invite"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <button
                onClick={sendInvite}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Send Invite
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetails;
