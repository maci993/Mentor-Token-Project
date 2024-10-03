import React, { useState } from "react";
import LogPage from "../components/LogPage";
import Button from "../components/Button";
import "./ForgotPassword.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email being sent to the server:", email); 
    try {
      const response = await fetch("http://localhost:10000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const data = await response.json();
        setMessage(data.message);
        setError("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <LogPage
      logData={
        <div>
          <h1 className="forgot-pass-title">Forgot Password</h1>
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="input-container" >
              <label htmlFor="email" className="input-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="forgot-password-input"
                required
              />
            </div>
            <button type="submit" className="forgot-password-button">Send Reset Link</button>
            {message && <p className="success-message">{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      }
    />
  );
};

export default ForgotPassword;