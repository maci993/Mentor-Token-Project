import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import UserDropdownInfo from "../components/UserDropdownInfo";
import UserCompany from "../assets/userStartupAvatar.png"
import MentorsList from "../components/MentorsList";
import "./Mentors.css";
import Kirra from "../assets/KirraPress.png";
import Alison from "../assets/company-view-mentors/Alison.svg";
import Marcus from "../assets/company-view-mentors/Marcus.svg";
import QuickOverviewCard from "../components/QuickOverviewCard";
import { jwtDecode } from "jwt-decode";

const Mentors = () => {
  const [role, setRole] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [data, setData] = useState({
  //   totalMentors: 5,
  //   totalAssignedJobs: 3,
  //   finishedJobs: 2,
  // });

  const data = {
    totalMentors: mentors.length,
    totalAssignedJobs: 0, 
    finishedJobs: 0, 
  };

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
    const myToken = jwtDecode(localStorage.getItem("jwt_token"));
    console.log("Retrieved role:", myToken.type);
    const fetchMentors = async () => {
      try {
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
          .sort((a, b) => b.completedJobs - a.completedJobs); // Sort by completed jobs

        setMentors(sortedMentors);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
    setRole(myToken.type);
  }, []);

  const handleViewMentor = (id) => {
    navigate(`/mentors/${id}`);
  };

  if (!role) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mentors-company-view-page">
      <header className="mentors-company-view">
        <div className="search-bar-and-dropdown">
          <SearchBar
            placeholder="Search"
            className="search-bar-company-view"
            style={{ marginLeft: 100 }}
          />
          <UserDropdownInfo 
        userImg={UserCompany}
        userName="TechWave"
        userTitle="Innovations"
        className="drop-down-startup-view"/>
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
        <MentorsList mentors={mentors} onViewMentor={handleViewMentor}/>
      </div>
      
      <div className="quick-overview-company-view">
      <p className="quick-overview-paragraph">Quick Overview</p>
      <p className="quick-overview-paragraph1">in the last month</p>
        <QuickOverviewCard
          totalMentors={data.totalMentors}
          totalAssignedJobs={data.totalAssignedJobs}
          finishedJobs={data.finishedJobs}
        />
      </div>
    </div>
  );
};

export default Mentors;
