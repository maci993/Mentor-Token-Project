import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SearchBar from "../components/SearchBar";
import "./StartupDashboard.css";
import AssignedJobs from "../components/AssignedJobs";
import UserDropdownInfo from "../components/UserDropdownInfo";
import BestPerformingMentors from "../components/BestPerformingMentors";
import Statistics from "../components/Statistics";
import UserCompany from "../assets/userStartupAvatar.png";
import SideBar from "../components/SideBar";

const StartupDashboard = () => {
  const dataPoints = [0, 20, 60, 70, 100, 110, 80, 40, 50, 30, 20];

  const [role, setRole] = useState(null);

  useEffect(() => {
    const myToken = jwtDecode(localStorage.getItem("jwt_token"));
    console.log("Retrieved role:", myToken.type);
    setRole(myToken.type);
  }, []);

  return (
    <div className="startup-dashboard-page">
      <header className="dashboard-header">
        <UserDropdownInfo
          userImg={UserCompany}
          userName="TechWave"
          userTitle="Innovations"
          className="drop-down-startup-dash"
        />
      </header>
      <SearchBar
        placeholder="Search Mentor..."
        className="search-bar-startup-dash"
      />
      <div className="dashboard-content">
        <div className="left-section">
          <div className="sidebar-startup-dashboard">
            <SideBar role={role} />
          </div>
          <div className="assigned-jobs-startup-dashboard">
            <AssignedJobs />
          </div>
        </div>
        <div className="right-section">
          <BestPerformingMentors className="best-performing-mentors-startup-dash" />
          <p className="overall-statistics-title">OVERALL STATISTICS</p>
          <Statistics
            title="STATISTICS"
            description="Overall target accomplishment over the year"
            dataPoints={dataPoints}
          />
        </div>
      </div>
    </div>
  );
};

export default StartupDashboard;
