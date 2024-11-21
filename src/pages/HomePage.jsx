import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1 className="homepage-title">Sendit</h1>
        <div className="header-search">
          <input type="text" placeholder="Search products, brands, and categories" />
          <button>Search</button>
        </div>
        <div className="header-icons">
          <button>Account</button>
          <button>Help</button>
          <button>Cart</button>
        </div>
      </header>

      <aside className="sidebar">
        <ul>
          <li>Official Stores</li>
          <li>Phones & Tablets</li>
          <li>TVs & Audio</li>
          <li>Appliances</li>
          <li>Health & Beauty</li>
          <li>Home & Office</li>
          <li>Fashion</li>
          <li>Computing</li>
          <li>Supermarket</li>
          <li>Baby Products</li>
          <li>Sporting Goods</li>
          <li>Other categories</li>
        </ul>
      </aside>

      <div className="main-banner">
        <img src="banner-placeholder.png" alt="Main Banner" />
      </div>

      <section className="daily-finds">
        <h2>Daily Finds | Live Now</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.image_url} alt={product.name} />
              <p>{product.name}</p>
              <p>KSh {product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
