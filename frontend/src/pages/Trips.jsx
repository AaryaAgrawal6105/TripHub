import React from 'react'
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/api";
import { FaPlus, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaRoute } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTripStore } from "@/store/useTripStore";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";


const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const setTrip = useTripStore((state) => state.setTrip);

    const fetchTrips = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/trips");
            setTrips(res.data);
        } catch (err) {
            console.error("Error fetching trips:", err);
            toast.error("Failed to load trips");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleCardClick = (trip) => {
        setTrip(trip);
        navigate(`/trip/${trip._id}`);
    };

    const formatDateRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        return {
            formatted: `${start.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })} - ${end.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })}`,
            duration: `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`
        };
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // Prevent card click navigation
        if (!window.confirm("Are you sure you want to delete this trip?")) return;

        try {
            await axiosInstance.delete(`/trips/${id}`);
            setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== id));
            toast.success("Trip deleted successfully!");
        } catch (err) {
            console.error("Failed to delete trip:", err);
            toast.error("Failed to delete trip");
        }
    };

    const getRandomGradient = (index) => {
        const gradients = [
            'from-blue-400 to-blue-600',
            'from-purple-400 to-purple-600',
            'from-green-400 to-green-600',
            'from-orange-400 to-orange-600',
            'from-pink-400 to-pink-600',
            'from-indigo-400 to-indigo-600',
            'from-teal-400 to-teal-600',
            'from-red-400 to-red-600',
        ];
        return gradients[index % gradients.length];
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="max-w-6xl mx-auto py-8 px-4">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded-lg w-48 mb-8"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-6xl mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">Your Trips</h1>
                            <p className="text-blue-100 text-lg">
                                {trips.length === 0
                                    ? "Ready to start your adventure? Create your first trip!"
                                    : `${trips.length} ${trips.length === 1 ? 'trip' : 'trips'} planned and ready to explore`
                                }
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/create-trip")}
                            className="bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105"
                        >
                            <FaPlus className="text-lg" />
                            Create New Trip
                        </button>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl"></div>
            </div>

            <div className="max-w-6xl mx-auto py-8 px-4">
                {trips.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaRoute className="text-3xl text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">No trips yet</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Start planning your next adventure! Create your first trip and let us help you make unforgettable memories.
                            </p>
                            <button
                                onClick={() => navigate("/create-trip")}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold mx-auto hover:scale-105"
                            >
                                <FaPlus className="text-lg" />
                                Create Your First Trip
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trips.map((trip, index) => {
                            const dateInfo = formatDateRange(trip.startDate, trip.endDate);
                            const gradientClass = getRandomGradient(index);

                            return (
                                <div
                                    key={trip._id}
                                    onClick={() => handleCardClick(trip)}
                                    className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
                                >
                                    {/* Gradient Header */}
                                    <div className={`h-32 bg-gradient-to-r ${gradientClass} relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-black/10"></div>
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                            <span className="text-white text-sm font-medium">{dateInfo.duration}</span>
                                        </div>
                                        <div className="absolute bottom-4 left-4">
                                            <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                                                {trip.name}
                                            </h3>
                                        </div>

                                        {/* Decorative circle */}
                                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 relative">
                                        {/* DELETE BUTTON */}
                                        <button
                                            onClick={(e) => handleDelete(e, trip._id)}
                                            className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                                            title="Delete trip"
                                        >
                                            <FaTrash />
                                        </button>

                                        {/* Existing trip info content */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                                <span className="font-medium text-gray-800">{trip.destination}</span>
                                            </div>

                                            <div className="flex items-center gap-3 text-gray-600">
                                                <FaCalendarAlt className="text-green-500 flex-shrink-0" />
                                                <span className="text-sm">{dateInfo.formatted}</span>
                                            </div>

                                            <div className="flex items-center gap-3 text-gray-600">
                                                <FaClock className="text-orange-500 flex-shrink-0" />
                                                <span className="text-sm">{dateInfo.duration}</span>
                                            </div>
                                        </div>

                                        {/* Existing bottom action indicator */}
                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Click to view details</span>
                                            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                                <svg className="w-4 h-4 text-blue-600 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Bottom CTA for existing trips */}
                {trips.length > 0 && (
                    <div className="text-center mt-12">
                        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-dashed border-blue-200 text-blue-600 px-8 py-6 rounded-2xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer group"
                            onClick={() => navigate("/create-trip")}>
                            <FaPlus className="text-2xl group-hover:rotate-90 transition-transform duration-300" />
                            <div className="text-left">
                                <div className="font-semibold text-lg">Plan Another Adventure</div>
                                <div className="text-sm text-blue-500">The world is waiting to be explored</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Trips;