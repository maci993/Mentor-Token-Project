import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import defaultLogo from "../assets/userStartupAvatar.png";
import "./JobModal.css";

// console.log("Job object:", job);
const JobModal = ({ isOpen, isClosed, job, onJobApplied }) => {
  const [selectedJob, setSelectedJob] = useState({});
  const token = localStorage.getItem("jwt_token");

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const userRole = decodedToken.type;

  useEffect(() => {
    if (job) {
      setSelectedJob(job);
    }
  }, [job]);

  const handleApplyToJob = async () => {
    // if (!selectedJob.companyId || !selectedJob.companyId._id) {
    //   console.error("Missing company ID. Cannot apply to job.");
    //   alert("Unable to apply: missing company information.");
    //   return;
    // }
    const payload = {
      companyId: selectedJob.companyId._id,
      mentorId: userId,
      jobId: selectedJob._id,
      applicationType: "mentorToCompany",
      status: "pending",
      acceptedStatus: "in progress",
    };
    // console.log("Payload sent:", payload);
    try {
      const postApplication = await fetch(
        "http://localhost:10000/api/jobapplications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (postApplication.ok) {
        const errorData = await postApplication.json();
        alert("Applied to job successfully");
        onJobApplied(data);
        isClosed();
      } else {
        const errorText = await postApplication.text();
        console.error(
          "Error applying to job:",
          postApplication.statusText,
          errorText
        );
      }
    } catch (error) {
      console.error("An error occurred during the job application:", error);
    }
  };

  const companyLogo = selectedJob.companyLogo || defaultLogo;
  const companyName =
    (selectedJob.companyId && selectedJob.companyId.name) || "Unknown Company";

  if (!isOpen || !selectedJob._id) return null;

  return (
    <div className="modal-pop-up">
      <div className="modal-container">
        <button className="close-button-job-modal" onClick={isClosed}>
          x
        </button>
        <img
          src={companyLogo}
          alt="company-logo"
          className="company-logo-job-modal"
        />
        <h2 className="company-name-job-modal">{companyName}</h2>
        <h3 className="job-title-job-modal">
          {selectedJob.title || "No title"}
        </h3>
        <p className="job-desc-job-modal">
          {selectedJob.description || "No description available"}
        </p>
        <p className="skills-job-modal">
          {selectedJob.skillsRequired || "No skills available"}
        </p>
        {userRole === "mentor" && (
          <button className="apply-button-job-modal" onClick={handleApplyToJob}>
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobModal;
