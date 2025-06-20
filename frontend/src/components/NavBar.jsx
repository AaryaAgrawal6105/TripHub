import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaPlaneDeparture,
  FaUserCircle,
  FaSignOutAlt,
  FaCalendarAlt,
  FaTasks,
} from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore";
import CalendarModal from "@/components/CalendarModal";
import TodoList from "@/components/TodoList"; // ✅ Import the TodoList
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useTripStore } from "@/store/useTripStore"; // ✅ To get current trip
import TripMap from "@/components/TripMap";
import MapDropdown from "./MapDropdown";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTodoOpen, setIsTodoOpen] = useState(false); // ✅ New state

  const { trip } = useTripStore(); // ✅ Get current trip

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Trips", path: "/trips" },
  ];

  return (
    <>
      <nav className="w-full bg-white shadow-md px-8 py-3 flex items-center justify-between sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2 text-blue-600 text-2xl font-bold">
          <FaPlaneDeparture className="text-blue-600 text-3xl" />
          <span>TripHub</span>
        </div>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-8">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-lg font-semibold transition ${
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

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="text-gray-500 hover:text-green-600 transition"
            title="Planner"
          >
            <FaCalendarAlt className="text-xl" />
          </button>

          <button
            onClick={() => setIsTodoOpen(true)}
            className="text-gray-500 hover:text-indigo-600 transition"
            title="Todos"
          >
            <FaTasks className="text-xl" />
          </button>

          <NavLink to="/profile" className="hover:scale-105 transition">
            <FaUserCircle className="text-xl text-gray-500 hover:text-blue-600" />
          </NavLink>
          <MapDropdown />

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

      <CalendarModal isOpen={isCalendarOpen} setIsOpen={setIsCalendarOpen} />


      {/* ✅ Todo Modal */}
      <Dialog open={isTodoOpen} onClose={() => setIsTodoOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold text-gray-800">📝 Trip Todos</Dialog.Title>
              <button
                onClick={() => setIsTodoOpen(false)}
                className="text-gray-500 hover:text-red-500 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            {trip ? (
              <TodoList tripId={trip._id} />
            ) : (
              <p className="text-sm text-gray-500">Select or open a trip first.</p>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
