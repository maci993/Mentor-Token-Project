import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SearchBar from "../components/SearchBar";
import AssignedJobs from "../components/AssignedJobs";
import UserDropdownInfo from "../components/UserDropdownInfo";
import BestPerformingMentors from "../components/BestPerformingMentors";
import Statistics from "../components/Statistics";
import UserCompany from "../assets/userStartupAvatar.png";
import SideBar from "../components/SideBar";
import JobCard from "../components/JobCard";
import { MentorCard, MentorsList } from "../components/MentorCard";
import "./StartupDashboard.css";

const getFinishedJobsByMonth = (jobs) => {
  const jobsByMonth = {};

  jobs.forEach((job) => {
    if (job.status === "Finished") {
      const finishedDate = new Date(job.finishedDate); 
      const monthKey = `${finishedDate.getFullYear()}-${finishedDate.getMonth() + 1}`;

      if (!jobsByMonth[monthKey]) {
        jobsByMonth[monthKey] = 0;
      }
      jobsByMonth[monthKey]++;
    }
  });

  // Sort by month and format dataPoints array
  const sortedMonths = Object.keys(jobsByMonth).sort();
  const dataPoints = sortedMonths.map((month) => jobsByMonth[month]);

  return dataPoints;
};

const StartupDashboard = () => {
  const dataPoints = [0, 20, 60, 70, 100, 110, 80, 40, 50, 30, 20];
  const [role, setRole] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const myToken = jwtDecode(localStorage.getItem("jwt_token"));
    console.log("Retrieved role:", myToken.type);
    setRole(myToken.type);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        if (!token) throw new Error("No token found");

        // Fetch mentors
        const mentorsResponse = await fetch("/api/mentors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!mentorsResponse.ok) throw new Error("Failed to fetch mentors");
        const mentorsData = await mentorsResponse.json();
        setMentors(mentorsData);

        // Fetch jobs
        const jobsResponse = await fetch("/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!jobsResponse.ok) throw new Error("Failed to fetch jobs");
        const jobsData = await jobsResponse.json();
        setJobs(jobsData);

        // Fetch companies
        const companiesResponse = await fetch("/api/companies", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!companiesResponse.ok) throw new Error("Failed to fetch companies");
        const companiesData = await companiesResponse.json();
        setCompanies(companiesData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

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
      ...filteredMentors,
      ...filteredJobs,
      ...filteredCompanies,
    ]);
  };

    // Get data points for finished jobs
    const finishedJobsDataPoints = getFinishedJobsByMonth(jobs);

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
        onSearch={handleSearch}
      />

      <div className="dashboard-content">
        {searchResults.length > 0 ? (
          <div className="search-results">
            {searchResults.map((result, index) => {
              if (result.skills) {
                return (
                  <MentorCard
                    key={index}
                    mentor={result}
                    onViewMentor={() =>
                      console.log(`Viewing mentor: ${result.name}`)
                    }
                  />
                );
              } else if (result.title) {
                return (
                  <JobCard
                    key={index}
                    job={result}
                    onCardClick={() =>
                      console.log(`Viewing job: ${result.title}`)
                    }
                  />
                );
              } else if (result.name) {
                return (
                  <div key={index} className="company-card">
                    <h3>{result.name}</h3>
                    <p>{result.description}</p>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        ) : (
          <>
            <div className="left-section">
              <div className="sidebar-startup-dashboard">
                <SideBar role={role} />
              </div>
              <div className="assigned-jobs-startup-dashboard">
                <AssignedJobs
                  jobs={searchResults.filter((item) => item.title)}
                />
              </div>
            </div>
            <div className="right-section">
              <BestPerformingMentors
                className="best-performing-mentors-startup-dash"
                mentors={searchResults.filter(
                  (item) => item.name && item.skills
                )}
              />
              <p className="overall-statistics-title">OVERALL STATISTICS</p>
              <Statistics
                title="STATISTICS"
                description="Overall target accomplishment over the year"
                dataPoints={finishedJobsDataPoints}
                userType={role}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StartupDashboard;
