import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import Home from './pages/Home.jsx'; // Home component as default route
import Login from './pages/Login.jsx';
import ParcelDetails from './pages/ParcelDetails.jsx';
import SignUp from './pages/SignUp.jsx';
import About from './pages/About.jsx';
import HomePage from './pages/HomePage.jsx';
import Cart from './components/Cart.jsx';
import CreateOrder from './components/CreateOrder.jsx';
import PaymentPage from './components/Paymentpage.jsx';
import ParcelTracking from './components/ParcelTracking.jsx';
import { AuthProvider } from './auth/authService.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Default Route (Home) */}
          <Route index element={<Home />} /> {/* Home component will be the default route */}
          
          {/* Other Routes */}
          <Route path="login" element={<Login />} />
          <Route path="order/:orderId" element={<ParcelDetails />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="about" element={<About />} />
          <Route path="home" element={<HomePage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="create-order" element={<CreateOrder />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="parcel-tracking" element={<ParcelTracking />} />
          <Route path="admin" element={<AdminDashboard />} /> {/* Admin Dashboard */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
