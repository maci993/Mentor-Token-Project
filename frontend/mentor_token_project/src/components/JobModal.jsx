import React from "react";
import "./JobModal.css"

const JobModal = ({ isOpen, isClosed, job}) => {
if (!isOpen || !job) return null;

return (
    <div className="modal-pop-up">
<div className="modal-container">
<button className="close-button-job-modal" onClick={isClosed}>x</button>
<div className="modal-content">
<img src={job.companyLogo} alt="company-logo" className="company-logo-job-modal" />
<h2 className="company-name-job-modal">{job.companyName}</h2>
<h3 className="job-title-job-modal">{job.title}</h3>
<p className="job-desc-job-modal">{job.description}</p>
<button className="apply-button-job-modal">Apply</button>
</div>
</div>
    </div>
);
};

export default JobModal;