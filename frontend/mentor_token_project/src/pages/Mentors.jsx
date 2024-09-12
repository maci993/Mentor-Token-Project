import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import UserDropdownInfo from "../components/UserDropdownInfo";
import UserCompany from "../assets/userStartupAvatar.png";
import MentorsList from "../components/MentorsList";
import Kirra from "../assets/KirraPress.png";
import Alison from "../assets/company-view-mentors/Alison.svg";
import Marcus from "../assets/company-view-mentors/Marcus.svg";
import QuickOverviewCard from "../components/QuickOverviewCard";
import { MentorCard } from "../components/MentorCard";
import defaultLogo from "../assets/userStartupAvatar.png"
import "./Mentors.css";

const Mentors = () => {
  const token = window.localStorage.getItem("jwt_token");
  const [role, setRole] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overviewData, setOverviewData] = useState({
    totalMentors: 0,
    totalAssignedJobs: 0,
    finishedJobs: 0,
  });
  const [userInfo, setUserInfo] = useState({
    name: "User",
    title: "Title",
    image: defaultLogo
  });
  // const [data, setData] = useState({
  //   totalMentors: 5,
  //   totalAssignedJobs: 3,
  //   finishedJobs: 2,
  // });

  // const data = {
  //   totalMentors: mentors.length,
  //   totalAssignedJobs: 0,
  //   finishedJobs: 0,
  // };

  const navigate = useNavigate();

  // const mentors = [
  //   {
  //     id: "1",
  //     image: Kirra,
  //     name: "Kierra Press",
  //     rating: 3.4,
  //     reviews: 56,
  //     skills: ["Sales", "Management", "Problem-solving"],
  //     description:
  //       "Field sales training. 5+ years in an outside sales position",
  //   },
  //   {
  //     id: "2",
  //     image: Alison,
  //     name: "Alison Vetrov",
  //     rating: 4.2,
  //     reviews: 82,
  //     skills: ["Sales", "Management", "Problem-solving"],
  //     description:
  //       "The sales representative position is an OIR based sales role with uncapped...",
  //   },
  //   {
  //     id: "3",
  //     image: Marcus,
  //     name: "Marcus Carder",
  //     rating: 3.8,
  //     reviews: 34,
  //     skills: ["Lidership", "Management", "Product sales"],
  //     description:
  //       "Field sales training. 5+ years in an outside sales position",
  //   },
  // ];

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        const myToken = jwtDecode(token);
        setRole(myToken.type);

        const response = await fetch("/api/users?type=mentor", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch mentors");
        }

        const mentorsData = await response.json();

        const sortedMentors = mentorsData
          .map((mentor) => {
            const completedJobs = mentor.acceptedJobs.filter(
              (job) => job.status === "Completed"
            ).length;

            return {
              ...mentor,
              completedJobs,
            };
          })
          .sort((a, b) => b.completedJobs - a.completedJobs); 

        setMentors(sortedMentors);
        setSearchResults(mentorsData);

        const statsResponse = await fetch("/api/overview-stats-mentors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
        });

        if (!statsResponse.ok) {
          throw new Error("Failed to fetch mentor statistics");
        }

        const statsData = await statsResponse.json();
        // console.log("DATA FRON QUICK OVERVIEW", statsData);
        setOverviewData(statsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

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

    fetchMentors();
    fetchUserInfo();
  }, []);

  const handleViewMentor = (id) => {
    navigate(`/mentors/${id}`);
  };

  if (!role) {
    return <div>Loading...</div>;
  }

  const handleSearch = (query) => {
    console.log("Search query:", query);
    const lowercasedQuery = query.toLowerCase();

    const filteredMentors = mentors.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(lowercasedQuery) ||
        mentor.skills.some((skill) =>
          skill.toLowerCase().includes(lowercasedQuery)
        ) ||
        (mentor.desc && mentor.desc.toLowerCase().includes(lowercasedQuery))
    );
    console.log("Filtered mentors:", filteredMentors);
    setSearchResults(filteredMentors);
  };

  return (
    <div className="mentors-company-view-page">
      <header className="mentors-company-view">
        <div className="search-bar-and-dropdown">
          <SearchBar
            placeholder="Search"
            className="search-bar-company-view"
            onSearch={handleSearch}
            style={{ marginLeft: 100 }}
          />
          <UserDropdownInfo
           userImg={userInfo.image}
           userName={userInfo.name}
            className="drop-down-startup-view"
          />
          {/* <UserDropdownInfo
          userImg={Kirra}
          userName="Kirra Press"
          userTitle="Mentor"
          className="dropdown-company-view"
        /> */}
        </div>
      </header>
      <div className="sidebar-mentors-company-view">
        <SideBar role={role} />
      </div>
      <div className="mentors-list-company-view">
      {searchResults.length > 0 ? (
          searchResults.map((mentor) => (
            <MentorCard
              key={mentor._id}
              mentor={mentor}
              onViewMentor={() => handleViewMentor(mentor._id)}
            />
          ))
        ) : (
          <p>No mentors found</p>
        )}
      </div>

      <div className="quick-overview-company-view">
        <p className="quick-overview-paragraph">Quick Overview</p>
        <p className="quick-overview-paragraph1">in the last month</p>
        <QuickOverviewCard
        className="quick-overview-mentor-page"
        role={role}
          totalMentors={overviewData.totalMentors}
          totalAssignedJobs={overviewData.totalAssignedJobs}
          finishedJobs={overviewData.finishedJobs}
        />
      </div>
    </div>
  );
};

export default Mentors;
