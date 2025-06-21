import React from "react";
import TripAIAssistant from "@/components/TripAIAssistant";
import Img from "../assets/img.jpg";

const staticSuggestions = [
  {
    destination: "Manali, Himachal Pradesh",
    image: Img,
    description:
      "A beautiful hill station nestled in the Himalayas, perfect for adventure and snow-lovers.",
  },
  {
    destination: "Goa, India",
    image: "https://source.unsplash.com/800x600/?goa,beach",
    description:
      "Sun, sand and sea – Goa offers vibrant nightlife, beaches and Portuguese heritage.",
  },
  {
    destination: "Jaipur, Rajasthan",
    image: "https://source.unsplash.com/800x600/?jaipur,palace",
    description:
      "The Pink City awaits with its royal palaces, historic forts and rich Rajasthani culture.",
  },
  {
    destination: "Coorg, Karnataka",
    image: "https://source.unsplash.com/800x600/?coorg,coffee",
    description:
      "Serene coffee plantations, waterfalls and peaceful stays await in the Scotland of India.",
  },
  {
    destination: "Ladakh, Jammu & Kashmir",
    image: "https://source.unsplash.com/800x600/?ladakh,landscape",
    description:
      "Experience breathtaking landscapes, monasteries and high-altitude passes on an unforgettable road trip.",
  },
  {
    destination: "Andaman & Nicobar Islands",
    image: "https://source.unsplash.com/800x600/?andaman,beach",
    description:
      "White sand beaches, crystal clear water, coral reefs and tropical tranquility await.",
  },
];

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          Welcome to TripHub 🌍
        </h1>
        <TripAIAssistant />
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-800">
        ✨ Popular Trip Ideas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staticSuggestions.map((trip, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={trip.image}
              alt={trip.destination}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-blue-600">
                {trip.destination}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{trip.description}</p>
              <button className="mt-4 bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
