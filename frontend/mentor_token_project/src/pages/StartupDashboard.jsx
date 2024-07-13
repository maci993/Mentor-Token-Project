import React from "react";
import SearchBar from "../components/SearchBar";
import "./StartupDashboard.css";
import AssignedJobs from "../components/AssignedJobs";
import UserDropdownInfo from "../components/UserDropdownInfo";
import BestPerformingMentors from "../components/BestPerformingMentors";
import Statistics from "../components/Statistics";
import UserCompany from "../assets/userStartupAvatar.png"
const StartupDashboard = () => {
  const dataPoints = [0, 20, 60, 70, 100, 110, 80, 40, 50, 30, 20];

  return (
    <div className="startup-dashboard-page">
      <header className="dashboard-header">
        <UserDropdownInfo 
        userImg={UserCompany}
        userName="TechWave"
        userTitle="Innovations"/>
      </header>
      <SearchBar placeholder="Search Mentor..." />
      <div className="dashboard-content">
      <div className="left-section">
          <AssignedJobs />
        </div>
        <div className="right-section">
          <BestPerformingMentors />
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
