import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ClockImg from "../assets/clock.png";
import "./ApplicationSent.css";

const API_BASE_URL = "/api";

const fetchJobApplications = async (token) => {
  const res = await fetch(`${API_BASE_URL}/jobapplications`, {
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

const ApplicationSent = ({ title, description, refreshTrigger }) => {
  const token = localStorage.getItem("jwt_token");
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const applicationsData = await fetchJobApplications(token);
        setApplications(applicationsData);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err.message || "An unexpected error occurred");
      }
    };

    fetchApplications();
  }, [token, refreshTrigger]);

  if (error) {
    return <p>Error loading applications: {error}</p>;
  }

  return (
    <div className="application-sent">
      <h2 className="application-sent-title">{title}</h2>
      <p className="application-sent-paragraph">{description}</p>
      <div className="applications-list">
        {applications.map((application, index) => (
          <div key={index} className="application-item">
            <span className="application-title-span">{application.jobId.title}</span>
            <div className="application-status">
              <img
                src={ClockImg}
                alt="status-icon-clock"
                className="status-icon"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ApplicationSent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  refreshTrigger: PropTypes.any,
};

export default ApplicationSent;
