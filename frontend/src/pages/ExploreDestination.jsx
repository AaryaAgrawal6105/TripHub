import React, { useEffect, useState } from "react";
import { 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  Globe, 
  Filter, 
  Search, 
  Heart, 
  Share2, 
  Navigation,
  Camera,
  Users,
  Calendar,
  DollarSign,
  ChevronLeft,
  Eye,
  Bookmark,
  Compass,
  Mountain,
  Coffee,
  Utensils,
  TreePine,
  Building,
  Music,
  Loader2,
  ChevronDown,
  Map,
  List,
  Grid3X3,
  X,
  Cloud,
  Sun,
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  Info,
  ExternalLink,

} from "lucide-react";

// Mock destination for demo - in real app this would come from router
const DEMO_DESTINATION = "Manali, Himachal Pradesh";

// API Keys - In production, these should be in environment variables
const GEO_KEY = import.meta.env.VITE_GEOAPIFY_KEY || "demo-key";
const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY || "demo-key";

const categoryOptions = {
  All: {
    value: "tourism.sights,tourism.attraction,catering.restaurant,leisure.park,entertainment.cinema,accommodation.hotel",
    icon: Compass,
    color: "text-purple-600"
  },
  Attractions: {
    value: "tourism.sights,tourism.attraction",
    icon: Mountain,
    color: "text-orange-600"
  },
  Restaurants: {
    value: "catering.restaurant,catering.cafe,catering.fast_food",
    icon: Utensils,
    color: "text-red-600"
  },
  Parks: {
    value: "leisure.park",
    icon: TreePine,
    color: "text-green-600"
  },
  Hotels: {
    value: "accommodation.hotel",
    icon: Building,
    color: "text-blue-600"
  },
  Entertainment: {
    value: "entertainment.cinema,entertainment.theatre,entertainment.nightclub",
    icon: Music,
    color: "text-pink-600"
  },
};

const ExploreDestination = () => {
  const destination = DEMO_DESTINATION;

  const [coords, setCoords] = useState(null);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState("rating");
  const [weatherData, setWeatherData] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  // Fetch coordinates using Nominatim (free OpenStreetMap service)
  const fetchCoords = async () => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
      }
      throw new Error("Location not found");
    } catch (err) {
      console.error("Failed to fetch coordinates:", err);
      return [77.1025, 32.2396]; // Default to Manali coordinates
    }
  };

  // Fetch weather data using OpenWeatherMap API
  const fetchWeather = async (lat, lon) => {
    if (WEATHER_KEY === "demo-key") {
      // Return mock weather data for demo
      return {
        main: {
          temp: 18,
          feels_like: 16,
          humidity: 65,
          pressure: 1013
        },
        weather: [{
          main: "Clear",
          description: "clear sky",
          icon: "01d"
        }],
        wind: {
          speed: 3.2
        },
        visibility: 10000,
        name: destination.split(",")[0]
      };
    }

    try {
      setLoadingWeather(true);
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch weather:", err);
      return null;
    } finally {
      setLoadingWeather(false);
    }
  };

  // Fetch places using Overpass API (free OpenStreetMap service)
  const fetchPlaces = async (lat, lon, categories) => {
    try {
      // Generate mock data for demo since we don't have real API keys
      const mockPlaces = [
        {
          id: "1",
          properties: {
            name: "Hadimba Devi Temple",
            address: "Hadimba Devi Temple Rd, Dhungri, Manali",
            rate: 4.5,
            category: "tourism.attraction",
            phone: "+91-1902-252116",
            website: "https://example.com"
          },
          geometry: { coordinates: [lon + 0.001, lat + 0.001] }
        },
        {
          id: "2", 
          properties: {
            name: "Solang Valley",
            address: "Solang Valley, Manali",
            rate: 4.7,
            category: "tourism.sights"
          },
          geometry: { coordinates: [lon + 0.002, lat + 0.002] }
        },
        {
          id: "3",
          properties: {
            name: "Cafe 1947",
            address: "Old Manali, Manali",
            rate: 4.3,
            category: "catering.restaurant"
          },
          geometry: { coordinates: [lon - 0.001, lat + 0.001] }
        },
        {
          id: "4",
          properties: {
            name: "The Himalayan",
            address: "Circuit House Rd, Manali",
            rate: 4.4,
            category: "accommodation.hotel",
            phone: "+91-1902-252345"
          },
          geometry: { coordinates: [lon, lat - 0.001] }
        },
        {
          id: "5",
          properties: {
            name: "Van Vihar National Park",
            address: "Van Vihar, Manali",
            rate: 4.2,
            category: "leisure.park"
          },
          geometry: { coordinates: [lon - 0.002, lat - 0.001] }
        }
      ];

      return mockPlaces;
    } catch (err) {
      console.error("Failed to fetch places", err);
      return [];
    }
  };

  // Fetch destination images using Unsplash API
  const fetchDestinationImage = async (placeName) => {
    try {
      // For demo, return a placeholder image
      return `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80`;
    } catch (err) {
      console.error("Failed to fetch destination image:", err);
      return null;
    }
  };

  // Fetch place-specific images
  const fetchPlaceImage = async (placeName) => {
    try {
      // For demo, return different placeholder images
      const imageIds = [
        "1506905925346-21bda4d32df4",
        "1571068316344-03484837e1bb", 
        "1578662996442-374dcbcf3c2c",
        "1559827260-766473daa92c",
        "1540979388789-6cee28a1cdc9"
      ];
      const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
      return `https://images.unsplash.com/photo-${randomId}?w=400&h=300&fit=crop&q=80`;
    } catch (err) {
      console.error("Failed to fetch place image:", err);
      return null;
    }
  };

  const toggleFavorite = (placeId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(placeId)) {
      newFavorites.delete(placeId);
    } else {
      newFavorites.add(placeId);
    }
    setFavorites(newFavorites);
  };

  const sharePlace = (place) => {
    if (navigator.share) {
      navigator.share({
        title: place.properties.name,
        text: `Check out ${place.properties.name} in ${destination}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Check out ${place.properties.name} in ${destination}!`);
      alert("Details copied to clipboard!");
    }
  };

  const sortPlaces = (places, sortBy) => {
    return [...places].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.properties.rate || 0) - (a.properties.rate || 0);
        case "name":
          return a.properties.name.localeCompare(b.properties.name);
        case "distance":
          return 0; // Would need to calculate actual distance
        default:
          return 0;
      }
    });
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case "clear":
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-5 h-5 text-gray-500" />;
      case "rain":
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      default:
        return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        const [lon, lat] = await fetchCoords();
        setCoords({ lat, lon });
        
        // Fetch weather data
        const weather = await fetchWeather(lat, lon);
        setWeatherData(weather);
        
        // Fetch destination info
        const destImage = await fetchDestinationImage(destination);
        setDestinationInfo({ image: destImage });
        
        // Fetch places
        const categories = categoryOptions[selectedCategory].value;
        const fetchedPlaces = await fetchPlaces(lat, lon, categories);
        
        // Add images to places
        const placesWithImages = await Promise.all(
          fetchedPlaces.map(async (place) => ({
            ...place,
            properties: {
              ...place.properties,
              image: await fetchPlaceImage(place.properties.name)
            }
          }))
        );
        
        setPlaces(placesWithImages);
      } catch (err) {
        console.error("Error initializing data:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [selectedCategory]);

  useEffect(() => {
    let filtered = places;
    
    if (searchTerm) {
      filtered = filtered.filter(place =>
        place.properties.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.properties.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    filtered = sortPlaces(filtered, sortBy);
    setFilteredPlaces(filtered);
  }, [places, searchTerm, sortBy]);

  const WeatherWidget = () => {
    if (!weatherData) return null;

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {getWeatherIcon(weatherData.weather?.[0]?.main)}
              <div>
                <h3 className="font-semibold text-gray-900">Current Weather</h3>
                <p className="text-sm text-gray-600 capitalize">
                  {weatherData.weather?.[0]?.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(weatherData.main?.temp)}°C
              </div>
              <div className="text-sm text-gray-600">
                Feels like {Math.round(weatherData.main?.feels_like)}°C
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>{weatherData.main?.humidity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <span>{weatherData.wind?.speed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PlaceCard = ({ place, index }) => {
    const props = place.properties;
    const IconComponent = categoryOptions[selectedCategory]?.icon || MapPin;
    
    return (
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1">
        <div className="relative">
          <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden">
            {props.image ? (
              <img
                src={props.image}
                alt={props.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <IconComponent className={`w-16 h-16 ${categoryOptions[selectedCategory]?.color || 'text-gray-400'} opacity-50`} />
            </div>
          </div>
          
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={() => toggleFavorite(place.id)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <Heart 
                className={`w-4 h-4 ${favorites.has(place.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </button>
            <button
              onClick={() => sharePlace(place)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          {props.rate && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-gray-800">{props.rate}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {props.name}
          </h3>
          
          <div className="flex items-start gap-2 mb-3">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 line-clamp-2">
              {props.address || "Address not available"}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {props.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">Available</span>
                </div>
              )}
              {props.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">Website</span>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setSelectedPlace(place)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PlaceModal = ({ place, onClose }) => {
    if (!place) return null;
    
    const props = place.properties;
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <div className="aspect-[16/9] bg-gradient-to-br from-blue-50 to-indigo-100">
              {props.image ? (
                <img
                  src={props.image}
                  alt={props.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{props.name}</h2>
              {props.rate && (
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-800">{props.rate}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-800">{props.address}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {props.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a href={`tel:${props.phone}`} className="text-blue-600 hover:underline">
                      {props.phone}
                    </a>
                  </div>
                )}
                
                {props.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <a 
                      href={props.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Visit Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => toggleFavorite(place.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    favorites.has(place.id) 
                      ? 'bg-red-50 border-red-200 text-red-700' 
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.has(place.id) ? 'fill-current' : ''}`} />
                  {favorites.has(place.id) ? 'Saved' : 'Save'}
                </button>
                
                <button
                  onClick={() => sharePlace(place)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                
                {coords && (
                  <button
                    onClick={() => window.open(`https://maps.google.com/?q=${place.properties.name}, ${destination}`, '_blank')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Directions
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Discovering amazing places...</p>
          <p className="text-sm text-gray-500 mt-2">Fetching weather, images, and attractions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{destination}</h1>
                {coords && (
                  <p className="text-gray-600 mt-1">
                    {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Weather Widget */}
        <WeatherWidget />

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search places..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {Object.entries(categoryOptions).map(([key, option]) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                      selectedCategory === key
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{key}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
              <option value="distance">Sort by Distance</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {filteredPlaces.length} Places Found
          </h2>
          <div className="text-sm text-gray-600">
            Showing results for {selectedCategory.toLowerCase()}
          </div>
        </div>

        {filteredPlaces.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No places found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredPlaces.map((place, index) => (
              <PlaceCard key={place.id} place={place} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Place Modal */}
      {selectedPlace && (
        <PlaceModal 
          place={selectedPlace} 
          onClose={() => setSelectedPlace(null)} 
        />
      )}
    </div>
  );
};

export default ExploreDestination;