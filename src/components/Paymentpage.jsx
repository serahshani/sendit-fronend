import React, { useState } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");

  const handlePaymentSelect = (method) => {
    setSelectedMethod(method);
    setError(""); // Reset error when changing payment method
  };

  const handlePaymentSubmit = () => {
    if (!selectedMethod) {
      setError("Please select a payment method.");
      return;
    }

    if (selectedMethod === "M-Pesa") {
      if (!/^\d{10}$/.test(phoneNumber)) {
        setError("Please enter a valid 10-digit phone number.");
        return;
      }
    }

    if (selectedMethod === "Card") {
      if (!/^\d{16}$/.test(cardNumber)) {
        setError("Please enter a valid 16-digit card number.");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        setError("Please enter a valid expiry date (MM/YY).");
        return;
      }
      if (!/^\d{3}$/.test(cvc)) {
        setError("Please enter a valid 3-digit CVC.");
        return;
      }
      if (!/^\d{5}$/.test(zipCode)) {
        setError("Please enter a valid 5-digit ZIP code.");
        return;
      }
    }

    if (selectedMethod === "Cash") {
      // No specific validation needed for cash, but you can customize it if needed
      setError(""); // Clear error if cash is selected
    }

    // Here you can add confirmation code validation if necessary
    if (confirmationCode && !/^\d{6}$/.test(confirmationCode)) {
      setError("Please enter a valid 6-digit confirmation code.");
      return;
    }

    // If no errors, simulate a successful payment submission
    alert(`Payment method selected: ${selectedMethod}`);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Pay for your package here </h2>
        <div className="package-details">
          {/* You can add dynamic package details here */}
        </div>

        <h3>How would you like to pay?</h3>
        <div className="payment-methods">
          <button
            className={`payment-option ${selectedMethod === "M-Pesa" ? "active" : ""}`}
            onClick={() => handlePaymentSelect("M-Pesa")}
          >
            <img
              src="https://static.cdnlogo.com/logos/m/95/m-pesa.svg"
              alt="M-Pesa"
              className="payment-icon"
            />
            M-Pesa
          </button>
          <button
            className={`payment-option ${selectedMethod === "Cash" ? "active" : ""}`}
            onClick={() => handlePaymentSelect("Cash")}
          >
            <i className="fa fa-money-bill payment-icon"></i> Cash
          </button>
          <button
            className={`payment-option ${selectedMethod === "Card" ? "active" : ""}`}
            onClick={() => handlePaymentSelect("Card")}
          >
            <i className="fa fa-credit-card"></i> Card
          </button>
        </div>

        {/* Conditional Rendering Based on Payment Method */}
        <div className="payment-details">
          {selectedMethod === "M-Pesa" && (
            <div className="mpesa-form">
              <h4>Enter Your Phone Number</h4>
              <input
                type="text"
                placeholder="e.g., 0712345678"
                maxLength="10"
                className="payment-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          )}

          {selectedMethod === "Card" && (
            <div className="card-form">
              <h4>Card Details</h4>
              <input
                type="text"
                placeholder="Card Number"
                maxLength="16"
                className="payment-input"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="card-details-row">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="payment-input"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="CVC"
                  maxLength="3"
                  className="payment-input"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="ZIP Code"
                className="payment-input"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          )}

          {selectedMethod === "Cash" && (
            <div className="cash-info">
              <h4>Pay with Cash</h4>
              <p>You can pay directly to our delivery agent.</p>
            </div>
          )}

          {selectedMethod && (
            <div className="confirmation-code-form">
              <h4>Enter Confirmation Code (if applicable)</h4>
              <input
                type="text"
                placeholder="Confirmation Code"
                maxLength="6"
                className="payment-input"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
            </div>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="pay-now" onClick={handlePaymentSubmit}>
          PAY NOW
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
