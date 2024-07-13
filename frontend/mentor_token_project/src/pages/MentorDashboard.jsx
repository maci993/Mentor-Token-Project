import React from "react";
import "./MentorDashboard.css";
import SearchBar from "../components/SearchBar";
import AssignedJobs from "../components/AssignedJobs";
import UserDropdownInfo from "../components/UserDropdownInfo";
import Kirra from "../assets/KirraPress.png";
import PendingJobs from "../components/PendingJobs";
// import ApplicationSent from "../components/ApplicationSent";

const MentorDashboard = () => {
  const pendingJobs = [
    { title: "Revenue per rate" },
    { title: "ARPU (Average revenue per use)" },
    { title: "CAC (Custom Acquisition Cost)" },
  ];

  // const applications = [
  //   { title: "Revenue per rate" },
  //   { title: "ARPU (Average revenue per use)" },
  //   { title: "CAC (Custom Acquisition Cost)" },
  // ];

  return (
    <div className="mentor-dashboard-page">
      <header className="dashboard-header">
        <UserDropdownInfo
          userImg={Kirra}
          userName="Kirra Press"
          userTitle="Mentor"
          className="dropdown-mentor-dashboard"
        />
      </header>
      <SearchBar placeholder="Search" />
      <div className="dashboard-content">
        <div className="left-section">
          <AssignedJobs />
        </div>
        <div className="right-section">
          <PendingJobs
            title="Pending Jobs"
            description="Jobs offered from your startup"
            jobs={pendingJobs}
          />
          {/* <ApplicationSent 
          title="Applications sent"
          description="Jobs you have applied to"
          applications={applications}/> */}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
