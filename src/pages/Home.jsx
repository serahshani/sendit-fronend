import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 
import { FaFacebook, FaTwitter, FaInstagram, FaShippingFast, FaBoxOpen, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';

const Landing = () => {
    const navigate = useNavigate();

    const handleOrderNow = () => {
        navigate('/login'); 
    };

    return (
        <div className="home-page"> 
            <div className="hero">
                <div className="overlay"></div>
                <h1>SendIT</h1>
                <p>Your reliable courier service for parcel delivery.</p>
                <button onClick={handleOrderNow} className="btn-primary">Order Now</button>
            </div>

            {/* Info Container */}
            <div className="info-container">
                {/* About Section */}
                <section className="about container">
                    <h2 className="section-title">About Us</h2>
                    <p>At SendIT, we pride ourselves on providing fast and reliable delivery services. Our team is dedicated to ensuring your packages arrive safely and on time, every time.</p>
                </section>

                {/* Services Section */}
                <section className="services container">
                    <h2 className="section-title">Our Services</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <FaShippingFast className="service-icon" />
                            <h3>Same-Day Delivery</h3>
                        </div>
                        <div className="service-card">
                            <FaBoxOpen className="service-icon" />
                            <h3>International Shipping</h3>
                        </div>
                        <div className="service-card">
                            <FaMapMarkerAlt className="service-icon" />
                            <h3>Package Tracking</h3>
                        </div>
                        <div className="service-card">
                            <FaShieldAlt className="service-icon" />
                            <h3>Insurance Options</h3>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="testimonials container">
                    <h2>What Our Customers Say</h2>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <p>"SendIT has transformed the way we send parcels. Their service is quick and dependable!"</p>
                            <h4>- Jane Doe</h4>
                        </div>
                        <div className="testimonial-card">
                            <p>"I love how easy it is to track my deliveries. Highly recommend!"</p>
                            <h4>- John Smith</h4>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="contact container">
                    <h2>Contact Us</h2>
                    <p>If you have any questions or need assistance, feel free to reach out!</p>
                    <form className="contact-form">
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea placeholder="Your Message" rows="4" required></textarea>
                        <button type="submit" className="btn-primary">Send Message</button>
                    </form>
                </section>
            </div>

            {/* Footer Section */}
            <footer className="footer">
                <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                </div>
                <p>&copy; {new Date().getFullYear()} SendIT. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
