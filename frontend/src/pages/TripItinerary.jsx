import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "@/api";
import { toast } from "react-toastify";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const defaultForm = {
  day: "",
  date: "",
  timeOfDay: "Morning",
  exactTime: "",
  activity: "",
  location: "",
  accommodation: "",
  transportation: "",
  notes: ""
};

const TripItinerary = () => {
  const { id: tripId } = useParams();
  const [itinerary, setItinerary] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);

  const fetchItinerary = async () => {
    try {
      const res = await axiosInstance.get("/trips");
      const trip = res.data.find((t) => t._id === tripId);
      if (trip) setItinerary(trip.itinerary || []);
    } catch {
      toast.error("Failed to load itinerary");
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editingId) {
        const updated = itinerary.map(item =>
          item._id === editingId ? { ...item, ...form } : item
        );
        await axiosInstance.delete(`/trips/${tripId}/itinerary/${editingId}`);
        await axiosInstance.post(`/trips/${tripId}/itinerary`, form);
        toast.success("Itinerary updated");
        setEditingId(null);
        setItinerary(updated);
      } else {
        const res = await axiosInstance.post(`/trips/${tripId}/itinerary`, form);
        setItinerary(res.data);
        toast.success("Itinerary added");
      }
      setForm(defaultForm);
    } catch {
      toast.error("Failed to save itinerary");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`/trips/${tripId}/itinerary/${id}`);
      setItinerary(res.data);
      toast.success("Deleted itinerary item");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (item) => {
    setForm({ ...item, date: item.date?.slice(0, 10) });
    setEditingId(item._id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Trip Itinerary</h2>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 bg-white p-4 rounded shadow">
        {Object.entries(defaultForm).map(([key]) => (
          <div key={key}>
            <label className="block font-medium text-sm capitalize mb-1">
              {key === "exactTime" ? "Exact Time (AM/PM)" : key}
            </label>

            {key === "timeOfDay" ? (
              <select
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              >
                {["Morning", "Afternoon", "Evening", "Night"].map((val) => (
                  <option key={val}>{val}</option>
                ))}
              </select>
            ) : key === "exactTime" ? (
              <TimePicker
                name={key}
                onChange={(val) => setForm({ ...form, exactTime: val })}
                value={form.exactTime}
                format="hh:mm a"
                locale="en-US"
                disableClock
                clearIcon={null}
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <input
                name={key}
                type={key === "date" ? "date" : "text"}
                value={form[key]}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            )}
          </div>
        ))}

        <button
          onClick={handleAddOrUpdate}
          className="col-span-full mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add"} Itinerary
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Planned Activities</h3>
        {itinerary.length === 0 ? (
          <p className="text-gray-500">No itinerary added yet.</p>
        ) : (
          <ul className="space-y-4">
            {itinerary.map((item) => (
              <li key={item._id} className="border p-4 rounded shadow bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{item.activity}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()} - {item.timeOfDay} ({item.exactTime})
                    </p>
                    <p className="text-sm">Location: {item.location}</p>
                    <p className="text-sm">Accommodation: {item.accommodation}</p>
                    <p className="text-sm">Transport: {item.transportation}</p>
                    <p className="text-sm italic text-gray-500">Notes: {item.notes}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TripItinerary;
