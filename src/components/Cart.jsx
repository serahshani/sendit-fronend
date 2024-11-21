import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import './Cart.css'; // Add the CSS file

function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: 'Wireless Headphones', price: 129.99, quantity: 1, image: '/api/placeholder/80/80' },
    { id: 2, name: 'Smart Watch', price: 199.99, quantity: 1, image: '/api/placeholder/80/80' },
    { id: 3, name: 'Laptop Sleeve', price: 29.99, quantity: 2, image: '/api/placeholder/80/80' }
  ]);

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCreateOrder = () => {
    // Navigate to the payment page
    navigate('/payment');  // Redirect to the payment page
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      
      {items.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items-list">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-button"
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-item-button"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line cart-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCreateOrder}
              className="create-order-button"
            >
              Create Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
