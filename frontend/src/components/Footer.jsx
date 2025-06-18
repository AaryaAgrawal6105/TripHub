import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white pt-14 pb-8 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Description */}
        <div className="space-y-4 pr-35">
          <div className="flex items-center text-2xl font-bold text-white">
            <FaPlaneDeparture className="text-blue-400 text-3xl mr-2" />
            TripHub
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Plan, share, and enjoy unforgettable journeys with TripHub
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/home" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
            <li><a href="/signup" className="hover:text-white">Sign Up</a></li>
          </ul>
        </div>

        {/* Explore */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Top Destinations</a></li>
            <li><a href="#" className="hover:text-white">Budget Planning</a></li>
            <li><a href="#" className="hover:text-white">Trip Sharing</a></li>
            <li><a href="#" className="hover:text-white">Smart Recommendations</a></li>
          </ul>
        </div>

        {/* Newsletter + Social */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-white">Stay Connected</h3>
          <p className="text-sm text-gray-300">Subscribe to receive the latest travel updates and offers.</p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-md w-full text-sm text-gray-800 focus:outline-none"
            />
            <button className="bg-blue-500 px-4 py-2 rounded-r-md text-sm hover:bg-blue-600">
              Subscribe
            </button>
          </div>
          <div className="flex gap-4 pt-1 text-white text-lg">
            <a href="#"><FaFacebookF className="hover:text-blue-400" /></a>
            <a href="#"><FaTwitter className="hover:text-blue-400" /></a>
            <a href="#"><FaInstagram className="hover:text-blue-400" /></a>
            <a href="#"><FaLinkedinIn className="hover:text-blue-400" /></a>
          </div>
        </div>

      </div>

      <hr className="my-10 border-gray-700" />
      <p className="text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} TripHub. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;




// import React from 'react';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-12">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        
//         {/* Logo & Description */}
//         <div>
//           <h1 className="text-2xl font-bold mb-3">TripHub</h1>
//           <p className="text-sm leading-relaxed">
//             Your all-in-one travel companion. Plan, organize, and enjoy unforgettable journeys with ease.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h2 className="font-semibold mb-3 text-lg">Quick Links</h2>
//           <ul className="space-y-2 text-sm">
//             <li><a href="/home" className="hover:underline">Home</a></li>
//             <li><a href="/about" className="hover:underline">About Us</a></li>
//             <li><a href="/features" className="hover:underline">Features</a></li>
//             <li><a href="/contact" className="hover:underline">Contact</a></li>
//           </ul>
//         </div>

//         {/* Newsletter */}
//         <div>
//           <h2 className="font-semibold mb-3 text-lg">Stay Updated</h2>
//           <p className="text-sm mb-3">Get travel tips and latest updates directly to your inbox</p>
//           <form className="flex flex-col space-y-2">
//             <input
//               type="email"
//               placeholder="Your email"
//               className="px-3 py-2 rounded text-black focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="bg-white text-blue-700 py-2 rounded hover:bg-blue-100 font-semibold"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h2 className="font-semibold mb-3 text-lg">Follow Us</h2>
//           <div className="flex space-x-4 mt-2 text-xl">
//             <a href="#" className="hover:text-blue-300"><FaFacebookF /></a>
//             <a href="#" className="hover:text-blue-300"><FaTwitter /></a>
//             <a href="#" className="hover:text-blue-300"><FaInstagram /></a>
//             <a href="#" className="hover:text-blue-300"><FaLinkedin /></a>
//           </div>
//         </div>
//       </div>

//       <div className="text-center mt-10 border-t pt-6 text-sm text-blue-100">
//         © {new Date().getFullYear()} TripHub. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
