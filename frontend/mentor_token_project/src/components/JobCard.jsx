import React from "react";
import "./JobCard.css";

const JobCard = ({ job, onCardClick }) => {
  console.log("Rendering job:", job);
  
  if (!job) {
    return <div className="job-card">Invalid job data</div>;
  }

  // const companyNameParts = job.companyName.split(" ");
  // const firstPart = companyNameParts.slice(0, -1).join(" ");
  // const secondPart = companyNameParts.slice(-1);

  return (
    <div className="job-card" onClick={() => onCardClick(job)}>
      <img src={job.companyLogo} alt="company-logo" className="company-logo" />
      <h3 className="company-name">
    {job.companyName}
      </h3>
      <h4>{job.title}</h4>
      <p>{job.description}</p>
      <p>{job.skills}</p>
      <p>{job.status}</p>
      <button className="view-more-button">View More</button>
    </div>
  );
};

export default JobCard;
