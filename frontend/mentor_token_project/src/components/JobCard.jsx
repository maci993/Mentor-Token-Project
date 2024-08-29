import React from "react";
import "./JobCard.css";
import defaultLogo from "../assets/userStartupAvatar.png";

const JobCard = ({ job, onCardClick }) => {
  // console.log("Rendering job:", job);

  if (!job) {
    return <div className="job-card">Invalid job data</div>;
  }

  const companyLogo = job.companyLogo || defaultLogo;
  const companyName = job.companyId?.name || "Unknown Company";
  const jobDescription = job.description || "No description available";
  const jobSkills = job.skillsRequired ? job.skillsRequired.join(", ") : "No skills listed";
  const jobStatus = job.status || "Status not available";
  console.log("Job object:", job);
  // const companyNameParts = job.companyName.split(" ");
  // const firstPart = companyNameParts.slice(0, -1).join(" ");
  // const secondPart = companyNameParts.slice(-1);

  return (
    <div className="job-card" onClick={() => onCardClick(job)}>
      <img src={companyLogo} alt="company-logo" className="company-logo" />
      <h3 className="company-name">{companyName}</h3>
      <h4>{job.title}</h4>
      <p>{jobDescription}</p>
      <p>{jobSkills}</p>
      <p>{jobStatus}</p>

      <button className="view-more-button" onClick={() => onCardClick(job)}>View More</button>
    </div>
  );
};

export default JobCard;
