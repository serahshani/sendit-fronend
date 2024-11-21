import React, { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCog, FaBox, FaHome } from 'react-icons/fa';
import './AdminDashboard.css';

const MapComponent = lazy(() => import('./MapComponent'));

const AdminDashboard = () => {
  const [markers, setMarkers] = useState([
    { lat: -1.2921, lng: 36.8219 },
    { lat: -1.2921, lng: 36.8218 },
    { lat: -1.2920, lng: 36.8217 },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>
            <Link to="/"><FaHome /> Dashboard</Link>
          </li>
          <li>
            <Link to="/parcels"><FaBox /> Parcels</Link>
          </li>
          <li>
            <Link to="/settings"><FaCog /> Settings</Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <motion.div className="form-container">
          <h3>Update Parcel Details</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <button type="submit" className="submit-button">Update Parcel</button>
          </form>
        </motion.div>

        <div className="map-container">
          <h3>Parcel Locations on the Map</h3>
          <Suspense fallback={<div>Loading map...</div>}>
            <MapComponent markers={markers} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
