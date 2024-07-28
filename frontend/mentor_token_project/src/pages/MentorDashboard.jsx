import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./MentorDashboard.css";
import SearchBar from "../components/SearchBar";
import AssignedJobs from "../components/AssignedJobs";
import UserDropdownInfo from "../components/UserDropdownInfo";
import Kirra from "../assets/KirraPress.png";
import PendingJobs from "../components/PendingJobs";
import ApplicationSent from "../components/ApplicationSent";
import SideBar from "../components/SideBar";

const MentorDashboard = () => {
  const pendingJobs = [
    { title: "Revenue per rate" },
    { title: "ARPU (Average revenue per use)" },
    { title: "CAC (Custom Acquisition Cost)" },
  ];

  const applications = [
    { title: "Revenue per rate" },
    { title: "ARPU (Average revenue per use)" },
    { title: "CAC (Custom Acquisition Cost)" },
  ];

  const [role, setRole] = useState(null);

  useEffect(() => {
    const myToken = jwtDecode(localStorage.getItem("jwt_token"));
    console.log("Retrieved role:", myToken.type); 
    setRole(myToken.type);
  }, []);

  if (!role) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="mentor-dashboard-page">
      <header className="dashboard-header">
        <div className="test">
      <SearchBar placeholder="Search" className="search-bar-mentor-dashboard" style={{ marginLeft: 250}}/>
        <UserDropdownInfo
          userImg={Kirra}
          userName="Kirra Press"
          userTitle="Mentor"
          className="dropdown-mentor-dashboard"
        />
        </div>
      </header>
      
      <div className="dashboard-content">
        <div className="left-section">
          <div className="sidebar-mentor-dashboard">
        <SideBar role={role} />
        </div>
        <div className="assigned-jobs-mentor-dashboard">
          <AssignedJobs />
          </div>
        </div>
        <div className="right-section">
          <PendingJobs
            title="Pending Jobs"
            description="Jobs offered from your startup"
            jobs={pendingJobs}
        
          />
          <ApplicationSent 
          title="Applications sent"
          description="Jobs you have applied to"
          applications={applications}/>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
