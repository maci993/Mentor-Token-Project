import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SearchBar from "../components/SearchBar";
import AssignedJobs from "../components/AssignedJobs";
import UserDropdownInfo from "../components/UserDropdownInfo";
import PendingJobs from "../components/PendingJobs";
import ApplicationSent from "../components/ApplicationSent";
import SideBar from "../components/SideBar";
import defaultLogo from "../assets/Mentors-icons/profile.svg";
import "./MentorDashboard.css";

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
  const [mentors, setMentors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    // const myToken = jwtDecode(localStorage.getItem("jwt_token"));
    // console.log("Retrieved role:", myToken.type);
    // setRole(myToken.type);

    // fetchUserInfo();
    // fetchJobs();
    // fetchJobApplications();
    if (!token || typeof token !== "string") {
      console.error("Invalid token:", token);
      return;
    }

    try {
      const myToken = jwtDecode(token);
      console.log("Retrieved role:", myToken.type);
      setRole(myToken.type);

      // Fetch data once the token is valid
      fetchUserInfo();
      fetchJobs();
      fetchJobApplications();
    } catch (error) {
      console.error("Error decoding token:", error);
      setError("Invalid token.");
    }
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

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:10000/api/jobs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const jobsData = await res.json();
        setJobs(jobsData);
      } else {
        console.error("Error fetching jobs:", res.statusText);
        setError(res.statusText);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError(error.message);
    }
  };

  const handleJobApplied = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();

    const filteredMentors = mentors.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(lowercasedQuery) ||
        mentor.skills.some((skill) =>
          skill.toLowerCase().includes(lowercasedQuery)
        ) ||
        (mentor.desc && mentor.desc.toLowerCase().includes(lowercasedQuery))
    );
    const filteredJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lowercasedQuery) ||
        job.description.toLowerCase().includes(lowercasedQuery) ||
        job.skillsRequired.some((skill) =>
          skill.toLowerCase().includes(lowercasedQuery)
        )
    );
    const filteredCompanies = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(lowercasedQuery) ||
        (company.description &&
          company.description.toLowerCase().includes(lowercasedQuery))
    );

    setSearchResults([
      ...filteredMentors.map((mentor) => ({ type: "mentor", data: mentor })),
      ...filteredJobs.map((job) => ({ type: "job", data: job })),
      ...filteredCompanies.map((company) => ({
        type: "company",
        data: company,
      })),
    ]);
  };

  if (!role) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mentor-dashboard-page">
      <header className="dashboard-header">
        <div className="test">
          <SearchBar
            placeholder="Search"
            className="search-bar-mentor-dashboard"
            style={{ marginLeft: 250 }}
            onSearch={handleSearch}
          />
          <UserDropdownInfo
            userImg={userInfo.image}
            userName={userInfo.name}
            userTitle={userInfo.title}
            className="dropdown-mentor-dashboard"
          />
        </div>
      </header>
      {searchResults.length > 0 ? (
        <div className="search-results-section-mentor-dash">
          <h2 className="search-result-title-mentor">Search Results</h2>
          {searchResults.map((result, index) => (
            <div key={index} className="search-result-item">
              {result.type === "mentor" && (
                <div className="mentor-result">
                  <img src={result.data.image || defaultLogo} alt="mentor" />
                  <div>
                    <h3>{result.data.name}</h3>
                    <p>{result.data.title}</p>
                  </div>
                </div>
              )}
              {result.type === "job" && (
                <div className="job-result">
                  <h3>{result.data.title}</h3>
                  <p>{result.data.description}</p>
                </div>
              )}
              {result.type === "company" && (
                <div className="company-result">
                  <h3>{result.data.name}</h3>
                  <p>{result.data.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="dashboard-content">
          <div className="left-section">
            <div className="sidebar-mentor-dashboard">
              <SideBar role={role} />
            </div>
            <div className="assigned-jobs-mentor-dashboard">
              <AssignedJobs
                jobs={applications.filter((app) => app.status === "assigned")}
              />
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
              refreshTrigger={refreshTrigger}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
