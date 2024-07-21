import React, { useState, useEffect } from "react";
import "./PendingJobs.css";

const API_BASE_URL = "/api";

const fetchJobOffers = async (token) => {
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

const updateJobOfferStatus = async (jobId, status, token) => {
  const res = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

const PendingJobs = ({ title, description, jobs }) => {
  const token = window.localStorage.getItem("jwt_token");
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersData = await fetchJobOffers(token);
        setJob(offersData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job offers:", error);
        setError(err.message || "An unexpected error occurred");
      }
    };

    fetchOffers();
  }, [token]);

  const handleStatusUpdate = async (jobId, status) => {
    try {
      await updateJobOfferStatus(jobId, status, token);
      const updatedJobs = job.map((job) =>
        job._id === jobId ? { ...job, status } : job
      );
      setJob(updatedJobs);
    } catch (err) {
      console.error("Error updating job offer status:", err);
      setError(err.message || "An unexpected error occurred");
    }
  };

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error loading job offers: {error}</p>;
  }

  return (
    <div className="pending-jobs">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="job-list-mentor-dashboard">
        {job.map((job, index) => (
          <div key={index} className="job-item-mentor-dashboard">
            <span className="job-title-mentor-dashboard">{job.title}</span>
            <div className="job-action-mentor-dashboard">
              <button
                className="accept-button"
                onClick={() => handleStatusUpdate(job._id, "Rejected")}
              >
                Accept
              </button>
              <button
                className="reject-button"
                onClick={() => handleStatusUpdate(job._id, "Accepted")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingJobs;
