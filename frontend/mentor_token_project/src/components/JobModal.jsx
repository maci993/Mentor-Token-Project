import React from "react";
import "./JobModal.css"
import defaultLogo from "../assets/userStartupAvatar.png"


// console.log("Job object:", job);
const JobModal = ({ isOpen, isClosed, job, onJobApplied }) => {
  // console.log('Is Modal Open:', isOpen);
  // console.log('Job:', job);
if (!isOpen || !job) return null;


const token = window.localStorage.getItem("jwt_token");
//  const mentorId = job?.mentorId.id; 
//     const companyId = job?.companyId._id;

const applyToJob = async (jobId) => {
    try {
      const res = await fetch("http://localhost:10000/api/jobapplications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: job._id,
         mentorId: job.mentor._id,
         companyId: job.company._id,
          applicationType: "mentorToCompany",
      }),
      });

      if (res.ok) {
        console.log("Applied to job successfully");
        onJobApplied(); 
        isClosed(); 
      } else {
        console.error("Error applying to job:", res.statusText);
      }
    } catch (error) {
      console.error("Error applying to job:", error.message);
    }
  };

const companyLogo = job.companyLogo || defaultLogo;

return (
    <div className="modal-pop-up">
<div className="modal-container">
<button className="close-button-job-modal" onClick={isClosed}>x</button>
<div className="modal-content">
<img src={companyLogo} alt="company-logo" className="company-logo-job-modal" />
<h2 className="company-name-job-modal">{job.name}</h2>
<h3 className="job-title-job-modal">{job.title || "No title"}</h3>
<p className="job-desc-job-modal">{job.description || "No description available"}</p>
<button className="apply-button-job-modal" onClick={() => applyToJob(job?._id)}>Apply</button>
</div>
</div>
    </div>
);
};

export default JobModal;