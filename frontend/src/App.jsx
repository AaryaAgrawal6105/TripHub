import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTripStore } from "@/store/useTripStore";
import { useAuthStore } from "@/store/useAuthStore";

// Fix Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Fly to location
function FlyToLocation({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.flyTo([lat, lng], 13);
  }, [lat, lng]);
  return null;
}

// Add pin on click
const ClickToAddPin = ({ onPinAdded }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const label = prompt("Enter a label for this pin:");
      if (label) onPinAdded({ lat, lng, label });
    },
  });
  return null;
};

export default function TripMapPage() {
  const navigate = useNavigate();
  const { selectedTrip, addSavedPin, getSavedPins } = useTripStore();
  const { authUser, checkAuth } = useAuthStore();

  const [savedPinsList, setSavedPinsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  const destinationCoords = selectedTrip?.destinationCoordinates;
  const mapCenter = destinationCoords
    ? [destinationCoords.lat, destinationCoords.lng]
    : [20.5937, 78.9629]; // default: India center

  // ✅ Fix: Check auth with proper state management
  useEffect(() => {
    const authenticate = async () => {
      try {
        // First check if we already have authUser from persisted state
        if (authUser) {
          setAuthChecked(true);
          setIsLoading(false);
          return;
        }

        // If no authUser, call checkAuth to verify with server
        const isAuthenticated = await checkAuth();
        setAuthChecked(true);
        
        if (!isAuthenticated) {
          navigate('/login');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthChecked(true);
        navigate('/login');
      }
    };

    authenticate();
  }, [authUser, checkAuth, navigate]);

  // ✅ Separate effect for redirecting when auth state changes
  useEffect(() => {
    if (authChecked && !authUser) {
      navigate('/login');
    }
  }, [authChecked, authUser, navigate]);

  // ✅ Fetch saved pins when trip changes
  useEffect(() => {
    const fetchPins = async () => {
      if (selectedTrip?._id && authUser) {
        try {
          const pins = await getSavedPins(selectedTrip._id);
          if (Array.isArray(pins)) setSavedPinsList(pins);
        } catch (error) {
          console.error("Error fetching pins:", error);
        }
      }
    };
    
    fetchPins();
  }, [selectedTrip?._id, authUser, getSavedPins]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setSearchResult({
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          name: display_name,
        });
      } else {
        alert("Location not found.");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      alert("Error fetching location.");
    }
  };

  const handlePinAdd = async (pin) => {
    if (!selectedTrip?._id) return;
    try {
      const updatedPins = await addSavedPin(selectedTrip._id, pin);
      setSavedPinsList(updatedPins);
    } catch (err) {
      console.error("Error saving pin:", err);
      alert("Failed to save pin. Please try again.");
    }
  };

  // Show loading while checking authentication
  if (isLoading || !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!authUser) {
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Trip Map - {selectedTrip?.name}</h1>
      <div className="h-[80vh] w-full rounded-lg shadow-lg relative">
        {/* 🔍 Search UI */}
        <form
          onSubmit={handleSearch}
          className="absolute top-4 left-4 z-50 bg-white p-3 rounded shadow flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search location..."
            className="px-2 py-1 border rounded flex-1 min-w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* 🗺️ Leaflet Map */}
        <MapContainer
          center={mapCenter}
          zoom={destinationCoords ? 8 : 5}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />

          {/* 📍 Destination marker */}
          {destinationCoords && (
            <Marker position={[destinationCoords.lat, destinationCoords.lng]}>
              <Popup>
                <strong>{selectedTrip.name}</strong>
                <br />
                Destination: {selectedTrip.destination}
              </Popup>
            </Marker>
          )}

          {/* 🔎 Search result marker */}
          {searchResult && (
            <>
              <Marker position={[searchResult.lat, searchResult.lng]}>
                <Popup>
                  <strong>Search Result</strong>
                  <br />
                  {searchResult.name}
                </Popup>
              </Marker>
              <FlyToLocation lat={searchResult.lat} lng={searchResult.lng} />
            </>
          )}

          {/* 📌 Saved pins */}
          {savedPinsList.map((pin) => (
            <Marker key={pin._id} position={[pin.lat, pin.lng]}>
              <Popup>{pin.label}</Popup>
            </Marker>
          ))}

          {/* ➕ Click-to-add */}
          <ClickToAddPin onPinAdded={handlePinAdd} />
        </MapContainer>
      </div>

      {/* 📋 Saved pin list */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl">Saved Visit Spots</h2>
          <span className="text-sm text-gray-500">
            {savedPinsList.length} locations
          </span>
        </div>
        
        {savedPinsList.length === 0 ? (
          <p className="text-gray-500">No saved pins yet. Click on the map to add locations.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedPinsList.map((pin) => (
              <div 
                key={pin._id} 
                className="bg-white p-3 rounded shadow border border-gray-200"
              >
                <div className="font-medium">{pin.label}</div>
                <div className="text-sm text-gray-500">
                  {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}