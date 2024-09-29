import React from "react";
import Navbar from "./Navbar";
import mapImage from "../career_fair_map.png"; // Ensure the correct path to the map image
import pinIcon from "../pin.png"; // Path to your pin icon

const Map = () => {
  return (
    <>
      <Navbar />
      <div style={{ position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto" }}>

        {/* Map container with relative positioning */}
        <div style={{ position: "relative" }}>
          {/* Map Image */}
          <img src={mapImage} alt="Map" style={{ width: "100%", height: "auto" }} />

          {/* Pin Icon */}
          <img
            src={pinIcon}
            alt="Pin"
            style={{
              position: "absolute",
              top: "44%", // Adjust this to your desired position on the map
              left: "55%", // Adjust this to your desired position on the map
              transform: "translate(-50%, -100%)", // Centers the pin properly
              width: "", // Set the size of the pin
              height: "40px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Map;
