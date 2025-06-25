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

// Destination-specific mock data
const DESTINATION_DATA = {
  manali: {
    places: [
      {
        name: "Hadimba Temple",
        description: "Ancient temple dedicated to Hidimba Devi, surrounded by cedar forests.",
        category: "Religious"
      },
      {
        name: "Solang Valley",
        description: "Adventure sports hub with paragliding, skiing, and zorbing.",
        category: "Adventure"
      },
      {
        name: "Rohtang Pass",
        description: "High mountain pass with stunning views, accessible by road.",
        category: "Nature"
      },
      {
        name: "Old Manali",
        description: "Quaint village area with cafes and shops along the Manalsu River.",
        category: "Cultural"
      }
    ],
    hotels: [
      {
        name: "Snow Valley Resorts",
        rating: 4.7,
        price: "₹9,500/night",
        amenities: ["Mountain View", "Spa", "Restaurant"]
      },
      {
        name: "Apple Country Resort",
        rating: 4.3,
        price: "₹6,000/night",
        amenities: ["Garden", "Free WiFi", "Breakfast"]
      },
      {
        name: "The Himalayan",
        rating: 4.5,
        price: "₹7,800/night",
        amenities: ["Pool", "Skiing", "Bar"]
      }
    ],
    restaurants: [
      {
        name: "Café 1947",
        rating: 4.6,
        cuisine: "Italian, Continental",
        priceRange: "₹₹₹"
      },
      {
        name: "Johnson's Cafe",
        rating: 4.4,
        cuisine: "Tibetan, Indian",
        priceRange: "₹₹"
      },
      {
        name: "Dylan's Toasted & Roasted",
        rating: 4.5,
        cuisine: "Cafe, Bakery",
        priceRange: "₹₹"
      }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "Morning", description: "Visit Hadimba Temple and explore local markets" },
          { time: "Afternoon", description: "Lunch at Johnson's Cafe" },
          { time: "Evening", description: "Leisure time at Mall Road" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "Morning", description: "Adventure activities at Solang Valley" },
          { time: "Afternoon", description: "Visit Nehru Kund and Vashisht Hot Springs" },
          { time: "Evening", description: "Dinner at Café 1947" }
        ]
      },
      {
        day: 3,
        activities: [
          { time: "Morning", description: "Day trip to Rohtang Pass" },
          { time: "Afternoon", description: "Snow activities and photography" },
          { time: "Evening", description: "Relax at your hotel" }
        ]
      }
    ],
    tips: [
      "Best time to visit: October to June",
      "Carry warm clothes even in summer",
      "Try local specialties like Siddu and Trout fish",
      "Book adventure activities in advance during peak season"
    ],
    quickFacts: {
      bestTime: "October to June",
      temperature: "0°C to 25°C",
      duration: "4-5 days"
    }
  },
  goa: {
    places: [
      {
        name: "Baga Beach",
        description: "Popular beach known for water sports, nightlife, and beach shacks.",
        category: "Beach"
      },
      {
        name: "Fort Aguada",
        description: "17th-century Portuguese fort with a lighthouse and panoramic views.",
        category: "Historical"
      },
      {
        name: "Dudhsagar Falls",
        description: "Majestic four-tiered waterfall located in the Mollem National Park.",
        category: "Nature"
      },
      {
        name: "Anjuna Flea Market",
        description: "Famous weekly market with clothes, jewelry, and handicrafts.",
        category: "Shopping"
      }
    ],
    hotels: [
      {
        name: "Taj Fort Aguada Resort",
        rating: 4.8,
        price: "₹15,000/night",
        amenities: ["Private Beach", "Spa", "Pool"]
      },
      {
        name: "The Park Calangute",
        rating: 4.2,
        price: "₹7,200/night",
        amenities: ["Beach Access", "Bar", "Free WiFi"]
      },
      {
        name: "W Goa",
        rating: 4.6,
        price: "₹12,500/night",
        amenities: ["Infinity Pool", "Spa", "Beach Club"]
      }
    ],
    restaurants: [
      {
        name: "Fisherman's Wharf",
        rating: 4.5,
        cuisine: "Goan, Seafood",
        priceRange: "₹₹₹"
      },
      {
        name: "Martha's Breakfast Home",
        rating: 4.7,
        cuisine: "Breakfast, Continental",
        priceRange: "₹₹"
      },
      {
        name: "Curlies Beach Shack",
        rating: 4.3,
        cuisine: "Goan, International",
        priceRange: "₹₹"
      }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "Morning", description: "Relax at Baga Beach and water sports" },
          { time: "Afternoon", description: "Lunch at a beach shack" },
          { time: "Evening", description: "Visit Anjuna Flea Market" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "Morning", description: "Explore Fort Aguada and lighthouse" },
          { time: "Afternoon", description: "Visit Old Goa churches" },
          { time: "Evening", description: "Dinner at Fisherman's Wharf" }
        ]
      },
      {
        day: 3,
        activities: [
          { time: "Morning", description: "Trip to Dudhsagar Falls" },
          { time: "Afternoon", description: "Wildlife spotting in Bhagwan Mahavir Sanctuary" },
          { time: "Evening", description: "Beach party at Tito's Lane" }
        ]
      }
    ],
    tips: [
      "Best time to visit: November to February",
      "Rent a scooter for easy transportation",
      "Must try: Goan fish curry and Bebinca dessert",
      "Wear reef-safe sunscreen to protect marine life"
    ],
    quickFacts: {
      bestTime: "November to February",
      temperature: "20°C to 35°C",
      duration: "5-7 days"
    }
  },
   jaipur: {
    places: [
      {
        name: "Amber Fort",
        description: "Majestic fort-palace with intricate carvings and mirror work, offering panoramic city views.",
        category: "Historical"
      },
      {
        name: "Hawa Mahal",
        description: "Iconic 'Palace of Winds' with its unique honeycomb structure and 953 windows.",
        category: "Architectural"
      },
      {
        name: "City Palace",
        description: "Grand royal residence complex showcasing Rajasthani and Mughal architecture.",
        category: "Palace"
      },
      {
        name: "Jantar Mantar",
        description: "UNESCO World Heritage site with fascinating astronomical instruments.",
        category: "Historical"
      }
    ],
    hotels: [
      {
        name: "Rambagh Palace",
        rating: 4.9,
        price: "₹25,000/night",
        amenities: ["Royal Suite", "Spa", "Fine Dining"]
      },
      {
        name: "Fairmont Jaipur",
        rating: 4.7,
        price: "₹12,000/night",
        amenities: ["Pool", "Golf Course", "Ayurvedic Spa"]
      },
      {
        name: "Umaid Bhawan Heritage Hotel",
        rating: 4.5,
        price: "₹8,500/night",
        amenities: ["Heritage Rooms", "Courtyard", "Traditional Cuisine"]
      }
    ],
    restaurants: [
      {
        name: "Suvarna Mahal",
        rating: 4.8,
        cuisine: "Royal Rajasthani, Continental",
        priceRange: "₹₹₹₹"
      },
      {
        name: "Spice Court",
        rating: 4.6,
        cuisine: "North Indian, Mughlai",
        priceRange: "₹₹₹"
      },
      {
        name: "Laxmi Misthan Bhandar",
        rating: 4.5,
        cuisine: "Rajasthani Sweets & Snacks",
        priceRange: "₹"
      }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "Morning", description: "Explore Amber Fort and enjoy elephant ride" },
          { time: "Afternoon", description: "Visit Jal Mahal and lunch at local restaurant" },
          { time: "Evening", description: "Shopping at Johari Bazaar" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "Morning", description: "Tour of City Palace and Jantar Mantar" },
          { time: "Afternoon", description: "Visit Albert Hall Museum" },
          { time: "Evening", description: "Dinner at Chokhi Dhani cultural village" }
        ]
      },
      {
        day: 3,
        activities: [
          { time: "Morning", description: "Photo session at Hawa Mahal" },
          { time: "Afternoon", description: "Explore Nahargarh Fort" },
          { time: "Evening", description: "Attend light and sound show at Amber Fort" }
        ]
      }
    ],
    tips: [
      "Best time to visit: October to March",
      "Hire a guide for historical sites to understand their significance",
      "Try local specialties: Dal Baati Churma, Ghewar, Pyaaz Kachori",
      "Bargain while shopping in local markets"
    ],
    quickFacts: {
      bestTime: "October to March",
      temperature: "15°C to 30°C",
      duration: "3-4 days"
    }
  },
  coorg: {
    places: [
      {
        name: "Abbey Falls",
        description: "Picturesque waterfall surrounded by coffee plantations and spice estates.",
        category: "Nature"
      },
      {
        name: "Raja's Seat",
        description: "Scenic viewpoint offering breathtaking sunset views over the Western Ghats.",
        category: "Viewpoint"
      },
      {
        name: "Dubare Elephant Camp",
        description: "Conservation center where you can interact with elephants and learn about their care.",
        category: "Wildlife"
      },
      {
        name: "Madikeri Fort",
        description: "Historical fort with a museum showcasing Coorg's rich heritage.",
        category: "Historical"
      }
    ],
    hotels: [
      {
        name: "The Tamara Coorg",
        rating: 4.8,
        price: "₹18,000/night",
        amenities: ["Luxury Villas", "Infinity Pool", "Coffee Plantation Tours"]
      },
      {
        name: "Evolve Back Coorg",
        rating: 4.9,
        price: "₹24,000/night",
        amenities: ["Private Pool Villas", "Spa", "Organic Farm"]
      },
      {
        name: "Coorg Jungle Camp Resort",
        rating: 4.4,
        price: "₹6,500/night",
        amenities: ["Nature Walks", "Camping", "River Activities"]
      }
    ],
    restaurants: [
      {
        name: "Coorg Cuisine",
        rating: 4.7,
        cuisine: "Authentic Kodava Food",
        priceRange: "₹₹₹"
      },
      {
        name: "The Falls at Tamara",
        rating: 4.6,
        cuisine: "Continental with Local Flavors",
        priceRange: "₹₹₹₹"
      },
      {
        name: "Raintree Restaurant",
        rating: 4.5,
        cuisine: "Multi-cuisine",
        priceRange: "₹₹"
      }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "Morning", description: "Visit Abbey Falls and coffee plantation tour" },
          { time: "Afternoon", description: "Lunch at local Coorgi restaurant" },
          { time: "Evening", description: "Sunset at Raja's Seat" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "Morning", description: "Elephant interaction at Dubare Camp" },
          { time: "Afternoon", description: "River rafting in Barapole River" },
          { time: "Evening", description: "Explore Madikeri town and fort" }
        ]
      },
      {
        day: 3,
        activities: [
          { time: "Morning", description: "Trek to Tadiandamol Peak" },
          { time: "Afternoon", description: "Visit Namdroling Monastery" },
          { time: "Evening", description: "Relax at spa with coffee scrub treatment" }
        ]
      }
    ],
    tips: [
      "Best time to visit: October to March",
      "Carry light woolens even in summer",
      "Try Coorg coffee and traditional Pandi Curry",
      "Book plantation stays in advance during peak season"
    ],
    quickFacts: {
      bestTime: "October to March",
      temperature: "15°C to 25°C",
      duration: "4-5 days"
    }
  },
  ladakh: {
    places: [
      {
        name: "Pangong Lake",
        description: "Stunning high-altitude lake with changing colors, featured in 3 Idiots movie.",
        category: "Nature"
      },
      {
        name: "Nubra Valley",
        description: "High-altitude desert valley with sand dunes and double-humped Bactrian camels.",
        category: "Desert"
      },
      {
        name: "Leh Palace",
        description: "Nine-story palace offering panoramic views of Leh town and surrounding mountains.",
        category: "Historical"
      },
      {
        name: "Magnetic Hill",
        description: "Optical illusion where vehicles appear to move uphill against gravity.",
        category: "Unique"
      }
    ],
    hotels: [
      {
        name: "The Grand Dragon Ladakh",
        rating: 4.6,
        price: "₹12,000/night",
        amenities: ["Oxygen Enriched Rooms", "Mountain View", "Traditional Decor"]
      },
      {
        name: "Nubra Ethnic Camp",
        rating: 4.5,
        price: "₹8,500/night",
        amenities: ["Luxury Tents", "Camel Safari", "Cultural Performances"]
      },
      {
        name: "Pangong Resort",
        rating: 4.3,
        price: "₹9,000/night",
        amenities: ["Lake View", "Bonfire", "Basic Amenities"]
      }
    ],
    restaurants: [
      {
        name: "Gesmo Restaurant",
        rating: 4.6,
        cuisine: "Tibetan, Indian, Continental",
        priceRange: "₹₹"
      },
      {
        name: "Lamayuru Restaurant",
        rating: 4.5,
        cuisine: "Ladakhi, Chinese",
        priceRange: "₹₹"
      },
      {
        name: "Bon Appetit",
        rating: 4.4,
        cuisine: "Multi-cuisine",
        priceRange: "₹₹₹"
      }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "Morning", description: "Acclimatize in Leh, visit Leh Palace" },
          { time: "Afternoon", description: "Explore local markets and Shanti Stupa" },
          { time: "Evening", description: "Traditional Ladakhi dinner" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "Morning", description: "Drive to Nubra Valley via Khardung La Pass" },
          { time: "Afternoon", description: "Camel safari in Hunder sand dunes" },
          { time: "Evening", description: "Stay in luxury camp" }
        ]
      },
      {
        day: 3,
        activities: [
          { time: "Morning", description: "Drive to Pangong Lake" },
          { time: "Afternoon", description: "Lakeside photography and relaxation" },
          { time: "Evening", description: "Bonfire under starlit sky" }
        ]
      }
    ],
    tips: [
      "Best time to visit: May to September",
      "Acclimatize for 2 days before high-altitude activities",
      "Carry warm clothing regardless of season",
      "Respect local Buddhist culture and monasteries"
    ],
    quickFacts: {
      bestTime: "May to September",
      temperature: "5°C to 20°C",
      duration: "7-10 days"
    }
  },
  andaman: {
    places: [
      {
        name: "Radhanagar Beach",
        description: "Voted Asia's best beach with white sands and turquoise waters.",
        category: "Beach"
      },
      {
        name: "Cellular Jail",
        description: "Historical prison used by British, now a national memorial with light and sound show.",
        category: "Historical"
      },
      {
        name: "Havelock Island",
        description: "Paradise island with stunning beaches and coral reefs.",
        category: "Island"
      },
      {
        name: "Ross Island",
        description: "Former British administrative headquarters now in ruins, accessible by boat.",
        category: "Historical"
      }
    ],
    hotels: [
      {
        name: "Taj Exotica Resort & Spa",
        rating: 4.8,
        price: "₹22,000/night",
        amenities: ["Private Beach", "Coral Reef Access", "Infinity Pool"]
      },
      {
        name: "SeaShell Havelock",
        rating: 4.6,
        price: "₹15,000/night",
        amenities: ["Beachfront Villas", "Scuba Center", "Spa"]
      },
      {
        name: "Sinclairs Bayview Port Blair",
        rating: 4.3,
        price: "₹7,500/night",
        amenities: ["Bay View", "Swimming Pool", "Multi-cuisine Restaurant"]
      }
    ],
    restaurants: [
      {
        name: "Full Moon Cafe",
        rating: 4.7,
        cuisine: "Seafood, Continental",
        priceRange: "₹₹₹"
      },
      {
        name: "New Lighthouse Restaurant",
        rating: 4.5,
        cuisine: "Fresh Seafood, Indian",
        priceRange: "₹₹"
      },
      {
        name: "Anju Coco Resto",
        rating: 4.6,
        cuisine: "Seafood, Local Dishes",
        priceRange: "₹₹₹"
      }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "Morning", description: "Arrive in Port Blair, visit Cellular Jail" },
          { time: "Afternoon", description: "Corbyn's Cove Beach" },
          { time: "Evening", description: "Attend light and sound show at Cellular Jail" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "Morning", description: "Ferry to Havelock Island" },
          { time: "Afternoon", description: "Relax at Radhanagar Beach" },
          { time: "Evening", description: "Beachside dinner" }
        ]
      },
      {
        day: 3,
        activities: [
          { time: "Morning", description: "Snorkeling or scuba diving at Elephant Beach" },
          { time: "Afternoon", description: "Visit Kalapathar Beach" },
          { time: "Evening", description: "Return to Port Blair" }
        ]
      }
    ],
    tips: [
      "Best time to visit: November to April",
      "Book ferry tickets between islands in advance",
      "Carry reef-safe sunscreen to protect coral",
      "Try fresh seafood and coconut water"
    ],
    quickFacts: {
      bestTime: "November to April",
      temperature: "23°C to 30°C",
      duration: "5-7 days"
    }
  },
  default: {
    places: [
      {
        name: "Popular Attraction 1",
        description: "This is a must-visit location with beautiful views.",
        category: "Landmark"
      },
      {
        name: "Historical Site",
        description: "Rich in cultural heritage and architectural beauty.",
        category: "Historical"
      },
      {
        name: "Nature Spot",
        description: "Perfect for nature lovers and photography enthusiasts.",
        category: "Nature"
      },
      {
        name: "Local Market",
        description: "Experience local culture and buy souvenirs.",
        category: "Shopping"
      }
    ],
    hotels: [
      {
        name: "Luxury Resort",
        rating: 4.8,
        price: "₹8,000/night",
        amenities: ["Pool", "Spa", "Free WiFi"]
      },
      {
        name: "Budget Hotel",
        rating: 3.5,
        price: "₹2,500/night",
        amenities: ["Free WiFi", "Breakfast"]
      },
      {
        name: "Boutique Stay",
        rating: 4.2,
        price: "₹5,500/night",
        amenities: ["Garden", "Restaurant"]
      }
    ],
    restaurants: [
      {
        name: "Local Cuisine Restaurant",
        rating: 4.5,
        cuisine: "Local, Traditional",
        priceRange: "₹₹"
      },
      {
        name: "Multi-Cuisine Cafe",
        rating: 4.0,
        cuisine: "International, Cafe",
        priceRange: "₹₹₹"
      },
      {
        name: "Street Food Corner",
        rating: 4.7,
        cuisine: "Street Food",
        priceRange: "₹"
      }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "Morning", description: "Visit popular attractions and landmarks" },
          { time: "Afternoon", description: "Lunch at a local restaurant" },
          { time: "Evening", description: "Explore local markets" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "Morning", description: "Nature walk and photography" },
          { time: "Afternoon", description: "Cultural experience" },
          { time: "Evening", description: "Traditional dinner" }
        ]
      },
      {
        day: 3,
        activities: [
          { time: "Morning", description: "Adventure activities" },
          { time: "Afternoon", description: "Relaxation time" },
          { time: "Evening", description: "Farewell celebration" }
        ]
      }
    ],
    tips: [
      "Best time to visit: October to March",
      "Average budget: ₹3,000 - ₹8,000 per day",
      "Local transport available: Taxis, buses, and auto-rickshaws",
      "Must-try local cuisine"
    ],
    quickFacts: {
      bestTime: "October to March",
      temperature: "15°C to 30°C",
      duration: "3-5 days"
    }
  }
};

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
  const [itineraryData, setItineraryData] = useState([]);
  const [travelTips, setTravelTips] = useState([]);
  const [quickFacts, setQuickFacts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Extract city name from destination string
  const cityName = destination.split(",")[0].trim().toLowerCase();

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
        
        // Get destination-specific data
        const destinationKey = Object.keys(DESTINATION_DATA).includes(cityName) 
          ? cityName 
          : "default";
        
        const {
          places,
          hotels,
          restaurants,
          itinerary,
          tips,
          quickFacts
        } = DESTINATION_DATA[destinationKey];

        setDestinationData({
          name: destination,
          images: imagesResponse.data.results.map(img => img.urls.regular),
          description: `Explore the beautiful destination of ${destination.split(",")[0].trim()} with its rich culture, stunning landscapes, and unique experiences.`,
        });
        
        setWeatherData(weatherResponse.data);
        setPlacesData(places);
        setHotelsData(hotels);
        setRestaurantsData(restaurants);
        setItineraryData(itinerary);
        setTravelTips(tips);
        setQuickFacts(quickFacts);
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
                  About {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {destinationData.description}
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Travel Tips
                  </h3>
                  <ul className="list-disc list-inside text-blue-700 space-y-1">
                    {travelTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
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
                          <p className="font-medium">{quickFacts.bestTime}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 p-2 rounded-lg mr-3">
                          <FaTemperatureHigh className="text-blue-600" />
                        </span>
                        <div>
                          <p className="text-sm text-gray-500">Average Temperature</p>
                          <p className="font-medium">{quickFacts.temperature}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 p-2 rounded-lg mr-3">
                          <FaInfoCircle className="text-blue-600" />
                        </span>
                        <div>
                          <p className="text-sm text-gray-500">Ideal Duration</p>
                          <p className="font-medium">{quickFacts.duration}</p>
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
                Places to Visit in {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
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
                Hotels & Stays in {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
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
                Restaurants in {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
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
                Suggested Itinerary for {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
              </h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="space-y-8">
                    {itineraryData.map((dayPlan) => (
                      <div key={dayPlan.day}>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
                          Day {dayPlan.day}: Exploring {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
                        </h3>
                        <div className="space-y-4">
                          {dayPlan.activities.map((activity, idx) => (
                            <div className="flex" key={idx}>
                              <div className="flex-shrink-0 mr-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                                  {dayPlan.day}
                                </div>
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium">{activity.time}</h4>
                                <p className="text-gray-600">{activity.description}</p>
                              </div>
                            </div>
                          ))}
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


// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaTemperatureHigh,
//   FaHotel,
//   FaUtensils,
//   FaCamera,
//   FaInfoCircle,
// } from "react-icons/fa";
// import { WiDaySunny, WiRain, WiCloudy, WiSnow } from "react-icons/wi";
// import { ImSpinner8 } from "react-icons/im";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const ExploreDestination = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [destination, setDestination] = useState(
//     location.state?.destination || ""
//   );
//   const [destinationData, setDestinationData] = useState(null);
//   const [weatherData, setWeatherData] = useState(null);
//   const [placesData, setPlacesData] = useState([]);
//   const [hotelsData, setHotelsData] = useState([]);
//   const [restaurantsData, setRestaurantsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("overview");

//   // Extract city name from destination string (e.g., "Manali, Himachal Pradesh" => "Manali")
//   const cityName = destination.split(",")[0].trim();

//   useEffect(() => {
//     const fetchDestinationData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch destination images from Unsplash
//         const imagesResponse = await axios.get(
//   `https://api.unsplash.com/search/photos?query=${cityName}+tourism&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=10`
// );
//         // Fetch weather data from OpenWeatherMap
//         const weatherResponse = await axios.get(
//   `https://api.openweathermap.org/data/2.5/weather?q=${cityName},IN&units=metric&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`
// );
        
//         // Fetch places data from Foursquare (mock data as Foursquare requires auth)
//         const mockPlaces = [
//           {
//             name: "Popular Attraction 1",
//             description: "This is a must-visit location with beautiful views.",
//             category: "Landmark",
//           },
//           {
//             name: "Historical Site",
//             description: "Rich in cultural heritage and architectural beauty.",
//             category: "Historical",
//           },
//           {
//             name: "Nature Spot",
//             description: "Perfect for nature lovers and photography enthusiasts.",
//             category: "Nature",
//           },
//           {
//             name: "Local Market",
//             description: "Experience local culture and buy souvenirs.",
//             category: "Shopping",
//           },
//         ];
        
//         // Fetch hotels data (mock)
//         const mockHotels = [
//           {
//             name: "Luxury Resort",
//             rating: 4.8,
//             price: "₹8,000/night",
//             amenities: ["Pool", "Spa", "Free WiFi"],
//           },
//           {
//             name: "Budget Hotel",
//             rating: 3.5,
//             price: "₹2,500/night",
//             amenities: ["Free WiFi", "Breakfast"],
//           },
//           {
//             name: "Boutique Stay",
//             rating: 4.2,
//             price: "₹5,500/night",
//             amenities: ["Garden", "Restaurant"],
//           },
//         ];
        
//         // Fetch restaurants data (mock)
//         const mockRestaurants = [
//           {
//             name: "Local Cuisine Restaurant",
//             rating: 4.5,
//             cuisine: "Local, Traditional",
//             priceRange: "₹₹",
//           },
//           {
//             name: "Multi-Cuisine Cafe",
//             rating: 4.0,
//             cuisine: "International, Cafe",
//             priceRange: "₹₹₹",
//           },
//           {
//             name: "Street Food Corner",
//             rating: 4.7,
//             cuisine: "Street Food",
//             priceRange: "₹",
//           },
//         ];

//         setDestinationData({
//           name: destination,
//           images: imagesResponse.data.results.map(img => img.urls.regular),
//           description: `Explore the beautiful destination of ${cityName} with its rich culture, stunning landscapes, and unique experiences.`,
//         });
        
//         setWeatherData(weatherResponse.data);
//         setPlacesData(mockPlaces);
//         setHotelsData(mockHotels);
//         setRestaurantsData(mockRestaurants);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load destination data. Please try again later.");
//         setLoading(false);
//       }
//     };

//     if (destination) {
//       fetchDestinationData();
//     } else {
//       navigate("/");
//     }
//   }, [destination, cityName, navigate]);

//   const getWeatherIcon = (main) => {
//     switch (main) {
//       case "Clear":
//         return <WiDaySunny className="text-yellow-500 text-4xl" />;
//       case "Rain":
//         return <WiRain className="text-blue-500 text-4xl" />;
//       case "Clouds":
//         return <WiCloudy className="text-gray-500 text-4xl" />;
//       case "Snow":
//         return <WiSnow className="text-blue-200 text-4xl" />;
//       default:
//         return <WiDaySunny className="text-yellow-500 text-4xl" />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <ImSpinner8 className="animate-spin text-5xl text-blue-600 mx-auto mb-4" />
//           <p className="text-lg text-gray-700">Loading destination information...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
//           <FaInfoCircle className="text-5xl text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => navigate("/")}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section with Image Slider */}
//       <section className="relative h-96">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={0}
//           slidesPerView={1}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 5000 }}
//           loop={true}
//           className="h-full w-full"
//         >
//           {destinationData.images.map((image, index) => (
//             <SwiperSlide key={index}>
//               <div
//                 className="h-full w-full bg-cover bg-center"
//                 style={{ backgroundImage: `url(${image})` }}
//               >
//                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                   <div className="text-center text-white px-4">
//                     <h1 className="text-4xl md:text-5xl font-bold mb-4">
//                       {destinationData.name}
//                     </h1>
//                     <div className="flex items-center justify-center gap-4">
//                       <span className="flex items-center gap-1">
//                         <FaMapMarkerAlt />
//                         {destinationData.name.split(",")[1]?.trim() || "India"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Weather Card */}
//         {weatherData && (
//           <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                 <div className="flex items-center gap-4 mb-4 md:mb-0">
//                   {getWeatherIcon(weatherData.weather[0].main)}
//                   <div>
//                     <h3 className="text-xl font-semibold">Current Weather</h3>
//                     <p className="text-gray-600 capitalize">
//                       {weatherData.weather[0].description}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 text-center">
//                   <div>
//                     <p className="text-3xl font-bold">
//                       {Math.round(weatherData.main.temp)}°C
//                     </p>
//                     <p className="text-sm text-gray-500">Temperature</p>
//                   </div>
//                   <div>
//                     <p className="text-xl font-bold">
//                       {weatherData.main.humidity}%
//                     </p>
//                     <p className="text-sm text-gray-500">Humidity</p>
//                   </div>
//                   <div>
//                     <p className="text-xl font-bold">
//                       {weatherData.wind.speed} m/s
//                     </p>
//                     <p className="text-sm text-gray-500">Wind</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation Tabs */}
//         <div className="border-b border-gray-200 mb-8">
//           <nav className="flex space-x-8">
//             {["overview", "places", "hotels", "restaurants", "itinerary"].map(
//               (tab) => (
//                 <button
//                   key={tab}
//                   className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
//                     activeTab === tab
//                       ? "border-blue-500 text-blue-600"
//                       : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               )
//             )}
//           </nav>
//         </div>

//         {/* Tab Content */}
//         <div className="mb-12">
//           {activeTab === "overview" && (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                   About {cityName}
//                 </h2>
//                 <p className="text-gray-700 leading-relaxed mb-6">
//                   {destinationData.description}
//                 </p>
//                 <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
//                   <h3 className="text-lg font-semibold text-blue-800 mb-2">
//                     Travel Tips
//                   </h3>
//                   <ul className="list-disc list-inside text-blue-700 space-y-1">
//                     <li>Best time to visit: October to March</li>
//                     <li>Average budget: ₹3,000 - ₹8,000 per day</li>
//                     <li>Local transport available: Taxis, buses, and auto-rickshaws</li>
//                     <li>Must-try local cuisine: Traditional dishes</li>
//                   </ul>
//                 </div>
//               </div>
//               <div>
//                 <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-4">
//                   <div className="p-6 border-b border-gray-200">
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       Quick Facts
//                     </h3>
//                   </div>
//                   <div className="p-6">
//                     <ul className="space-y-4">
//                       <li className="flex items-start">
//                         <span className="bg-blue-100 p-2 rounded-lg mr-3">
//                           <FaCalendarAlt className="text-blue-600" />
//                         </span>
//                         <div>
//                           <p className="text-sm text-gray-500">Best Time to Visit</p>
//                           <p className="font-medium">October to March</p>
//                         </div>
//                       </li>
//                       <li className="flex items-start">
//                         <span className="bg-blue-100 p-2 rounded-lg mr-3">
//                           <FaTemperatureHigh className="text-blue-600" />
//                         </span>
//                         <div>
//                           <p className="text-sm text-gray-500">Average Temperature</p>
//                           <p className="font-medium">15°C - 30°C</p>
//                         </div>
//                       </li>
//                       <li className="flex items-start">
//                         <span className="bg-blue-100 p-2 rounded-lg mr-3">
//                           <FaInfoCircle className="text-blue-600" />
//                         </span>
//                         <div>
//                           <p className="text-sm text-gray-500">Ideal Duration</p>
//                           <p className="font-medium">3-5 days</p>
//                         </div>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "places" && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Places to Visit in {cityName}
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {placesData.map((place, index) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//                   >
//                     <div className="h-48 bg-gray-200 relative">
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
//                         <h3 className="text-xl font-semibold text-white">
//                           {place.name}
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="p-5">
//                       <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
//                         {place.category}
//                       </span>
//                       <p className="text-gray-600 mb-4">{place.description}</p>
//                       <button className="text-blue-600 font-medium text-sm hover:text-blue-800 flex items-center gap-1">
//                         View Details <span>→</span>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === "hotels" && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Hotels & Stays in {cityName}
//               </h2>
//               <div className="space-y-6">
//                 {hotelsData.map((hotel, index) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//                   >
//                     <div className="flex flex-col md:flex-row">
//                       <div className="md:w-1/3 h-48 bg-gray-200">
//                         {/* Hotel image would go here */}
//                       </div>
//                       <div className="md:w-2/3 p-6">
//                         <div className="flex justify-between items-start mb-2">
//                           <h3 className="text-xl font-semibold">{hotel.name}</h3>
//                           <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                             <span className="font-medium">{hotel.rating}</span>
//                             <span className="ml-1 text-sm">★</span>
//                           </div>
//                         </div>
//                         <div className="flex items-center text-gray-600 mb-4">
//                           <span className="font-medium">{hotel.price}</span>
//                         </div>
//                         <div className="flex flex-wrap gap-2 mb-4">
//                           {hotel.amenities.map((amenity, i) => (
//                             <span
//                               key={i}
//                               className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
//                             >
//                               {amenity}
//                             </span>
//                           ))}
//                         </div>
//                         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//                           View Deal
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === "restaurants" && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Restaurants in {cityName}
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {restaurantsData.map((restaurant, index) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//                   >
//                     <div className="h-48 bg-gray-200 relative">
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
//                         <h3 className="text-xl font-semibold text-white">
//                           {restaurant.name}
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="p-5">
//                       <div className="flex justify-between items-center mb-3">
//                         <div className="flex items-center">
//                           <span className="font-medium text-yellow-600">
//                             {restaurant.rating} ★
//                           </span>
//                         </div>
//                         <span className="text-sm text-gray-600">
//                           {restaurant.priceRange}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 mb-3">
//                         <span className="font-medium">Cuisine:</span>{" "}
//                         {restaurant.cuisine}
//                       </p>
//                       <button className="text-blue-600 font-medium text-sm hover:text-blue-800">
//                         View Menu & Reviews
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === "itinerary" && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Suggested Itinerary for {cityName}
//               </h2>
//               <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                 <div className="p-6">
//                   <div className="space-y-8">
//                     {[1, 2, 3].map((day) => (
//                       <div key={day}>
//                         <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
//                           Day {day}: Exploring {cityName}
//                         </h3>
//                         <div className="space-y-4">
//                           <div className="flex">
//                             <div className="flex-shrink-0 mr-4">
//                               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
//                                 {day}
//                               </div>
//                             </div>
//                             <div className="flex-grow">
//                               <h4 className="font-medium">Morning</h4>
//                               <p className="text-gray-600">
//                                 Visit popular attractions and landmarks.
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex">
//                             <div className="flex-shrink-0 mr-4">
//                               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
//                                 {day}
//                               </div>
//                             </div>
//                             <div className="flex-grow">
//                               <h4 className="font-medium">Afternoon</h4>
//                               <p className="text-gray-600">
//                                 Lunch at a local restaurant and some leisure time.
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex">
//                             <div className="flex-shrink-0 mr-4">
//                               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
//                                 {day}
//                               </div>
//                             </div>
//                             <div className="flex-grow">
//                               <h4 className="font-medium">Evening</h4>
//                               <p className="text-gray-600">
//                                 Explore local markets and cultural experiences.
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-8">
//                     <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto">
//                       Download Full Itinerary (PDF)
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExploreDestination;