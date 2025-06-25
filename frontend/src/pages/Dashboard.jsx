import React from "react";
import TripAIAssistant from "@/components/TripAIAssistant";
import Img from "../assets/img.jpg";
import Himachal from "../assets/himachal.jpg";
import Jaipur from "../assets/jaipur.jpg";
import Coorg from "../assets/coorg.jpg";
import Ladakh from "../assets/ladakh.jpeg";
import Andaman from "../assets/andaman.jpg";
import { useNavigate } from "react-router-dom";

const staticSuggestions = [
  {
    destination: "Manali, Himachal Pradesh",
    image: Himachal,
    description: "A beautiful hill station nestled in the Himalayas, perfect for adventure enthusiasts.",
    tags: ["Adventure", "Mountains", "Snow"],
    duration: "3-5 days"
  },
  {
    destination: "Goa, India",
    image: Img,
    description: "Coastal paradise offering beautiful beaches and rich Portuguese heritage.",
    tags: ["Beach", "Nightlife", "Heritage"],
    duration: "4-6 days"
  },
  {
    destination: "Jaipur, Rajasthan",
    image: Jaipur,
    description: "The Pink City with its royal palaces, historic forts and vibrant culture.",
    tags: ["History", "Culture", "Architecture"],
    duration: "2-4 days"
  },
  {
    destination: "Coorg, Karnataka",
    image: Coorg,
    description: "Serene coffee plantations and peaceful hill station experience.",
    tags: ["Nature", "Coffee", "Peaceful"],
    duration: "3-4 days"
  },
  {
    destination: "Ladakh, Jammu & Kashmir",
    image: Ladakh,
    description: "Breathtaking landscapes and high-altitude adventure destination.",
    tags: ["Adventure", "Road Trip", "Scenic"],
    duration: "7-10 days"
  },
  {
    destination: "Andaman & Nicobar Islands",
    image: Andaman,
    description: "Pristine beaches, clear waters and tropical tranquility.",
    tags: ["Beach", "Diving", "Tropical"],
    duration: "5-7 days"
  },
];

const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Plan Your Perfect Trip
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Discover amazing destinations and create unforgettable memories with AI-powered travel planning
            </p>
            <button 
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              onClick={() => document.getElementById('ai-assistant').scrollIntoView({ behavior: 'smooth' })}
            >
              Get AI Recommendations →
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Popular Destinations Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing places to visit across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticSuggestions.map((trip, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 rounded-lg px-2 py-1">
                    <span className="text-sm font-medium text-gray-700">{trip.duration}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {trip.destination}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {trip.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>



                    <button
                    onClick={() =>
                      navigate("/explore", {
                        state: { destination: trip.destination },
                      })
                    }
                    className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Explore Destination
                  </button>

                </div>
                  
              </div>
            ))}
          </div>
        {/* AI Assistant Section */}
        <section className="py-16" id="ai-assistant">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">AI Travel Assistant</h2>
                    <p className="text-indigo-100 text-sm">Get personalized trip recommendations</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <TripAIAssistant />
              </div>
            </div>
          </div>
        </section>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

