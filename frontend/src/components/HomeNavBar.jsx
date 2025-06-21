import { FaPlaneDeparture } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const HomeNavbar = () => {
  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300">
      {/* Left: Logo and Name */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative">
          <FaPlaneDeparture className="text-blue-600 text-3xl transform group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          TripHub
        </span>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink
          to="/home/blogs"
          className={({ isActive }) =>
            `relative text-lg font-medium transition-all duration-300 group ${
              isActive
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          Blogs
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative text-lg font-medium transition-all duration-300 group ${
              isActive
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          About Us
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300 group-hover:w-full"></span>
        </NavLink>

      </div>

      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-3">
        <NavLink
          to="/login"
          className="px-6 py-2.5 text-gray-700 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-md"
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Sign Up
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default HomeNavbar;