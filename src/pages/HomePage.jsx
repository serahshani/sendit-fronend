import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaCog, FaBox, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/authService'; // Import the correct AuthContext
import './HomePage.css';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [parcels, setParcels] = useState([]);
  const [newParcel, setNewParcel] = useState({
    sender_name: "",
    recipient_name: "",
    destination: "",
    status: "In Transit",
    cost: ""
  });
  const [loading, setLoading] = useState(true); // Added loading state
  const [isUserLoaded, setIsUserLoaded] = useState(false); // State to track if user data is loaded

  const navigate = useNavigate();
  const { user } = useContext(AuthContext) || {}; // Safety check if context is undefined

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      navigate('/login'); // Redirect to login if no user is found
      return;
    }

    const userData = JSON.parse(loggedInUser);
    if (userData.role !== 'client') {
      navigate('/admin'); // Redirect to admin dashboard if user is not a client
    } else {
      fetchParcels(); // Fetch parcels if logged in as client
    }

    setIsUserLoaded(true);
  }, [navigate]);

  // Fetch parcels from the API
  const fetchParcels = () => {
    setLoading(true); // Set loading to true while fetching
    fetch('http://localhost:5000/parcels')
      .then((response) => response.json())
      .then((data) => {
        setParcels(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching parcels:', error);
        setLoading(false); // Stop loading in case of an error
      });
  };

  // Handle input change for the new parcel form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParcel({ ...newParcel, [name]: value });
  };

  // Handle form submission to create a new parcel
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/parcels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newParcel)
    })
      .then(() => {
        fetchParcels(); // Re-fetch parcels after creating a new one
        setNewParcel({ sender_name: "", recipient_name: "", destination: "", status: "In Transit", cost: "" });
      })
      .catch((error) => console.error('Error creating parcel:', error));
  };

  // Show a loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <div className="parcel-dashboard">
        <div className="sidebar">
          <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>SendIT</h2>
          <ul>
            <li><FaHome /> Dashboard</li>
            <li><FaBox /> Parcels</li>
            <li><FaCog /> Settings</li>
          </ul>
        </div>

        <div className="main-content">
          <motion.div className="form-container">
            <h3>All Parcels</h3>
            {parcels.length === 0 ? (
              <p>No parcels found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Recipient</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Cost</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels.map((parcel) => (
                    <tr key={parcel.id}>
                      <td>{parcel.sender_name}</td>
                      <td>{parcel.recipient_name}</td>
                      <td>{parcel.destination}</td>
                      <td>{parcel.status}</td>
                      <td>{parcel.cost}</td>
                      <td>
                        <button onClick={() => updateStatus(parcel.id, "Delivered")}>Mark Delivered</button>
                        <button onClick={() => deleteParcel(parcel.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>

          <motion.div className="form-container">
            <h3>Create Parcel</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="sender_name"
                placeholder="Sender Name"
                value={newParcel.sender_name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="recipient_name"
                placeholder="Recipient Name"
                value={newParcel.recipient_name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={newParcel.destination}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="cost"
                placeholder="Cost (KES)"
                value={newParcel.cost}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Create Parcel</button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;