// authService.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user info
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    // Check if the user is logged in (or exists in localStorage, etc.)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set user if logged in
      if (storedUser.role === 'client') {
        navigate('/home'); // Redirect to home page for clients
      } else {
        navigate('/admin'); // Redirect to admin dashboard if the role is not 'client'
      }
    } else {
      navigate('/login'); // Redirect to login if no user is found
    }
  }, [navigate]);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData); // Set user after login
    // After login, check if it's a client or not and redirect accordingly
    if (userData.role === 'client') {
      navigate('/home'); // Redirect to home page for clients
    } else {
      navigate('/admin'); // Redirect to admin dashboard for non-client
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null); // Clear user info on logout
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
