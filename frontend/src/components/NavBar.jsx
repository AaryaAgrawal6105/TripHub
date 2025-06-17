import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
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
                <NavigationMenuLink>{item.name}</NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right: User Profile */}
      <div className="flex items-center space-x-3">
        <NavLink to="/profile" className="hover:scale-105 transition">
            <FaUserCircle className="text-xl text-gray-500 hover:text-blue-600" />
        </NavLink>
      </div>
    </nav>
  );
}
