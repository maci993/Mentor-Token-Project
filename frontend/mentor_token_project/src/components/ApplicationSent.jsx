import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchJobApplications } from "../services/api";
import ClockImg from "../assets/clock.png";
import "./ApplicationSent.css";

const ApplicationSent = ({ title, description, application }) => {
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
  }, [token]);

  if (error) {
    return <p>Error loading applications: {error}</p>;
  }

  return (
    <div className="application-sent">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="applications-list">
        {applications.map((application, index) => (
          <div key={index} className="application-item">
            <span className="application-title">{application.title}</span>
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
};

export default ApplicationSent;
