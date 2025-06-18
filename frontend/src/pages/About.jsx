import React from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-16 px-6 md:px-20 font-[Inter]">
      
      {/* Header */}
      <div className="text-center mb-20">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About TripHub
        </motion.h2>
        <motion.p
          className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          Planning trips should be fun, not frustrating. We’re here to make it seamless.
        </motion.p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <motion.img
          src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2"
          alt="Trip Planning"
          className="rounded-xl shadow-2xl border-4 border-white"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        />
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold text-blue-600 mb-4">Our Mission</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            TripHub was born out of the chaos of planning group trips. Our goal is simple:
            make trip planning collaborative, intelligent, and stress-free. 
            From choosing destinations to managing expenses — we’ve got your back.
          </p>
        </motion.div>
      </div>

      {/* Feature Highlights */}
      <div className="text-center mb-24">
        <h3 className="text-4xl font-bold text-blue-600 mb-4">Why TripHub?</h3>
        <p className="text-gray-700 max-w-xl mx-auto text-lg mb-12">
          Here's what makes TripHub a modern travel planner.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Collaborative Planning",
              text: "Share plans, assign tasks, and vote on ideas with friends in real-time.",
            },
            {
              title: "Smart Expense Tracking",
              text: "Split costs easily and track your trip budget as a group.",
            },
            {
              title: "AI-Powered Suggestions",
              text: "Get tailored destination, hotel, and activity suggestions instantly.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="backdrop-blur-lg bg-white/30 p-6 rounded-xl shadow-md border border-gray-200 hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-blue-700 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="text-center mb-24">
        <h3 className="text-4xl font-bold text-blue-600 mb-8">How TripHub Works</h3>
        <p className="text-gray-700 max-w-xl mx-auto text-lg mb-12">
          In just a few steps, plan the perfect trip with your friends or family.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-3">{step.icon}</div>
              <h4 className="text-xl font-bold text-blue-700 mb-2">{step.title}</h4>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="text-center bg-blue-100 py-16 rounded-xl shadow-inner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold text-blue-700 mb-4">Ready to Plan Your Dream Trip?</h3>
        <p className="text-gray-700 mb-6 text-lg">
          Start your first trip now with TripHub and let us do the heavy lifting.
        </p>
        <a
          href="/signup"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </motion.div>
    </div>
  );
};

export default About;



// import { motion } from "framer-motion";

// const About = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-16 px-6 md:px-20 font-[Inter]">

//       {/* Header Section */}
//       <div className="text-center mb-20">
//         <motion.h2 
//           className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4"
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           About TripHub
//         </motion.h2>
//         <motion.p 
//           className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           Planning trips should be fun, not frustrating. We’re here to make it seamless.
//         </motion.p>
//       </div>

//       {/* Mission Section */}
//       <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
//         <img
//           src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2"
//           alt="Trip Planning"
//           className="rounded-xl shadow-2xl border-4 border-white"
//         />
//         <motion.div
//           initial={{ opacity: 0, x: 60 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h3 className="text-4xl font-bold text-blue-600 mb-4">Our Mission</h3>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             TripHub was born out of the chaos of planning group trips. Our goal is simple:
//             make trip planning collaborative, intelligent, and stress-free. 
//             From choosing destinations to managing expenses — we’ve got your back.
//           </p>
//         </motion.div>
//       </div>

//       {/* Feature Highlights */}
//       <div className="text-center mb-24">
//         <h3 className="text-4xl font-bold text-blue-600 mb-4">Why TripHub?</h3>
//         <p className="text-gray-700 max-w-xl mx-auto text-lg mb-12">
//           Here's what makes TripHub a modern travel planner.
//         </p>

//         <div className="grid md:grid-cols-3 gap-10">
//           {[
//             {
//               title: "Collaborative Planning",
//               text: "Share plans, assign tasks, and vote on ideas with friends in real-time.",
//             },
//             {
//               title: "Smart Expense Tracking",
//               text: "Split costs easily and track your trip budget as a group.",
//             },
//             {
//               title: "AI-Powered Suggestions",
//               text: "Get tailored destination, hotel, and activity suggestions instantly.",
//             },
//           ].map((feature, i) => (
//             <motion.div
//               key={i}
//               className="backdrop-blur-lg bg-white/30 p-6 rounded-xl shadow-md border border-gray-200 hover:scale-105 transition-transform"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.2 }}
//               viewport={{ once: true }}
//             >
//               <h4 className="text-xl font-bold text-blue-700 mb-2">{feature.title}</h4>
//               <p className="text-gray-600">{feature.text}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Team Section */}
//       <div className="text-center mb-24">
//         <h3 className="text-4xl font-bold text-blue-600 mb-8">Meet the Creators</h3>
//         <p className="text-gray-700 mb-10 max-w-xl mx-auto text-lg">
//           Passionate engineers, dreamers, and travelers working behind the scenes to simplify your adventures.
//         </p>
//         <div className="flex flex-wrap justify-center gap-10">
//           <div className="bg-white shadow-xl p-6 rounded-xl w-64 border hover:shadow-2xl transition">
//             <img
//               src="https://randomuser.me/api/portraits/men/32.jpg"
//               alt="Jayesh"
//               className="rounded-full w-24 h-24 mx-auto mb-4"
//             />
//             <h4 className="text-lg font-bold text-blue-600">Jayesh Patil</h4>
//             <p className="text-gray-500 text-sm">Full Stack Developer & Visionary</p>
//           </div>
//           {/* Add more team members */}
//         </div>
//       </div>

//       {/* CTA */}
//       <div className="text-center bg-blue-100 py-16 rounded-xl shadow-inner">
//         <h3 className="text-3xl font-bold text-blue-700 mb-4">Ready to Plan Your Dream Trip?</h3>
//         <p className="text-gray-700 mb-6 text-lg">
//           Start your first trip now with TripHub and let us do the heavy lifting.
//         </p>
//         <a
//           href="/signup"
//           className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition"
//         >
//           Get Started
//         </a>
//       </div>
//     </div>
//   );
// };

// export default About;


// const About = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen py-16 px-6 md:px-20">
//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">About TripHub</h2>
//         <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
//           We simplify travel planning so you can focus on creating memories.
//         </p>
//       </div>

//       {/* Mission Section */}
//       <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
//         <img
//           src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
//           alt="Mission"
//           className="w-full rounded-xl shadow-lg"
//         />
//         <div>
//           <h3 className="text-3xl font-semibold text-blue-500 mb-4">Our Mission</h3>
//           <p className="text-gray-700 text-lg">
//             At TripHub, our mission is to empower travelers with a platform that makes
//             group trip planning effortless. From itinerary creation to budget tracking,
//             we bring everything into one place to make your journeys smooth and memorable.
//           </p>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="text-center mb-16">
//         <h3 className="text-3xl font-semibold text-blue-500 mb-4">What Makes Us Different</h3>
//         <div className="grid md:grid-cols-3 gap-10 mt-8">
//           <div className="bg-white shadow-lg p-6 rounded-lg">
//             <h4 className="text-xl font-bold text-blue-600 mb-2">Collaborative Planning</h4>
//             <p className="text-gray-700">
//               Invite friends, assign tasks, and build your trip together in real-time.
//             </p>
//           </div>
//           <div className="bg-white shadow-lg p-6 rounded-lg">
//             <h4 className="text-xl font-bold text-blue-600 mb-2">Smart Budgeting</h4>
//             <p className="text-gray-700">
//               Keep track of expenses, split costs, and stay within your travel budget.
//             </p>
//           </div>
//           <div className="bg-white shadow-lg p-6 rounded-lg">
//             <h4 className="text-xl font-bold text-blue-600 mb-2">AI Travel Suggestions</h4>
//             <p className="text-gray-700">
//               Get AI-powered ideas for destinations, hotels, and flights tailored to your preferences.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Team Section */}
//       <div className="text-center">
//         <h3 className="text-3xl font-semibold text-blue-500 mb-4">Meet the Team</h3>
//         <p className="text-gray-700 mb-8">
//           We're a group of passionate developers, designers, and travel lovers working together to
//           bring TripHub to life.
//         </p>
//         <div className="flex flex-wrap justify-center gap-10">
//           {/* Team Member Card */}
//           <div className="bg-white shadow-lg p-6 rounded-lg w-64">
//             <img
//               src="https://randomuser.me/api/portraits/men/32.jpg"
//               alt="Team member"
//               className="rounded-full w-24 h-24 mx-auto mb-4"
//             />
//             <h4 className="text-lg font-semibold text-blue-600">Jayesh Patil</h4>
//             <p className="text-gray-600 text-sm">Backend Engineer & Product Designer</p>
//           </div>
//           {/* Add more team cards here */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;
