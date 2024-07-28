import React, { useState, useEffect } from "react";
import "./AssignedJobs.css";

// const jobsData = [
//   { name: "Revenue per rate", status: "Done" },
//   { name: "ARPU (Average revenue per use)", status: "Rejected" },
//   { name: "CAC (Custom Acquisition Cost)", status: "In Progress" },
//   { name: "Churn Rate", status: "Done" },
//   { name: "Burn Rate", status: "In Progress" },
//   { name: "Operation Efficiency", status: "Done" },
//   { name: "Burn Rate", status: "In Progress" },
//   { name: "Operation Efficiency", status: "Done" },
//   { name: "Burn Rate", status: "In Progress" },
//   { name: "Operation Efficiency", status: "Done" },
// ];

const AssignedJobs = () => {
  const token = window.localStorage.getItem("jwt_token");
  console.log("jwt_token", token);
  const [filter, setFilter] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await fetch("http://localhost:10000/api/jobs", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching jobs: ${response.statusText}`);
        }
        const dataa = await response.json();
        setJobsData(dataa);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message || "An unexpected error occurred");
        setLoading(false);
      }
    };
    // setJobs(jobsData);
    //     console.log(data, "data from assigned jobs");
    //     setJobsData(data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching jobs:", error);
    //     setError(error.message || "An unexpected error occurred");
    //     setLoading(false);
    //   }
    // };

    fetchJobPosts();
  }, [token]);

  const filteredJobs = jobsData.filter((job) => {
    if (filter === "All") return true;
    return job.status === filter;
  });

  const getStatus = (status) => {
    switch (status) {
      case "Done":
        return "done";
      case "Rejected":
        return "rejected";
      case "In Progress":
        return "in-progress";
      default:
        return "";
    }
  };

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error loading jobs: {error}</p>;
  }

  return (
    <div className="assigned-jobs-container">
      <h1 className="assigned-jobs-title">Assigned Jobs</h1>
      <div className="filter-tabs">
        {["All", "Done", "Rejected", "In Progress"].map((tab) => (
          <button
            key={tab}
            className={`filter-tab ${filter === tab ? "active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="job-list-assigned-jobs">
        {filteredJobs.map((job, index) => (
          <div key={index} className="job-item-mentor-dashboard">
            <span className="job-name">{job.title}</span>
            <span className={`status-button ${getStatus(job.status)}`}>
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedJobs;
