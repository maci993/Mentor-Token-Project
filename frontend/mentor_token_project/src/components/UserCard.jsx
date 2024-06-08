import React from "react";
import { Link } from "react-router-dom";
import fb from "../assets/Social-icons/Socialicon.svg";
import gh from "../assets/Social-icons/Socialicon1.svg";
import In from "../assets/Social-icons/Socialicon2.svg";

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
      <img src={img} alt="user-image" />
      <h3>{name}</h3>
      <h4>{position}</h4>
      <p>{hobby}</p>
      <Link to="https://www.facebook.com/">
        <img src={fb} alt="" />
        {facebook}
      </Link>
      <Link to="https://github.com/">
        <img src={gh} alt="" />
        {github}
      </Link>
      <Link to="https://www.linkedin.com/">
        <img src={In} alt="" />
        {linkedin}
      </Link>
    </div>
  );
};

export default UserCard;
