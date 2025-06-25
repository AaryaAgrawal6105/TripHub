import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPlaneDeparture,
} from "react-icons/fa";
import logo from '../assets/logo-transparent.png';

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white mt-auto overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="relative pt-8 pb-4 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand Description */}
          <div className="space-y-3 md:pr-8">
            <div className="group flex items-center text-2xl font-bold">
              <div className="relative">
                <img
                            src={logo}
                            alt="TripHub Logo"
                            className="h-10 w-auto object-contain"
                />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent font-black text-3xl">
                TripHub
              </span>
            </div>
            <p className="text-base text-gray-300 leading-relaxed max-w-sm">
              Plan, share, and enjoy unforgettable journeys with TripHub.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Trusted by travelers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </h3>
            <ul className="space-y-2 text-gray-300">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Login", "/login"],
                ["Sign Up", "/signup"],
              ].map(([text, link]) => (
                <li key={text}>
                  <a
                    href={link}
                    className="group flex items-center hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2 rounded-full"></span>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold relative">
              Explore
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </h3>
            <ul className="space-y-2 text-gray-300">
              {[
                "Top Destinations",
                "Budget Planning",
                "Trip Sharing",
                "Smart Recommendations",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="/dashboard"
                    className="group flex items-center hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="w-0 h-0.5 bg-purple-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2 rounded-full"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer & Social */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold relative">
              Developers
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
            </h3>

            <div className="pt-2">
              <p className="text-sm text-gray-400 mb-4">Follow us on social media</p>
              <div className="flex gap-4 text-white text-xl">
                <a
                  href="#"
                  className="group relative p-3 bg-white/10 rounded-xl border border-white/20 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-700/25"
                >
                  <FaLinkedinIn className="relative z-10" />
                  <div className="absolute inset-0 bg-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href="#"
                  className="group relative p-3 bg-white/10 rounded-xl border border-white/20 hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/25"
                >
                  <FaInstagram className="relative z-10" />
                  <div className="absolute inset-0 bg-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-3 pt-5 border-t border-gray-700/50 text-center">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} TripHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
