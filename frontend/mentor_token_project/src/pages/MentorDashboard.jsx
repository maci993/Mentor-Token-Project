import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./MentorDashboard.css";
import SearchBar from "../components/SearchBar";
import AssignedJobs from "../components/AssignedJobs";
import UserDropdownInfo from "../components/UserDropdownInfo";
import PendingJobs from "../components/PendingJobs";
import ApplicationSent from "../components/ApplicationSent";
import SideBar from "../components/SideBar";
import defaultLogo from "../assets/Mentors-icons/profile.svg"

const MentorDashboard = () => {
  // const pendingJobs = [
  //   { title: "Revenue per rate" },
  //   { title: "ARPU (Average revenue per use)" },
  //   { title: "CAC (Custom Acquisition Cost)" },
  // ];

  // const applications = [
  //   { title: "Revenue per rate" },
  //   { title: "ARPU (Average revenue per use)" },
  //   { title: "CAC (Custom Acquisition Cost)" },
  // ];

  const [role, setRole] = useState(null);
  const [applications, setApplications] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "User",
    title: "Mentor",
    image: defaultLogo,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    const myToken = jwtDecode(localStorage.getItem("jwt_token"));
    console.log("Retrieved role:", myToken.type); 
    setRole(myToken.type);

    fetchUserInfo();
    fetchJobApplications();
  }, [token, refreshTrigger]);

  const fetchUserInfo = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const res = await fetch(`http://localhost:10000/api/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const userData = await res.json();
        setUserInfo({
          name: userData.name || "User",
          title: userData.title || "Mentor",
          image: userData.image || defaultLogo,
        });
      } else {
        console.error("Error fetching user info:", res.statusText);
        setError(res.statusText);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setError(error.message);
    }
  };

  
  const fetchJobApplications = async () => {
    try {
      const res = await fetch("http://localhost:10000/api/jobapplications", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const applicationsData = await res.json();
        console.log("Fetched applications:", applicationsData);
        setApplications(applicationsData);
      } else {
        console.error("Error fetching job applications:", res.statusText);
        setError(res.statusText);
      }
    } catch (error) {
      console.error("Error fetching job applications:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJobApplied = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  if (!role) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="mentor-dashboard-page">
      <header className="dashboard-header">
        <div className="test">
      <SearchBar placeholder="Search" className="search-bar-mentor-dashboard" style={{ marginLeft: 250}}/>
        <UserDropdownInfo
          userImg={userInfo.image}
          userName={userInfo.name}
          userTitle={userInfo.title}
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
            jobs={applications}
            onJobApplied={handleJobApplied}
          />
          <ApplicationSent 
          title="Applications sent"
          description="Jobs you have applied to"
          applications={applications}
          refreshTrigger={refreshTrigger} />
       
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
