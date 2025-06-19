import React from "react";
import { useTripStore } from "@/store/useTripStore";

const TripDetails = () => {
  const trip = useTripStore((state) => state.trip);

  if (!trip) {
    return (
      <div className="text-center mt-20 text-gray-600 font-medium">
        No trip selected. Please go back to Dashboard.
      </div>
    );
  }

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
      </div>
    </div>
  );
};

export default TripDetails;
