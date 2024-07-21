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
  const dataPoints = [0, 20, 60, 70, 100, 110, 80, 40, 50, 30, 20];

  const data = {
    totalJobs: 132,
    totalAssignedJobs: 43,
    appliedJobs: 21,
    finishedJobs: 63,
  };

  useEffect(() => {
    const myToken = jwtDecode(localStorage.getItem("jwt_token"));
    console.log("Retrieved role:", myToken.type);
    setRole(myToken.type);
  }, []);

  if (!role) {
    return <div>Loading...</div>;
  }

  const handleSave = (newDescription) => {
    setDescription(newDescription);
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
        <UserInfoCard
          image={user.image}
          name={user.name}
          title={user.title}
          email={user.email}
          phone={user.phone}
        />
      </div>
      <div className="user-about-card-my-stats">
        <UserAboutCard
          about="About"
          skills={["Sales", "Management", "Problem-solving"]}
          description={description}
          onSave={handleSave}
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
      </div>
    </div>
  );
};

export default MyStats;
