import React from "react";
import "./QuickOverviewCard.css";

const QuickOverviewCard = ({
  role,
  totalJobs,
  totalMentors,
  totalAssignedJobs,
  appliedJobs,
  finishedJobs,
}) => {
  // console.log("QuickOverviewCard Props:", {
  //   role,
  //   totalJobs,
  //   totalMentors,
  //   totalAssignedJobs,
  //   appliedJobs,
  //   finishedJobs,
  // });

  return (
    <div className="quick-overview-card">
      {role === "mentor" && (
        <>
          <div className="overview-item">
            <p>Total Jobs</p>
            <h3>{totalJobs}</h3>
          </div>
          <div className="overview-item">
            <p>Total Assigned Jobs</p>
            <h3>{totalAssignedJobs}</h3>
          </div>
          <div className="overview-item">
            <p>Jobs That You Have Applied</p>
            <h3>{appliedJobs}</h3>
          </div>
          <div className="overview-item">
            <p>Finished Jobs</p>
            <h3>{finishedJobs}</h3>
          </div>
        </>
      )}
      {role === "startup" && (
        <>
          <div className="overview-item">
            <p>Total Mentors</p>
            <h3>{totalMentors}</h3>
          </div>
          <div className="overview-item">
            <p>Total Assigned Jobs</p>
            <h3>{totalAssignedJobs}</h3>
          </div>
          <div className="overview-item">
            <p>Finished Jobs</p>
            <h3>{finishedJobs}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default QuickOverviewCard;
