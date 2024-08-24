import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import UserDropDown from "../components/UserDropdownInfo";
import UserInfoCard from "../components/UserInfoCard";
import UserAboutCard from "../components/UserAboutCard";
import Statistics from "../components/Statistics";
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
  const [data, setData] = useState({
    totalJobs: 0,
    totalAssignedJobs: 0,
    appliedJobs: 0,
    finishedJobs: 0,
  });

  // const [mentors, setMentors] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        //fetch statistics
        const statisticsResponse = await fetch(
          "http://localhost:10000/api/jobs",
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
        setDataPoints(statisticsData.dataPoints || []);

        // Fetch quick overview data
        const overviewResponse = await fetch(
          "http://localhost:10000/api/jobapplications",
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
        console.log("Overview Data:", overviewData);

        setData({
          totalJobs: overviewData.totalJobs || 0,
          totalAssignedJobs: overviewData.totalAssignedJobs || 0,
          appliedJobs: overviewData.appliedJobs || 0,
          finishedJobs: overviewData.finishedJobs || 0,
        });
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

  const handleSave = (newData) => {
    setDescription(newData.description);
    setSkills(newData.skills);
  };

  return (
    <div className="my-stats-container">
      <div className="sidebar-my-stats">
        <SideBar role={role} />
      </div>
      <div className="search-bar-my-stats">
        <SearchBar placeholder="Search" />
      </div>
      <div className="user-dropdown-menu-stats">
        <UserDropDown
          userImg={userInfo.image || defaultLogo}
          userName={userInfo.name}
          userTitle={userInfo.title || "Mentor"}
        />
      </div>
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
        <Statistics
          title="STATISTICS"
          description="Overall target accomplishment over the year"
          dataPoints={dataPoints}
        />
      </div>
      <div className="quick-overview-my-stats">
        <h2>Quick Overview</h2>
        <QuickOverviewCard
          totalJobs={data.totalJobs}
          totalAssignedJobs={data.totalAssignedJobs}
          appliedJobs={data.appliedJobs}
          finishedJobs={data.finishedJobs}
        />
        {/* {data ? (
          <QuickOverviewCard
            totalJobs={data.totalJobs}
            totalAssignedJobs={data.totalAssignedJobs}
            appliedJobs={data.appliedJobs}
            finishedJobs={data.finishedJobs}
          />
        ) : (
          <p>No data available</p>
        )} */}
      </div>
    </div>
  );
};

export default MyStats;
