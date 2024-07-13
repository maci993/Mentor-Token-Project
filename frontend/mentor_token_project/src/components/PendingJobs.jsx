import React from "react";
import PropTypes from "prop-types";
import "./PendingJobs.css";

const PendingJobs = ({ title, description, jobs }) => {
  return (
    <div className="pending-jobs">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="job-list-mentor-dashboard">
        {jobs.map((job, index) => (
          <div key={index} className="job-item-mentor-dashboard">
            <span className="job-title-mentor-dashboard">{job.title}</span>
            <div className="job-action-mentor-dashboard">
              <button className="accept-button">Accept</button>
              <button className="reject-button">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PendingJobs.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    jobs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default PendingJobs;
