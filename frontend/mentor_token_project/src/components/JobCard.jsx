import React from "react";
import "./JobCard.css";

const JobCard = ({ job }) => {
  const companyNameParts = job.companyName.split(" ");
  const firstPart = companyNameParts.slice(0, -1).join(" ");
  const secondPart = companyNameParts.slice(-1);

  return (
    <div className="job-card">
      <img src={job.companyLogo} alt="company-logo" className="company-logo" />
      <h3 className="company-name">
        {firstPart}
        <br />
        {secondPart}
      </h3>
      <h4>{job.jobTitle}</h4>
      <p>{job.description}</p>
      <button className="view-more-button">View More</button>
    </div>
  );
};

export default JobCard;
