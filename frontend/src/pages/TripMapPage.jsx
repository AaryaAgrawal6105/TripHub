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

// Fly to location component
function FlyToLocation({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 13);
    }
  }, [lat, lng, map]);
  return null;
}

// Click handler for adding pins
const ClickToAddPin = ({ onPinAdded }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      console.log("Map clicked at:", lat, lng);
      
      const label = prompt("Enter a label for this pin:");
      if (label && label.trim()) {
        console.log("Adding pin with label:", label);
        onPinAdded({ lat, lng, label: label.trim() });
      }
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
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const destinationCoords = selectedTrip?.destinationCoordinates;
  const mapCenter = destinationCoords
    ? [destinationCoords.lat, destinationCoords.lng]
    : [20.5937, 78.9629]; // default: India center

  // Authentication check
  useEffect(() => {
    const authenticate = async () => {
      try {
        if (authUser) {
          setAuthChecked(true);
          setIsLoading(false);
          return;
        }

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

  // Redirect if not authenticated
  useEffect(() => {
    if (authChecked && !authUser) {
      navigate('/login');
    }
  }, [authChecked, authUser, navigate]);

  // Fetch saved pins
  useEffect(() => {
    const fetchPins = async () => {
      if (selectedTrip?._id && authUser) {
        try {
          console.log("Fetching pins for trip:", selectedTrip._id);
          setDebugInfo(`Fetching pins for trip: ${selectedTrip._id}`);
          const pins = await getSavedPins(selectedTrip._id);
          console.log("Fetched pins:", pins);
          setDebugInfo(`Fetched ${pins?.length || 0} pins`);
          if (Array.isArray(pins)) {
            setSavedPinsList(pins);
          }
        } catch (error) {
          console.error("Error fetching pins:", error);
          setDebugInfo(`Error fetching pins: ${error.message}`);
        }
      }
    };
    
    fetchPins();
  }, [selectedTrip?._id, authUser, getSavedPins]);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setDebugInfo(`Searching for: ${searchQuery}`);
    
    try {
      console.log("Searching for:", searchQuery);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=1`
      );
      
      if (!res.ok) {
        throw new Error(`Search failed: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Search results:", data);
      
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const result = {
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          name: display_name,
        };
        console.log("Setting search result:", result);
        setSearchResult(result);
        setDebugInfo(`Found location: ${display_name}`);
      } else {
        alert("Location not found. Try a different search term.");
        setDebugInfo("Location not found");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      alert("Error searching location. Please try again.");
      setDebugInfo(`Search error: ${err.message}`);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle pin addition with better error handling and debugging
  const handlePinAdd = async (pin) => {
    if (!selectedTrip?._id) {
      alert("No trip selected");
      setDebugInfo("Error: No trip selected");
      return;
    }
    
    console.log("Adding pin:", pin, "to trip:", selectedTrip._id);
    setDebugInfo(`Adding pin: ${pin.label} to trip: ${selectedTrip._id}`);
    
    // Create temporary pin for optimistic update
    const tempPin = { ...pin, _id: `temp_${Date.now()}`, isTemp: true };
    setSavedPinsList(prev => [...prev, tempPin]);
    
    try {
      const updatedPins = await addSavedPin(selectedTrip._id, pin);
      console.log("Pin added successfully, received:", updatedPins);
      setDebugInfo(`Pin added successfully. Total pins: ${updatedPins?.length || 'unknown'}`);
      
      // Replace with real data from server
      if (Array.isArray(updatedPins)) {
        setSavedPinsList(updatedPins);
      } else {
        // Fallback: refetch pins
        console.log("Unexpected response format, refetching pins...");
        const pins = await getSavedPins(selectedTrip._id);
        setSavedPinsList(pins || []);
      }
      
    } catch (err) {
      console.error("Error saving pin:", err);
      setDebugInfo(`Error saving pin: ${err.message}`);
      alert(`Failed to save pin: ${err.message}`);
      
      // Remove the temporary pin on error
      setSavedPinsList(prev => prev.filter(p => p._id !== tempPin._id));
    }
  };

  // Test function for debugging
  const handleTestPin = () => {
    const testPin = {
      lat: mapCenter[0] + (Math.random() - 0.5) * 0.1,
      lng: mapCenter[1] + (Math.random() - 0.5) * 0.1,
      label: "Test Pin " + new Date().toLocaleTimeString()
    };
    console.log("Testing pin add:", testPin);
    handlePinAdd(testPin);
  };

  // Clear search result
  const clearSearch = () => {
    setSearchResult(null);
    setSearchQuery("");
  };

  // Show loading screen
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

  // Don't render if not authenticated
  if (!authUser) {
    return null;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-4 bg-white p-4 rounded-lg shadow-md border relative z-100">
        <form onSubmit={handleSearch} className="flex gap-2 flex-wrap items-center">
          <input
            type="text"
            placeholder="Search for a location..."
            className="px-3 py-2 border border-gray-300 rounded flex-1 min-w-[250px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isSearching}
          />
          <button 
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
          {searchResult && (
            <button 
              type="button"
              onClick={clearSearch}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          )}
          <button 
            type="button"
            onClick={handleTestPin}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Test Pin
          </button>
        </form>
      </div>
      <h1 className="text-2xl font-semibold mb-4">
        Trip Map - {selectedTrip?.name || 'Unknown Trip'}
      </h1>
      
      {/* Debug Info */}
      {debugInfo && (
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-sm">
          <strong>Debug:</strong> {debugInfo}
        </div>
      )}
      
      {/* Search and Test Controls - Fixed positioning */}

      {/* Map Container - Fixed z-index issues */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />

      <div className="h-[70vh] w-full rounded-lg shadow-lg relative overflow-hidden border z-0">
        <MapContainer
          center={mapCenter}
          zoom={destinationCoords ? 8 : 5}
          scrollWheelZoom={true}
          className="h-full w-full rounded-lg z-0"
          style={{ zIndex: 0 }}
        >
          {/* Destination marker */}
          {destinationCoords && (
            <Marker position={[destinationCoords.lat, destinationCoords.lng]}>
              <Popup>
                <div className="text-center">
                  <strong>{selectedTrip.name}</strong>
                  <br />
                  <small>Destination: {selectedTrip.destination}</small>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Search result marker */}
          {searchResult && (
            <>
              <Marker position={[searchResult.lat, searchResult.lng]}>
                <Popup>
                  <div className="min-w-[200px]">
                    <strong>Search Result</strong>
                    <br />
                    <div className="text-sm mb-2">{searchResult.name}</div>
                    <button
                      onClick={() => {
                        const label = prompt("Save this location as:");
                        if (label && label.trim()) {
                          handlePinAdd({
                            lat: searchResult.lat,
                            lng: searchResult.lng,
                            label: label.trim()
                          });
                        }
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                    >
                      Save as Pin
                    </button>
                  </div>
                </Popup>
              </Marker>
              <FlyToLocation lat={searchResult.lat} lng={searchResult.lng} />
            </>
          )}

          {/* Saved pins */}
          {savedPinsList.map((pin, index) => (
            <Marker 
              key={pin._id || `pin-${index}`} 
              position={[pin.lat, pin.lng]}
            >
              <Popup>
                <div>
                  <div className="font-medium">{pin.label}</div>
                  <div className="text-sm text-gray-500">
                    {pin.lat?.toFixed(4)}, {pin.lng?.toFixed(4)}
                  </div>
                  {pin.isTemp && (
                    <div className="text-xs text-orange-500 mt-1">Saving...</div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Click to add pins */}
          <ClickToAddPin onPinAdded={handlePinAdd} />
        </MapContainer>
        
        {/* Instructions overlay - Fixed positioning */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg text-sm max-w-xs z-10 border">
          <div className="font-medium text-blue-600 mb-1">💡 How to use:</div>
          <ul className="text-xs space-y-1">
            <li>• Click anywhere on map to add pins</li>
            <li>• Search for locations above</li>
            <li>• Save search results as pins</li>
            <li>• Use Test Pin button to debug</li>
          </ul>
        </div>
      </div>

      {/* Saved Pins List */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Saved Visit Spots</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {savedPinsList.length} location{savedPinsList.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {savedPinsList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📍</div>
            <p className="text-lg mb-1">No saved pins yet.</p>
            <p className="text-sm">Click on the map or search for locations to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedPinsList.map((pin) => (
              <div 
                key={pin._id} 
                className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="font-medium text-gray-900 mb-2">{pin.label}</div>
                <div className="text-sm text-gray-500 mb-3">
                  📍 {pin.lat?.toFixed(4)}, {pin.lng?.toFixed(4)}
                </div>
                {pin.isTemp && (
                  <div className="text-xs text-orange-500 mb-2">⏳ Saving...</div>
                )}
                <button
                  onClick={() => {
                    setSearchResult({
                      lat: pin.lat,
                      lng: pin.lng,
                      name: pin.label
                    });
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                >
                  View on Map →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}