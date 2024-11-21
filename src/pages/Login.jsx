import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from 'react-router-dom'
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client'); // Default role is client
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const navigate = useNavigate(); // Hook to programmatically navigate

    // Check if the user is already logged in when the component mounts
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setSuccessMessage('You are already logged in!');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Log the email, password, and role to the console (simulating login process)
        console.log("Logging in with:", { email, password, role });

        // Simulate successful login and store user data in localStorage
        const user = { email, role }; // Storing email and role
        localStorage.setItem('user', JSON.stringify(user)); // Store user info in localStorage
        setSuccessMessage('Login successfully!'); // Set success message

        // Redirect to the appropriate dashboard based on the user's role
        setTimeout(() => {
            if (role === 'admin') {
                navigate('/admin'); // Redirect to admin dashboard
            } else {
                navigate('/homePage'); // Redirect to client dashboard
            }
        }, 1000);

        // Reset form fields after submission (optional)
        setEmail('');
        setPassword('');
    };

    const handleLogout = () => {
        // Clear user data from localStorage on logout
        localStorage.removeItem('user');
        setSuccessMessage('Logged out successfully!'); // Optional message

        // Redirect to the landing page (home page)
        navigate('/');
    };

    // Check if the user is logged in based on localStorage
    const isLoggedIn = localStorage.getItem('user') !== null;

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>{isLoggedIn ? 'Welcome Back!' : 'Login'}</h2>

                {!isLoggedIn ? (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                        {/* Dropdown to select user role */}
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="role-dropdown">
                            <option value="client">Client</option>
                            <option value="admin">Admin</option>
                        </select>

                        <button type="submit">Log In</button>
                    </form>
                ) : (
                    <div>
                        <p>You are logged in as {JSON.parse(localStorage.getItem('user')).email}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}

                {successMessage && <p className="success-message">{successMessage}</p>}
                
                {!isLoggedIn && (
                    <p>
                        Don't have an account? 
                        <Link to="/signup" className="signup-link"> Sign Up</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
