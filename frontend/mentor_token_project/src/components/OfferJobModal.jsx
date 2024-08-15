import React, { useState } from "react";
import "./OfferJobModal.css";

const OfferJobModal = ({ mentorId, onClose }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt_token");

    try {
      const response = await fetch("http://localhost:10000/api/jobs/offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mentorId, jobTitle, jobDescription }),
      });

      if (!response.ok) {
        throw new Error("Error offering job");
      }

      // handle success (e.g., close modal, refresh data, etc.)
      onClose();
    } catch (error) {
      console.error("Error offering job:", error);
    }
  };

  return (
    <div className="offer-job-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <h2>OFFER JOB</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="jobTitle">Job Title</label>
          <input
            id="jobTitle"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Expansion Manager - Upsell and Cross-Sell"
          />
          <label htmlFor="jobDescription">Short Description</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Write a short description about job offering"
          />
          <button type="submit">Send Job Offer</button>
        </form>
        <button className="close-modal" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default OfferJobModal;