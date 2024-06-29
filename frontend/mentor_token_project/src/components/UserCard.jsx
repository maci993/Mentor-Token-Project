import React from "react";
import { Link } from "react-router-dom";
import fb from "../assets/Social-icons/Socialicon.svg";
import gh from "../assets/Social-icons/Socialicon1.svg";
import In from "../assets/Social-icons/Socialicon2.svg";
import "./UserCard.css"

const UserCard = ({
  img,
  name,
  position,
  hobby,
  facebook,
  github,
  linkedin,
}) => {
  return (
    <div className="user-card">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <h4>{position}</h4>
      <p>{hobby}</p>
      <div className="social-icons">
      <Link to="https://www.facebook.com/">
        <img src={fb} className="social-icon-img" alt="Facebook" />
        {facebook}
      </Link>
      <Link to="https://github.com/">
        <img src={gh} className="social-icon-img" alt="GitHub" />
        {github}
      </Link>
      <Link to="https://www.linkedin.com/">
        <img src={In} className="social-icon-img" alt="Linkedin" />
        {linkedin}
      </Link>
      </div>
    </div>
  );
};

export default UserCard;
