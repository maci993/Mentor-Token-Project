import React from "react";
import "./QuickOverviewCard.css";

const QuickOverviewCard = ({
  totalJobs,
  totalMentors,
  totalAssignedJobs,
  appliedJobs,
  finishedJobs,
}) => {
  return (
    <div className="quick-overview-card">
      {totalJobs !== undefined && (
      <div className="overview-item">
        <p>Total Jobs</p>
        <h3>{totalJobs}</h3>
      </div>
      )}
      {totalMentors !== undefined && (
      <div className="overview-item">
        <p>Total Mentors</p>
        <h3>{totalMentors}</h3>
      </div>
      )}
      {totalAssignedJobs !== undefined && (
      <div className="overview-item">
        <p>Total Assigned Jobs</p>
        <h3>{totalAssignedJobs}</h3>
      </div>
      )}
      {appliedJobs !== undefined && (
      <div className="overview-item">
        <p>Jobs That You Have Applied</p>
        <h3>{appliedJobs}</h3>
      </div>
      )}
      {finishedJobs !== undefined && (
      <div className="overview-item finished-jobs">
        <p>Finished Jobs</p>
        <h3>{finishedJobs}</h3>
      </div>
      )}
    </div>
  );
};

export default QuickOverviewCard;
