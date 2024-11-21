import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Navbar.css';
import { FaHome, FaShoppingCart, FaSignInAlt, FaInfoCircle, FaUserShield, FaBox, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Retrieve user data from localStorage (or use context or state in a real app)
    const user = JSON.parse(localStorage.getItem('user')); // Assuming the user object contains email and role

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('user');
        
        // Optionally, show a logout message or redirect to home
        navigate('/'); // Redirect to the landing page (root page) after logout
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">SendIT</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/homePage">
                        <FaHome className="navbar-icon" /> Home
                    </Link>
                </li>

                {/* Conditionally render Login/Logout */}
                {user ? (
                    <li>
                        <button onClick={handleLogout} className="logout-btn">
                            <FaSignOutAlt className="navbar-icon" /> Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link to="/login">
                            <FaSignInAlt className="navbar-icon" /> Login
                        </Link>
                    </li>
                )}

                {/* Conditionally render Admin Dashboard link based on role */}
                {user && user.role === 'admin' && (
                    <li>
                        <Link to="/admin">
                            <FaUserShield className="navbar-icon" /> Admin Dashboard
                        </Link>
                    </li>
                )}

                <li>
                    <Link to="/about">
                        <FaInfoCircle className="navbar-icon" /> About
                    </Link>
                </li>
                <li className="navbar-cart">
                    <Link to="/cart">
                        <FaShoppingCart className="navbar-icon" /> Cart
                    </Link>
                </li>
                <li>
                    <Link to="/parcel-tracking">
                        <FaMapMarkerAlt className="navbar-icon" /> Parcel Tracking
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
