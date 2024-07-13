import React from "react";
import "./BestPerformingMentors.css";
import LucieWeber from "../assets/Startup-dashboard/LucieWeber.svg";
import CrystalPorter from "../assets/Startup-dashboard/CrystalPorter.svg";
import ThomasRose from "../assets/Startup-dashboard/ThomasRose.svg";
import Arrow from "../assets/arrowSymbol_mentors.svg";
import BlueArrow from "../assets/arrowSymbol_mentors_blue.svg";
import BlueOval from "../assets/Startup-dashboard/Oval Copy 11.png"

const BestPerformingMentors = () => {
  const mentors = [
    {
      name: "Lucie Weber",
      photo: LucieWeber,
      achievedJobs: 18,
    },
    {
      name: "Crystal Porter",
      photo: CrystalPorter,
      achievedJobs: 51,
    },
    {
      name: "Thomas Rose",
      photo: ThomasRose,
      achievedJobs: 22,
    },
  ];

  return (
    <div className="best-performing-mentors-list">
      <h1>Best Performing Mentors</h1>
      <ul>
        {mentors.map((mentor, index) => (
          <li key={index} className="mentor-item">
            <div className="best-mentor-info">
            {/* {index === 1 && <img src={BlueOval} alt="blue-oval" className="blue-oval" />} */}
              <img
                src={mentor.photo}
                alt={mentor.name}
                className="best-mentor-photo"
              />

              <div className="mentors-details">
                <h3>{mentor.name}</h3>
                <p>
                 <span className="mentor-jobs-number"> {mentor.achievedJobs}</span> <br/>Achieved Jobs
                  </p>
              </div>
            </div>
            <div className="best-mentor-icon-arrow">
              <img src={index === 1 ? BlueArrow : Arrow} alt="mentor-arrow-icon" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestPerformingMentors;
