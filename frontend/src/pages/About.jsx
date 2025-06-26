import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo-transparent.png"; 
import { Link } from 'react-router-dom';

const steps = [
  {
    title: "1. Create a Trip",
    desc: "Start by entering your trip name, destination, and dates. Simple and quick.",
    icon: "📝",
  },
  {
    title: "2. Invite Friends",
    desc: "Send email invites to your friends so they can join and collaborate.",
    icon: "👫",
  },
  {
    title: "3. Plan Together",
    desc: "Add todos, create an itinerary, and track expenses — all in one place.",
    icon: "🗓️",
  },
  {
    title: "4. Get AI Suggestions",
    desc: "Receive smart suggestions for places, hotels, and travel ideas instantly.",
    icon: "🤖",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-indigo-100 text-slate-800 overflow-hidden relative">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 max-w-full">
        {/* Enhanced Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.div
            className="mb-7 flex justify-center"
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src={logo}
              alt="TripHub Logo"
              className="h-30 w-auto object-contain"
            />
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-700 via-violet-700 to-indigo-700 bg-clip-text text-transparent mb-4 leading-tight">
              About TripHub
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500 rounded-full mx-auto opacity-70"></div>
          </motion.div>
          
          <motion.p
            className="text-gray-600 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Transforming how people plan trips together. Making it seamless, intelligent, and unforgettable.
          </motion.p>
        </div>

        {/* Enhanced Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
          <motion.div
            className="relative group order-2 lg:order-1"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-700"></div>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2"
                alt="Trip Planning"
                className="w-full h-80 object-cover border border-white/40 rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
          
          <motion.div
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-700 to-violet-700 bg-clip-text text-transparent mb-4 leading-tight">
                Our Mission
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mb-4"></div>
            </div>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-light">
              TripHub was born from the frustration of coordinating group travel. We believe trip planning should bring people together, not drive them apart. Our platform combines intelligent automation with collaborative tools to make every journey from dream to reality seamless and enjoyable.
            </p>
          </motion.div>
        </div>

        {/* Enhanced Feature Highlights */}
        <div className="text-center mb-20 max-w-6xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-700 to-violet-700 bg-clip-text text-transparent mb-4 leading-tight">
              Why Choose TripHub?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base lg:text-lg font-light leading-relaxed">
              Experience the future of collaborative travel planning with cutting-edge features.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: "Collaborative Planning",
                text: "Real-time collaboration with your travel companions. Share ideas, vote on destinations, and make decisions together.",
                gradient: "from-blue-500 to-indigo-500",
                icon: "👥"
              },
              {
                title: "Smart Expense Tracking",
                text: "Intelligent cost splitting and budget tracking. Monitor expenses in real-time and settle up with ease.",
                gradient: "from-violet-500 to-purple-500",
                icon: "💰"
              },
              {
                title: "AI-Powered Suggestions",
                text: "Personalized recommendations powered by advanced AI. Discover hidden gems and perfect matches for your group.",
                gradient: "from-indigo-500 to-blue-500",
                icon: "🤖"
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="group relative h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition-all duration-700`}></div>
                <div className="relative bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/60 hover:bg-white/80 hover:border-white/80 transition-all duration-300 h-full flex flex-col shadow-sm">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl mb-5 text-xl shadow-md transform group-hover:scale-110 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light flex-grow">{feature.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced How It Works */}
        <div className="text-center mb-20 max-w-6xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-700 to-violet-700 bg-clip-text text-transparent mb-4 leading-tight">
              How TripHub Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base lg:text-lg font-light leading-relaxed">
              Four simple steps to transform your travel dreams into reality.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="group relative h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition-all duration-700"></div>
                <div className="relative bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-white/60 hover:bg-white/80 hover:border-white/80 transition-all duration-300 h-full flex flex-col shadow-sm">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-all duration-300">{step.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light flex-grow">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          className="text-center max-w-4xl mx-auto relative group"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
          <div className="relative bg-white/80 backdrop-blur-sm py-12 px-8 rounded-2xl border border-white/70 shadow-lg">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-700 to-violet-700 bg-clip-text text-transparent mb-4 leading-tight">
              Ready to Plan Your Dream Trip?
            </h2>
            <p className="text-gray-600 mb-8 text-base lg:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Join thousands of travelers who've discovered the smarter way to plan group adventures.
            </p>
            <Link to="/signup" className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all duration-300 ease-out transform hover:scale-105"></Link>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg transition-all duration-300 group-hover:from-blue-500 group-hover:to-violet-500 shadow-lg"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-violet-700 rounded-lg opacity-0 transition-all duration-300 group-hover:opacity-100 blur-sm"></span>
              <span className="relative flex items-center">
                Get Started
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

