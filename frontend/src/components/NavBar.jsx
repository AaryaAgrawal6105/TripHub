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
} from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore";
import CalendarModal from "@/components/CalendarModal";
import { useState } from "react";
import TripMap from "@/components/TripMap";
import MapDropdown from "./MapDropdown";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
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

          <NavLink to="/profile" className="hover:scale-105 transition">
            {authUser?.profilePic ? (
              <img
                src={authUser.profilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-gray-300 hover:ring-2 hover:ring-blue-500"
              />
            ) : (
              <FaUserCircle className="text-xl text-gray-500 hover:text-blue-600" />
            )}
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
    </>
  );
}


// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   FaPlaneDeparture,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaCalendarAlt,
// } from "react-icons/fa";
// import { useAuthStore } from "@/store/useAuthStore";
// import CalendarModal from "@/components/CalendarModal";
// import { useState } from "react";
// import TripMap from "@/components/TripMap";
// import MapDropdown from "./MapDropdown";

// export default function Navbar() {
//   const { authUser, logout } = useAuthStore();
//   const navigate = useNavigate();
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const navItems = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Trips", path: "/trips" },
//   ];

//   return (
//     <>
//       <nav className="w-full bg-white shadow-md px-8 py-3 flex items-center justify-between sticky top-0 z-50">
//         {/* Logo */}
//         <div className="flex items-center gap-2 text-blue-600 text-2xl font-bold">
//           <FaPlaneDeparture className="text-blue-600 text-3xl" />
//           <span>TripHub</span>
//         </div>

//         {/* Navigation */}
//         <NavigationMenu>
//           <NavigationMenuList className="flex gap-8">
//             {navItems.map((item) => (
//               <NavigationMenuItem key={item.name}>
//                 <NavigationMenuLink asChild>
//                   <NavLink
//                     to={item.path}
//                     className={({ isActive }) =>
//                       `text-lg font-semibold transition ${
//                         isActive
//                           ? "text-blue-600 border-b-2 border-blue-600 pb-1"
//                           : "text-gray-700 hover:text-blue-600"
//                       }`
//                     }
//                   >
//                     {item.name}
//                   </NavLink>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>
//             ))}
//           </NavigationMenuList>
//         </NavigationMenu>

//         {/* Actions */}
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={() => setIsCalendarOpen(true)}
//             className="text-gray-500 hover:text-green-600 transition"
//             title="Planner"
//           >
//             <FaCalendarAlt className="text-xl" />
//           </button>

//           <NavLink to="/profile" className="hover:scale-105 transition">
//             {authUser?.profilePic ? (
//               <img
//                 src={authUser.profilePic}
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full object-cover border border-gray-300 hover:ring-2 hover:ring-blue-500"
//               />
//             ) : (
//               <FaUserCircle className="text-xl text-gray-500 hover:text-blue-600" />
//             )}
//           </NavLink>

//           <MapDropdown />

//           {authUser && (
//             <button
//               onClick={handleLogout}
//               className="text-gray-500 hover:text-red-600 transition"
//               title="Logout"
//             >
//               <FaSignOutAlt className="text-xl" />
//             </button>
//           )}
//         </div>
//       </nav>

//       <CalendarModal isOpen={isCalendarOpen} setIsOpen={setIsCalendarOpen} />
//     </>
//   );
// }