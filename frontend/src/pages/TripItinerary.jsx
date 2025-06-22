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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Trip Itinerary
          </h2>
          <p className="text-gray-600 text-lg">Plan your perfect journey</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">
                {editingId ? "Edit Activity" : "Add New Activity"}
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {Object.entries(defaultForm).map(([key]) => (
                  <div key={key} className={key === "notes" ? "md:col-span-2" : ""}>
                    <label className="block font-semibold text-gray-700 text-sm mb-2 capitalize">
                      {key === "exactTime" ? "Exact Time (AM/PM)" : key.replace(/([A-Z])/g, ' $1')}
                    </label>

                    {key === "timeOfDay" ? (
                      <select
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white"
                      >
                        {["Morning", "Afternoon", "Evening", "Night"].map((val) => (
                          <option key={val}>{val}</option>
                        ))}
                      </select>
                    ) : key === "exactTime" ? (
                      <div className="relative">
                        <TimePicker
                          name={key}
                          onChange={(val) => setForm({ ...form, exactTime: val })}
                          value={form.exactTime}
                          format="hh:mm a"
                          locale="en-US"
                          disableClock
                          clearIcon={null}
                          className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white transition-all duration-200"
                        />
                      </div>
                    ) : key === "notes" ? (
                      <textarea
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                        placeholder="Add any additional notes..."
                      />
                    ) : (
                      <input
                        name={key}
                        type={key === "date" ? "date" : "text"}
                        value={form[key]}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddOrUpdate}
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                {editingId ? "Update Itinerary" : "Add to Itinerary"}
              </button>
            </div>
          </div>

          {/* Itinerary List Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">Planned Activities</h3>
              <p className="text-indigo-100 text-sm mt-1">
                {itinerary.length} {itinerary.length === 1 ? 'activity' : 'activities'} planned
              </p>
            </div>
            
            <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
              {itinerary.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">No activities planned yet</p>
                  <p className="text-gray-400 text-sm mt-1">Start building your perfect itinerary!</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {itinerary.map((item, index) => (
                    <li key={item._id} className="group border-2 border-gray-100 hover:border-blue-200 p-6 rounded-xl hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <h4 className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition-colors">
                              {item.activity}
                            </h4>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-gray-600">
                                {new Date(item.date).toLocaleDateString()} - {item.timeOfDay} ({item.exactTime})
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-gray-600">{item.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              <span className="text-gray-600">{item.accommodation}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span className="text-gray-600">{item.transportation}</span>
                            </div>
                          </div>
                          
                          {item.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                              <p className="text-sm text-gray-600 italic">{item.notes}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(item)}
                            className="px-4 py-2 text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
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
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #6366f1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #4f46e5);
        }
      `}</style>
    </div>
  );
};

export default TripItinerary;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { axiosInstance } from "@/api";
// import { toast } from "react-toastify";
// import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";
// import "react-clock/dist/Clock.css";

// const defaultForm = {
//   day: "",
//   date: "",
//   timeOfDay: "Morning",
//   exactTime: "",
//   activity: "",
//   location: "",
//   accommodation: "",
//   transportation: "",
//   notes: ""
// };

// const TripItinerary = () => {
//   const { id: tripId } = useParams();
//   const [itinerary, setItinerary] = useState([]);
//   const [form, setForm] = useState(defaultForm);
//   const [editingId, setEditingId] = useState(null);

//   const fetchItinerary = async () => {
//     try {
//       const res = await axiosInstance.get("/trips");
//       const trip = res.data.find((t) => t._id === tripId);
//       if (trip) setItinerary(trip.itinerary || []);
//     } catch {
//       toast.error("Failed to load itinerary");
//     }
//   };

//   useEffect(() => {
//     fetchItinerary();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAddOrUpdate = async () => {
//     try {
//       if (editingId) {
//         const updated = itinerary.map(item =>
//           item._id === editingId ? { ...item, ...form } : item
//         );
//         await axiosInstance.delete(`/trips/${tripId}/itinerary/${editingId}`);
//         await axiosInstance.post(`/trips/${tripId}/itinerary`, form);
//         toast.success("Itinerary updated");
//         setEditingId(null);
//         setItinerary(updated);
//       } else {
//         const res = await axiosInstance.post(`/trips/${tripId}/itinerary`, form);
//         setItinerary(res.data);
//         toast.success("Itinerary added");
//       }
//       setForm(defaultForm);
//     } catch {
//       toast.error("Failed to save itinerary");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await axiosInstance.delete(`/trips/${tripId}/itinerary/${id}`);
//       setItinerary(res.data);
//       toast.success("Deleted itinerary item");
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   const handleEdit = (item) => {
//     setForm({ ...item, date: item.date?.slice(0, 10) });
//     setEditingId(item._id);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 text-blue-600">Trip Itinerary</h2>

//       <div className="grid gap-4 grid-cols-1 md:grid-cols-2 bg-white p-4 rounded shadow">
//         {Object.entries(defaultForm).map(([key]) => (
//           <div key={key}>
//             <label className="block font-medium text-sm capitalize mb-1">
//               {key === "exactTime" ? "Exact Time (AM/PM)" : key}
//             </label>

//             {key === "timeOfDay" ? (
//               <select
//                 name={key}
//                 value={form[key]}
//                 onChange={handleChange}
//                 className="w-full border px-2 py-1 rounded"
//               >
//                 {["Morning", "Afternoon", "Evening", "Night"].map((val) => (
//                   <option key={val}>{val}</option>
//                 ))}
//               </select>
//             ) : key === "exactTime" ? (
//               <TimePicker
//                 name={key}
//                 onChange={(val) => setForm({ ...form, exactTime: val })}
//                 value={form.exactTime}
//                 format="hh:mm a"
//                 locale="en-US"
//                 disableClock
//                 clearIcon={null}
//                 className="w-full border rounded px-2 py-1"
//               />
//             ) : (
//               <input
//                 name={key}
//                 type={key === "date" ? "date" : "text"}
//                 value={form[key]}
//                 onChange={handleChange}
//                 className="w-full border px-2 py-1 rounded"
//               />
//             )}
//           </div>
//         ))}

//         <button
//           onClick={handleAddOrUpdate}
//           className="col-span-full mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {editingId ? "Update" : "Add"} Itinerary
//         </button>
//       </div>

//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-2">Planned Activities</h3>
//         {itinerary.length === 0 ? (
//           <p className="text-gray-500">No itinerary added yet.</p>
//         ) : (
//           <ul className="space-y-4">
//             {itinerary.map((item) => (
//               <li key={item._id} className="border p-4 rounded shadow bg-white">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="font-semibold">{item.activity}</p>
//                     <p className="text-sm text-gray-500">
//                       {new Date(item.date).toLocaleDateString()} - {item.timeOfDay} ({item.exactTime})
//                     </p>
//                     <p className="text-sm">Location: {item.location}</p>
//                     <p className="text-sm">Accommodation: {item.accommodation}</p>
//                     <p className="text-sm">Transport: {item.transportation}</p>
//                     <p className="text-sm italic text-gray-500">Notes: {item.notes}</p>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="text-blue-500 hover:underline text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="text-red-500 hover:underline text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TripItinerary;
