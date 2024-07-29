import React, { useState } from "react";
import "./JobModal.css";

const CreateJobModal = ({ isOpen, isClosed }) => {
  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    jobTitle: "",
    description: "",
    category: "",
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
        body: JSON.stringify(jobDetails),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Job created:", data);
        onClose();
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
            Company Name:
            <input
              type="text"
              name="CompanyName"
              value={jobDetails.companyName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Job Title:
            <input
              type="text"
              name="jobTitle"
              value={jobDetails.jobTitle}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            {" "}
            Description:
            <textarea
              name="description"
              value={jobDetails.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={jobDetails.category}
              onChange={handleChange}
              required
            />
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
