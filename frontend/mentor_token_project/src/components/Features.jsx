import React from "react";
import Icon from "../assets/Features-icons/clarity_analytics-line.svg";
import Icon1 from "../assets/Features-icons/fluent_library-20-regular.svg";
import Icon2 from "../assets/Features-icons/fluent_reward-20-regular.svg";
import Icon3 from "../assets/Features-icons/radix-icons_rocket.svg";
import Rocket from "../assets/Features-icons/Rocket.svg";
import "./Features.css";

const Features = () => {
  return (
    <div class="features">
      <p className="main-title">FEATURES</p>
      <h1 className="title">
        Boost Your Startup's Journey:
        <br />
        Discover Mentor Token's Robust <br />
        Features
      </h1>
      <div className="cards">
        <div class="card">
          <img src={Icon} alt="icon-analytics" />
          <h3>Goal Setting</h3>
          <br />
          <p>
            Set clear and achievable goals
            <br />
            for your startup's success.
          </p>
        </div>

        <div class="card">
          <img src={Icon1} alt="icon-library" />
          <h3>Performance Tracking</h3>
          <br />
          <p>
            Monitor mentor performance in
            <br />
            real-time and track progress.
          </p>
        </div>

        <div class="card">
          <img src={Icon2} alt="icon-reward" />
          <h3>Reward System</h3>
          <br />
          <p>
            Motivate mentors with a secure
            <br />
            and rewarding token-based
            <br />
            reward system.
          </p>
        </div>

        <div class="card">
          <img src={Icon3} alt="icon-rocket" />
          <h3>Knowledge Library</h3>
          <br />
          <p>
            Access a comprehensive
            <br />
            knowledge library to equip mentors
            <br />
            with the skills, and motivation
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
