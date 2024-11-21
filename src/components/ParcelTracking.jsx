import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker, Polyline } from "@react-google-maps/api";
import './ParcelTracking.css'; // Import the CSS file for styling

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -1.286389, // Nairobi Latitude (Central Point)
  lng: 36.817223, // Nairobi Longitude (Central Point)
};

function ParcelTracking() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCBn_7yvkHNGI2o7b_wl11-nlXZd38KT9M", // Your API key
  });

  // Simulate sender and receiver locations with initial status
  const [senderLocation, setSenderLocation] = useState({
    lat: -1.2921,
    lng: 36.8219,
  });

  const [receiverLocation, setReceiverLocation] = useState({
    lat: -1.286389,
    lng: 36.817223,
  });

  const [parcelStatus, setParcelStatus] = useState("Pending"); // "Pending" or "Delivered"
  const [editMode, setEditMode] = useState(false); // Toggle edit mode

  // Define the path for the Polyline (sender to receiver)
  const path = [senderLocation, receiverLocation];

  const handleEditDestination = () => {
    setEditMode(true);
  };

  const handleUpdateDestination = () => {
    // Here you can implement the logic to update the receiver location dynamically
    setReceiverLocation({
      lat: -1.2800 + Math.random() * 0.1, // Simulated new random latitude
      lng: 36.8100 + Math.random() * 0.1, // Simulated new random longitude
    });
    setEditMode(false);
  };

  const handleParcelStatusChange = () => {
    // Toggle between "Pending" and "Delivered"
    setParcelStatus((prevStatus) => (prevStatus === "Pending" ? "Delivered" : "Pending"));
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div className="parcel-tracking-container">
      <h2 className="tracking-header">Track Your Parcel</h2>
      <div className="map-container">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {/* Sender Marker */}
          <Marker position={senderLocation} label="Sender" />
          
          {/* Receiver Marker */}
          <Marker position={receiverLocation} label="Receiver" />
          
          {/* Polyline connecting sender and receiver */}
          <Polyline path={path} options={{ strokeColor: "#FF0000", strokeWeight: 2 }} />
        </GoogleMap>
      </div>

      {/* Parcel Status */}
      <div className="status-container">
        <h3 className="parcel-status">Parcel Status: {parcelStatus}</h3>
        <button className="status-button" onClick={handleParcelStatusChange}>
          {parcelStatus === "Pending" ? "Mark as Delivered" : "Mark as Pending"}
        </button>
      </div>

      {/* Edit Destination */}
      {editMode ? (
        <div className="edit-destination-container">
          <button className="edit-button" onClick={handleUpdateDestination}>
            Confirm New Destination
          </button>
        </div>
      ) : (
        <div className="edit-destination-container">
          <button className="edit-button" onClick={handleEditDestination}>
            Edit Destination
          </button>
        </div>
      )}
    </div>
  );
}

export default ParcelTracking;
