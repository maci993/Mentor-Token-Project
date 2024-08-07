import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import UserDropdownInfo from "../components/UserDropdownInfo";
import JobList from "../components/JobList";
import JobModal from "../components/JobModal";
import CreateJobModal from "../components/CreateJobModal"
import defaultLogo from "../assets/userStartupAvatar.png"
// import CompanyLogo from "../assets/Job-Feed/companyLogo.svg";
// import CompanyLogo1 from "../assets/Job-Feed/companyLogo1.svg";
// import CompanyLogo2 from "../assets/Job-Feed/companyLogo2.svg";
// import CompanyLogo3 from "../assets/Job-Feed/companyLogo3.svg";
// import CompanyLogo4 from "../assets/Job-Feed/companyLogo4.svg";
import "./JobFeed.css";


const JobFeed = () => {
  const token = window.localStorage.getItem("jwt_token");
  const [role, setRole] = useState(null);
  const [job, setJob] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const companyLogo = job.companyLogo || defaultLogo;

  const fetchJobPosts = async () => {
    try {
      const res = await fetch("http://localhost:10000/api/jobs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Fetched jobs:", data);
        setJob(data);
        setFilteredJobs(data);
      } else {
        console.error("Error fetching jobs:", res.statusText);
        setError(res.statusText);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      const myToken = jwtDecode(token);
      console.log("Retrieved role:", myToken.type);
      setRole(myToken.type);

      fetchJobPosts();
    }, [token]);

    // const jobs = [
    //   {
    //     id: 1,
    //     companyLogo: CompanyLogo,
    //     companyName: "TechWave Innovations",
    //     jobTitle: "New Job Offer",
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.",
    //     category: "Tech",
    //     popularity: 100,
    //     postedDate: "2023-07-20",
    //   },
    //   {
    //     id: 2,
    //     companyLogo: CompanyLogo1,
    //     companyName: "TechWave Innovations",
    //     jobTitle: "New Job Offer",
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.",
    //     category: "Business",
    //     popularity: 50,
    //     postedDate: "2023-07-21",
    //   },
    //   {
    //     id: 2,
    //     companyLogo: CompanyLogo2,
    //     companyName: "TechWave Innovations",
    //     jobTitle: "New Job Offer",
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.",
    //     category: "Business",
    //     popularity: 50,
    //     postedDate: "2023-07-21",
    //   },
    //   {
    //     id: 2,
    //     companyLogo: CompanyLogo3,
    //     companyName: "TechWave Innovations",
    //     jobTitle: "New Job Offer",
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.",
    //     category: "Business",
    //     popularity: 50,
    //     postedDate: "2023-07-21",
    //   },
    //   {
    //     id: 2,
    //     companyLogo: CompanyLogo4,
    //     companyName: "TechWave Innovations",
    //     jobTitle: "New Job Offer",
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.",
    //     category: "Business",
    //     popularity: 50,
    //     postedDate: "2023-07-21",
    //   },
    //   {
    //     id: 2,
    //     companyLogo: CompanyLogo1,
    //     companyName: "TechWave Innovations",
    //     jobTitle: "New Job Offer",
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.",
    //     category: "Business",
    //     popularity: 50,
    //     postedDate: "2023-07-21",
    //   },
    //   {
    //     id: 2,
    //     companyLogo: CompanyLogo3,
    //     companyName: "TechWave Innovations",
    //     jobTitle: "New Job Offer",
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.",
    //     category: "Business",
    //     popularity: 50,
    //     postedDate: "2023-07-21",
    //   },
    //   {
    //     id: 2,
    //     companyLogo: CompanyLogo2,
    //     companyName: "TechWave Innovations",
    //     jobTitle: "New Job Offer",
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.",
    //     category: "Business",
    //     popularity: 50,
    //     postedDate: "2023-07-21",
    //   },
    // ];

    const handleSearch = (query) => {
      const filtered = job.filter(
        (job) =>
          job.companyName.toLowerCase().includes(query.toLowerCase()) ||
          job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(filtered);
    };

    const handleCardClick = (job) => {
      setSelectedJob(job);
    };
  
    const closeModal = () => {
      setSelectedJob(null);
    };

    const openCreateJobModal = () => {
      setIsCreateJobModalOpen(true);
    };
  
    const closeCreateJobModal = () => {
      setIsCreateJobModalOpen(false);
    };

    if (loading) {
      return <p>Loading jobs...</p>;
    }

    if (error) {
      return <p>Error loading jobs: {error}</p>;
    }
    if (job.length === 0) {
      return <p>No jobs available</p>;
    }

    return (
      <div className="job-feed-page">
         {selectedJob && <div className="background-overlay-job-feed"></div>}
        <div className="sidebar-job-feed">
          <SideBar role={role} />
        </div>
        <div className="search-bar-job-feed">
          <SearchBar placeholder="Search" onSearch={handleSearch} />
        </div>
        <div className="user-dropdown-menu-stats">
          <UserDropdownInfo
            userImg={companyLogo}
            userName="TechWave"
            userTitle="Innovations"
          />
        </div>
        <div className="job-card-job-feed">
          <h1>Your Startup Jobs</h1>
          {role === "startup" && (
          <button className="create-job-button" onClick={openCreateJobModal}>
            + Create new job
          </button>
        )}
          <JobList jobs={filteredJobs} onCardClick={handleCardClick}/>
        </div>
        <JobModal isOpen={!!selectedJob} isClosed={closeModal} job={selectedJob} />
        <CreateJobModal
        isOpen={isCreateJobModalOpen}
        isClosed={closeCreateJobModal}
      />
      </div>
    );
  };


export default JobFeed;
