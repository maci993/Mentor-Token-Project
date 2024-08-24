import React, { useState, useEffect } from "react";
import "./BestPerformingMentors.css";
import LucieWeber from "../assets/Startup-dashboard/LucieWeber.svg";
import CrystalPorter from "../assets/Startup-dashboard/CrystalPorter.svg";
import ThomasRose from "../assets/Startup-dashboard/ThomasRose.svg";
import Arrow from "../assets/arrowSymbol_mentors.svg";
import BlueArrow from "../assets/arrowSymbol_mentors_blue.svg";
import defaultLogo from "../assets/Mentors-icons/profile.svg";

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
  //   const fetchBestPerformingMentors = async (token) => {
  //     try {
  //       const res = await fetch("/api/best-performing-mentors", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log("Response status:", res.status);
  //       if (!res.ok) {
  //         throw new Error(`Error: ${res.status} ${res.statusText}`);
  //       }

  //       const data = await res.json();
  //       console.log("Data fetched:", data);
  //       setMentors(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching mentors:", error);
  //       setError(error.message || "An unexpected error occurred");
  //       setLoading(false);
  //     }
  //   };

  //   fetchBestPerformingMentors();
  // }, [token]);

  // if (loading) {
  //   return <p>Loading mentors...</p>;
  // }

  // if (error) {
  //   return <p>Error loading mentors: {error}</p>;
  // }

  // if (mentors.length === 0) {
  //   return <p>No mentors found for this month.</p>;
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
                    {" "}
                    {mentor.achievedJobs}
                  </span>{" "}
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
