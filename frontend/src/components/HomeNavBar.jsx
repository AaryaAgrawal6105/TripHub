import { FaPlaneDeparture } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const HomeNavbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-8 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo and Name */}
      <div className="flex items-center gap-2 text-blue-600 text-2xl font-bold">
        <FaPlaneDeparture className="text-blue-600 text-3xl" />
        <span>TripHub</span>
      </div>

      {/* Center: Navigation Links (Blogs, About Us) */}
      <div className="flex gap-8">
        <NavLink
          to="/home/blogs"
          className={({ isActive }) =>
            `text-lg font-semibold transition ${
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-lg font-semibold transition ${
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          About Us
        </NavLink>
      </div>

      {/* Right: Login / Signup */}
      <div className="flex gap-4">
        <NavLink
          to="/login"
          className="text-lg font-semibold transition pr-4"
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className="text-lg font-semibold transition"
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
};

export default HomeNavbar;
