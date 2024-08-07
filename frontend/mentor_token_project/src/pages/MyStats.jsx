import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import UserDropDown from "../components/UserDropdownInfo";
import UserInfoCard from "../components/UserInfoCard";
import Kirra from "../assets/KirraPress.png";
import UserAboutCard from "../components/UserAboutCard";
import Statistics from "../components/Statistics";
import QuickOverviewCard from "../components/QuickOverviewCard";
import "./MyStats.css";

const user = {
  image: Kirra,
  name: "Kierra Press",
  title: "Sales Representative",
  email: "mentormail@mail.com",
  phone: "+389 77 663 234",
};

const MyStats = () => {
  const [role, setRole] = useState(null);
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet consectetur. Suspendisse quis varius felis augue adipiscing. Sapien volutpat ac velit facilisis fermentum diam bibendum libero non. Semper morbi at congue pellentesque pharetra amet rhoncus elit quis. Lorem ipsum dolor sit amet consectetur. Suspendisse quis varius felis augue adipiscing. Sapien volutpat ac velit facilisis fermentum diam bibendum libero non. Semper morbi at congue pellentesque pharetra amet rhoncus elit quis. Lorem ipsum dolor sit amet consectetur. Suspendisse quis varius felis augue adipiscing. Sapien volutpat ac velit facilisis fermentum diam bibendum libero non. Semper morbi at congue pellentesque pharetra amet rhoncus elit quis."
  );
  const [skills, setSkills] = useState([
    "Sales",
    "Management",
    "Problem-solving",
  ]);
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
  const [mentors, setMentors] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const myToken = jwtDecode(localStorage.getItem("jwt_token"));
  //   console.log("Retrieved role:", myToken.type);
  //   setRole(myToken.type);
  // }, []);

  // if (!role) {
  //   return <div>Loading...</div>;
  // }

  // const handleSave = (newDescription) => {
  //   setDescription(newDescription);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        const myToken = jwtDecode(token);
        setRole(myToken.type);

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

        // const user = usersData.find((account) => account._id === myToken.id);
        // setUserInfo(user);

        //fetch for all mentors
        const usersResponse = await fetch("http://localhost:10000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!usersResponse.ok) {
          throw new Error("Error fetching users data");
        }
        const usersData = await usersResponse.json();

        const mentors = usersData.filter(
          (account) => account.type === "mentor"
        );
        setMentors(mentors);

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
          "http://localhost:10000/api/jobs",
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
        setData(overviewData);
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
          userImg={Kirra}
          userName="Kirra Press"
          userTitle="Mentor"
        />
      </div>
      <h1>My stats</h1>
      <div className="user-info-card-my-stats">
        {mentors.map((mentor) => (
          <div key={mentor._id}>
            <UserInfoCard
              image={mentor.image}
              name={mentor.name}
              title={mentor.title}
              email={mentor.email}
              phone={mentor.phone}
            />
            <UserAboutCard
              about="About"
              skills={skills}
              description={description}
              onSave={handleSave}
            />
          </div>
        ))}

        {/* <UserInfoCard
        image={user.image}
        name={user.name}
        title={user.title}
        email={user.email}
        phone={user.phone}
      /> */}
      </div>
      {/* <div className="user-about-card-my-stats"></div> */}
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
      </div>
    </div>
  );
};

export default MyStats;
