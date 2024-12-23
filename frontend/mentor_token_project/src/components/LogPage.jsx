import React from "react";
import { NavLink } from "react-router-dom";
import "./LogPage.css";
import Logo from "../assets/Login-Page/Mentor-Logo.svg";
import Vector from "../assets/Login-Page/Vector.svg";
import Rocket from "../assets/Rocket.svg";
import BackgroundLogin from "../assets/Login-Page/Login-background.svg";

const LogPage = ({ logData }) => {
  return (
    <div className="log-in-page">
      <img
        className="bg-log-in"
        alt="background-log-in-page"
        src={BackgroundLogin}
      />
      <div className="log-in-page-info">
        <div>
          <NavLink to="/">
            <span className="back-text">← Back</span>
          </NavLink>
          <h1 className="grow-your-startup-title">
            GROW
            <br />
            YOUR STARTUP!
          </h1>
          <span className="span-log-page">
            MONITORING AND EVALUATING NOW IS EASY!
          </span>
        </div>
        <div className="log-in-page-logo">
          <NavLink to="/">
            <img src={Logo} alt="logo-log-in" style={{ cursor: "pointer" }} />
          </NavLink>
          <p>mentortoken.com</p>
        </div>
      </div>

      <div className="log-in-section">
        <img className="log-in-rocket" src={Rocket} />
        <img className="mentor-logo-log-in" src={Vector} />
        <div className="log-in-section-component">{logData}</div>
      </div>
    </div>
  );
};

export default LogPage;
