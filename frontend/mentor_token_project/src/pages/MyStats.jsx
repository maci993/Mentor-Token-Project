import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import UserDropDown from "../components/UserDropdownInfo";
import UserInfoCard from "../components/UserInfoCard";
import UserAboutCard from "../components/UserAboutCard";
// import Statistics from "../components/Statistics";
import StatisticsChart from "../components/StatisticsChart";
import QuickOverviewCard from "../components/QuickOverviewCard";
import defaultLogo from "../assets/Mentors-icons/profile.svg";
import "./MyStats.css";

// const user = {
//   image: Kirra,
//   name: "Kierra Press",
//   title: "Sales Representative",
//   email: "mentormail@mail.com",
//   phone: "+389 77 663 234",
// };

const MyStats = () => {
  const [role, setRole] = useState(null);
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  // const dataPoints = [0, 20, 60, 70, 100, 110, 80, 40, 50, 30, 20];

  // const data = {
  //   totalJobs: 132,
  //   totalAssignedJobs: 43,
  //   appliedJobs: 21,
  //   finishedJobs: 63,
  // };
  const [dataPoints, setDataPoints] = useState([]);
  const [overviewData, setOverviewData] = useState({
    totalJobs: 0,
    // totalMentors: 0,
    totalAssignedJobs: 0,
    appliedJobs: 0,
    finishedJobs: 0,
  });
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        const myToken = jwtDecode(token);
        setRole(myToken.type);

        console.log(myToken.id);

        //this is fetch for user informations
        const userResponse = await fetch(
          `http://localhost:10000/api/users/${myToken.id}`,

          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error("Error fetching data");
        }
        const userData = await userResponse.json();
        setUserInfo(userData);
        setDescription(userData.desc || "");
        setSkills(userData.skills || []);

        //fetch quick overview data
        const overviewResponse = await fetch(
          "http://localhost:10000/api/overview-stats",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!overviewResponse.ok) {
          throw new Error("Error fetching overview data");
        }
        const overviewData = await overviewResponse.json();
        setOverviewData(overviewData);

        //fetch statistics
        const statisticsResponse = await fetch(
          `http://localhost:10000/api/statistics/${myToken.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!statisticsResponse.ok) {
          throw new Error("Error fetching statistics data");
        }
        const statisticsData = await statisticsResponse.json();
        setDataPoints(statisticsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userInfo) {
    return <div>No user info available</div>;
  }

  // if (!overviewData || overviewData.totalJobs === 0) {
  //   return <div>No statistics available for this user this year.</div>;
  // }

  const handleSave = (newData) => {
    setDescription(newData.description);
    setSkills(newData.skills);
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

  return (
    <div className="my-stats-container">
      <div className="sidebar-my-stats">
        <SideBar role={role} />
      </div>
      <div className="search-bar-my-stats">
        <SearchBar
          placeholder="Search"
          className="search-bar-my-stats"
          onSearch={handleSearch}
        />
      </div>
      <div className="user-dropdown-menu-stats">
        <UserDropDown
          userImg={userInfo.image || defaultLogo}
          userName={userInfo.name}
          userTitle={userInfo.title || "Mentor"}
          className="user-dropdown-my-stats"
        />
      </div>
      {searchResults.length > 0 ? (
        <div className="search-results-section-mentor-dash">
          <h2 className="search-result-title-mentor-dash">Search Results</h2>
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
        <div>
          <h1>My stats</h1>
          <div className="user-info-card-my-stats">
            <UserInfoCard
              image={userInfo.image}
              name={userInfo.name}
              title={userInfo.title}
              email={userInfo.email}
              phone={userInfo.phone}
            />
            <UserAboutCard
              about="About"
              skills={skills}
              description={description}
              onSave={handleSave}
              role={role}
            />
          </div>
          <h1 className="performance-over-time">Performance Over Time</h1>
          <div className="statistics-my-stats">
            <StatisticsChart
              title="STATISTICS"
              description="Overall target accomplishment over the year"
              dataPoints={dataPoints}
            />
          </div>
          <div className="quick-overview-my-stats">
            <h2>Quick Overview</h2>
            <QuickOverviewCard
              className="quick-overview-my-stats"
              role={role}
              totalJobs={overviewData.totalJobs}
              // totalMentors={overviewData.totalMentors}
              totalAssignedJobs={overviewData.totalAssignedJobs}
              appliedJobs={overviewData.appliedJobs}
              finishedJobs={overviewData.finishedJobs}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStats;
