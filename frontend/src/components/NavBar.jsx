import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPlaneDeparture, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();               // use store logout
    navigate("/login");     // redirect
  };

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Trips", path: "/trips" },
  ];

  return (
    <nav className="w-full bg-white shadow-md px-8 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-2 text-blue-600 text-2xl font-bold">
        <FaPlaneDeparture className="text-blue-600 text-3xl" />
        <span>TripHub</span>
      </div>

      {/* Center: Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-8">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-lg transition font-semibold ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right: Profile + Logout */}
      <div className="flex items-center space-x-4">
        <NavLink to="/profile" className="hover:scale-105 transition">
          <FaUserCircle className="text-xl text-gray-500 hover:text-blue-600" />
        </NavLink>
        {authUser && (
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600 transition"
            title="Logout"
          >
            <FaSignOutAlt className="text-xl" />
          </button>
        )}
      </div>
    </nav>
  );
}
