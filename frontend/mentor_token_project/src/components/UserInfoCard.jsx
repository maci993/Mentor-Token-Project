import React from "react";
import EmailIcon from "../assets/MyStats/mail.svg";
import PhoneIcon from "../assets/MyStats/phone.svg";
import LinkedinIcon from "../assets/MyStats/LinkedinLogo.svg";
import CheckMark from "../assets/MyStats/CheckMarkGreen.svg";
import "./UserInfoCard.css";

const UserInfoCard = ({
  image,
  name,
  title,
  checkmark,
  linkedin,
  email,
  phone,
}) => {
  return (
    <div className="user-info-card">
      <img src={image} alt={name} className="user-image" />
      <img
        src={CheckMark}
        alt="check-mark-green"
        className="check-mark-green"
      />
      <h2 className="user-name-user-info-card">{name}</h2>
      <p className="user-title-user-info-card">{title}</p>
      <img
        src={LinkedinIcon}
        alt="Linkedin icon"
        className="user-linkedin-user-info-card"
      />
      {linkedin}
      <p className="user-email-user-info-card">
        <img src={EmailIcon} alt="Email icon" />
        {email}
      </p>
      <p className="user-phone-user-info-card">
        <img src={PhoneIcon} alt="Phone icon" />
        {phone}
      </p>
    </div>
  );
};

export default UserInfoCard;
