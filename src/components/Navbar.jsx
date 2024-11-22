import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaHome, FaShoppingCart, FaSignInAlt, FaInfoCircle, FaUserShield, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Retrieve user data from localStorage (or use context or state in a real app)
    const user = JSON.parse(localStorage.getItem('user')); // Assuming the user object contains email and role

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('user');
        
        // Redirect to the home page after logout
        navigate('/'); // Redirect to the landing page (root page) after logout
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/home">SendIT</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/home">
                        <FaHome className="navbar-icon" /> Home
                    </Link>
                </li>

                {/* Conditionally render Login/Logout based on whether the user is logged in */}
                {user ? (
                    <>
                        <li>
                            <button onClick={handleLogout} className="logout-btn">
                                <FaSignOutAlt className="navbar-icon" /> Logout
                            </button>
                        </li>

                        {/* Conditionally render Admin Dashboard link based on role */}
                        {user.role === 'admin' && (
                            <li>
                                <Link to="/admin">
                                    <FaUserShield className="navbar-icon" /> Admin Dashboard
                                </Link>
                            </li>
                        )}

                        {/* For logged-in users, show Cart and Parcel Tracking */}
                        {user.role === 'client' && (
                            <>
                                <li>
                                    <Link to="/cart">
                                        <FaShoppingCart className="navbar-icon" /> Cart
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Always show Parcel Tracking */}
                        <li>
                            <Link to="/parcel-tracking">
                                <FaMapMarkerAlt className="navbar-icon" /> Parcel Tracking
                            </Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/login">
                            <FaSignInAlt className="navbar-icon" /> Login
                        </Link>
                    </li>
                )}

                {/* Always show About link */}
                <li>
                    <Link to="/about">
                        <FaInfoCircle className="navbar-icon" /> About
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
