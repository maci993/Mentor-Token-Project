import React, { useState } from "react";
import "./OfferJobModal.css";

const OfferJobModal = ({ mentorId, onClose }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState(null);
  const [skillsRequired, setSkillsRequired] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobTitle || !jobDescription) {
      alert("Please fill out all fields.");
      return;
    }
    const token = localStorage.getItem("jwt_token");

    console.log("mentorId:", mentorId);
    console.log("jobTitle:", jobTitle);
    console.log("jobDescription:", jobDescription);
    console.log("Authorization Header:", `Bearer ${token}`);
    try {
      const response = await fetch("http://localhost:10000/api/offer-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mentorId,
          jobTitle,
          jobDescription,
          skillsRequired,
          applicationType: "Direct", 
        }),
      });

      if (!response.ok) {
        throw new Error("Error offering job");
      }

      // handle success ( close modal, refresh data...
      setJobTitle("");
      setJobDescription("");
      onClose();
    } catch (error) {
      console.error("Error offering job:", error);
      setError("Failed to offer the job. Please try again.");
    }
  };

  return (
    <div className="offer-job-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <h2>OFFER JOB</h2>
        <p>Create and offer job to a mentor</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="jobTitle">Job Name</label>
          <input
            id="jobTitle"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter Job Title"
          />
          <label htmlFor="jobDescription">Short Description</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Write a short description about job offer"
          />
          <button className="send-job-offer" type="submit">
            Send Job Offer
          </button>
        </form>
        <button className="close-modal-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default OfferJobModal;
