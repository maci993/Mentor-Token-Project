import React from "react";
import "./ApplicationSent.css";
import PropTypes from "prop-types";
import { application } from "express";
import ClockImg from "../assets/clock.png";

const ApplicationSent = ({ title, description, applications }) => {
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

ApplicationsSent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    applications: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  
export default ApplicationSent;
