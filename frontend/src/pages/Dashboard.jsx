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

// import React from "react";
// import TripAIAssistant from "@/components/TripAIAssistant";
// import Img from "../assets/img.jpg";
// import Himachal from "../assets/himachal.jpg";
// import Jaipur from "../assets/jaipur.jpg";
// import Coorg from "../assets/coorg.jpg";
// import Ladakh from "../assets/ladakh.jpeg";
// import Andaman from "../assets/andaman.jpg";


// const staticSuggestions = [
//   {
//     destination: "Manali, Himachal Pradesh",
//     image: Himachal,
//     description:
//       "A beautiful hill station nestled in the Himalayas, perfect for adventure and snow-lovers.",
//     tags: ["Adventure", "Mountains", "Snow"],
//     rating: 4.8,
//     duration: "3-5 days"
//   },
//   {
//     destination: "Goa, India",
//     image: Img,
//     description:
//       "Sun, sand and sea – Goa offers vibrant nightlife, beaches and Portuguese heritage.",
//     tags: ["Beach", "Nightlife", "Heritage"],
//     rating: 4.7,
//     duration: "4-6 days"
//   },
//   {
//     destination: "Jaipur, Rajasthan",
//     image: Jaipur,
//     description:
//       "The Pink City awaits with its royal palaces, historic forts and rich Rajasthani culture.",
//     tags: ["History", "Culture", "Architecture"],
//     rating: 4.9,
//     duration: "2-4 days"
//   },
//   {
//     destination: "Coorg, Karnataka",
//     image: Coorg,
//     description:
//       "Serene coffee plantations, waterfalls and peaceful stays await in the Scotland of India.",
//     tags: ["Nature", "Coffee", "Peaceful"],
//     rating: 4.6,
//     duration: "3-4 days"
//   },
//   {
//     destination: "Ladakh, Jammu & Kashmir",
//     image: Ladakh,
//     description:
//       "Experience breathtaking landscapes, monasteries and high-altitude passes on an unforgettable road trip.",
//     tags: ["Adventure", "Road Trip", "Scenic"],
//     rating: 4.9,
//     duration: "7-10 days"
//   },
//   {
//     destination: "Andaman & Nicobar Islands",
//     image: Andaman,
//     description:
//       "White sand beaches, crystal clear water, coral reefs and tropical tranquility await.",
//     tags: ["Beach", "Diving", "Tropical"],
//     rating: 4.8,
//     duration: "5-7 days"
//   },
// ];

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
//         <div className="absolute inset-0 bg-black/10"></div>
//         <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
//           <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
//             <span className="text-2xl">🌍</span>
//             <span className="text-white font-medium">Your Journey Starts Here</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Welcome to <span className="text-yellow-300">TripHub</span>
//           </h1>
//           <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Discover amazing destinations, plan perfect trips, and create unforgettable memories with our AI-powered travel assistant.
//           </p>
//         </div>
        
//         {/* Decorative elements */}
//         <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
//         <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl"></div>
//       </div>

//       {/* Popular Destinations */}
//       <div className="max-w-6xl mx-auto px-4 pb-16 mt-10">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
//             ✨ Popular Trip Ideas
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Handpicked destinations that offer incredible experiences. From serene mountains to vibrant beaches, find your perfect getaway.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {staticSuggestions.map((trip, index) => (
//             <div
//               key={index}
//               className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
//             >
//               <div className="relative overflow-hidden">
//                 <img
//                   src={trip.image}
//                   alt={trip.destination}
//                   className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
//                 {/* Rating badge */}
//                 <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
//                   <span className="text-yellow-500 text-sm">⭐</span>
//                   <span className="text-sm font-semibold text-gray-800">{trip.rating}</span>
//                 </div>

//                 {/* Duration badge */}
//                 <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm rounded-full px-3 py-1">
//                   <span className="text-white text-sm font-medium">{trip.duration}</span>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
//                   {trip.destination}
//                 </h3>
                
//                 <p className="text-gray-600 text-sm mb-4 leading-relaxed">
//                   {trip.description}
//                 </p>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {trip.tags.map((tag, tagIndex) => (
//                     <span
//                       key={tagIndex}
//                       className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium border border-blue-100"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group-hover:scale-105">
//                   <span className="flex items-center justify-center gap-2">
//                     Explore Destination
//                     <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                     </svg>
//                   </span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="text-center mt-10 mb-5">
//           <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
//             <span className="text-2xl">🗺️</span>
//             <div>
//               <div className="font-semibold">Can't find what you're looking for?</div>
//               <div className="text-sm text-blue-100">Let our AI create a custom itinerary just for you!</div>
//             </div>
//           </div>
//         </div>

//         {/* AI Assistant Section */}
//       <div className="max-w-6xl mx-auto px-4 -mt-3 relative z-10">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-12 mt-20">
//           <TripAIAssistant />
//         </div>
//       </div>
        
//       </div>
//     </div>
//   );
// };

// export default Dashboard;