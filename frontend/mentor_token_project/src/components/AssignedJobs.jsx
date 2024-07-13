import React, { useState } from "react";
import "./AssignedJobs.css";

const jobsData = [
  { name: "Revenue per rate", status: "Done" },
  { name: "ARPU (Average revenue per use)", status: "Rejected" },
  { name: "CAC (Custom Acquisition Cost)", status: "In Progress" },
  { name: "Churn Rate", status: "Done" },
  { name: "Burn Rate", status: "In Progress" },
  { name: "Operation Efficiency", status: "Done" },
  { name: "Burn Rate", status: "In Progress" },
  { name: "Operation Efficiency", status: "Done" },
  { name: "Burn Rate", status: "In Progress" },
  { name: "Operation Efficiency", status: "Done" },
];

const AssignedJobs = () => {
  const [filter, setFilter] = useState("All");

  const filteredJobs = jobsData.filter((job) => {
    if (filter === "All") return true;
    return job.status === filter;
  });

  const getStatus = (status) => {
    switch (status) {
      case "Done":
        return "done";
      case "Rejected":
        return "rejected";
      case "In Progress":
        return "in-progress";
      default:
        return "";
    }
  };

  return (
    <div className="assigned-jobs-container">
      <h1>Assigned Jobs</h1>
      <div className="filter-tabs">
        {["All", "Done", "Rejected", "In Progress"].map((tab) => (
          <button
            key={tab}
            className={`filter-tab ${filter === tab ? 'active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="job-list">
        {filteredJobs.map((job, index) => (
          <div key={index} className="job-item">
            <span className="job-name">{job.name}</span>
            <span className={`status-button ${getStatus(job.status)}`}>
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedJobs;
