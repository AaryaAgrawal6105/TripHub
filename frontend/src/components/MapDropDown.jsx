import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const MapButton = () => {
  const navigate = useNavigate();

  const openMapPage = () => {
    navigate("/map");
  };

  return (
    <button
      onClick={openMapPage}
      className="flex items-center gap-2 text-white bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 transition"
    >
      <FaMapMarkerAlt />
      Map
    </button>
  );
};

export default MapButton;
