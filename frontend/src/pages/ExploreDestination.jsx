import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTemperatureHigh,
  FaHotel,
  FaUtensils,
  FaCamera,
  FaInfoCircle,
} from "react-icons/fa";
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from "react-icons/wi";
import { ImSpinner8 } from "react-icons/im";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ExploreDestination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(
    location.state?.destination || ""
  );
  const [destinationData, setDestinationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [placesData, setPlacesData] = useState([]);
  const [hotelsData, setHotelsData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Extract city name from destination string (e.g., "Manali, Himachal Pradesh" => "Manali")
  const cityName = destination.split(",")[0].trim();

  useEffect(() => {
    const fetchDestinationData = async () => {
      try {
        setLoading(true);
        
        // Fetch destination images from Unsplash
        const imagesResponse = await axios.get(
  `https://api.unsplash.com/search/photos?query=${cityName}+tourism&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=10`
);
        // Fetch weather data from OpenWeatherMap
        const weatherResponse = await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName},IN&units=metric&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`
);
        
        // Fetch places data from Foursquare (mock data as Foursquare requires auth)
        const mockPlaces = [
          {
            name: "Popular Attraction 1",
            description: "This is a must-visit location with beautiful views.",
            category: "Landmark",
          },
          {
            name: "Historical Site",
            description: "Rich in cultural heritage and architectural beauty.",
            category: "Historical",
          },
          {
            name: "Nature Spot",
            description: "Perfect for nature lovers and photography enthusiasts.",
            category: "Nature",
          },
          {
            name: "Local Market",
            description: "Experience local culture and buy souvenirs.",
            category: "Shopping",
          },
        ];
        
        // Fetch hotels data (mock)
        const mockHotels = [
          {
            name: "Luxury Resort",
            rating: 4.8,
            price: "₹8,000/night",
            amenities: ["Pool", "Spa", "Free WiFi"],
          },
          {
            name: "Budget Hotel",
            rating: 3.5,
            price: "₹2,500/night",
            amenities: ["Free WiFi", "Breakfast"],
          },
          {
            name: "Boutique Stay",
            rating: 4.2,
            price: "₹5,500/night",
            amenities: ["Garden", "Restaurant"],
          },
        ];
        
        // Fetch restaurants data (mock)
        const mockRestaurants = [
          {
            name: "Local Cuisine Restaurant",
            rating: 4.5,
            cuisine: "Local, Traditional",
            priceRange: "₹₹",
          },
          {
            name: "Multi-Cuisine Cafe",
            rating: 4.0,
            cuisine: "International, Cafe",
            priceRange: "₹₹₹",
          },
          {
            name: "Street Food Corner",
            rating: 4.7,
            cuisine: "Street Food",
            priceRange: "₹",
          },
        ];

        setDestinationData({
          name: destination,
          images: imagesResponse.data.results.map(img => img.urls.regular),
          description: `Explore the beautiful destination of ${cityName} with its rich culture, stunning landscapes, and unique experiences.`,
        });
        
        setWeatherData(weatherResponse.data);
        setPlacesData(mockPlaces);
        setHotelsData(mockHotels);
        setRestaurantsData(mockRestaurants);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load destination data. Please try again later.");
        setLoading(false);
      }
    };

    if (destination) {
      fetchDestinationData();
    } else {
      navigate("/");
    }
  }, [destination, cityName, navigate]);

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <WiDaySunny className="text-yellow-500 text-4xl" />;
      case "Rain":
        return <WiRain className="text-blue-500 text-4xl" />;
      case "Clouds":
        return <WiCloudy className="text-gray-500 text-4xl" />;
      case "Snow":
        return <WiSnow className="text-blue-200 text-4xl" />;
      default:
        return <WiDaySunny className="text-yellow-500 text-4xl" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <ImSpinner8 className="animate-spin text-5xl text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-700">Loading destination information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <FaInfoCircle className="text-5xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image Slider */}
      <section className="relative h-96">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="h-full w-full"
        >
          {destinationData.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      {destinationData.name}
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {destinationData.name.split(",")[1]?.trim() || "India"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Weather Card */}
        {weatherData && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  {getWeatherIcon(weatherData.weather[0].main)}
                  <div>
                    <h3 className="text-xl font-semibold">Current Weather</h3>
                    <p className="text-gray-600 capitalize">
                      {weatherData.weather[0].description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold">
                      {Math.round(weatherData.main.temp)}°C
                    </p>
                    <p className="text-sm text-gray-500">Temperature</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">
                      {weatherData.main.humidity}%
                    </p>
                    <p className="text-sm text-gray-500">Humidity</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">
                      {weatherData.wind.speed} m/s
                    </p>
                    <p className="text-sm text-gray-500">Wind</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {["overview", "places", "hotels", "restaurants", "itinerary"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About {cityName}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {destinationData.description}
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Travel Tips
                  </h3>
                  <ul className="list-disc list-inside text-blue-700 space-y-1">
                    <li>Best time to visit: October to March</li>
                    <li>Average budget: ₹3,000 - ₹8,000 per day</li>
                    <li>Local transport available: Taxis, buses, and auto-rickshaws</li>
                    <li>Must-try local cuisine: Traditional dishes</li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-4">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Quick Facts
                    </h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="bg-blue-100 p-2 rounded-lg mr-3">
                          <FaCalendarAlt className="text-blue-600" />
                        </span>
                        <div>
                          <p className="text-sm text-gray-500">Best Time to Visit</p>
                          <p className="font-medium">October to March</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 p-2 rounded-lg mr-3">
                          <FaTemperatureHigh className="text-blue-600" />
                        </span>
                        <div>
                          <p className="text-sm text-gray-500">Average Temperature</p>
                          <p className="font-medium">15°C - 30°C</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 p-2 rounded-lg mr-3">
                          <FaInfoCircle className="text-blue-600" />
                        </span>
                        <div>
                          <p className="text-sm text-gray-500">Ideal Duration</p>
                          <p className="font-medium">3-5 days</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "places" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Places to Visit in {cityName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {placesData.map((place, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <h3 className="text-xl font-semibold text-white">
                          {place.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                        {place.category}
                      </span>
                      <p className="text-gray-600 mb-4">{place.description}</p>
                      <button className="text-blue-600 font-medium text-sm hover:text-blue-800 flex items-center gap-1">
                        View Details <span>→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "hotels" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Hotels & Stays in {cityName}
              </h2>
              <div className="space-y-6">
                {hotelsData.map((hotel, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 bg-gray-200">
                        {/* Hotel image would go here */}
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold">{hotel.name}</h3>
                          <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            <span className="font-medium">{hotel.rating}</span>
                            <span className="ml-1 text-sm">★</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <span className="font-medium">{hotel.price}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.map((amenity, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          View Deal
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "restaurants" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Restaurants in {cityName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurantsData.map((restaurant, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <h3 className="text-xl font-semibold text-white">
                          {restaurant.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <span className="font-medium text-yellow-600">
                            {restaurant.rating} ★
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {restaurant.priceRange}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">
                        <span className="font-medium">Cuisine:</span>{" "}
                        {restaurant.cuisine}
                      </p>
                      <button className="text-blue-600 font-medium text-sm hover:text-blue-800">
                        View Menu & Reviews
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "itinerary" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Suggested Itinerary for {cityName}
              </h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="space-y-8">
                    {[1, 2, 3].map((day) => (
                      <div key={day}>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
                          Day {day}: Exploring {cityName}
                        </h3>
                        <div className="space-y-4">
                          <div className="flex">
                            <div className="flex-shrink-0 mr-4">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                                {day}
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">Morning</h4>
                              <p className="text-gray-600">
                                Visit popular attractions and landmarks.
                              </p>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="flex-shrink-0 mr-4">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                                {day}
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">Afternoon</h4>
                              <p className="text-gray-600">
                                Lunch at a local restaurant and some leisure time.
                              </p>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="flex-shrink-0 mr-4">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                                {day}
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">Evening</h4>
                              <p className="text-gray-600">
                                Explore local markets and cultural experiences.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto">
                      Download Full Itinerary (PDF)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreDestination;