import React, { useState, useEffect } from "react";
import LucieWeber from "../assets/Startup-dashboard/LucieWeber.svg";
import CrystalPorter from "../assets/Startup-dashboard/CrystalPorter.svg";
import ThomasRose from "../assets/Startup-dashboard/ThomasRose.svg";
import Arrow from "../assets/arrowSymbol_mentors.svg";
import BlueArrow from "../assets/arrowSymbol_mentors_blue.svg";
import defaultLogo from "../assets/Mentors-icons/profile.svg";
import "./BestPerformingMentors.css";

const BestPerformingMentors = () => {
  const token = window.localStorage.getItem("jwt_token");
  // const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // useEffect(() => {
  //   const fetchBestMentors = async () => {
  //     try {
  //       const token = localStorage.getItem("jwt_token");
  //       const response = await fetch("/api/best-performing-mentors", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch best-performing mentors");
  //       }

  //       const data = await response.json();
  //       setMentors(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBestMentors();
  // }, []);

  // if (loading) {
  //   return <p>Loading best-performing mentors...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  // if (mentors.length === 0) {
  //   return <p>No best-performing mentors available at the moment.</p>;
  // }

  return (
    <div className="best-performing-mentors-list">
      <h1 className="best-performing-mentors-title">Best Performing Mentors</h1>
      <ul className="best-performing-mentors-list-unordered">
        {mentors.map((mentor, index) => (
          <li key={mentor._id} className="mentor-item">
            <div className="best-mentor-info">
              {/* {index === 1 && <img src={BlueOval} alt="blue-oval" className="blue-oval" />} */}
              <img
                src={mentor.photo || defaultLogo}
                alt={mentor.name}
                className="best-mentor-photo"
              />
              <div className="mentors-details">
                <h3 className="mentor-name">{mentor.name}</h3>
                <p>
                  <span className="mentor-jobs-number">
                    {mentor.achievedJobs}
                  </span>
                  <br />
                  Achieved Jobs
                </p>
              </div>
            </div>
            <div className="best-mentor-icon-arrow">
              <img
                src={index === 1 ? BlueArrow : Arrow}
                alt="mentor-arrow-icon"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestPerformingMentors;
