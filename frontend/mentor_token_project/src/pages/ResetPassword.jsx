import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import LogPage from "../components/LogPage";
import "./ResetPassword.css";

const ResetPassword = () => {
  const {  id, token } = useParams();//extract the token from url
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  //   // Extract token and email from URL
  const query = new URLSearchParams(location.search);
    // const token = query.get("token");
  const email = query.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        password: newPassword,
        confirmPassword: confirmPassword,
        id,
        token,
      };
    try {
      const response = await fetch(
        `/api/auth/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();
        setError(errorData.error);

      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <LogPage
      logData={
        <div>
          <h1 className="reset-pass-title">Reset Password</h1>
          <form onSubmit={() => handleSubmit(e)} className="reset-password-form">
            <div className="input-container">
              <label htmlFor="password" className="input-label">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="new-password-input"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="confirmPassword" className="input-label">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="confirm-new-password-input"
                required
              />
            </div>
            <button
              type="submit"
              name="Reset Password"
              className="reset-password-button"
            >
              Reset Password
            </button>
            {message && <p className="success-message">{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      }
    />
  );
};

export default ResetPassword;
