import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
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

const deleteJobOffer = async (jobId, token) => {
  const res = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
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
  const [role, setRole] = useState(null);

  useEffect(() => {
    const myToken = jwtDecode(token);
    console.log("Retrieved role:", myToken.type);
    setRole(myToken.type);

    const fetchOffers = async () => {
      try {
        const response = await fetchJobOffers(token);
        setJob(response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job offers:", error);
        setError(err.message || "An unexpected error occurred");
      }
    };

    fetchOffers();
  }, [token]);

  const handleDelete = async (jobId) => {
    try {
      await deleteJobOffer(jobId, token);
      const updatedJobs = job.filter((job) => job._id !== jobId);
      setJob(updatedJobs);
    } catch (err) {
      console.error("Error deleting job offer", err);
      setError(err.message || "An unaxpected error ocured");
    }
  };

  const handleStatusUpdate = async (jobId, status) => {
    try {
      await updateJobOfferStatus(jobId, status, token);
      if (status === "Cancelled") {
        const updatedJobs = job.filter((job) => job._id !== jobId);
        setJob(updatedJobs);
      } else {
        const updatedJobs = job.map((job) =>
          job._id === jobId ? { ...job, status } : job
        );
        setJob(updatedJobs);
      }
      alert(`Job ${status.toLowerCase()} successfully!`);
    } catch {
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
        {job && job.length > 0 ? (
          job.map((jobItem, index) => (
            <div key={index} className="job-item-mentor-dashboard">
              <span className="job-title-mentor-dashboard">
                {jobItem.title}
              </span>
              <div className="job-action-mentor-dashboard">
                {role === "mentor" ? (
                  <>
                    <button
                      className="accept-button"
                      onClick={() => {
                        alert("Job accepted");
                        handleStatusUpdate(jobItem._id, "Accepted");
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => {
                        alert("Job rejected");
                        handleStatusUpdate(jobItem._id, "Rejected");
                      }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    className="cancel-button-pending-jobs"
                    onClick={() => {
                      alert("Job offer cancelled");
                      handleStatusUpdate(jobItem._id, "Cancelled");
                    }}
                  >
                    Cancel Offer
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No pending jobs available!</p>
        )}
      </div>
    </div>
  );
};

export default PendingJobs;
