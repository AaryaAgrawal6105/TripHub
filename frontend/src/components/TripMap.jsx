import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const TripMap = () => {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow">
      <MapContainer
        center={[20.5937, 78.9629]} // Centered on India
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
      </MapContainer>
    </div>
  );
};

export default TripMap;
