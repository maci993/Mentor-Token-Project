import React, { useState } from "react";
import "./UserDropdownInfo.css";
import PropTypes from "prop-types";


const UserDropdownInfo = ({ userImg, userName, userTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-dropdown-startup-dashboard">
      <div className="user-info-startup" onClick={toggleDropdown}>
        <img
          src={userImg}
          alt="user-avatar"
          className="user-avatar-startup"
        />
        <div className="user-details-startup">
          <span className="user-name">{userName}</span>
          <span className="user-title">{userTitle}</span>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-menu-startup">
          <a href="#profile">Profile</a>
          <a href="#settings">Settings</a>
          <a href="#logout">Logout</a>
        </div>
      )}
    </div>
  );
};

UserDropdownInfo.propTypes = {
  userImg: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userTitle: PropTypes.string.isRequired,
};


export default UserDropdownInfo;