// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// import SideBar from "../components/SideBar";
// import SearchBar from "../components/SearchBar";
// import UserDropdownInfo from "../components/UserDropdownInfo";
// import JobList from "../components/JobList";
// // import JobModal from "../components/JobModal";
// import CreateJobModal from "../components/CreateJobModal";
// import Company from "../assets/userStartupAvatar.png"
// import "./Jobs.css";

// const Jobs = () => {
//   const token = window.localStorage.getItem("jwt_token");
//   const [role, setRole] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchJobPosts = async () => {
//     try {
//       const res = await fetch("http://localhost:10000/api/jobs", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         console.log("Fetched jobs:", data);
//         setJobs(data);
//         setFilteredJobs(data);
//       } else {
//         console.error("Error fetching jobs:", res.statusText);
//         setError(res.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const myToken = jwtDecode(token);
//     console.log("Retrieved role:", myToken.type);
//     setRole(myToken.type);

//     fetchJobPosts();
//   }, [token]);

//   const handleSearch = (query) => {
//     const filtered = jobs.filter(
//       (job) =>
//         job.companyName.toLowerCase().includes(query.toLowerCase()) ||
//         job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
//         job.description.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredJobs(filtered);
//   };

//   const handleCardClick = (job) => {
//     setSelectedJob(job);
//   };

//   const openCreateJobModal = () => {
//     setIsCreateJobModalOpen(true);
//   };

//   const closeCreateJobModal = () => {
//     setIsCreateJobModalOpen(false);
//   };

//   if (loading) {
//     return <p>Loading jobs...</p>;
//   }

//   if (error) {
//     return <p>Error loading jobs: {error}</p>;
//   }

//   if (jobs.length === 0) {
//     return <p>No jobs available</p>;
//   }
//   return (
//     <div className="job-page-company-view">
//       {selectedJob && <div className="background-overlay"></div>}
//       <div className="sidebar-company-job">
//         <SideBar role={role} />
//       </div>
//       <div className="search-bar-company-job">
//         <SearchBar placeholder="Search" onSearch={handleSearch} />
//       </div>
//       <div className="user-dropdown-menu-jobs-company-view">
//         <UserDropdownInfo
//           userImg={Company}
//           userName="TechWave
// Innovations"
//           userTitle="Startup"
//         />
//       </div>
//       <div className="job-card-company-job">
//         <h1>Your Startup Jobs</h1>
//         {role === "startup" && (
//           <button className="create-job-button" onClick={openCreateJobModal}>
//             + Create new job
//           </button>
//         )}
//         <JobList jobs={filteredJobs} onCardClick={handleCardClick} />
//       </div>
//       <CreateJobModal
//         isOpen={isCreateJobModalOpen}
//         onClose={closeCreateJobModal}
//       />
//       {/* <JobModal isOpen={!!selectedJob} onClose={closeModal} job={selectedJob} /> */}
//     </div>
//   );
// };

// export default Jobs;