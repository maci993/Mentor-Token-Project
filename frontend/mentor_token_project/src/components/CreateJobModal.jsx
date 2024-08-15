import React, { useState } from "react";
import "./JobModal.css";

const CreateJobModal = ({ isOpen, isClosed }) => {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    description: "",
    skillsRequired: "",
    status: "Open",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = window.localStorage.getItem("jwt_token");
      const res = await fetch("http://localhost:10000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: jobDetails.jobTitle, 
          description: jobDetails.description,
          skillsRequired: jobDetails.skillsRequired.split(',').map(skill => skill.trim()), // Ensure skills are sent as an array
          status: jobDetails.status,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Job created:", data);
        alert("Job is created!"); 
        isClosed();
      } else {
        console.error("Error creating job:", res.statusText);
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-pop-up">
      <div className="modal-container">
        <button className="close-button-job-modal" onClick={isClosed}>
          ×
        </button>
        <form className="create-job-form" onSubmit={handleSubmit}>
          <h2>Create New Job</h2>
          <label>
            Job Title:
            <input
           type="text"
           name="jobTitle"
           value={jobDetails.title}
           onChange={handleChange}
           required
            />
          </label>
  <label>
            Description:
            <textarea
              name="description"
              value={jobDetails.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Skills required:
            <textarea
            className="skills-textarea"
              name="skillsRequired"
              value={jobDetails.skillsRequired}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Job Status:
            <select
              name="status"
              value={jobDetails.status}
              onChange={handleChange}
              required
            >
              <option value="Open" className="options">Open</option>
              <option value="Direct" className="options">Direct</option>
            </select>
          </label>
          <button type="submit" className="submit-button-create-job-modal">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
