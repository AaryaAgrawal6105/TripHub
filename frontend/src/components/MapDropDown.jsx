import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import TripMap from "./TripMap";

const MapDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMap = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        onClick={toggleMap}
        className="flex items-center gap-2 text-white bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 transition"
      >
        <FaMapMarkerAlt />
        Map
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[400px] z-50">
          <TripMap />
        </div>
      )}
    </div>
  );
};

export default MapDropdown;
