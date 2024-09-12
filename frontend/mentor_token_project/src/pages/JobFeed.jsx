import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import UserDropdownInfo from "../components/UserDropdownInfo";
import JobList from "../components/JobList";
import JobModal from "../components/JobModal";
import CreateJobModal from "../components/CreateJobModal"
import defaultLogo from "../assets/userStartupAvatar.png"
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
  const [userInfo, setUserInfo] = useState({
    name: "User",
    title: "Title",
    image: defaultLogo
  });
  const [refreshTrigger, setRefreshTrigger] = useState(false);

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

    useEffect(() => {
      const myToken = jwtDecode(token);
      console.log("Retrieved role:", myToken.type);
      setRole(myToken.type);

      fetchJobPosts();
      fetchUserInfo();
    }, [token, refreshTrigger]);

    const handleSearch = (query) => {
      const filtered = job.filter(
        (job) =>
          job.name?.toLowerCase().includes(query.toLowerCase()) ||
          job.title?.toLowerCase().includes(query.toLowerCase()) ||
          job.description?.toLowerCase().includes(query.toLowerCase())
      );
      console.log("Filtered jobs:", filtered); 
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

    const handleJobApplied = () => {
      console.log("JOB APPLIED AND REFRESH TRIGGERED")
      setRefreshTrigger(!refreshTrigger);  
    };

    if (loading) {
      return <p>Loading jobs...</p>;
    }

    if (error) {
      return <p>Error loading jobs: {error}</p>;
    }
    if (job.length === 0) {
      return <p>No jobs available</p>;
    };

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
             userImg={userInfo.image}
             userName={userInfo.name} />
        </div>
        <div className="job-card-job-feed">
          <h1>Your Startup Jobs</h1>
          <div>
          {role === "startup" && (
          <button className="create-job-button" onClick={openCreateJobModal}>
            + Create new job
          </button>
        )}
        </div>
          <JobList jobs={filteredJobs} onCardClick={handleCardClick}/>
        </div>
        <JobModal isOpen={!!selectedJob} isClosed={closeModal} job={selectedJob} onJobApplied={handleJobApplied}/>
        <CreateJobModal
        isOpen={isCreateJobModalOpen}
        isClosed={closeCreateJobModal}
      />
      </div>
    );
  };


export default JobFeed;

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
