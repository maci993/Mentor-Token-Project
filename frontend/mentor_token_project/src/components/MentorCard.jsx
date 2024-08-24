import React, { useState, useEffect } from "react";
import defaultLogo from "../assets/Mentors-icons/profile.svg"
import "./MentorsList.css";

const MentorCard = ({ mentor, onViewMentor, image }) => {
  const starTypes = getStarTypes(mentor.rating || 0);
  const userImage = image || defaultLogo;

  return (
    <div className="mentor-card-company-view">
      <img src={userImage} alt="mentor's name" className="mentor-image" />
      <div className="mentor-info">
        <h3 className="mentor-name">{mentor.name}</h3>
        <div className="mentor-rating">
          {starTypes.map((type, index) => (
            <Star key={index} type={type} />
          ))}

          <span className="mentor-rating-span">{mentor.rating?.toFixed(1)}</span>
          <span className="mentor-rating-span2">
            average based on {mentor.reviews} reviews
          </span>
        </div>
        <p className="mentor-skills">Skills: {mentor.skills.join(" | ")}</p>
        <p className="mentor-description">{mentor.desc}</p>
      </div>

      <button className="view-mentor-btn" onClick={onViewMentor}>
        View Mentor
      </button>
    </div>
  );
};

const getStarTypes = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return [
    ...Array(fullStars).fill("full"),
    ...Array(halfStar).fill("half"),
    ...Array(emptyStars).fill("empty"),
  ];
};

const Star = ({ type }) => {
  if (type === "full") {
    return (
      <svg
        className="star"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#6669FB"
      >
        <path d="M12 .587l3.668 7.57L24 9.748l-6 5.845 1.42 8.284L12 18.896l-7.42 4.981L6 15.593 0 9.748l8.332-1.591z" />
      </svg>
    );
  }
  if (type === "half") {
    return (
      <svg
        className="star"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#6669FB"
      >
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="#6669FB" />
            <stop offset="50%" stopColor="#ccc" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M12 .587l3.668 7.57L24 9.748l-6 5.845 1.42 8.284L12 18.896l-7.42 4.981L6 15.593 0 9.748l8.332-1.591z"
          fill="url(#half)"
        />
      </svg>
    );
  }
  return (
    <svg
      className="star"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#ccc"
    >
      <path d="M12 .587l3.668 7.57L24 9.748l-6 5.845 1.42 8.284L12 18.896l-7.42 4.981L6 15.593 0 9.748l8.332-1.591z" />
    </svg>
  );
};

const getLocalStorageItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.error('Could not access localStorage:', err);
    return null;
  }
};

const MentorsList = ({ mentors, onViewMentor }) => {
    return (
      <div className="mentor-list">
        {mentors.map((mentor) => (
          <MentorCard
            key={mentor._id}
            mentor={mentor}
            onViewMentor={() => onViewMentor(mentor._id)}
          />
        ))}
      </div>
    );
  };

  export { MentorCard, MentorsList };